import { Loader, Container, SimpleGrid, Text } from '@mantine/core';
import { useState, useEffect } from "react";
import * as api from "../../../helpers/api"
import { ICategory, IProduct } from '../../../helpers/types';
import Product from '../features/Product';
import React, { ReactElement } from "react";


const Home = () => {
    const emptyCategories: ICategory[] = [];
    const emptyProducts: IProduct[] = [];


    const [products, setProducts]: [IProduct[], (category: IProduct[]) => void] = useState(emptyProducts)
    const [categories, setCategories]: [ICategory[], (category: ICategory[]) => void] = useState(emptyCategories)
    const [loading, SetLoading] = useState<boolean>(true)


    const update = async () => {
        await api.getCategories()
            .then((res) => {
                console.log("Categoriesssssss ", res);
                setCategories(res as ICategory[]);
            });

        await api.getProducts()
            .then((res) => {
                console.log("Productssssssss ", res);
                setProducts(res as IProduct[]);
            });
        SetLoading(false);
    }


    useEffect(() => {

        update()
        return () => {
            setCategories([]);
            setProducts([]);
        };
    }, [loading]);


    // if (loading===true) return <Loader/>;
    //  else

    return (
        <Container my="md">

            <Text
                component="span"
                align="center"
                variant="gradient"
                gradient={{ from: 'indigo', to: 'cyan', deg: 45 }}
                size="xl"
                weight={700}
                style={{ fontFamily: 'Greycliff CF, sans-serif' }}
            >
                On Sale
            </Text>

            <SimpleGrid cols={3} spacing="lg"
                breakpoints={[
                    { maxWidth: 980, cols: 3, spacing: 'md' },
                    { maxWidth: 755, cols: 2, spacing: 'sm' },
                    { maxWidth: 600, cols: 1, spacing: 'sm' },
                ]} >


                {products.map((product) => {
                    if (product.sale > 0)
                        return <Product product={product}
                            key={product._id}
                        />
                })}
            </SimpleGrid>

            <Text
                component="span"
                align="center"
                variant="gradient"
                gradient={{ from: 'indigo', to: 'cyan', deg: 45 }}
                size="xl"
                weight={700}
                style={{ fontFamily: 'Greycliff CF, sans-serif' }}
            >
                Featured
            </Text>

            <SimpleGrid cols={3} spacing="lg"
                breakpoints={[
                    { maxWidth: 980, cols: 3, spacing: 'md' },
                    { maxWidth: 755, cols: 2, spacing: 'sm' },
                    { maxWidth: 600, cols: 1, spacing: 'sm' },
                ]} >


                {products.map((product) => {
                    if (product.featured === true)
                        return <div>{product.name} {product.featured}</div>
                })}
            </SimpleGrid>
            {categories?.map((x) => (
                <div key={x._id}>
                    <Text
                        component="span"
                        align="center"
                        variant="gradient"
                        gradient={{ from: 'indigo', to: 'cyan', deg: 45 }}
                        size="xl"
                        weight={700}
                        style={{ fontFamily: 'Greycliff CF, sans-serif' }}
                    >
                        {x.name}
                    </Text>
                    <SimpleGrid cols={3} spacing="lg"
                        breakpoints={[
                            { maxWidth: 980, cols: 3, spacing: 'md' },
                            { maxWidth: 755, cols: 2, spacing: 'sm' },
                            { maxWidth: 600, cols: 1, spacing: 'sm' },
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