import {
    Loader, Container, SimpleGrid, Text,
    useMantineTheme, createStyles, Group, Button , Badge
} from '@mantine/core';
import { useState, useEffect } from "react";
import { cartState, emptyAllCart } from '../redux/slices/cartSlice';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { AppDispatch } from '../redux/store';
import Product from '../components/Product';
import { IProduct } from '../helpers/types';
import TitleText from '../components/TitleText';



const useStyles = createStyles((theme) => ({
    container: {
        color: theme.colorScheme === 'dark' ? theme.colors.dark[0] : theme.colors.gray[7],
        backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[0],

    },
}));

const Cart = () => {
    const { classes } = useStyles()

    const cartItems = useSelector(cartState)
    // console.log("cartItems", cartItems)

    const dispatch = useDispatch<AppDispatch>()

    const totalCost = () => {
        let final = 0
        cartItems.map((item) => {
            let itemTotal = 0
            itemTotal = item.quantity * item.price
            final = final + itemTotal
        })
        return final
    }
    const products = cartItems.map(x => (
        {
            _id: 
                (x.id	
                ? x.id
                : x._id ),
            name: x.name,
            model: x.model,
            main_image: x.main_image,
            images: x.images,
            description: x.description,
            price: x.price,
            currency: x.currency,
            stock: x.stock,
            sale: x.sale,
            featured: x.featured,
            category: x.category,
            brand: x.brand,
            rating_count: x.rating_count,
            rating_total: x.rating_total,
        }
    ))

    useEffect(() => {
        if (cartItems)
            totalCost()

    }, [])

    return (
        <Container my="md" className={classes.container}>
            <TitleText title="Cart"
                type="Cart"
                typeId=" "
            />
            <Group position="right" spacing="sm">
                <Badge color="gray" size="xl" radius="xs" variant="outline">Total Cost</Badge>
                <Badge color="gray" size="xl" radius="xs" variant="outline">{totalCost()} USD </Badge>
            </Group>

            <SimpleGrid cols={3} spacing="lg"
                breakpoints={[
                    { maxWidth: 980, cols: 3, spacing: 'md' },
                    { maxWidth: 755, cols: 2, spacing: 'sm' },
                    { maxWidth: 600, cols: 1, spacing: 'sm' },
                ]} >
                {cartItems.length === 0
                    ? null
                    : products.map((product) => {
                        return <Product product={product}
                            key={product._id} />
                    })
                }
            </SimpleGrid>
            {cartItems.length === 0 &&
                <Text align="center" mb="xl" size="xl" weight={555}>
                    Cart is empty
                </Text>}

            {cartItems.length > 0 &&
                <Group grow position="right" style={{ padding: "100px" }}>
                    <Button fullWidth color="green">
                        Checkout({totalCost()}) USD
                    </Button>
                    <Button fullWidth color="red"
                        onClick={() => { dispatch(emptyAllCart()) }}>
                        Empty the cart </Button>
                </Group>
            }
        </Container>
    )
}

export default Cart
