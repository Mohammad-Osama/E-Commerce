import { IProduct } from "../helpers/types";
import {
  Card, Image, Text, Badge, Group, useMantineTheme,
  Indicator
} from '@mantine/core';

import { Rating } from '@smastrom/react-rating';
import CartButtons from "./CartButtons"
import { useRouter } from 'next/router';
//import { server } from "../config";
import Link from 'next/link'
import React, { useState, useEffect } from 'react'

interface X {
  product: IProduct;
}


const Product = ({ product }: X) => {
  const { _id, name, main_image, price, currency, stock, rating_count, rating_total, description, model } = product
  const theme = useMantineTheme();

  const router=useRouter()

useEffect(() => {
  //console.log(product)
}, [])
  return (
    <div style={{ width: "90%", margin: 'auto' }} >
      <Card shadow="sm" p="lg">
        <Card.Section mt="xs">
          <Link href='/productFull/[_id]' as={`/productFull/${_id}`}
         /*  href={{
            pathname: 'productFull/[id]',
            query: { post: 'post-1', comment: 'comment-1' },
          }} */
          >
          <Image src={main_image} mt="xl"
            alt="Product"
            radius={10}
            height={180}
            fit="contain"
            style={{ cursor: 'pointer' }}
            /* onClick={() => { router.push(`api/product/[id]`) }} */
          />
          </Link>
        </Card.Section>
        <Group position="center" spacing="xs" style={{ marginBottom: 5, marginTop: theme.spacing.sm }}>
          <Text weight={500}>{name}</Text>

          <Badge color="pink" variant="light" size="xl" >
            {price} {currency}
          </Badge>

          <Badge color="blue" variant="light" size="md" >
            {stock} in stock
          </Badge>

          {/* <Rating name="size-small"
                   
                    value={rating_total===0 || rating_count === 0
                      ? 0
                      : Math.round((product.rating_total / product.rating_count) )
                    }      
                  /> */}

          <Rating
            style={{ maxWidth: 100 }}
            value={rating_total===0 || rating_count === 0
              ? 0
              : Math.round((product.rating_total / product.rating_count) )
            }
            readOnly
          />
        </Group>

        <CartButtons product={product} />

      </Card>

    </div>
  )
}

export default Product
