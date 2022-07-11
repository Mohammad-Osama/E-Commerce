import { useState, useEffect } from 'react'
import { useParams } from 'react-router'
import { useLocation } from 'react-router-dom'
import * as api from "../../helpers/api"
import { Loader, Container, SimpleGrid } from '@mantine/core';
import { IProduct } from '../../helpers/types'
import Product from '../features/Product'




const Browse = () => {

    const { id } = useParams()
    const location = useLocation()

    type LocationState = { type: string; };
    const { type } = location.state as LocationState

    const emptyProducts: IProduct[] = [];
    const [products, setProducts]: [IProduct[], (category: IProduct[]) => void] = useState(emptyProducts)

    async function getProductsByCategory(id: string) {
        const productsData = await api.getProductsByCategory(id)
        setProducts(productsData)
    }

    async function getProductsByBrand(id: string) {
        const productsData = await api.getProductsByBrand(id)
        setProducts(productsData)
    }


    useEffect(() => {
        if (type === "category") {
            getProductsByCategory(id as string)
        }
        else {
            getProductsByBrand(id as string)
        }
    }, [id])


    if (products === undefined)
    return <Loader />
  else

    return (
        <Container>
        <SimpleGrid cols={3} spacing="lg"
          breakpoints={[
            { maxWidth: 980, cols: 3, spacing: 'md' },
            { maxWidth: 755, cols: 2, spacing: 'sm' },
            { maxWidth: 600, cols: 1, spacing: 'sm' },
          ]} >

            {products.map((product) => {
                return <Product product={product}
                                key={product.id}   
                                />
                    })
                    }
        </SimpleGrid>
      </Container>
    )
}

export default Browse
