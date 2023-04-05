import React, { useState } from 'react';
import Cart from '../Cart/Cart';
import { useLoaderData } from 'react-router-dom';
import './Order.css'
import ReviewItems from '../ReviewItems/ReviewItems';
import { removeFromDb } from '../../utilities/fakedb';

const Orders = () => {
    const savedCart = useLoaderData();
    const [cart, setCart] = useState(savedCart);
    const handleRemoveCart = (id) => {
        const remaining = cart.filter(product => product.id !== id);
        setCart(remaining);
        removeFromDb(id);
    }
    
    return (
        <div className='order-container'>
            <div>
                {cart.map(product => <ReviewItems 
                product={product}
                key={product.id}
                handleRemoveCart={handleRemoveCart}>
                </ReviewItems>)}
            </div>
            <div>
            <Cart cart={cart}></Cart>
            </div>
        </div>
    );
};

export default Orders;