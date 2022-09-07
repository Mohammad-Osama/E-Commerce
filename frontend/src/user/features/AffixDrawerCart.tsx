import { ShoppingCart } from 'tabler-icons-react';
import { Affix, Group, Space, ScrollArea, Avatar, Badge, Button, Text, Transition, ActionIcon, Drawer, SimpleGrid, Divider } from '@mantine/core';
import React, { useState, useEffect } from 'react';
import { cartState } from '../redux/slices/cartSlice';
import { useSelector } from 'react-redux';


export default function AffixDrawerCart() {

  const [opened, setOpened] = useState(false);

  const cartItems = useSelector(cartState)

         console.log(cartItems)
  return (
    <>

      <Drawer position="right"
        size="lg"
        padding="xl"
        opened={opened}
        onClose={() => setOpened(false)}
        title="Cart"
      >
        <ScrollArea style={{ height: 500 }} type="auto" offsetScrollbars>
          {cartItems.length === 0 && <Text> cart is empty </Text>
          }

          {cartItems.map((item) => {
            return <React.Fragment key={item.id}>
              <SimpleGrid cols={3} spacing="sm" >
                <Avatar src={item.main_image} />
                <div>
                  <Text>{item.name}</Text>
                </div>
                <Badge color="pink" variant="light" size="md" >{item.quantity}</Badge>
              </SimpleGrid>
              <Space h="xl" />
            </React.Fragment>
          })
          }
        </ScrollArea>
      </Drawer>

      <Affix position={{ top: 100, right: 10 }}>
        <Transition transition="slide-up" mounted={true}>
          {(transitionStyles) => (
            <ActionIcon onClick={() => setOpened(true)} >
              <ShoppingCart size={30} />
            </ActionIcon>
          )}
        </Transition>
      </Affix>
    </>
  )
}
