import React, { ReactElement } from 'react'
import { Container, useMantineTheme, createStyles } from '@mantine/core';
//import { Navbar } from './navbar/NavBar';
//import AffixApp from './features/AffixApp';
//import AffixDrawerCart from './features/AffixDrawerCart';
import clientPromise from '../lib/db';
import { GetStaticProps , GetStaticPropsResult } from 'next';
import { InferGetStaticPropsType } from 'next'
import { ICategory, IBrand } from '../helpers/types';
import * as api from "../helpers/api"


const useStyles = createStyles((theme) => ({
    container: {
        color: theme.colorScheme === 'dark' ? theme.colors.dark[0] : theme.colors.gray[7],
        backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[5] : theme.colors.cyan[2],
        //    paddingbottom:"60px",
        position: "relative",
        minHeight: "100vh",

    },
}));
interface X {
    categories :ICategory[]
}
type LayoutProps = {
    children: React.ReactNode,
   /*  categories:ICategory[] */
};

const Layout = ({ children }: LayoutProps /* , {categories}:X */) => {
    const { classes } = useStyles()

    return (
        <div className={classes.container}>
            {/* <Navbar categories={categories}/> */}
              <main>{children}</main>
            {/* <AffixApp />
            <AffixDrawerCart /> */}
        </div>
    )
}

export default Layout


