import React, { useState, useEffect } from 'react'
import { Button, Row, Col, ListGroup, Image, Card, Container } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { PayPalButton } from 'react-paypal-button-v2'
import Message from '../components/Message'
import Loader from '../components/Loader'
import { getOrderDetails, payOrder, deliverOrder } from '../actions/orderActions'
import { ORDER_PAY_RESET, ORDER_DELIVER_RESET } from '../constants/orderConstants'

function OrderScreen({ match, history }) {

    const orderId = match.params.id
    const dispatch = useDispatch()

    const [sdkReady, setSdkReady] = useState(false)

    const orderDetails = useSelector(state => state.orderDetails)
    const { order, error, loading } = orderDetails

    const orderPay = useSelector(state => state.orderPay)
    const { loading: loadingPay, success: successPay } = orderPay

    const orderDeliver = useSelector(state => state.orderDeliver)
    const { loading: loadingDeliver, success: successDeliver } = orderDeliver

    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin

    if(!loading && !error) {
        order.itemsPrice = order.orderItems.reduce((acc, item) => acc + item.price * item.qty, 0).toFixed(2)
    }

    const addPayPalScript = () => {
        const script = document.createElement('script')
        script.type = 'text/javascript'
        script.src = 'https://www.paypal.com/sdk/js?client-id=AdOCUQBliqfjxiD8uenRTZObPOUNu3qbFK6otQa4b7EMj7psDrk_dqga4DdJs87z04i5SXScVk9QSIKN'
        script.async = true
        script.onload = () => {
            setSdkReady(true)
        }
        document.body.appendChild(script)
    }

    // payment is done through successPay and esle if condition
    useEffect(() => {
        if(!userInfo) {
            history.push('/login')
        } 
        if(!order || successPay || order._id !== Number(orderId) || successDeliver){
            dispatch({type: ORDER_PAY_RESET})
            dispatch({type: ORDER_DELIVER_RESET})
            dispatch(getOrderDetails(orderId))
        // } else if (!order.isPaid) {
        //     if (!window.paypal) {
        //         addPayPalScript()
        //     } else {
        //         setSdkReady(true)
        //     }
        }
    }, [ dispatch, order, orderId, successPay, successDeliver ])

    const successPaymentHandler = (paymentResult) => {
        dispatch(payOrder(orderId, paymentResult))
    }

    const deliverHandler = () => {
        // dispatch(deliverOrder(order))
        dispatch(payOrder(orderId, true))
    }

    return loading ? (<Loader/>) : error ? (<Message variant='danger'>{error}</Message>) :    
    (
        <div class="pb-3">
            <Container>
                {userInfo && userInfo.isAdmin && (
                <Link to='/admin/orderlist' className='btn btn-light my-3'><i class="fas fa-long-arrow-alt-left"></i> Go Back</Link>
                )}
                <h1>Order: {order._id} <hr></hr> <p style={{fontSize: '17px'}}>Your order has been placed. Please proceed to the store at the specified arrival time.</p></h1><hr/>
                <Row>
                    <Col md={8}>
                        <ListGroup variant='flush'>
                            <ListGroup.Item>
                                <h2>Customer</h2>
                                <p><strong>Name: </strong> {order.user.name}</p>
                                <p><strong>Email: </strong> <a href={`mailto:${order.user.email}`}>{order.user.email}</a></p>
                                <p><strong>Phone Number:</strong> <a href={`tel:${order.user.phone}`}>{order.user.phone}</a></p>
                                <p><strong>Expected Arrival:</strong>{order.expectedTime}</p>
                                <p><strong>Custom Order: </strong>{order.customMessage}</p>
                                {/* <p>
                                    <strong>Shipping: </strong>
                                    {order.shippingAddress.address},   {order.shippingAddress.city},
                                    {'    '} 
                                    {order.shippingAddress.postalCode}
                                    {'    '} 
                                    {order.shippingAddress.country}
                                </p> */}
                                {/* {order.isDelivered ?  (
                                    <Message variant='success'>Delivered on {order.deliveredAt.substring(0, 10)}</Message>
                                ) : (
                                    <Message variant='warning'>Not Delivered</Message>
                                )} */}
                            </ListGroup.Item>

                            <ListGroup.Item>
                                <h2>Payment Method</h2>
                                <p>
                                    <strong>Method: </strong>
                                    Pay in Store
                                </p>
                                {order.isPaid ?  (
                                    <Message variant='success'>Paid on {order.paidAt.substring(0, 10)}</Message>
                                ) : (
                                    <Message variant='warning'>Not Paid</Message>
                                )}
                            </ListGroup.Item>

                            <ListGroup.Item>
                                <h2>Order Items</h2>
                                {order.orderItems.lenght === 0 ? <Message variant='info'>Order is empty</Message> : (
                                    <ListGroup variant='flush'>
                                        {order.orderItems.map((item, index) => (
                                            <ListGroup.Item key={index}>
                                                <Row>
                                                    <Col md={1} xs={3}>
                                                        <Image src={item.image} alt={item.name} fluid rounded/>
                                                    </Col>
                                                    <Col>
                                                        <Link to={`/product/${item.product}`}>{item.name}</Link>
                                                    </Col>
                                                    <Col md={4}>
                                                        {item.qty} x ${item.price} = ${(item.qty * item.price).toFixed(2)}
                                                    </Col>
                                                </Row>
                                            </ListGroup.Item>
                                        ))}
                                    </ListGroup>
                                )}

                            </ListGroup.Item>
                        </ListGroup>
                    </Col>

                    <Col md={4}>
                        <Card>
                            <ListGroup variant='flush'>
                                <ListGroup.Item>
                                    <h2>Order Summary</h2>
                                </ListGroup.Item>

                                {/* <ListGroup.Item>
                                    <Row>
                                        <Col>Items:</Col>
                                        <Col>${order.itemsPrice}</Col>
                                    </Row>
                                </ListGroup.Item>

                                <ListGroup.Item>
                                    <Row>
                                        <Col>Shipping:</Col>
                                        <Col>${order.shippingPrice}</Col>
                                    </Row>
                                </ListGroup.Item>

                                <ListGroup.Item>
                                    <Row>
                                        <Col>Tax:</Col>
                                        <Col>${order.taxPrice}</Col>
                                    </Row>
                                </ListGroup.Item> */}

                                <ListGroup.Item>
                                    <Row>
                                        <Col>Total:</Col>
                                        <Col>${order.totalPrice}</Col>
                                    </Row>
                                </ListGroup.Item>

                                {/* {!order.isPaid && (
                                    <ListGroup.Item>
                                        {loadingPay && <Loader/>}

                                        {!sdkReady ? (
                                            <Loader/>
                                        ) : (
                                            // <Button type='button' className='btn btn-block' onClick={successPaymentHandler}>Mark As Paid</Button>
                                            <PayPalButton amount={order.totalPrice} onSuccess={successPaymentHandler}/>
                                        )}
                                    </ListGroup.Item>
                                )} */}
                            </ListGroup>
                            {loadingDeliver && <Loader/>}
                            {userInfo && userInfo.isAdmin && !order.isDelivered && !order.isPaid && (
                                <ListGroup.Item>
                                    <Button type='button' className='btn btn-block' onClick={deliverHandler}>Mark As Paid & Delivered</Button>
                                </ListGroup.Item>
                            )}
                        </Card>
                    </Col>
                </Row>
            </Container>
        </div>
    )
}

export default OrderScreen
