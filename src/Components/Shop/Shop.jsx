import React, { useEffect, useState } from 'react';
import { addToDb, deleteShoppingCart, getShoppingCart } from '../../utilities/fakedb';
import Cart from '../Cart/Cart';
import Product from '../Product/Product';
import './Shop.css'
import { Link, useLoaderData } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowRightLong } from '@fortawesome/free-solid-svg-icons'

const Shop = () => {
    const [products, setProducts] = useState([]);
    const [cardProducts, setCardProducts] = useState([]);
    const [cart, setCart] = useState([]);
    const [currentPage, setCurrentPage] = useState(0);
    const [itemsPerpage, setItemsPerpage] = useState(10)
    const { totalProducts } = useLoaderData();

    const totalPages = Math.ceil(totalProducts / itemsPerpage);

    // get array index
    const pagesNumbers = [...Array(totalPages).keys()]

    // useEffect(() => {
    //     fetch('http://localhost:5000/products')
    //         .then(res => res.json())
    //         .then(data => setProducts(data))
    // }, [])


    useEffect(() => {
        async function fetchData() {
            const response = await fetch(`http://localhost:5000/products?page=${currentPage}&limit=${itemsPerpage}`)
            const data = await response.json();
            setProducts(data)
        }
        fetchData();
    }, [currentPage, itemsPerpage])

    useEffect(() => {
        const storedCart = getShoppingCart();
        const ids = Object.keys(storedCart);

        fetch('http://localhost:5000/productsByIds', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(ids)
        })
        .then(res => res.json())
        .then(data => setCardProducts(data))

        const saveCart = [];
        //step:1 get id from localStorage
        for (const id in storedCart) {
            // step:2 get products array using this id 
            const addedProduct = cardProducts.find(product => product._id === id);
            if (addedProduct) {
                //  step:3 get product quantity from localStorage
                const quantity = storedCart[id];

                // step:4 added product quantity to addedProduct object 
                addedProduct.quantity = quantity;

                // step:5 addedProduct object push to saveCart array 
                saveCart.push(addedProduct);
            }
            // console.log(addedProduct)
        }
        // step:6 saveCart array set to setCart-state 
        setCart(saveCart);
    }, [products])

    const handleAddToCard = (product) => {
        // const newCart = [...cart, product];
        let newCart = [];
        const exists = cart.find(pd => pd._id === product._id);
        if (!exists) {
            product.quantity = 1;
            newCart = [...cart, product]
        } else {
            exists.quantity = exists.quantity + 1;
            const remaining = cart.filter(pd => pd._id !== product._id);
            newCart = [...remaining, exists];
        }
        // console.log(cart);
        setCart(newCart);
        addToDb(product._id);
    }

    const handleClearCart = () => {
        setCart("");
        deleteShoppingCart();
    }

    const options = [5, 10, 15, 20];
    function handleSelectChange(event) {
        setItemsPerpage(parseInt(event.target.value));
        setCurrentPage(0);
    }

    return (
        <>
            <div className='shop-container'>
                <div className='product-container'>
                    {products.map(product => <Product
                        product={product}
                        key={product._id}
                        handleAddToCard={handleAddToCard}>
                    </Product>)}
                </div>
                <div className='card-container'>
                    <Cart
                        cart={cart}
                        handleClearCart={handleClearCart}>
                        <Link to="/orders" className='link'>
                            <button className='btn-common'>Review Order
                                <FontAwesomeIcon icon={faArrowRightLong} />
                            </button>
                        </Link>
                    </Cart>
                </div>
            </div>
            <div className='pagination'>
                <p>current page: {currentPage} and items per pages: {itemsPerpage}</p>
                {
                    pagesNumbers.map(number => <button
                        onClick={() => setCurrentPage(number)}
                        className={currentPage === number ? 'selected' : ''}
                        key={number}>
                        {number}
                    </button>)
                }
                <select value={itemsPerpage} onChange={handleSelectChange}>
                    {options.map(option => (
                        <option key={option} value={option}>
                            {option}
                        </option>
                    ))}
                </select>
            </div>
        </>
    );
};

export default Shop;