import React, { useEffect, useState } from 'react';
import { addToDb, deleteShoppingCart, getShoppingCart } from '../../utilities/fakedb';
import Cart from '../Cart/Cart';
import Product from '../Product/Product';
import './Shop.css'
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowRightLong } from '@fortawesome/free-solid-svg-icons'

const Shop = () => {
    const [products, setProducts] = useState([]);
    const [cart, setCart] = useState([]);

    useEffect(() => {
        fetch('products.json')
            .then(res => res.json())
            .then(data => setProducts(data))
    }, [])

    useEffect(() => {
        const storedCart = getShoppingCart();
        const saveCart = [];
        //step:1 get id from localStorage
        for (const id in storedCart) {
            // step:2 get products array using this id 
            const addedProduct = products.find(product => product.id === id);
            if (addedProduct) {
                //  step:3 get product quantity from localStorage
                const quantity = storedCart[id];

                // step:4 added product quantity to addedProduct object 
                addedProduct.quantity = quantity;

                // step:5 addedProduct object push to saveCart array 
                saveCart.push(addedProduct);
            }
            console.log(addedProduct)
        }
        // step:6 saveCart array set to setCart-state 
        setCart(saveCart);
    }, [products])

    const handleAddToCard = (product) => {
        // const newCart = [...cart, product];
        let newCart = [];
        const exists = cart.find(pd => pd.id === product.id);
        if(!exists) {
            product.quantity = 1;
            newCart = [...cart, product]
        }else{
            exists.quantity = exists.quantity + 1;
            const remaining = cart.filter(pd => pd.id !== product.id);
            newCart = [...remaining, exists];
        }
        // console.log(cart);
        setCart(newCart);
        addToDb(product.id);
    }

    const handleClearCart = () => {
        setCart("");
        deleteShoppingCart();
    }
    

    return (
        <div className='shop-container'>
            <div className='product-container'>
                {products.map(product => <Product
                    product={product}
                    key={product.id}
                    handleAddToCard={handleAddToCard}>
                </Product>)}
            </div>
            <div className='card-container'>
                <Cart 
                cart={cart}
                handleClearCart={handleClearCart}>
                    <Link to="/orders">
                        <button className='btn-common'>Review Order
                        <FontAwesomeIcon icon={faArrowRightLong} />
                        </button>
                    </Link>
                </Cart>
            </div>
        </div>
    );
};

export default Shop;