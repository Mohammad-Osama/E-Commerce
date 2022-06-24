import React, { useState, useEffect } from 'react'
import {
    Grid, Container, Image, Loader, Card, Text, Badge, createStyles,
    useMantineTheme, Group
} from '@mantine/core';
import * as api from "../../../helpers/api"
import { useParams } from 'react-router'
import { IProduct } from '../../../helpers/types';
import CartButtons from './CartButtons';



const ProductFull = () => {

    const useStyles = createStyles((theme) => ({
        card: {
            backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.white,
            minWidth: "100%", minHeight: "100%"
        },

        section: {
            borderBottom: `1px solid ${theme.colorScheme === 'dark' ? theme.colors.dark[4] : theme.colors.gray[3]
                }`,
            paddingLeft: theme.spacing.md,
            paddingRight: theme.spacing.md,
            paddingBottom: theme.spacing.md,
        },

        like: {
            color: theme.colors.red[6],
        },

        label: {
            textTransform: 'uppercase',
            fontSize: theme.fontSizes.xs,
            fontWeight: 700,
        },
    }));

    const { classes } = useStyles();
    const theme = useMantineTheme();


    const { id } = useParams()

    const emptyProduct = {} as IProduct
    console.log("emptyProducttttt", emptyProduct)
    //  const [product, setProduct]: [IProduct, (product: IProduct) => void] = useState(emptyProduct)
    const [product, setProduct] = useState<IProduct>(emptyProduct)


    async function getProduct(id: string) {
        const resData = await api.getProductById(id)
        setProduct(resData)
        console.log("resDataaaa", resData)
    }



    useEffect(() => {
        getProduct(id as string)

    }, [])


    if (product === undefined)
        return <Loader />
    else
        return (
            <Container px="md">
                <Grid columns={12}>
                    <Grid.Col span={6}>
                        <Image src={product.main_image}
                            alt="Product"
                            radius={10}
                            height={380}
                            fit="contain"
                            style={{ cursor: 'pointer' }}

                        />
                    </Grid.Col>

                    <Grid.Col span={6}>
                        <Card withBorder radius="md" p="md" className={classes.card}>

                            <Card.Section className={classes.section} mt="md">
                                <Group position="apart">
                                    <Text size="xl" weight={500}>
                                        {product.name}
                                    </Text>
                                    <Badge size="lg">{product.model}</Badge>
                                    <Badge size="lg">{product.stock} in stock</Badge>
                                </Group>

                            </Card.Section>
                            <Card.Section className={classes.section} mt="md">
                                <Text size="xl" mt="xs">
                                    {product.description}
                                </Text>

                            </Card.Section>

                            <Card.Section className={classes.section} mt="md">
                                <Group position="left">
                                    <Text size="xl" weight={500} 
                                          style={{ textDecoration :product.sale>0 ?"line-through" :""}}         
                                                   >
                                        {product.price} {product.currency}
                                    </Text>
                                    {product.sale > 0 &&
                                    <>
                                        <Badge size="xl" variant="outline" color="red">
                                            {product.sale} % Sale
                                        </Badge>
                                            
                                        <Text  size="xl" weight={500}>
                                            {product.price - (product.sale *product.price/100)} {product.currency}
                                        </Text>
                                        </>
                                    }

                                </Group>
                                        
                            </Card.Section>
                            <Card.Section className={classes.section} mt="md">
                                <CartButtons product = {product}/>
                            </Card.Section>        
                        </Card>
                    </Grid.Col>

                </Grid>
            </Container>
        )
}

export default ProductFull
