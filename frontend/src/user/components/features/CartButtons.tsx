import React from 'react'
import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { cartState } from '../../redux/slices/cartSlice';
import { ActionIcon, Group, useMantineTheme } from '@mantine/core';
import { showNotification } from '@mantine/notifications';
import { Plus, Minus } from 'tabler-icons-react';
import { useDispatch } from 'react-redux';
import { ShoppingCartPlus, ShoppingCartX , LetterX } from 'tabler-icons-react';
import { addToCart, removeFromCart } from '../../redux/slices/cartSlice';
import { IProduct, IProductCart } from '../../../helpers/types'
import NotificationProps from "@mantine/notifications"

interface X {
    product: IProduct;
}

let quantity: number = 12

const CartButtons = ({ product }: X) => {
    const { id, name, main_image, price, currency, stock, vote_count, vote_total, description, model, featured, sale } = product
    const [quantity, setQuantity] = useState<number>(1)
    const [currentQuantity, setCurrentQuantity] = useState<number>(0)
    const [full, setFull] = useState<boolean>(false)


    const theme = useMantineTheme();
    const dispatch = useDispatch()

    const cartItems = useSelector(cartState)
    const thisProductInCart = cartItems.filter((item) => {
        return id === item.id
    })
    const thisProduct = thisProductInCart[0];




    const increaseQuantity = (): void => {
        if (currentQuantity > 0) {
            if (quantity == stock - currentQuantity)
                return
        }
        if (quantity == stock)
            return;

        const number = quantity + 1
        setQuantity(number)
    }


    const decreaseQuantity = (): void => {
        if (currentQuantity > 0) {
            if (quantity <= -currentQuantity)
                return;
        }
        else
            if (quantity <= 1) return
        if (currentQuantity == stock)
            setFull(true)
        const number = quantity - 1
        setQuantity(number)
        setFull(false)
    }

    let productToCart: IProductCart = {
        id: id,
        name: name,
        model: model,
        main_image: main_image,
        price: price,
        currency: currency,
        stock: stock,
        sale: sale,
        vote_count: vote_count,
        vote_total: vote_total,
        quantity: quantity,
    }



    const cartAddFunction = (productToCart: IProductCart): void => {
        if (currentQuantity == stock && quantity > 0) {
            showNotification({
                title: "invalid ",
                message: `${name} cant be added ,no more in stock`,
                color: 'yellow',
                icon: <LetterX />
              })
            setFull(true)
            return
        }

        else setFull(false)
        if (quantity === 0) {
            showNotification(message())
            return
        }

        dispatch(addToCart(productToCart))
        setQuantity(1)
        showNotification(message())
    }



    const cartRemoveFunction = (id: string): void => {
        dispatch(removeFromCart(id))
        setQuantity(1)
        showNotification({
        title: "Cart changed",
        message: `${name} has been removed from the cart`,
        color: 'red',
        icon: <ShoppingCartX />
        })
    setFull(false)
    }

    type M ={
        title: string;
        message: string;
        icon?: undefined;
        color?: undefined;
    }

    const message :any = () => {
        if (quantity === 0)
          return { title: "invalid amount", message: "0 is not a valid quantity" }
        if (currentQuantity === 0)
          return { title: "Cart changed", message: `${name} has been added to the cart`, icon: <ShoppingCartPlus />, color: "green" }
    
        else if (currentQuantity > 0 && quantity < 0 && currentQuantity === -quantity)
          return { title: "Cart changed", message: `${name} has been removed from the cart`, icon: <ShoppingCartX />, color: "red" }
    
        else if (currentQuantity > 0 && quantity < 0)
          return { title: "Cart changed", message: `${name} has been decreased by ${-quantity}`, icon: <ShoppingCartX />, color: 'pink' }
    
        else if (currentQuantity > 0 && quantity > 0)
          return { title: "Cart changed", message: `${name} has been increased by ${quantity}`, icon: <ShoppingCartPlus />, color: "green" }
      }


    useEffect(() => {
        if (thisProduct)
            setCurrentQuantity(thisProduct.quantity)
        return () => {
            setCurrentQuantity(0)
        }
    }, [cartItems, thisProduct])





    return (
        <Group position="center" style={{ marginRight: '0px', gap: '10px', width: '90%', marginBottom: 5, marginTop: theme.spacing.sm }}>
            <ActionIcon
                disabled={quantity === 0 || full === true      // <----------
                    ? true
                    : false}
                onClick={() => {
                    cartAddFunction(productToCart)
                }}
            >
                {quantity > 0
                    ?
                    <ShoppingCartPlus size={30} color={'#40bf59'} />

                    :
                    <ShoppingCartX size={30} color={'#d279c6'} />

                }
            </ActionIcon>
            <ActionIcon
                size={28}
                variant="transparent"
                onMouseDown={(e: any) => e.preventDefault()}  // missing type 
                onClick={increaseQuantity}

            >
                <Plus size={16} />
            </ActionIcon>
            <span>{quantity}</span>
            <ActionIcon
                size={28}
                variant="transparent"
                onMouseDown={(e: any) => e.preventDefault()}  // missing type
                onClick={decreaseQuantity}
            >
                <Minus size={16} />
            </ActionIcon>
        </Group>
    )
}

export default CartButtons
