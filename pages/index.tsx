import type { GetServerSidePropsResult, NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import { Loader, Container, SimpleGrid, Text, useMantineTheme, createStyles, Button } from '@mantine/core';
import { useState, useEffect } from "react";
import * as api from "../helpers/api"
import { ICategory, IProduct } from '../helpers/types';
import Product from '../components/Product';
import TitleText from '../components/TitleText';
import { InferGetStaticPropsType } from 'next'
import clientPromise from '../lib/db';
//import { server } from '../config';
import { Product as ProductModel }   from '../models/productModel';
import { Category as CategoryModel }   from '../models/categoryModel';


const useStyles = createStyles((theme) => ({
    container: {
        color: theme.colorScheme === 'dark' ? theme.colors.dark[0] : theme.colors.gray[7],
        backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[4] : theme.colors.cyan[1],

    },
    control: {
        paddingLeft: 50,
        paddingRight: 50,
        fontFamily: `Greycliff CF, ${theme.fontFamily}`,
        fontSize: 22,

        [theme.fn.smallerThan('md')]: {
            width: '100%',
        },
    },
}));

const Home: NextPage<X> = ({ categoriesProps, productsProps, loadingProps }: X) => {

    const { classes } = useStyles()
    const emptyCategories: ICategory[] = [];
    const emptyProducts: IProduct[] = [];


    const [products, setProducts]: [IProduct[], (product: IProduct[]) => void] = useState(emptyProducts)
    const [categories, setCategories]: [ICategory[], (category: ICategory[]) => void] = useState(emptyCategories)
    const [loading, SetLoading] = useState<boolean>(true)



    useEffect(() => {
        window.scrollTo(0, 0)
        
        setCategories(categoriesProps);
        setProducts(productsProps);
        SetLoading(loadingProps)
        return () => {
            setCategories([]);
            setProducts([]);
            // SetLoading(true)
        };
    }, []);
    if (loading === true)

        return <Loader width="100%"
            size="xl"
        />

    else

        return (
            <Container size="xl" my="md" pb="xl" className={classes.container}>

                <TitleText title="On Sale"
                    type="On Sale"
                    typeId=" "
                />

                <SimpleGrid cols={3} spacing="lg"
                    breakpoints={[
                        { maxWidth: 1024, cols: 3, spacing: 'md' },
                        { maxWidth: 768, cols: 2, spacing: 'sm' },
                        { maxWidth: 500, cols: 1, spacing: 'sm' },
                    ]} >

                    {products.map((product) => {
                        if (product.sale > 0)
                            return <Product product={product}
                                key={product._id}
                            />
                    })}
                </SimpleGrid>

                <TitleText title="Featured"
                    type="Featured"
                    typeId=" "
                />

                <SimpleGrid cols={3} spacing="lg"
                    breakpoints={[
                        { maxWidth: 1024, cols: 3, spacing: 'md' },
                        { maxWidth: 768, cols: 2, spacing: 'sm' },
                        { maxWidth: 500, cols: 1, spacing: 'sm' },
                    ]} >


                    {products.map((product) => {
                        if (product.featured === true)
                            return <Product product={product}
                                key={product._id}
                            />
                    })}
                </SimpleGrid>
                {categories?.map((x) => (
                    <div key={x._id}>
                        <TitleText
                            title={x.name}
                            type="category"
                            typeId={x._id}
                        />
                        <SimpleGrid cols={3} spacing="lg"
                            breakpoints={[
                                { maxWidth: 1024, cols: 3, spacing: 'md' },
                                { maxWidth: 768, cols: 2, spacing: 'sm' },
                                { maxWidth: 500, cols: 1, spacing: 'sm' },
                            ]} >
                            {products?.filter((item) => item.category === x._id)
                                .slice(0, 6).map((product) => {

                                    return <Product product={product}
                                        key={product._id}
                                    />
                                })}
                        </SimpleGrid>
                    </div>
                ))}
            </Container>
        )
}

export default Home

interface X {
    categoriesProps: ICategory[]
    productsProps: IProduct[]
    loadingProps: boolean
}
// const url = process.env.NEXT_PUBLIC_URL

   export async function getServerSideProps(): Promise<GetServerSidePropsResult<X>> {
    await clientPromise()
    try {
        const [datacategories, dataProducts] = await Promise.all([
            await CategoryModel.find().select(['-createdAt', '-updatedAt' , '-__v']), 
            await ProductModel.find().select(['-createdAt', '-updatedAt', '-__v' ])
                              .limit(12)
          ]);
          const categories  = datacategories.map((doc) => {
            const category = doc.toObject()
            category._id = category._id.toString()
            return category as ICategory
          })
          const products  = dataProducts.map((doc) => {
            const product = doc.toObject()
            product.category = product.category.toString()
            product.brand = product.brand.toString()
            product._id = product._id.toString()
            return product as IProduct
          })
          return {
            props: {
                categoriesProps: categories,
                productsProps: products,
                loadingProps: false
            },
        }

    } catch (error) {
        return {
            props: {
                categoriesProps: [],
                productsProps: [],
                loadingProps: true
            },
        }
    }
}
  