import React, { forwardRef } from 'react'
import {
    createStyles,
    Header,
    ActionIcon,
    Group,
    Burger,
    Container,
    Text,
    Autocomplete, Avatar,
    Menu,
} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { ShoppingCart } from 'tabler-icons-react';
//import { Link } from 'react-router-dom';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState, useEffect, useRef } from 'react';
import UserDisplay from './UserDisplay';
import MenuInNav from './MenuInNav';
import { IProduct } from '../../helpers/types';
import * as api from "../../helpers/api"
import ThemeButton from './ThemeButton';
import CartIcon from './CartIcon';
import BurgerMenu from './BurgerMenu';
import { authState } from "../../redux/slices/authSlice";
import { useSelector } from "react-redux";
import clientPromise from '../../lib/db';
import { GetStaticProps , GetStaticPropsResult } from 'next';
import { InferGetStaticPropsType } from 'next'
import { ICategory, IBrand } from '../../helpers/types';

const useStyles = createStyles((theme) => ({
    search: {
        border: 'none',
    },
    inner: {
        height: 56,
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
    },

    links: {
        [theme.fn.smallerThan('sm')]: {
            display: 'none',
        },
    },

    burger: {
        [theme.fn.largerThan('sm')]: {
            display: 'none',
        },
    },

    link: {
        display: 'block',
        cursor: "pointer",
        lineHeight: 1,
        padding: '8px 12px',
        borderRadius: theme.radius.sm,
        textDecoration: 'none',
        color: theme.colorScheme === 'dark' ? theme.colors.dark[0] : theme.colors.gray[7],
        fontSize: theme.fontSizes.sm,
        fontWeight: 500,

        '&:hover': {
            backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[0],
        },
    },

    linkLabel: {
        marginRight: 5,

    },
    text: {
        display: 'block',

        padding: '8px 12px',
        borderRadius: theme.radius.sm,
        textDecoration: 'none',
        color: theme.colorScheme === 'dark' ? theme.colors.dark[0] : theme.colors.gray[7],
        //   fontSize: theme.fontSizes.sm,
        fontWeight: 700,

        '&:hover': {
            backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[0],
        },
    },
}));



export function Navbar(/* {categories}:X */) {
    
    const emptyProducts: IProduct[] = [];
    const [opened, { toggle }] = useDisclosure(false);
    const [products, setProducts]: [IProduct[], (category: IProduct[]) => void] = useState(emptyProducts)
    const { classes } = useStyles();
    const [userMenuOpened, setUserMenuOpened] = useState(false);
    const query = useRef<HTMLInputElement>(null);
   //const navigate = useNavigate()
    const router =useRouter()
    type IResult = {
        value: string;
        id: string,
        image: string,
        price: number
    }

    const Search = async (q: string) => {
        if (q === "" || q === undefined || q === null) { setProducts([]) }
        else {
            const SearchedData = await api.searchProducts(q)
            setProducts(SearchedData)
        }
    }

    const SearchedProducts = () => {

        let results: IResult[] = []

        products?.forEach((x) => {
            results.push({
                value: x.name,
                id: x._id,
                image: x.main_image,
                price: x.price
            })
        })
        return results

    }


    const { role } = useSelector(authState)

    useEffect(() => {
        
        if (query.current !== null) {
            if (query.current.value === ""
                || query.current.value === undefined
                || query.current.value === null)
                setProducts([])
            else
                Search(query.current.value)
        }

        return () => {
            setProducts([])
        };
    }, [query,role]);

    if (role==="admin")

        return null

    else 
    
    return (
        <Header height={60} mb={12}>
            <Container size="xl">
                <div className={classes.inner}>
                    <Link style={{ textDecoration: 'none', color: 'black' }} href="./">
                        <Text
                            size="xl"
                            color="dimmed"
                            className={classes.text}>
                            Home
                        </Text>
                    </Link>
                    <Autocomplete style={{ minWidth: "40%" }}
                        transition="pop-top-left"
                        transitionDuration={80}
                        transitionTimingFunction="ease"
                        radius="lg"
                        limit={10}
                        className={classes.search}
                        placeholder="Search"

                        data={SearchedProducts()}
                        ref={query}
                        itemComponent={forwardRef(({ value, id, image, price, ...others }, query) => {
                            // rendered results is causing an error,cant fix it
                            return (
                                <div {...others} ref={query}>

                                    <Group noWrap>
                                        <Avatar src={image} />

                                        <div>
                                            <Text>{value}</Text>
                                            <Text size="xs" color="dimmed">
                                                {price} $
                                            </Text>
                                        </div>
                                    </Group>

                                </div>
                            )
                        })}
                        onChange={() => {
                            if (query.current !== null) {
                                Search(query.current.value)
                            }
                        }}


                        onItemSubmit={(item) =>
                            router.push(`/productFull/${item.id}`)
                        }
                    />

                    <Group spacing={5} className={classes.links} >
                        <MenuInNav /* categories={categories} */ />
                    </Group>

                    <Group spacing={5} className={classes.links} >  {/*  maybe remove this group ?! */}
                    <Link href="/cart">
                        <ActionIcon component="a"  >
                            <CartIcon />
                        </ActionIcon>
                    </Link>
                    </Group>

                    <UserDisplay />
                    <ThemeButton /* hidden={opened} */ />

                    <BurgerMenu/>
                </div>
            </Container>
        </Header>
    );
}


interface X {
    categories :ICategory[]
}

/* export async function getStaticProps(): Promise<GetStaticPropsResult<X>> {
        await clientPromise
        const categories = await api.getCategories()
    
        return {
          props: {  categories:categories },
        }

    } */