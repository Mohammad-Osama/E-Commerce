import React from 'react'
import { useSelector } from 'react-redux';
import { cartState } from '../redux/slices/cartSlice';
import { emptyAllCart } from '../redux/slices/cartSlice';
import { useDispatch } from 'react-redux';
const TempCart = () => {

    const cartItems = useSelector(cartState)
    console.log("cartItems", cartItems)
    const dispatch = useDispatch()

    return (
        <div>
            <h2>Cart</h2>
            <p>items in Cart : {cartItems.map((item) => item.name + item.id
                + " , quantity : " + item.quantity +
                " price " + item.price)} </p>
            <button onClick={() => {
                dispatch(emptyAllCart())
            }}> empty cart</button>
        </div>
    )
}

export default TempCart
