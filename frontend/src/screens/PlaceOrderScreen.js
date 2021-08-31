import React, { useState, useEffect } from 'react'
import { Button, Row, Col, ListGroup, Image, Card, Container, Breadcrumb, Jumbotron, Form } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import CheckoutSteps from '../components/CheckoutSteps'
import { createOrder } from '../actions/orderActions'
import { ORDER_CREATE_RESET } from '../constants/orderConstants'
import checkout_bread from '../images/breadcrumbs/medcan_02.jpg'
import { TimePickerComponent } from '@syncfusion/ej2-react-calendars'


function PlaceOrderScreen({ history }) {

    const minTime = new Date('1/2/2021 10:00 AM')
    const maxTime = new Date('1/2/2021 9:45 PM')

    const [expectedTime, setExpectedTime] = useState('')

    const [customMessage, setCustomMessage] = useState('')

    const orderCreate = useSelector(state => state.orderCreate)
    const { order, error, success } = orderCreate

    const dispatch = useDispatch()
    const cart = useSelector(state => state.cart)

    cart.itemsPrice = cart.cartItems.reduce((acc, item) => acc + item.price * item.qty, 0).toFixed(2)
    cart.shippingPrice = 0 //(cart.itemsPrice > 10 ? 0 : 10).toFixed(2)
    cart.taxPrice = 0 // Number((0.13) * cart.itemsPrice).toFixed(2)
    cart.totalPrice = (Number(cart.itemsPrice) + Number(cart.shippingPrice) + Number(cart.taxPrice)).toFixed(2)

    // if(!cart.paymentMethod) {
    //     history.push('/payment')
    // }
    useEffect(() => {
        if (success) {
            history.push(`/order/${order._id}`)
            dispatch({type: ORDER_CREATE_RESET})
        }
    }, [ success, history, dispatch ])

    const placeOrder = (e) => {
        dispatch(createOrder({
            orderItems: cart.cartItems,
            shippingAddress: cart.shippingAddress,
            paymentMethod: cart.paymentMethod,
            itemsPrice: cart.itemsPrice,
            shippingPrice: cart.shippingPrice,
            taxPrice: cart.taxPrice,
            totalPrice: cart.totalPrice,
            expectedTime: expectedTime,
            customMessage: customMessage
        }))
    }

    const expectedTimeHandler = (e) => {
        if (e.target.value != null) {
            setExpectedTime((e.target.value).toString().substring(15,21))
        } else {
            setExpectedTime('')
        }
    }

    return (
        <div>
            <Breadcrumb style={{backgroundImage: `url(${checkout_bread})`, height: '320px', backgroundRepeat: 'no-repeat', backgroundAttachment: 'scroll', backgroundPosition: 'center', backgroundSize: 'cover'}}></Breadcrumb>
            <Container>
                <Jumbotron style={{backgroundColor: 'white'}}>
                <CheckoutSteps step1 step3 step4 />
                <Row>
                    <Col md={8}>
                        <ListGroup variant='flush'>
                            {/* <ListGroup.Item>
                                <h2>Shipping</h2>
                                <p>
                                    <strong>Shipping: </strong>
                                    {cart.shippingAddress.address},   {cart.shippingAddress.city},
                                    {'    '} 
                                    {cart.shippingAddress.postalCode}
                                    {'    '} 
                                    {cart.shippingAddress.country}
                                </p>
                            </ListGroup.Item> */}
                            <ListGroup.Item>
                                <h2>Note</h2>
                                <p style={{fontWeight: '700', fontSize: '17px'}} className="note__text">If you would like to round up your order, make any changes to your estimated arrival time, or for any other questions about your order please call us at 437-218-5573</p>
                            </ListGroup.Item>

                            <ListGroup.Item>
                                <h2>Expected Arrival</h2>
                                <TimePickerComponent placeholder="Select a time" min={minTime} max={maxTime} step={15} onChange={expectedTimeHandler}/>
                            </ListGroup.Item>

                            <ListGroup.Item>
                                <h2>Custom Order</h2>
                                <Form.Label>If you want custom order. Please fill out the information below.</Form.Label>
                                <Form.Control as='textarea' rows='5' placeholder='Enter Details' name='message' onChange={(e) => setCustomMessage(e.target.value)}/>
                            </ListGroup.Item>

                            <ListGroup.Item>
                                <h2>Payment Method</h2>
                                <p>
                                    <strong>Method: </strong>
                                    Pay in Store
                                </p>
                            </ListGroup.Item>

                            <ListGroup.Item>
                                <h2>Order Items</h2>
                                {cart.cartItems.lenght === 0 ? <Message variant='info'>Your cart is empty</Message> : (
                                    <ListGroup variant='flush'>
                                        {cart.cartItems.map((item, index) => (
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
                                        <Col>${cart.itemsPrice}</Col>
                                    </Row>
                                </ListGroup.Item>

                                <ListGroup.Item>
                                    <Row>
                                        <Col>Shipping:</Col>
                                        <Col>${cart.shippingPrice}</Col>
                                    </Row>
                                </ListGroup.Item>

                                <ListGroup.Item>
                                    <Row>
                                        <Col>Tax:</Col>
                                        <Col>${cart.taxPrice}</Col>
                                    </Row>
                                </ListGroup.Item> */}

                                <ListGroup.Item>
                                    <Row>
                                        <Col>Total:</Col>
                                        <Col>${cart.totalPrice}</Col>
                                    </Row>
                                </ListGroup.Item>

                                <ListGroup.Item>
                                    {error && <Message variant='danger'>{error}</Message>}
                                    {expectedTime === '' && <Message variant='info'>Select Expected Arrival Time</Message>}
                                    <Button type='submit' className='btn-block btn-success' disabled={cart.cartItems === 0 || expectedTime === ''} onClick={placeOrder}>Place Order</Button>
                                </ListGroup.Item>
                            </ListGroup>
                        </Card>
                    </Col>
                </Row>
                </Jumbotron>
            </Container>
        </div>
    )
}

export default PlaceOrderScreen
