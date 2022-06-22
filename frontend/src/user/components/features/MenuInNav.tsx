import React from 'react'
import {
    Menu,
    Center,
    Loader,
} from '@mantine/core';
import { ChevronDown } from 'tabler-icons-react';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { ICategory, IBrand } from '../../../helpers/types';

import * as api from "../../../helpers/api"

const MenuInNav = (props :any) => {
    const classes = props.classes
    const emptyCategories: ICategory[] = [];
    const emptyBrands: IBrand[] = [];
    const [categories, setCategories]: [ICategory[], (category: ICategory[]) => void] = useState(emptyCategories)
    const [brands, setBrands]: [IBrand[], (category: IBrand[]) => void] = useState(emptyBrands)


    const getCategories = async () => {
        await api.getCategories()
            .then((res) => {
                setCategories(res as ICategory[]);
            });
    }

    const getBrands = async () => {
        await api.getBrands()
            .then((res) => {
                setBrands(res as IBrand[]);
            });
    }


    useEffect(() => {
        getCategories()
        getBrands()

        return () => {
            setCategories([])
            setBrands([])
        }
    },[]);

    if (categories === undefined && brands === undefined)
        return (
            <Loader />
        )
    else
        return (
            <>
                <Menu
                    placement="start"
                    gutter={1}
                    position="bottom"
                    control={
                        <a className={classes.link}>
                            <Center>
                                <span className={classes.linkLabel}>Categories</span>
                                <ChevronDown size={12} />
                            </Center>
                        </a>
                    }
                >
                    {categories?.map((x) => {
                        return <Menu.Item >
                                    {x.name}
                                </Menu.Item>
                          })}
                </Menu>

                <Menu
                    placement="start"
                    gutter={1}
                    position="bottom"
                    control={
                        <a className={classes.link}>
                            <Center>
                                <span className={classes.linkLabel}>Brands</span>
                                <ChevronDown size={12} />
                            </Center>
                        </a>
                    }
                >
                    {brands?.map((x) => {
                        return <Menu.Item>
                                 {x.name}
                               </Menu.Item>
                       })}
                </Menu>
            </>
        )
}

export default MenuInNav
