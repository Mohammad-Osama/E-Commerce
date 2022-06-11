import { Loader, Container, SimpleGrid, Text } from '@mantine/core';
import { useState, useEffect } from "react";
import * as api from "../../helpers/api"
import { ICategory, IProduct } from '../../helpers/types';




export default function Home () : JSX.Element { 

    const [products, setProducts] = useState<[IProduct][]>([])
    const [category, setCategory] = useState<[ICategory][]>([])
    const [loading, SetLoading] = useState<boolean>(false) 


    const update = async () => {
        await api.getCategories()
            .then((res) => {
              console.log("ccccccccccc ", res);
                setCategory(res as any);
            });
        // const limit= category?.length *6
        await api.getProducts()
            .then((res) => {
              console.log("pppppppppp ", res);
                setProducts(res as any);
            });
        SetLoading(true);
    }


    useEffect(() => {
       
        update()
        return () => {
            setCategory([]);
            setProducts([]);
        };
    }, [loading]);


    if (category === undefined || products === undefined) return <Loader />;
    else
    return (
        <Container my="md">
                <span>testing</span>
            </Container>
    )
}
