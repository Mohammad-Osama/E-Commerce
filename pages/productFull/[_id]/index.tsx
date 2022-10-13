import React, { useState, useEffect } from 'react'
import {
    Grid, Container, Image, Loader, Card, Text, Badge, createStyles,
    useMantineTheme, Group, Indicator
} from '@mantine/core';
import * as api from "../../../helpers/api"
import { useRouter } from 'next/router';
//import { useParams } from 'react-router'
import { IProduct, IReview, IReviewInfo } from '../../../helpers/types';
import CartButtons from '../../../components/CartButtons';
import Review from '../../../components/Review';
import AddReview from '../../../components/AddReview';
import { Rating } from '@smastrom/react-rating';
import { authState } from '../../../redux/slices/authSlice';
import { useSelector } from 'react-redux';
import { GetStaticProps, GetStaticPropsResult, GetServerSideProps, GetStaticPropsContext, GetServerSidePropsResult } from 'next';
//import { server } from '../../../config';
import { Product as ProductModel }   from '../../../models/productModel';
import clientPromise from '../../../lib/db';


const ProductFull = ({productProps , loadingProps}:X) => {

    const useStyles = createStyles((theme) => ({
        card: {
            backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.white,
         //   minWidth: "100%", minHeight: "100%"
        },

        section: {
            borderBottom: `1px solid ${theme.colorScheme === 'dark' ? theme.colors.dark[4] : theme.colors.gray[3]
                }`,
            paddingLeft: theme.spacing.md,
            paddingRight: theme.spacing.md,
            paddingBottom: theme.spacing.md,
            paddingTop: theme.spacing.md,
        },

        like: {
            color: theme.colors.red[6],
        },

        label: {
            textTransform: 'uppercase',
            fontSize: theme.fontSizes.xs,
            fontWeight: 700,
        },
        container: {
            color: theme.colorScheme === 'dark' ? theme.colors.dark[0] : theme.colors.gray[7],
            backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[4] : theme.colors.cyan[1],

        }
    }));

    const { classes } = useStyles();
    const theme = useMantineTheme();

   /*  const router =useRouter()
    const {id}= router.query */
    //const { id } = useParams()

    const userState = useSelector(authState)

    const emptyProduct = {} as IProduct
    const emptyReviewInfo: IReviewInfo[] = [];


    // console.log("emptyProducttttt", emptyProduct)
    //  const [product, setProduct]: [IProduct, (product: IProduct) => void] = useState(emptyProduct)
    const [product, setProduct] = useState<IProduct>(emptyProduct)
    const [reviewInfo, setReviewInfo]: [IReviewInfo[], (category: IReviewInfo[]) => void] = useState(emptyReviewInfo)

    const emptyReviewProductUser = {} as IReview
    const [reviewProductUser, setReviewProductUser] = useState<IReview>(emptyReviewProductUser)




    async function getProduct(id: string) {
        const resData = await api.getProductById(id)
        setProduct(resData)
        // console.log("resDataaaa", resData)
    }

    async function getReviewInfo(id: string) {
        const resData = await api.getReviewInfo(id)
        setReviewInfo(resData)
        // console.log("resDataaa->ReviewInfo", resData)
    }

    async function getReviewProductUser(product: string, user: string) {
        const resData = await api.getReviewProductUser(product, user)
        setReviewProductUser(resData)
        //   console.log("resDataaa-----> ReviewProductUser", resData)
    }


    useEffect(() => {
        window.scrollTo(0, 0)
       /*  if (userState.id !== null) {
            getReviewProductUser(id as string, userState.id as string)
        } */
       // getProduct(id as string)
       // getReviewInfo(id as string)
       setProduct(productProps)
    }, [])


    if (product === undefined)
        return <Loader />
    else
        return (
            <Container mb="xl" px="md" pb="xl" className={classes.container}>
                <Grid m="xl"  >
                    <Grid.Col  xs={6}  >
                        <Image src={product.main_image}
                            alt="Product"
                            radius={10}
                            height={480}
                            fit="cover"
                            style={{ cursor: 'pointer' }}
                        />
                    </Grid.Col>

                    <Grid.Col xs={6}    >
                        <Card withBorder radius="md" p="md" className={classes.card}>

                            <Card.Section className={classes.section} >
                                <Group position="center">
                                    <Text size="xl" weight={500}>
                                        {product.name}
                                    </Text>
                                    <Badge size="lg">{product.model}</Badge>
                                    {/* <Indicator label={`${product.rating_count} reviews`}
                                               offset={-33}
                                               size={30}
                                              // color="teal"
                                               position="middle-end" 
                                            > </Indicator> */}
                                    {/* <Rating 
                                            size="small"
                                            value={product.rating_total === 0|| product.rating_count === 0
                                                ? 0
                                                : Math.round((product.rating_total / product.rating_count) ) 
                                            }   
                                        /> */}
                                    <Rating
                                        style={{ maxWidth: 100 }}
                                        value={product.rating_total === 0|| product.rating_count === 0
                                            ? 0
                                            : Math.round((product.rating_total / product.rating_count) ) 
                                        }
                                        readOnly
                                    />

                                </Group>

                            </Card.Section>
                            <Card.Section className={classes.section} mt="md">
                                <Text size="xl" mt="xs">
                                    {product.description}
                                </Text>

                            </Card.Section>

                            <Card.Section className={classes.section} mt="md">
                                <Group position="center">
                                    <Text size="xl" weight={500}
                                        style={{ textDecoration: product.sale > 0 ? "line-through" : "" }}
                                    >
                                        {product.price} {product.currency}
                                    </Text>
                                    {product.sale > 0 &&
                                        <>
                                            <Badge size="xl" variant="outline" color="red">
                                                {product.sale} % Sale
                                            </Badge>

                                            <Text size="xl" weight={500}>
                                                {product.price - (product.sale * product.price / 100)} {product.currency}
                                            </Text>
                                        </>
                                    }

                                    <Badge size="lg">{product.stock} in stock</Badge>
                                </Group>

                            </Card.Section>
                            <Card.Section className={classes.section} mt="md">
                                <CartButtons product={product} />
                            </Card.Section>
                        </Card>
                    </Grid.Col>

                </Grid>
                <Container>

                    {reviewProductUser.user && userState.id !== null

                        ? <>
                            <Text m="xl" size="xl" weight={500}>
                                My Review
                            </Text>
                            {reviewInfo.map((reviewInfo) => {
                                if (reviewInfo.id === reviewProductUser.id)
                                    return <Review reviewInfo={reviewInfo}
                                        key={reviewInfo.id}
                                    />
                            })}
                        </>
                        :  <div>asdasd</div>// <AddReview productID={id}/>
                            
                    }

                    <Text m="xl" size="xl" weight={500}>
                        Reviews
                    </Text>
                    {reviewInfo.map((reviewInfo) => {

                        return <Review reviewInfo={reviewInfo}
                            key={reviewInfo.id}
                        />
                    })
                    }
                </Container>

            </Container>
        )
}

export default ProductFull

interface X {
    productProps: IProduct
    loadingProps: boolean
}
const url = process.env.NEXT_PUBLIC_URL
export async function getServerSideProps(context:GetStaticPropsContext): Promise<GetServerSidePropsResult<X>> {
   await clientPromise()
    try {
        const product = await ProductModel.findById(context.params?._id)
                                          .lean()
                                          .select(['-createdAt', '-updatedAt' , '-__v'])
        product._id = product._id.toString()
        product.category = product.category.toString()
        product.brand = product.brand.toString()
        return {
            props: {
                productProps: product as IProduct,
                loadingProps: false
            },
        }

    } catch (error) {
        return {
            props: {
                productProps: {} as IProduct,
                loadingProps: true
            },
        }
    }
} 


/* export async function getStaticPaths() {
   // const url = process.env.NEXT_PUBLIC_URL
    const data = await fetch(`/api/products`)
    const allProducts = await data.json()as unknown as IProduct[]
    const ids = allProducts.map(prod=>prod._id)
    const paths = ids.map((x)=>({
        params:{id:x}
    }))
    return {
      paths,
      fallback: false, // can also be true or 'blocking'
    }
  } */
