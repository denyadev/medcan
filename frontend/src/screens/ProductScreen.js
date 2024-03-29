import React, {useState, useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { Row, Col, Image, ListGroup, Button, Card, Form, Container, Breadcrumb, Jumbotron } from 'react-bootstrap'
import Rating from '../components/Rating'
import Loader from '../components/Loader'
import Message from '../components/Message'
import { listProductDetails, createProductReview } from '../actions/productActions'
import { PRODUCT_CREATE_REVIEW_RESET } from '../constants/productConstants'
import product_details from '../images/breadcrumbs/medcan_05.jpg'
import styled from 'styled-components'
import Modal from '../components/Modal'
import GlobalStyle from '../components/globalStyles'
import emailjs from 'emailjs-com'

function ProductScreen({ match, history }) {
    const [qty, setQty] = useState(1)
    const [rating, setRating] = useState(0)
    const [comment, setComment] = useState('')

    const [showModal, setShowModal] = useState(false)
    const openModal = () => {
        setShowModal(prev => !prev)
    }

    const stockCounter = 30

    const dispatch = useDispatch()

    const productDetails = useSelector(state => state.productDetails)
    const { loading, error, product } = productDetails

    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin

    const productReviewCreate = useSelector(state => state.productReviewCreate)
    const { loading: loadingProductReview, error: errorProductReview, success: successProductReview } = productReviewCreate

    const features = String(product.features)
    const feature = features.split('\n')

    useEffect(() => {
        if(successProductReview) {
            setRating(0)
            setComment('')
            dispatch({ type: PRODUCT_CREATE_REVIEW_RESET })
        }

        dispatch(listProductDetails(match.params.id))
    }, [dispatch, match, successProductReview])

    const addToCartHandler = () => {
        history.push(`/cart/${match.params.id}?qty=${qty}`)
    }

    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(createProductReview(
            match.params.id, {
                rating,
                comment
            }
        ))
        emailjs.sendForm('service_xydoifd', 'template_0128r4o', e.target, 'user_xkEwPrsmXNLAmAo45qu1p')
        .then((result) => {
            console.log(result.text)
        }, (error) => {
            console.log(error.text)
        })
    }

    return (
        <div>
            <Breadcrumb style={{backgroundImage: `url(${product_details})`, height: '320px', backgroundRepeat: 'no-repeat', backgroundAttachment: 'scroll', backgroundPosition: 'center', backgroundSize: 'cover'}}></Breadcrumb>
            <Container>
                <Link to='/store' className='btn btn-light my-3'><i class="fas fa-long-arrow-alt-left"></i> Go Back</Link>
                {loading ?
                    <Loader/>
                    : error
                        ? <Message variant='danger'>{ error }</Message>
                        :(
                            <div>
                                <Row>
                                <Col md={6}>
                                    <Image onClick={openModal} src={product.image} alt={product.name} fluid/>
                                    <Modal showModal={showModal} setShowModal={setShowModal} product={product}/>
                                    <GlobalStyle />
                                </Col>
                                <Col md={6}>
                                    <ListGroup variant="flush">
                                        <ListGroup.Item>
                                            <h3>{product.name}</h3><Rating value={product.rating} text={`${product.numReviews} reviews`} color={'#f8e825'}/>
                                        </ListGroup.Item>
                
                                        <ListGroup.Item>
                                            {product.discount !== '0.00' ? 
                                            (<p>Price: <span className="old__price">${product.price}/gram</span>&nbsp;&nbsp;<span className="new__price">${(product.price - product.discount).toFixed(2)}/gram</span></p>)
                                            :
                                            (<p>Price: <span>${product.price}/gram</span></p>)}
                                        </ListGroup.Item>
                
                                        <ListGroup.Item>
                                            {product.description}
                                        </ListGroup.Item>
                                    </ListGroup>

                                    <Card border="light">
                                        <ListGroup variant="flush">
                                            <ListGroup.Item >
                                                <Row>
                                                    <Col>Price:</Col>
                                                    <Col><strong>${((product.price - product.discount) * qty).toFixed(2)}</strong></Col>
                                                </Row>
                                            </ListGroup.Item>
                
                                            <ListGroup.Item >
                                                <Row>
                                                    <Col>Status:</Col>
                                                    <Col>{product.countInStock > 0 ? 'In Stock' : 'Out of Stock'}</Col>
                                                </Row>
                                            </ListGroup.Item>

                                            {product.countInStock > 0 && product.countInStock <= 30 && (
                                                <ListGroup.Item>
                                                    <Row>
                                                        <Col>Qty:</Col>
                                                        <Col md={6} xs={6} className='my-1'>
                                                            <Form.Control as="select" value={qty} onChange={(e) => setQty(e.target.value)}>
                                                                {[...Array(product.countInStock).keys()].map((x) => (
                                                                    <option key={x + 1} value={x + 1}>
                                                                        {x + 1}
                                                                    </option>
                                                                ))}
                                                            </Form.Control>
                                                        </Col>
                                                    </Row>
                                                </ListGroup.Item>
                                            )}

                                            {product.countInStock > 30 && (
                                                <ListGroup.Item>
                                                    <Row>
                                                        <Col>Qty:</Col>
                                                        <Col md={6} xs={6} className='my-1'>
                                                            <Form.Control as="select" value={qty} onChange={(e) => setQty(e.target.value)}>
                                                                {[...Array(stockCounter).keys()].map((x) => (
                                                                    <option key={x + 1} value={x + 1}>
                                                                        {x + 1}
                                                                    </option>
                                                                ))}
                                                            </Form.Control>
                                                        </Col>
                                                    </Row>
                                                </ListGroup.Item>
                                            )}
                
                                            <ListGroup.Item>
                                                <Button onClick={addToCartHandler} className='btn-block btn-success' disabled={product.countInStock <= 0} type='button'>Add to Cart</Button>
                                            </ListGroup.Item>
                                        </ListGroup>
                                    </Card>
                                </Col>
                            </Row>
                            <hr/>
                            <Jumbotron style={{backgroundColor: 'white'}}>
                                <Row>
                                    <Col md={6}>
                                        <h4>Features</h4>
                                        {feature.map((f) => (
                                            <div><li className='features__list'>{f}</li></div>
                                        ))}
                                    </Col>
                                    <Col md={6}>
                                        <h4>Reviews</h4>
                                        {product.reviews.length === 0 && <Message variant='info'>No Reviews</Message>}

                                        <ListGroup variant='flush'>
                                            {product.reviews.map((review) => (
                                                <ListGroup.Item key={review._id}>
                                                    <strong>{review.name}</strong>
                                                    <Rating value={review.rating} color='#f8e825'/>
                                                    <p>{review.createdAt.substring(0, 10)}</p>
                                                    <p>{review.comment}</p>
                                                </ListGroup.Item>
                                            ))}

                                            <ListGroup.Item>
                                                <h4>Write a review</h4>

                                                {loadingProductReview && <Loader/>}
                                                {successProductReview && <Message variant='success'>Review Submitted</Message>}
                                                {errorProductReview && <Message variant='danger'>{errorProductReview}</Message>}

                                                {userInfo ? (
                                                    <Form onSubmit={submitHandler}>
                                                        <Form.Group controlId='rating'>
                                                            <Form.Label>Rating</Form.Label>
                                                            <Form.Control as='select' value={rating} name='rating' onChange={(e) => setRating(e.target.value)}>
                                                                <option value=''>Select...</option>
                                                                <option value='1'>1 - Poor</option>
                                                                <option value='2'>2 - Fair</option>
                                                                <option value='3'>3 - Good</option>
                                                                <option value='4'>4 - Very Good</option>
                                                                <option value='5'>5 - Excellent</option>
                                                            </Form.Control>
                                                        </Form.Group>
                                                        <Form.Group controlId='comment'>
                                                            <Form.Label>Review</Form.Label>
                                                            <Form.Control as='textarea' rows='5' value={comment} name='comment' onChange={(e) => setComment(e.target.value)}></Form.Control>
                                                        </Form.Group>

                                                        <Button disabled={loadingProductReview} type='submit' variant='success'>Submit</Button>
                                                    </Form>
                                                ) : (
                                                    <Message variant='info'>Please <Link to='/login'>login</Link> to write a review</Message>
                                                )}
                                            </ListGroup.Item>
                                        </ListGroup>
                                    </Col>
                                </Row>
                            </Jumbotron>
                        </div>
                        )
                }
            </Container>
        </div>
    )
}

export default ProductScreen
