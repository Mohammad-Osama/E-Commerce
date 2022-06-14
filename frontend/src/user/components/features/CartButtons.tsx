import React from 'react'
import { ActionIcon ,Group , useMantineTheme} from '@mantine/core';
import { Plus, Minus } from 'tabler-icons-react';
import { useDispatch } from 'react-redux';
import cartSlice from '../../redux/slices/cartSlice';
import { addToCart , removeFromCart } from '../../redux/slices/cartSlice';
import {IProduct} from '../../../helpers/types'

interface Id {
    _id: string;

}
interface X {
    product :IProduct;
   
  }
interface TodoProps {
    completed: boolean,
    text: string,
    onClick: () => any,
  }


let quantity :number = 12

const CartButtons = ({ product } : X) => {
    const  { id, name, main_image, price, currency, stock, vote_count, vote_total, description, model ,featured,sale } = product

    const theme = useMantineTheme();
    const dispatch = useDispatch()

   // const id: string = _id


    return (
        <Group position="center" style={{ marginRight: '0px', gap: '10px', width: '90%', marginBottom: 5, marginTop: theme.spacing.sm }}>
            <ActionIcon
                size={28}
                variant="transparent"
                onClick={() => {
                    dispatch(addToCart({ id, name, main_image, price, currency, stock, vote_count, vote_total, model ,sale ,quantity }))
                }}
               
            >
                <Plus size={16} />
            </ActionIcon>
            <span>qqqqq</span>
            <ActionIcon
                size={28}
                variant="transparent"
                onClick={() => {
                    dispatch(removeFromCart(id)) // removed the _ to fix the error 
                }}
            >
                <Minus size={16} />
            </ActionIcon>
        </Group>
    )
}

export default CartButtons
