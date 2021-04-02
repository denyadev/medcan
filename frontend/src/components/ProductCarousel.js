import React, {useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { Carousel, Image, Row, Col } from 'react-bootstrap'
import Loader from './Loader'
import Message from './Message'
import { listTopProducts } from '../actions/productActions'

function ProductCarousel() {

    const dispatch = useDispatch()

    const productTopRated = useSelector(state => state.productTopRated)
    const { error, loading, products } = productTopRated

    useEffect(() => {
        dispatch(listTopProducts())
    }, [ dispatch ])

    return ( loading ? <Loader/>
    : error 
    ? <Message variant='danger'>{error}</Message>
    : (
        <Carousel pause='hover' className='product__carousel'>
            {products.map(product => (
                <Carousel.Item>
                    <Link to={`/product/${product._id}`}>
                        <Row>
                            <Col md={6} sm={12} xs={12}>
                                <Image src={product.image} alt={product.name} fluid />
                            </Col>
                            <Col md={6} sm={12} xs={12}>
                                <Carousel.Caption className="carousel__caption"><h4>{product.name} - ${product.price}</h4><hr/>{product.brand}<hr/>{product.description}</Carousel.Caption>
                            </Col>
                        </Row>
                    </Link>
                </Carousel.Item>

            ))}
        </Carousel>
    )
    )
}

export default ProductCarousel
