import {  Indicator } from '@mantine/core';
import { ShoppingCart } from 'tabler-icons-react';
import { cartState } from '../../redux/slices/cartSlice';
import { useSelector } from 'react-redux';
import { useState ,useEffect} from 'react';

const CartIcon = () => {

    const cartItems= useSelector(cartState)
    const [number, setNumber] = useState<number>(0)

    const totalCount = ()=>{
        let count = 0 
        cartItems.map((item)=>{
            count=count + item.quantity
        })
        setNumber(count)
    }

    useEffect(() => {
        if (cartItems)
            totalCount()
        return () => {
        }
    }, [cartItems]) 

    return (
        <Indicator inline label={number} size={20} >
         <ShoppingCart/>
      </Indicator>
    )
}

export default CartIcon
