import { useState, useEffect } from 'react'
import { useRouter } from 'next/router';
import { Loader, Container, SimpleGrid } from '@mantine/core';
import { IProduct } from '../../../helpers/types'
import Product from '../../../components/Product'
import {  GetServerSidePropsResult, GetServerSidePropsContext } from 'next';
import { Product as ProductModel } from '../../../models/productModel';
import clientPromise from '../../../lib/db';
import mongoose from "mongoose"


const Browse = ({ productsProps, loadingProps }: X) => {
  const router = useRouter()
  const { id } = router.query
  const emptyProducts: IProduct[] = [];
  const [products, setProducts]: [IProduct[], (category: IProduct[]) => void] = useState(emptyProducts)
  const [loading, SetLoading] = useState<boolean>(true)

  useEffect(() => {
    setProducts(productsProps)
    SetLoading(loadingProps)
  }, [id])


  if (loading === true)
    return <Loader width="100%"
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
              key={product._id}
            />
          })
          }
        </SimpleGrid>
      </Container>
    )
}

export default Browse

interface X {
  productsProps: IProduct[]
  loadingProps: boolean
}
export async function getServerSideProps(context: GetServerSidePropsContext): Promise<GetServerSidePropsResult<X>> {
  await clientPromise()
  try {
    const { id, type } = context.query
    let products: IProduct[] = []
    if (type === "category") {
      const ObjectId = mongoose.Types.ObjectId
      const finalID = new ObjectId(id as string);
      const resProducts = await ProductModel.find({ category: finalID })
        .limit(6)

      const dataProducts = resProducts.map((doc) => {
        const product = doc.toObject()
        product.category = product.category.toString()
        product.brand = product.brand.toString()
        product._id = product._id.toString()
        product.createdAt = product.createdAt.toString()
        product.updatedAt = product.updatedAt.toString()
        return product as IProduct
      })
      products = dataProducts

    }
    else {
      const ObjectId = mongoose.Types.ObjectId
      const finalID = new ObjectId(id as string);
      const resProducts = await ProductModel.find({ brand: finalID })
        .limit(6)

      const dataProducts = resProducts.map((doc) => {
        const product = doc.toObject()
        product.category = product.category.toString()
        product.brand = product.brand.toString()
        product._id = product._id.toString()
        product.createdAt = product.createdAt.toString()
        product.updatedAt = product.updatedAt.toString()
        return product as IProduct
      })
      products = dataProducts
    }
    return {
      props: {
        productsProps: products,
        loadingProps: false
      },
    }
  } catch (error) {
    return {
      props: {
        productsProps: [],
        loadingProps: true
      },
    }
  }
}
