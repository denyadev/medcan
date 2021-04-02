import React, { useState, useEffect } from 'react'
import { Form, Button, Col, Breadcrumb, Jumbotron } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import FormContainer from '../components/FormContainer'
import CheckoutSteps from '../components/CheckoutSteps'
import { savePaymentMethod } from '../actions/cartActions'
import payment_bread from '../images/breadcrumbs/medcan_04.jpg'

function PaymentScreen({ history }) {

    const cart = useSelector(state => state.cart)
    const { shippingAddress } = cart

    const dispatch = useDispatch()

    const [paymentMethod, setPaymentMethod] = useState('PayPal')

    // checks if shipping address exists
    // if(!shippingAddress.address) {
    //     history.push('/shipping')
    // }

    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(savePaymentMethod(paymentMethod))
        history.push('/placeorder')
    }

    return (
        <div>
            <Breadcrumb style={{backgroundImage: `url(${payment_bread})`, height: '320px'}}></Breadcrumb>
            <Jumbotron style={{backgroundColor: 'white'}}>
            <FormContainer>
                <CheckoutSteps step1 step3 />
                <Form onSubmit={submitHandler}>
                    <Form.Group>
                        <Form.Label as='legend'>Select Method</Form.Label>
                        <Col>
                            <Form.Check type='radio' label='Pay in Store' id='paypal' name='paymentMethod' checked onChange={(e) => setPaymentMethod(e.target.value)}></Form.Check>
                        </Col>
                    </Form.Group>

                    <Button type='submit' variant='success'>Continue</Button>
                </Form>
            </FormContainer>
            </Jumbotron>
        </div>
    )
}

export default PaymentScreen
