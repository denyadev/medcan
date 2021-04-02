import React, {useEffect} from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Row, Col, ListGroup, Image, Form, Button, Card, Container, Breadcrumb, Jumbotron } from 'react-bootstrap'
import Message from '../components/Message'
import { addToCart, removeFromCart } from '../actions/cartActions'
import cart_bread from '../images/breadcrumbs/medcan_01.jpg'

function CartScreen({ match, location, history }) {
    const productId = match.params.id
    const qty = location.search ? Number(location.search.split('=')[1]) : 1
    const dispatch = useDispatch()

    const cart = useSelector(state => state.cart)
    const { cartItems } = cart

    const stockCounter = 30

    useEffect(() => {
        if (productId) {
            dispatch(addToCart(productId, qty))
        }
    }, [dispatch, productId, qty]) 

    const removeFromCartHandler = (id) => {
        dispatch(removeFromCart(id))
    }

    const checkoutHandler = () => {
        history.push('/login?redirect=placeorder')
    }

    return (
        <div>
        <Breadcrumb style={{backgroundImage: `url(${cart_bread})`, height: '320px', backgroundRepeat: 'no-repeat', backgroundAttachment: 'scroll', backgroundPosition: 'center', backgroundSize: 'cover'}}></Breadcrumb>
        <Container>
            
            <Jumbotron style={{backgroundColor: 'white'}}>
            <h1>Shopping Cart</h1>
            <br/>
            <Row>
                <Col md={8}>
                    
                    {cartItems.length === 0 ? (
                        <Message variant='info'>
                            Your cart is empty <Link to='/store'>Go Back</Link>
                        </Message>
                    ) : (
                        <ListGroup variant='flush'>
                            {cartItems.map(item => (
                                <ListGroup.Item key={item.product}>
                                    <Row>
                                        <Col md={2} xs={3}>
                                            <Image src={item.image} alt={item.name} fluid rounded />
                                        </Col>
                                        <Col md={3} xs={6}>
                                            <Link to={`/product/${item.product}`}>{item.name}</Link>
                                        </Col>
                                        <Col md={2} xs={3}>
                                            ${item.price}
                                        </Col>
                                        <Col md={3} xs={9}>
                                            {item.countInStock > 0 && item.countInStock <= 30 && (
                                                <Form.Control as="select" value={item.qty} onChange={(e) => dispatch(addToCart(item.product, Number(e.target.value)))}>
                                                    {
                                                        [...Array(item.countInStock).keys()].map((x) => (
                                                            <option key={x + 1} value={x + 1}>
                                                                {x + 1}
                                                            </option>
                                                        ))
                                                    }
                                                </Form.Control>
                                            )}
                                            {item.countInStock > 30 && (
                                                <Form.Control as="select" value={item.qty} onChange={(e) => dispatch(addToCart(item.product, Number(e.target.value)))}>
                                                    {
                                                        [...Array(stockCounter).keys()].map((x) => (
                                                            <option key={x + 1} value={x + 1}>
                                                                {x + 1}
                                                            </option>
                                                        ))
                                                    }
                                                </Form.Control>
                                            )}                                            
                                        </Col>
                                        <Col md={1} xs={3}>
                                            <Button type='button' variant='light' onClick={() => removeFromCartHandler(item.product)}>
                                                <i className='fas fa-trash'></i>
                                            </Button>
                                        </Col>
                                    </Row>
                                </ListGroup.Item>
                            ))}
                        </ListGroup>
                    )}
                </Col>
                <Col md={4}>
                    <Card>
                        <ListGroup variant='flush'>
                            <ListGroup.Item>
                                <h2>Subtotal ({cartItems.reduce((acc, item) => acc + item.qty, 0)}) items</h2>
                                ${cartItems.reduce((acc, item) => acc + item.qty * item.price, 0).toFixed(2)}
                            </ListGroup.Item>
                            <ListGroup.Item>
                                {cartItems.reduce((acc, item) => acc + item.qty, 0) > 30 && (<Message variant='danger'>Maximum of 30 grams</Message>)}
                                <Button type='button' className='btn-block' disabled={cartItems.length === 0 || cartItems.reduce((acc, item) => acc + item.qty, 0) > 30} onClick={checkoutHandler}>
                                    Proceed To Checkout
                                </Button>
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

export default CartScreen
