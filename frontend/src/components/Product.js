import React from 'react'
import { Card, Row, Image, Button } from 'react-bootstrap'
import Rating from './Rating'
import { Link } from 'react-router-dom'

function Product({ product }) {
    return (
        <div>
            <div class="container-products">
                <Link to={`/product/${product._id}`}>
                <div class="content">
                    <div class="content-overlay"></div>
                    <Image class="content-image" src={product.image} fluid/>
                    <div class="content-details fadeIn-bottom">
                        <Rating className="product__rating" value={product.rating} color={'#f8e825'}/>
                        <p className="product__rating__text" style={{fontSize: '15px'}}>{`${product.numReviews} reviews`}</p>
                        <h5 className="product__rating__text">{product.category}</h5>
                    </div>
                </div>
                </Link>
                <div>
                    <h3 className="product__title">{product.name}</h3>
                    <p className="product__price">${product.price}</p>
                </div>
            </div>        
        </div>
    )
}


export default Product
