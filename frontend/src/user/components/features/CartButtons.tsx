import React from 'react'
import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { cartState } from '../../redux/slices/cartSlice';
import { ActionIcon, Group, useMantineTheme } from '@mantine/core';
import { Plus, Minus } from 'tabler-icons-react';
import { useDispatch } from 'react-redux';
import { ShoppingCartPlus, ShoppingCartX } from 'tabler-icons-react';
import { addToCart, removeFromCart } from '../../redux/slices/cartSlice';
import { IProduct, IProductCart } from '../../../helpers/types'

interface X {
    product: IProduct;
}

let quantity: number = 12

const CartButtons = ({ product }: X) => {
    const { id, name, main_image, price, currency, stock, vote_count, vote_total, description, model, featured, sale } = product
    const [quantity, setQuantity] = useState<number>(1)
    const [currentQuantity, setCurrentQuantity] = useState<number>(0)


    const theme = useMantineTheme();
    const dispatch = useDispatch()

    const cartItems = useSelector(cartState)
    const thisProductInCart = cartItems.filter((item) => {
        return id === item.id
      })
      console.log("thisProductInCart",thisProductInCart)

      const thisProduct = thisProductInCart[0];
      console.log("thisProduct",thisProduct)




    const increaseQuantity = (): void => {
        const number = quantity + 1
        setQuantity(number)
    }

    const decreaseQuantity = (): void => {
        const number = quantity - 1
        setQuantity(number)
    }

    let productToCart : IProductCart ={
        id:id ,
        name: name,
        model: model,
        main_image: main_image, 
        price: price,
        currency: currency,
        stock: stock,
        sale:sale,
        vote_count : vote_count,
        vote_total : vote_total,
        quantity: quantity,

    }
    const cartAddFunction = (productToCart:IProductCart): void => {

        dispatch(  addToCart  (productToCart)    )
    }


    const cartRemoveFunction = (id: string): void => {
        dispatch(removeFromCart(id))
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
