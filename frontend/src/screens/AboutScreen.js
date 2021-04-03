import React from 'react'
import { Row, Col, Jumbotron, Image, Breadcrumb, Button, Carousel, Container } from 'react-bootstrap'
import about from '../images/breadcrumbs/about.jpg'
import icon1 from '../images/icons-01.png'
import icon2 from '../images/icons-02.png'
import icon3 from '../images/icons-03.png'
import icon4 from '../images/icons-04.png'
import i_fem from '../images/i_fem.png'
import i_male from '../images/i_male.png'

function AboutScreen() {
    return (
        <div>
            <Breadcrumb style={{backgroundImage: `url(${about})`, height: '320px', backgroundRepeat: 'no-repeat', backgroundAttachment: 'scroll', backgroundPosition: 'center', backgroundSize: 'cover'}}></Breadcrumb>

            <Jumbotron className="text-center" style={{backgroundColor: 'white', }}>
                <Row className="justify-content-md-center">
                    <Col md={6} sm={12}>
                        <h2>About Us</h2>
                        <p className="about__text">Medcan is a cannabis dispensary in Missisauga that is known for our exceptional quality of both product and service. We are dedicated in providing superior customer service and we offer a variety of premium quality products including flower, edibles, and extracts. We always deliver quality over quantity, with exclusive, exciting strains and products at competitive prices. Our staff are always happy to assist you in finding exactly what you're looking for, whether you are a seasoned consumer or just beginning your cannabis journey, we will make sure you are satisfied!</p>
                        <Button variant='success' href='/#/contact'>Contact Us</Button>
                    </Col>
                </Row>
            </Jumbotron>

            <Jumbotron style={{marginBottom: '0'}}>
                <h2 className="ways__main__title">Ways To Order:</h2>
                <Row>
                    <Col md={6} sm={12}>
                        <Image src={icon1} alt='icon-1' className="about__icons"/>
                        <h4>Online Pre-Order</h4>
                        <p className="ways__text">Browse our online menu and add items to your cart to begin your order. Once you are finished, checkout and follow the instructions on the screen.</p>
                        
                        <Image src={icon2} alt='icon-2' className="about__icons"/>
                        <h4>Phone Pre-Order</h4>
                        <p className="ways__text">Call us at 437-218-5573 to speak to one of our representatives and place your order with them on the phone.</p>
                    </Col>

                    <Col md={6} sm={12}>
                        <Image src={icon3} alt='icon-3' className="about__icons"/>
                        <h4>In-Person Order</h4>
                        <p className="ways__text">You can also make your order in person when you come to our storefront. Currently we are only open for curbside pickup so you will need to make your order at the front door.</p>

                        <Image src={icon4} alt='icon-4' className="about__icons"/>
                        <h4>Payment</h4>
                        <p className="ways__text">We currently only accept cash. There are ATMs located near the storefront for your convenience. If placing a pre-order please have cash available when you come to pick up your order.</p>
                    </Col>
                </Row>
            </Jumbotron>

            <Carousel pause='hover' className='bg-light test__main__carousel carousel__item'>
                <Carousel.Item className="carousel__item">
                    <h3><Image className="test__image" src={i_male} alt='review-1' fluid /></h3>
                    <Carousel.Caption className='test__carousel_audiodad'>
                        <p className="test__text">When you need that mid week fix this is the spot. I wish there was specials, but come on. We live in a age that you can go to a store, buy weed and then go home and smoke. It's a lot better than getting into a stranger's car and buying weed. I'll pay a little extra for not getting robbed or run the risk of getting shanked. Decent selection too.</p>
                        <strong className="test__text"><b>Audio Dad</b> - Customer</strong>
                    </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item className="carousel__item">
                    <Image className="test__image" src={i_fem} alt='review-2' fluid />
                    <Carousel.Caption className='test__carousel__brian'>
                        <p className="test__text">I have bought flower and gummy edibles from Medcan and I have nothing but good interactions with the staff. The Indica gummy bears are the best I have had....I eat alot of gummies. Dont judge ...lol</p>
                        <strong className="test__text"><b>Karen S</b> - Customer</strong>
                    </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item className="carousel__item">
                    <Image className="test__image" src={i_male} alt='review-3' fluid />
                    <Carousel.Caption className='test__carousel__brian'>
                        <p className="test__text">Tried ordering from here for the first time, the weed was great & the service was professional and fast. will be ordering from here again.</p>
                        <strong className="test__text"><b>Brian</b> - Customer</strong>
                    </Carousel.Caption>
                </Carousel.Item>
            </Carousel>
        </div>
    )
}

export default AboutScreen
