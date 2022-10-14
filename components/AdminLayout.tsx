
import React, { ReactElement } from 'react'
import { Container, useMantineTheme, createStyles } from '@mantine/core';
import { Navbar } from './navbar/NavBar';
//import AffixApp from './features/AffixApp';
//import AffixDrawerCart from './features/AffixDrawerCart';
import clientPromise from '../lib/db';
import { GetStaticProps, GetStaticPropsResult } from 'next';
import { InferGetStaticPropsType } from 'next'
import { ICategory, IBrand } from '../helpers/types';
import * as api from "../helpers/api"
import { useState, useEffect } from "react";

import { authState, login, register, reset } from '../redux/slices/authSlice';
import { AppDispatch } from '../redux/store';
import { useDispatch, useSelector } from 'react-redux';
import TempUser from './TempUser';

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
    categories: ICategory[]
}
type LayoutProps = {
    children: React.ReactNode,
    /*  categories:ICategory[] */
};

const AdminLayout = ({ children }: LayoutProps) => {


    const { classes } = useStyles()
    const userState = useSelector(authState)

    const { role } = userState
    const dispatch = useDispatch<AppDispatch>()

        return (
            <div className={classes.container}>
                 <TempUser/>
                   <main>{children}</main>
            </div>
        )
}

export default AdminLayout


