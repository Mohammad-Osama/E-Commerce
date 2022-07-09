import { Loader, Container, SimpleGrid, Text ,useMantineTheme ,createStyles } from '@mantine/core';
import { useState, useEffect } from "react";
import * as api from "../../../helpers/api"
import { ICategory, IProduct } from '../../../helpers/types';
import Product from '../features/Product';



const useStyles = createStyles((theme) => ({
    container: {   
        color: theme.colorScheme === 'dark' ? theme.colors.dark[0] : theme.colors.gray[7],   
        backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[4] : theme.colors.cyan[2],
            
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


    if (loading === true)

        return <Loader width="100%"
                       size="xl"
                 />

    else

        return (
            <Container size="xl" my="md" className={classes.container}>

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
                                key={product.id}
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
                            return <Product product={product}
                                key={product.id}
                            />
                    })}
                </SimpleGrid>
                {categories?.map((x) => (
                    <div key={x.id}>
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