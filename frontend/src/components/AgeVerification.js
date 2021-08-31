import React, { useState, useEffect, useContext } from 'react'
import { Form, Button, Row, Col, Image } from 'react-bootstrap'
import FormContainer from '../components/FormContainer'
import bg from '../images/hemp-4354381_1920.jpg'
import { VerificationContext } from './verificationContext'
import logo from '../images/medcan.png'

function AgeVerification() {


    const { verification, setVerification } = useContext(VerificationContext)
    const [error, setError] = useState('')

    const today = new Date()

    const [province, setProvince] = useState('')
    const [day, setDay] = useState(0)
    const [month, setMonth] = useState(0)
    const [year, setYear] = useState(0)

    const [birthday, setBirthday] = useState('')

    useEffect(() => {
        setBirthday(new Date(year.toString() + '-' + month.toString() + '-' + day.toString()))
    }, [year, month, day])

    const submitHandler = () => {
        if (province) {
            if (birthday <= new Date()) {
                setVerification(localStorage.setItem('verification', 'true'))
                setTimeout(function(){
                    window.location.reload()
                },100)
            } else {
                setError('We only sell to adults age 19 years or older.')
            }
        } else {
            setError('Please select your location.')
        }
    }

    return (
        <div style={{background: '#f1f1f2', height: '100vh', backgroundImage: `linear-gradient( rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.3) )`}}>
            {/* {today.toString()}
            <br></br>
            {birthday.toString()} */}
            <Form onSubmit={ submitHandler }>
                <FormContainer>
                    <Form.Group>
                    <Image className="center__logo" src={logo}/>
                    </Form.Group>
                    { error && <p className='text-center' style={{color:'red', fontSize:'20px', marginBottom:'5%'}}>{error}</p>}
                    <Form.Group>
                        <Form.Label>Where are you from?</Form.Label>
                        <Form.Control as='select' onChange={(e) => setProvince(e.target.value)}>
                            <option value=''>Choose...</option>
                            <option value='1'>Alberta</option>
                            <option value='2'>British Columbia</option>
                            <option value='3'>Manitoba</option>
                            <option value='4'>New Brunswick</option>
                            <option value='5'>Newfoundland and Labrador</option>
                            <option value='6'>Nova Scotia</option>
                            <option value='7'>Ontario</option>
                            <option value='8'>Prince Edward Island</option>
                            <option value='9'>Quebec</option>
                            <option value='10'>Saskatchewan</option>
                            <option value='11'>Northwest Territories</option>
                            <option value='12'>Nunavut</option>
                            <option value='13'>Yukon</option>
                        </Form.Control>
                    </Form.Group>

                    <Form.Group>
                        <Form.Label>Enter your birthday</Form.Label>
                    </Form.Group>
                    <Row>
                        <Col md={3}>
                            
                            <Form.Group controlId='day'>
                                <Form.Control type='number' placeholder='DD' onChange={(e) => setDay(e.target.value)}></Form.Control>
                            </Form.Group>
                        </Col>
                        <Col md={3}>
                            <Form.Group controlId='month'>
                                <Form.Control type='number' placeholder='MM' onChange={(e) => setMonth(e.target.value)}></Form.Control>
                            </Form.Group>
                        </Col>
                        <Col md={6}>
                            <Form.Group controlId='year'>
                                <Form.Control type='number' placeholder='YYYY' onChange={(e) => setYear(parseInt(e.target.value) + parseInt(19))}></Form.Control>
                            </Form.Group>
                        </Col>                    
                    </Row>

                    {/* <Form.Group controlId='hidden'>
                        <Form.Check type='checkbox' label='Remember me'></Form.Check>
                    </Form.Group> */}

                    <Form.Group>
                        <Button className='btn__center' type='submit' variant='success'>ENTER</Button>
                    </Form.Group>

                    <Form.Group>
                        <Form.Label className='text-center'>You must be legally old enough to purchase cannabis. By entering this site, you agree to our Terms and Conditions & Privacy Policy</Form.Label>
                    </Form.Group>
                </FormContainer>
            </Form>
        </div>
    )
}

export default AgeVerification
