import React, { ReactElement } from "react";
import { IProduct } from "../../../helpers/types";
import {
    Card, Image, Text, Badge, Group, useMantineTheme,
    ActionIcon, Grid, SimpleGrid, FloatingTooltip
  } from '@mantine/core';


import CartButtons from "./CartButtons"

interface X {
    product :IProduct;
   
  }


const Product = ({ product } : X) => {
  const  { id, name, main_image, price, currency, stock, vote_count, vote_total, description, model } = product
  const theme = useMantineTheme();




    return (
        <div style={{ width: "90%", margin: 'auto'}} >
        <Card shadow="sm" p="lg">
           <Card.Section>
              <Image src={main_image}
                alt="Product"
                radius={10}
                height={180}
                fit="contain"
                style={{ cursor: 'pointer' }}
              />
            </Card.Section>
              <Group position="center" spacing="xs"  style={{ marginBottom: 5, marginTop: theme.spacing.sm }}>
              <Text weight={500}>{name}</Text>
              <Badge color="pink" variant="light" size="xl" >
                  {price} {currency}
                </Badge>
                <Badge color="blue" variant="light" size="md" >
                  {stock} in stock
                </Badge>
              </Group>  
              <CartButtons product = {product}/>
        </Card>
        
      </div>
    )
}

export default  Product
