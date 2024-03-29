import React, {useEffect, useContext} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Col, Button, Image, Jumbotron, Carousel } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import carousel1 from '../images/carousel_001.jpg'
import carousel2 from '../images/carousel_002.jpg'
import ProductCarousel from '../components/ProductCarousel'
import indica__img from '../images/categories/Indica.jpg'
import sativa__img from '../images/categories/Sativa.jpg'
import hybrid__img from '../images/categories/Hybrid.jpg'
import hash__img from '../images/categories/Hash.jpg'
import edibles__img from '../images/categories/Edibles.jpg'
import concentrates__img from '../images/categories/Concentrates.jpg'

function MainScreen({ history }) {

    const dispatch = useDispatch()
    const categoryList = useSelector(state => state.categoryList)

    const category_map = [
        { name: 'Indica', image: indica__img, id: 1 },
        { name: 'Sativa', image: sativa__img, id: 2 },
        { name: 'Hybrid', image: hybrid__img, id: 3 },
        { name: 'Hash', image: hash__img, id: 4 },
        { name: 'Edibles', image: edibles__img, id: 5 },
        { name: 'Concentrates', image: concentrates__img, id: 6 },
    ]

    useEffect(() => {

    }, [dispatch])

    return (
        <div>
            <div className='main__carousel'>
                <Carousel pause='hover' className='bg-white test__main__carousel'>
                    <Carousel.Item style={{backgroundImage: `url(${carousel1})`, height: '100vh', backgroundRepeat: 'no-repeat', backgroundAttachment: 'scroll', backgroundPosition: 'center', backgroundSize: 'cover'}}>
                        <Carousel.Caption className='main__carousel__text'>
                            <h1 className="main__text__title">Welcome To <span className="main__text__title__green">MedCan</span></h1>
                            <p className="main__text">High quality cannabis from professional growers in British Columbia and California.</p>
                            <Link to='/store'>
                                <Button variant='success'>Shop Now</Button>
                            </Link>
                        </Carousel.Caption>
                    </Carousel.Item>
                    <Carousel.Item style={{backgroundImage: `url(${carousel2})`, height: '100vh', backgroundRepeat: 'no-repeat', backgroundAttachment: 'scroll',  backgroundSize: 'cover'}}>
                        <Carousel.Caption className='main__carousel__text'>
                            <h1 className="main__text__title">Here At <span className="main__text__title__green">MedCan</span></h1>
                            <p className="main__text">We are dedicated in providing safe access to affordable quality cannabis.</p>
                            <Link to='/store'>
                                <Button variant='success'>Shop Now</Button>
                            </Link>
                        </Carousel.Caption>
                    </Carousel.Item>
                </Carousel>
            </div>

            <Jumbotron style={{marginBottom: '0'}}>
                    <div class="text-center">
                    <h2 class="contact__title">Categories</h2>
                    {category_map.map(cat => (
                        <Col md={2} sm={4} xs={12} style={{display: 'inline-block'}} key={cat.id}>
                        <div style={{display: 'inline'}}>
                            <div className="container-categories">
                            <div className="content">
                                <Link to='/store'>
                                    <div className="content-overlay"></div>
                                    <Image className="content-image" src={cat.image}/>
                                    <div className="content-details fadeIn-bottom">
                                        <h3 className="content-title">{cat.name}</h3>
                                    </div>
                                </Link>
                            </div>
                            <div className="content-name-under">
                                <h3 className="content-name-under">{cat.name}</h3>
                            </div>
                        </div>
                        </div>
                        </Col>
                    ))}
                    </div>
            </Jumbotron>
            <ProductCarousel/>
        </div>
    )
}

export default MainScreen
