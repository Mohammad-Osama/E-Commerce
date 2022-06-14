import React from 'react'
import { useSelector } from 'react-redux';
import {cartState} from '../redux/slices/cartSlice';

const TempCart = () => {

    const cartItems = useSelector(cartState)
    console.log("cartItems", cartItems)


    return (
        <div>
            
        </div>
    )
}

export default TempCart
