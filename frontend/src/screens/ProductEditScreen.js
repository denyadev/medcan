import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import { Form, Button, Container } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Loader from '../components/Loader'
import Message from '../components/Message'
import FormContainer from '../components/FormContainer'
import { listProductDetails, updateProduct } from '../actions/productActions'
import { PRODUCT_UPDATE_RESET } from '../constants/productConstants'


function ProductEditScreen({ match, history }) {
    const productId = match.params.id

    const [name, setName] = useState('')
    const [price, setPrice] = useState(0)
    const [discount, setDiscount] = useState(0)
    const [image, setImage] = useState('')
    const [brand, setBrand] = useState({})
    const [category, setCategory] = useState({})
    const [countInStock, setCountInStock] = useState(0)
    const [description, setDescription] = useState('')
    const [features, setFeatures] = useState('')
    const [uploading, setUploading] = useState(false)
    const [hidden, setHidden] = useState(false)

    const dispatch = useDispatch()

    const productDetails = useSelector(state => state.productDetails)
    const { loading, product, error } = productDetails

    const productUpdate = useSelector(state => state.productUpdate)
    const { loading: loadingUpdate, success: successUpdate, error: errorUpdate } = productUpdate
    
    useEffect(() => {
        if(successUpdate){
            dispatch({ type: PRODUCT_UPDATE_RESET })
            history.push('/admin/productlist')
        } else {
            if(!product.name || product._id !== Number(productId)) {
                dispatch(listProductDetails(productId))
            } else {
                setName(product.name)
                setPrice(product.price)
                setDiscount(product.discount)
                setImage(product.image)
                setBrand(product.brand)
                setCategory(product.category)
                setCountInStock(product.countInStock)
                setDescription(product.description)
                setFeatures(product.features)
                setHidden(product.hidden)
            }
        }
    }, [ history, productId, product, dispatch, successUpdate ])

    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(updateProduct({
            _id: productId,
            name,
            price,
            discount,
            image,
            brand,
            category,
            countInStock,
            description,
            features,
            hidden
        }))
    }

    const uploadFileHandler = async (e) => {
        const file = e.target.files[0]
        const formData = new FormData()

        formData.append('image', file)
        formData.append('product_id', productId)

        setUploading(true)

        try{
            const config = {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            }
            
            const {data} = await axios.post('/api/products/upload/', formData, config)

            setImage(data)
            setUploading(false)
        } catch(error) {
            setUploading(false)
        }
    }

    return (
        <div>
            <Container>
            <Link to='/admin/productlist' className='btn btn-light my-3'><i class="fas fa-long-arrow-alt-left"></i> Go Back</Link>
            <FormContainer>
                <h1>Edit Product</h1>
                {loadingUpdate && <Loader/>}
                {errorUpdate && <Message variant='danger'>{errorUpdate}</Message>}
                {loading ? <Loader/> : error ? <Message variant='danger'>{error}</Message> 
                    : (
                        <Form onSubmit={ submitHandler }>
                        <Form.Group controlId='name'>
                            <Form.Label>Name</Form.Label>
                            <Form.Control type='name' placeholder='Enter Name' value={name} onChange={(e) => setName(e.target.value)}></Form.Control>
                        </Form.Group>

                        <Form.Group controlId='price'>
                            <Form.Label>Price</Form.Label>
                            <Form.Control type='number' placeholder='Enter Price' value={price} onChange={(e) => setPrice(e.target.value)}></Form.Control>
                        </Form.Group>

                        <Form.Group controlId='discount'>
                            <Form.Label>Discount</Form.Label>
                            <Form.Control type='number' placeholder='Enter Discount' value={discount} onChange={(e) => setDiscount(e.target.value)}></Form.Control>
                        </Form.Group>

                        <Form.Group controlId='hidden'>
                            <Form.Label>Hide Product</Form.Label>
                            <Form.Check type='checkbox' label='Hide' checked={hidden} onChange={(e) => setHidden(e.target.checked)}></Form.Check>
                        </Form.Group>

                        <Form.Group controlId='image'>
                            <Form.Label>Image</Form.Label>
                            <Form.Control type='text' placeholder='Upload Image' value={image} onChange={(e) => setImage(e.target.value)}></Form.Control>
                            <Form.File id='image-file' label='Choose File' custom onChange={uploadFileHandler}>

                            </Form.File>
                            {uploading && <Loader/>}
                        </Form.Group>

                        <Form.Group controlId='brand'>
                            <Form.Label>Grade</Form.Label>
                            <Form.Control type='text' placeholder='Enter Grade' value={brand} onChange={(e) => setBrand(e.target.value)}></Form.Control>
                        </Form.Group>

                        <Form.Group controlId='countinstock'>
                            <Form.Label>Stock</Form.Label>
                            <Form.Control type='number' placeholder='Enter Stock' value={countInStock} onChange={(e) => setCountInStock(e.target.value)}></Form.Control>
                        </Form.Group>

                        <Form.Group controlId='category'>
                            <Form.Label>Category</Form.Label>
                            <Form.Control type='text' placeholder='Enter Category' value={category} onChange={(e) => setCategory(e.target.value)}></Form.Control>
                        </Form.Group>

                        <Form.Group controlId='description'>
                            <Form.Label>Description</Form.Label>
                            <Form.Control as="textarea" rows={7} placeholder='Enter Description' value={description} onChange={(e) => setDescription(e.target.value)}></Form.Control>
                        </Form.Group>

                        <Form.Group controlId='features'>
                            <Form.Label>Features</Form.Label>
                            <Form.Control as="textarea" rows={3} placeholder='List Features' value={features} onChange={(e) => setFeatures(e.target.value)}></Form.Control>
                        </Form.Group>

                        <Button type='submit' variant='primary'>Update</Button>
                    </Form>
                )}
            </FormContainer>
            </Container>
        </div>
    )
}

export default ProductEditScreen
