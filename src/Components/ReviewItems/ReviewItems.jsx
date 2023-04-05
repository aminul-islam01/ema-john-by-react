import React from 'react';
import './ReviewItems.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons'

const ReviewItems = ({ product, handleRemoveCart }) => {
    const { img, name, price, quantity, id } = product;
    return (
        <div className='review-item'>
            <img src={img} alt="" />
            <div className='review-content'>
                <h4>{name}</h4>
                <p>Price: <span>${price}</span></p>
                <p>Quantity: <span>{quantity}</span></p>
            </div>
            <button onClick={() => handleRemoveCart(id)}>
                <FontAwesomeIcon className='delete-icon' icon={faTrashAlt} />
                </button>
        </div>
    );
};

export default ReviewItems;