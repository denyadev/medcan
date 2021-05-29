import React, { useState, useEffect, useContext } from 'react'
import { Form, Button, Row, Col } from 'react-bootstrap'
import FormContainer from '../components/FormContainer'
import bg from '../images/hemp-4354381_1920.jpg'
import { VerificationContext } from './verificationContext'


function AgeVerification() {


    const { verification, setVerification } = useContext(VerificationContext)
    const [error, setError] = useState('')

    const yesHandler = () => {
        setVerification(localStorage.setItem('verification', 'true'))
        window.location.reload()
    }

    const noHandler = () => {
        window.close()
        //setError('You cannot view this site.')
    }


    return (
        <div style={{textAlign: 'center', backgroundImage: `linear-gradient( rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0.8) ), url(${bg})`, height: '100vh', paddingTop: '18%'}} class='text-center'>
            <FormContainer>
                    { error && <h2 style={{color:'red'}}>{error}</h2>}
                    <Form.Group>
                        <Form.Label style={{color: 'white', fontFamily: 'sans-serif' ,fontSize: '30px', fontWeight: '800'}}>You must be over 19 years old to visit this site</Form.Label>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label style={{color: 'white', fontFamily: 'sans-serif', fontSize: '20px', fontWeight: '400'}}>Please, verify your age.</Form.Label>
                    </Form.Group>


                    <Row className='py-3'>
                        <Col md={6}>
                            <Button onClick={yesHandler} variant='success'>Yes, I am over 19 - ENTER</Button>
                        </Col>

                        <Col md={6}>
                            <Button onClick={noHandler} type='submit' variant='primary'>No, I am under 19 - LEAVE</Button>
                        </Col>
                    </Row>
            </FormContainer>
        </div>
    )
}

export default AgeVerification
