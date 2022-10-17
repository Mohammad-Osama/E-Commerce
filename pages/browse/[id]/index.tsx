import { useState, useEffect } from 'react'
import { useRouter } from 'next/router';
import * as api from "../../../helpers/api"
import { Loader, Container, SimpleGrid } from '@mantine/core';
import { IProduct } from '../../../helpers/types'
import Product from '../../../components/Product'




const Browse = () => {
    const router =useRouter()
    const {id}= router.query
    type LocationState = { type: string; };
  //  const { type } = router.query.name as unknown as  LocationState // maybe change it 
  const { type } = router.query
   /*  const { id } = useParams()
    const location = useLocation() */

   // type LocationState = { type: string; };
    //const { type } = location.state as LocationState

    const emptyProducts: IProduct[] = [];
    const [products, setProducts]: [IProduct[], (category: IProduct[]) => void] = useState(emptyProducts)
    const [loading, SetLoading] = useState<boolean>(true)


    async function getProductsByCategory(id: string) {
        const productsData = await api.getProductsByCategory(id)
        setProducts(productsData)
        SetLoading(false)
    }

    async function getProductsByBrand(id: string) {
        const productsData = await api.getProductsByBrand(id)
        setProducts(productsData)
        SetLoading(false)
    }


    useEffect(() => {  // better conditions ?
        if (type === "category") {
            getProductsByCategory(id as string)
        }
        else {
            getProductsByBrand(id as string)
        }
    }, [id,loading])


    if (loading === true)
    return <Loader  width="100%"
                    size="xl" />
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
