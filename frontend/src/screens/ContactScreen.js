import React from 'react'
import { Row, Col, Button, Image, Container, Form, Breadcrumb, Jumbotron } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import FormContainer from '../components/FormContainer'
import contact from '../images/breadcrumbs/med_contact.jpg'
import Map from '../components/Map'


function ContactScreen() {

    return (
        <div>
        <Breadcrumb style={{backgroundImage: `url(${contact})`, height: '320px', backgroundRepeat: 'no-repeat', backgroundAttachment: 'scroll', backgroundSize: 'cover'}}></Breadcrumb>
            <Container>
                <Jumbotron style={{backgroundColor: 'white'}}>
                <Row>
                    <Col md={6}>
                            <h1 className="contact__title">Contact Info</h1>
                            <div className="contact__text">
                                <i class="fas fa-map-marker-alt fa-2x" style={{float: 'left', paddingRight: '20px', paddingBottom: '30px'}}></i>
                                <p>Location:</p>
                                <p className="contact__loc__text">64 Dundas St W, Mississauga, ON L5B 1H3</p>
                            </div>
                            <br/>
                            <div className="contact__text">
                                <i class="fas fa-mobile-alt fa-2x" style={{float: 'left', paddingRight: '20px', paddingBottom: '30px'}}></i>
                                <p>Phone:</p>
                                <p>437-218-5573</p>
                            </div>
                            <br/><br/>
                            <h1 className="contact__title">Get In Touch</h1>
                            <Form onSubmit={''}>
                                <Form.Group controlId='formBasicName'>
                                    <Form.Label>Name</Form.Label>
                                    <Form.Control type='text' placeholder='Enter Name' value={''} onChange={''}></Form.Control>
                                </Form.Group>

                                <Form.Group controlId='formBasicEmail'>
                                    <Form.Label>Email Address</Form.Label>
                                    <Form.Control type='email' placeholder='Enter Email' value={''} onChange={''}></Form.Control>
                                </Form.Group>

                                <Form.Group controlId='formBasicSubject'>
                                    <Form.Label>Subject</Form.Label>
                                    <Form.Control type='text' placeholder='Enter Subject' value={''} onChange={''}></Form.Control>
                                </Form.Group>

                                <Form.Group controlId='formBasicMessage'>
                                    <Form.Label>Message</Form.Label>
                                    <Form.Control as='textarea' rows='5' placeholder='Enter Message' value={''} onChange={''}></Form.Control>
                                </Form.Group>


                                <Button type='submit' variant='success'>Send</Button>
                            </Form>
                    </Col>
                    
                    <Col md={6}>
                        <h1 className="contact__title google__maps__text">Google Maps</h1>
                        <Map/>
                    </Col>
                </Row>      
                </Jumbotron>
            </Container> 
        </div>     
    )
}

export default ContactScreen
