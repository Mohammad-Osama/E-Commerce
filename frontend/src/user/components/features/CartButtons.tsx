import React from 'react'
import { useState, useEffect } from 'react';
import { ActionIcon, Group, useMantineTheme } from '@mantine/core';
import { Plus, Minus } from 'tabler-icons-react';
import { useDispatch } from 'react-redux';
import cartSlice from '../../redux/slices/cartSlice';
import { addToCart, removeFromCart } from '../../redux/slices/cartSlice';
import { IProduct, IProductCart } from '../../../helpers/types'

interface X {
    product: IProduct;
}

let quantity: number = 12

const CartButtons = ({ product }: X) => {
    const { id, name, main_image, price, currency, stock, vote_count, vote_total, description, model, featured, sale } = product
    const [quantity, setQuantity] = useState<number>(1)


    const theme = useMantineTheme();
    const dispatch = useDispatch()

    const increaseQuantity = (): void => {
        const number = quantity + 1
        setQuantity(number)
    }

    const decreaseQuantity = (): void => {
        const number = quantity - 1
        setQuantity(number)
    }

    const cartAddFunction = ({ id, name, main_image, price, currency, stock, vote_count, vote_total, model, sale, quantity }: IProductCart) :void => {

        dispatch(addToCart({ id, name, main_image, price, currency, stock, vote_count, vote_total, model, sale, quantity }))
    }


    const cartRemoveFunction = (id:string) :void => {
        dispatch(removeFromCart(id))
    }








    return (
        <Group position="center" style={{ marginRight: '0px', gap: '10px', width: '90%', marginBottom: 5, marginTop: theme.spacing.sm }}>
            <ActionIcon
                size={28}
                variant="transparent"
                onClick={increaseQuantity}

            >
                <Plus size={16} />
            </ActionIcon>
            <span>{quantity}</span>
            <ActionIcon
                size={28}
                variant="transparent"
                onClick={decreaseQuantity}
            >
                <Minus size={16} />
            </ActionIcon>
        </Group>
    )
}

export default CartButtons
