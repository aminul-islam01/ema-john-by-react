import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons'

import './Product.css'

const Product = ({product, handleAddToCard}) => {
    // console.log(product)
    const {img, name, price, seller, ratings} = product;
    
    return (
        <div className='product'>
            <img src={img} alt="" />
            <div className='product-details'>
                <h3>{name}</h3>
                <p>Price: ${price}</p>
                <div className='rating'>
                    <small>Manufacturer : {seller}</small><br />
                    <small>Rating : {ratings} star</small>
                </div>
            </div>
            <button onClick={() => handleAddToCard(product)} className='add-btn'>
                Add to Card 
                <FontAwesomeIcon icon={faShoppingCart} />
                </button>
        </div>
    );
};

export default Product;