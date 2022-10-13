import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { Provider } from "react-redux"
import store from '../redux/store'
import { PersistGate } from 'redux-persist/integration/react'
import { persistStore } from 'redux-persist';
import { NotificationsProvider } from '@mantine/notifications';
import { MantineProvider, ColorSchemeProvider, ColorScheme } from '@mantine/core';
import { ModalsProvider } from '@mantine/modals';
//import { Navbar } from '../components/navbar/NavBar';
import Layout from '../components/Layout';
import { ICategory, IBrand } from '../helpers/types';
import clientPromise from '../lib/db';
import { GetStaticProps, GetStaticPropsResult, GetServerSideProps, GetStaticPropsContext, GetServerSidePropsResult } from 'next';

import { InferGetStaticPropsType } from 'next'
import * as api from "../helpers/api"
import axios from "axios"
import '@smastrom/react-rating/style.css';
import { Category as CategoryModel } from '../models/categoryModel';
import { useDispatch } from 'react-redux';
import { useState, useEffect } from "react";
// import { getCategories } from '../redux/slices/categoriesSlice'
// import { AppDispatch } from '../redux/store';

interface asd extends AppProps {
    ccc: ICategory[]
}

let persistor = persistStore(store);



function MyApp({ Component, pageProps }: AppProps, /* { categories }: X */) {
    /*  const dispatch = useDispatch<AppDispatch>()
     useEffect(() => {
         dispatch(getCategories(""))
         
     }, []) */

    const [colorScheme, setColorScheme] = useState<ColorScheme>('dark');
    const toggleColorScheme = (value?: ColorScheme) =>
        setColorScheme(value || (colorScheme === 'dark' ? 'light' : 'dark'));
    return (
        <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}>
                <ColorSchemeProvider colorScheme={colorScheme} toggleColorScheme={toggleColorScheme}>
                    <MantineProvider theme={{
                        colorScheme,
                        breakpoints: {
                            xs: 500,
                            sm: 768,
                            md: 1000,
                            lg: 1200,
                            xl: 1400,
                        },
                    }} withGlobalStyles withNormalizeCSS>
                        <NotificationsProvider position="top-center" >
                            <ModalsProvider>
                                <Layout /* categories={categories} */>
                                    <Component {...pageProps} />
                                </Layout>
                            </ModalsProvider>
                        </NotificationsProvider>
                    </MantineProvider>
                </ColorSchemeProvider>
            </PersistGate>
        </Provider>

    )
}

export default MyApp


// when getServerSideProps can be done in _app.tsx

/* interface X {
    categories: ICategory[]
}

export async function getServerSideProps(context: GetStaticPropsContext): Promise<GetServerSidePropsResult<X>> {
    await clientPromise()
    try {
        const datacategories = await CategoryModel.find()
            .select(['-createdAt', '-updatedAt', '-__v'])
        const categories = datacategories.map((doc) => {
            const category = doc.toObject()
            category._id = category._id.toString()
            return category as ICategory
        })
        return {
            props: {
                categories: categories as ICategory[],
                 loadingProps: false
            },
        }

    } catch (error) {
        return {
            props: {
                categories: [],
                 loadingProps: false
            },
        }
    }
} */

/* export async function getStaticProps(): Promise<GetStaticPropsResult<X>> {
      try {
        await clientPromise
        const data = await fetch('http://localhost:3000/api/categories')
       const categories= data.json() as any
    console.log("categoes in app.ts" , categories)
        return {
          props: {  categories:categories },
        }
     } catch (e) {
        console.error(e)
        return {
            props: {  categories:"failed categories fetch " },
        }
     }
    } */