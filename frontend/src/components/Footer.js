import React from 'react'
import { Row, Col, Container, Image } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import pattern from '../images/pattern.jpg'
import logo from '../images/medcan.png'

function Footer() {
    return (
        <footer style={{backgroundImage: `url(${pattern})`}}>
            <Container>
                <Row className="py-5">
                    <Col lg={3} md={6}>
                        <Image className="ft__logo" src={logo} />
                        <p class="footer__text">High quality cannabis from professional growers in British Columbia and California</p>
                    </Col>

                    <Col lg={3} md={6}>
                        <h2 className="ft__title">We're Open From</h2>
                        <p class="footer__text">Monday-Sunday: 10am-10pm</p>
                    </Col>

                    <Col lg={3} md={6}>
                        <h2 className="ft__title">Contact Us</h2>
                        <p class="footer__text">Call/Text:<a href="phone:+14372185573" class="footer__text"> 437-218-5573</a></p>
                    </Col>

                    <Col lg={3} md={6}>
                        <h2 className="ft__title">Follow Us</h2>
                        <a href="https://twitter.com/medcanondundas" target="_blank"><i class="fab fa-twitter-square social__icon"></i></a>
                        <a href="https://www.instagram.com/medcanondundas/" target="_blank"><i class="fab fa-instagram-square social__icon"></i></a>
                    </Col>
                </Row>
                <hr className="footer__hr"/>
                <Row className="">
                    <Col lg={6} md={6} xs={12}>
                        <p class="footer__text">© 2020 <a href="/">MedCan</a> All Rights Reserved.</p>
                    </Col>
                    <Col lg={6} md={6} xs={12} className="text-right">
                        <Link to='/' className="pr-4 footer__text">Home</Link>
                        <Link to='/store' className="pr-4 footer__text">Store</Link>
                        <Link to='/contact' className="footer__text">Contact Us</Link>
                    </Col>
                </Row>
            </Container>
        </footer>
    )
}

export default Footer
