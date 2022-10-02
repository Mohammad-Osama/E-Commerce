import { Loader, Container, SimpleGrid, Text, useMantineTheme, createStyles, Button } from '@mantine/core';
import { useState, useEffect } from "react";
import * as api from "../../helpers/api"
import { ICategory, IProduct } from '../../helpers/types';
import Product from '../features/Product';
import { Link } from 'react-router-dom';
import TitleText from '../components/TitleText';



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

const Home = () => {

    const { classes } = useStyles()
    const emptyCategories: ICategory[] = [];
    const emptyProducts: IProduct[] = [];


    const [products, setProducts]: [IProduct[], (product: IProduct[]) => void] = useState(emptyProducts)
    const [categories, setCategories]: [ICategory[], (category: ICategory[]) => void] = useState(emptyCategories)
    const [loading, SetLoading] = useState<boolean>(true)


    const update = async () => {
        await api.getCategories()
            .then((res) => {
                //  console.log("Categoriesssssss ", res);
                setCategories(res as ICategory[]);
            });

        await api.getProducts()
            .then((res) => {
                //  console.log("Productssssssss ", res);
                setProducts(res as IProduct[]);
                //  console.log("Productssssssss ", products);
            });
        SetLoading(false);
    }


    useEffect(() => {
        window.scrollTo(0, 0)
        update()
        return () => {
            setCategories([]);
            setProducts([]);
        };
    }, [loading]);


    if (loading === true || products === [] || categories === [])

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
                                key={product.id}
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
                                key={product.id}
                            />
                    })}
                </SimpleGrid>
                {categories?.map((x) => (
                    <div key={x.id}>
                        <TitleText
                            title={x.name}
                            type="category"
                            typeId={x.id}
                        />
                        <SimpleGrid cols={3} spacing="lg"
                            breakpoints={[
                                { maxWidth: 1024, cols: 3, spacing: 'md' },
                                { maxWidth: 768, cols: 2, spacing: 'sm' },
                                { maxWidth: 500, cols: 1, spacing: 'sm' },
                            ]} >
                            {products?.filter((item) => item.category === x.id)
                                .slice(0, 6).map((product) => {

                                    return <Product product={product}
                                        key={product.id}
                                    />
                                })}
                        </SimpleGrid>
                    </div>
                ))}
            </Container>
        )
}


export default Home