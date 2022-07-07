import React from 'react'
import { Loader, Container, SimpleGrid, Text ,useMantineTheme ,createStyles } from '@mantine/core';
import { useState, useEffect } from "react";
import { cartState } from '../../redux/slices/cartSlice';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { AppDispatch } from '../../redux/store';
import Product from '../features/Product';
import { IProduct } from '../../../helpers/types';


const useStyles = createStyles((theme) => ({
    container: {   
        color: theme.colorScheme === 'dark' ? theme.colors.dark[0] : theme.colors.gray[7],   
        backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[0],
            
    },
}));

const Cart = () => {
    const { classes } = useStyles()

    const cartItems = useSelector(cartState)
    console.log("cartItems", cartItems)

    const dispatch = useDispatch<AppDispatch>()

    
    const products :IProduct[] = cartItems.map(x => (
        {
            id: x.id,
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

    return (
        <Container my="md" className={classes.container}>

                <Text 
                    component="span"
                    align="center"
                    variant="gradient"
                    gradient={{ from: 'indigo', to: 'cyan', deg: 45 }}
                    size="xl"
                    weight={700}
                    style={{ fontFamily: 'Greycliff CF, sans-serif' }}
                >
                    Cart
                </Text>

                <SimpleGrid cols={3} spacing="lg"
                    breakpoints={[
                        { maxWidth: 980, cols: 3, spacing: 'md' },
                        { maxWidth: 755, cols: 2, spacing: 'sm' },
                        { maxWidth: 600, cols: 1, spacing: 'sm' },
                    ]} >
                            { cartItems.length===0
                              ? <Text style={{margin:"auto"}} size="xl" weight={555}> 
                                    Cart is empty
                                </Text>

                              :  products.map((product)=>{
                                return <Product   product={product} 
                                                  key={product.id} />
                        })
                            }
                </SimpleGrid>
                </Container>
    )
}

export default Cart
