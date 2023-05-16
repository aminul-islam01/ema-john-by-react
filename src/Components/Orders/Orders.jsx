import React, { useState } from 'react';
import Cart from '../Cart/Cart';
import { Link, useLoaderData } from 'react-router-dom';
import './Order.css'
import ReviewItems from '../ReviewItems/ReviewItems';
import { deleteShoppingCart, removeFromDb } from '../../utilities/fakedb';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCreditCard } from '@fortawesome/free-solid-svg-icons'

const Orders = () => {
    const savedCart = useLoaderData();
    // console.log(savedCart)
    const [cart, setCart] = useState(savedCart);
    const handleRemoveCart = (id) => {
        const remaining = cart.filter(product => product._id !== id);
        setCart(remaining);
        removeFromDb(id);
    }

    const handleClearCart = () => {
        setCart([]);
        deleteShoppingCart();
    }
    
    return (
        <div className='order-container'>
            <div>
                {cart.map(product => <ReviewItems 
                product={product}
                key={product._id}
                handleRemoveCart={handleRemoveCart}>
                </ReviewItems>)}
            </div>
            <div>
            <Cart 
            cart={cart}
            handleClearCart={handleClearCart}>
                <Link to="/checkout" className='link'>
                    <button className='btn-common'>Proceed Checkout
                    <FontAwesomeIcon icon={faCreditCard} />
                    </button>
                </Link>
            </Cart>
            </div>
        </div>
    );
};

export default Orders;