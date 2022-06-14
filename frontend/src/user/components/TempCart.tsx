import React from 'react'
import { useSelector } from 'react-redux';
import {cartState} from '../redux/slices/cartSlice';

const TempCart = () => {

    const cartItems = useSelector(cartState)
    console.log("cartItems", cartItems)


    return (
        <div>
            <h2>Cart</h2>
            <p>items in Cart : {cartItems.map((item) => item.name + item.id
             + " , quantity : " + item.quantity +
              " price " + item.price)} </p>
        </div>
    )
}

export default TempCart
