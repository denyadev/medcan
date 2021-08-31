import React, {useState, useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'
import { Row, Col, Pagination, Container, Jumbotron, InputGroup, Button } from 'react-bootstrap'
import Product from '../components/Product'
import Loader from '../components/Loader'
import Message from '../components/Message'
import Paginate from '../components/Paginate'
import ProductCarousel from '../components/ProductCarousel'
import { listProducts, listCategories, listBrands } from '../actions/productActions'


function HomeScreen({ history }) {

    const [selectedCategory, setSelectedCategory] = useState('all')
    const [selectedBrand, setSelectedBrand] = useState('all')
    const [inStock, setInStock] = useState('all')

    const dispatch = useDispatch()

    const productList = useSelector(state => state.productList)
    const {error, loading, products, page, pages} = productList

    const categoryList = useSelector(state => state.categoryList)
    const { category } = categoryList

    const brandsList = useSelector(state => state.brandsList)
    const { brands } = brandsList

    brands.sort(function (a, b) { return a.localeCompare(b) })

    category.sort(function (a, b) { return a.localeCompare(b) })

    let keyword = history.location.search

    useEffect(() => {
        dispatch(listProducts(keyword))
        dispatch(listCategories())
        dispatch(listBrands())
    }, [dispatch, keyword])

    const handleCategoryChange = (e) => {
        setSelectedCategory(e.target.value)
    }

    const handleBrandChange = (e) => {
        setSelectedBrand(e.target.value)
    }

    const handleInStockChange = (e) => {
        if (e.target.checked === true) {
            setInStock('in_stock')
        } else {
            setInStock('all')
        }
    }

    return (
        <div>
            <ProductCarousel/>
            <Container>
            <Jumbotron style={{backgroundColor: 'white'}}>
                    <Row>
                        <Col md={3}>
                        <h4 className="store__sort__title">SHOW ONLY</h4>
                        <div className="store__sort">
                            <InputGroup className="mb-3">
                                <InputGroup.Prepend>
                                <InputGroup.Checkbox aria-label="Checkbox for following text input" onChange={handleInStockChange} />
                                <InputGroup.Text>In Stock</InputGroup.Text>
                                </InputGroup.Prepend>
                            </InputGroup>
                        </div>

                        <hr/><h4 className="store__sort__title">PRODUCT CATEGORIES</h4>
                        <div className="store__sort">
                            <option className="sorting__button" value={'all'} onClick={handleCategoryChange} >All</option>
                            {category.map(cat => (
                                <option className="sorting__button" value={cat} onClick={handleCategoryChange}>{cat}</option>
                            ))}
                        </div>

                        <hr/><h4 className="store__sort__title">GRADE</h4>
                        <div className="store__sort">
                            <option className="sorting__button" value={'all'} onClick={handleBrandChange}>All</option>
                            {brands.map(brand => (
                                <option className="sorting__button" value={brand} onClick={handleBrandChange}>{brand}</option>
                            ))}
                        </div>

                        </Col>
                        <Col md={9}>
                        { loading ? <Loader/>
                                : error ? <Message variant='danger'>{ error }</Message>    
                                    : 
                                    <div>
                                        <h4 className="store__sort__title">CATEGORY: <p style={{display: 'inline', fontWeight: '400', textTransform: 'capitalize'}}> {selectedCategory}</p><span style={{margin: '0 18px'}}/>GRADE:<p style={{display: 'inline', fontWeight: '400', textTransform: 'capitalize'}}> {selectedBrand}</p></h4> 
                                        {(() => {
                                            if (inStock === 'all') {
                                                if (selectedCategory === 'all' && selectedBrand === 'all') {
                                                    return (<div>
                                                            {(products.map((product) => {return product.hidden === false ?
                                                                (<Col md={4} sm={6} xs={12} style={{display: 'inline-block'}} key={product._id}>
                                                                    <Product product={product}/>
                                                                </Col>): null}))}
                                                            </div>)
                                                } else if (selectedCategory !== 'all' && selectedBrand === 'all') {
                                                    return (<div>
                                                            {(products.map((product) => {return product.category === selectedCategory && product.hidden === false ?
                                                                (<Col md={4} sm={6} xs={12} style={{display: 'inline-block'}} key={product._id}>
                                                                    <Product product={product}/>
                                                                </Col>): null}))}
                                                            </div>)
                                                } else if (selectedCategory === 'all' && selectedBrand !== 'all') {
                                                    return (<div>
                                                            {(products.map((product) => {return product.brand === selectedBrand && product.hidden === false ?
                                                                (<Col md={4} sm={6} xs={12} style={{display: 'inline-block'}} key={product._id}>
                                                                    <Product product={product}/>
                                                                </Col>): null}))}
                                                            </div>)
                                                } else if (selectedCategory !== 'all' && selectedBrand !== 'all') {
                                                    return (<div>
                                                            {(products.map((product) => {return product.brand === selectedBrand && product.category === selectedCategory && product.hidden === false ?
                                                                (<Col md={4} sm={6} xs={12} style={{display: 'inline-block'}} key={product._id}>
                                                                    <Product product={product}/>
                                                                </Col>): null}))}
                                                            </div>)
                                                }
                                            } else {
                                                if (selectedCategory === 'all' && selectedBrand === 'all') {
                                                    return (<div>
                                                            {(products.map((product) => {return product.countInStock > 0 && product.hidden === false ?
                                                                (<Col md={4} sm={6} xs={12} style={{display: 'inline-block'}} key={product._id}>
                                                                    <Product product={product}/>
                                                                </Col>): null}))}
                                                            </div>)
                                                } else if (selectedCategory !== 'all' && selectedBrand === 'all') {
                                                    return (<div>
                                                            {(products.map((product) => {return product.countInStock > 0 && product.category === selectedCategory && product.hidden === false ?
                                                                (<Col md={4} sm={6} xs={12} style={{display: 'inline-block'}} key={product._id}>
                                                                    <Product product={product}/>
                                                                </Col>): null}))}
                                                            </div>)
                                                } else if (selectedCategory === 'all' && selectedBrand !== 'all') {
                                                    return (<div>
                                                            {(products.map((product) => {return product.countInStock > 0 && product.brand === selectedBrand && product.hidden === false ?
                                                                (<Col md={4} sm={6} xs={12} style={{display: 'inline-block'}} key={product._id}>
                                                                    <Product product={product}/>
                                                                </Col>): null}))}
                                                            </div>)
                                                } else if (selectedCategory !== 'all' && selectedBrand !== 'all') {
                                                    return (<div>
                                                            {(products.map((product) => {return product.countInStock > 0 && product.brand === selectedBrand && product.category === selectedCategory && product.hidden === false ?
                                                                (<Col md={4} sm={6} xs={12} style={{display: 'inline-block'}} key={product._id}>
                                                                    <Product product={product}/>
                                                                </Col>): null}))}
                                                            </div>)
                                                }
                                            }
                                        })()}
                                        <Paginate page={page} pages={pages} keyword={keyword}/>
                                    </div>
                        }
                        </Col>
                    </Row>
                    </Jumbotron>
                </Container>
        </div>
    )
}

export default HomeScreen
