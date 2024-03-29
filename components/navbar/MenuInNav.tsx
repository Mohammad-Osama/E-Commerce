import {
    Menu,
    Center,
    Loader,createStyles,
} from '@mantine/core';
import { ChevronDown } from 'tabler-icons-react';
import { useState, useEffect } from 'react';
import { ICategory, IBrand } from '../../helpers/types';
import * as api from "../../helpers/api"
import { useRouter } from 'next/router';
import { NextLink } from '@mantine/next';




const useStyles = createStyles((theme) => ({
   
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
}));


interface X {
    categories :ICategory[]
}
  
const MenuInNav = (/* {categories}:X  */) => {
   // const classes = props.classes
   const { classes } = useStyles();
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

    const router =useRouter()


    useEffect(() => {
        getCategories()
        getBrands()
        return () => {
            setCategories([])
            setBrands([])
        }
    }, []);

    if (categories === undefined || brands === undefined)
        return (
            <Loader />
        )
    else
        return (
            <>
                <Menu trigger="click"
                      withArrow
                      offset={15}
                      width={200}
                      position="bottom-end"
                      transition="pop-top-right"
                >

                    <Menu.Target>
                        <a className={classes.link}>
                            <Center>
                                <span className={classes.linkLabel}>Categories</span>
                                <ChevronDown size={12} />
                            </Center>
                        </a>

                    </Menu.Target>
                    <Menu.Dropdown>

                        {categories?.map((x) => {
                            return <Menu.Item key={x.name}   // can add an icon if needed 
                                   /*  onClick={()=>
                                        router.push({{ pathname: '/about', query: { name: 'test' } }})
                                    } */
                                    component={NextLink}
                                    href={{ pathname: `/browse/${x.id}`, query: { type: 'category'}}}
                               /*  component={Link} to={`/browse/${x.id}`}
                                state={{ type: "category" }} */
                            >
                                {x.name}
                            </Menu.Item>
                        })}
                    </Menu.Dropdown>

                </Menu>

                <Menu trigger="click"
                      withArrow
                      offset={15}
                      width={200}
                      position="bottom-end"
                      transition="pop-top-right"

                >
                    <Menu.Target>

                        <a className={classes.link} >
                            <Center>
                                <span className={classes.linkLabel}>Brands</span>
                                <ChevronDown size={12} />
                            </Center>
                        </a>
                    </Menu.Target>
                    <Menu.Dropdown>
                        {brands?.map((x) => {
                            return <Menu.Item key={x.name}   // can add an icon if needed

                            component={NextLink}
                            href={{ pathname: `/browse/${x.id}`, query: { type: 'brand'}}}
                            >
                                {x.name}
                            </Menu.Item>
                        })}

                    </Menu.Dropdown>

                </Menu>
            </>
        )
}

export default MenuInNav
