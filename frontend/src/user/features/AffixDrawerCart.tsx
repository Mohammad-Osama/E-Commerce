import { ShoppingCart, ShoppingCartX, ShoppingCartOff } from 'tabler-icons-react';
import { Affix, Tooltip, Group, Space, ScrollArea, Avatar, Badge, Button, Text, Transition, ActionIcon, Drawer, SimpleGrid, Divider } from '@mantine/core';
import React, { useState, useEffect } from 'react';
import { cartState, emptyAllCart } from '../redux/slices/cartSlice';
import { useSelector, useDispatch } from 'react-redux';
import { removeFromCart } from '../redux/slices/cartSlice';
import { showNotification } from '@mantine/notifications';


export default function AffixDrawerCart() {

  const [opened, setOpened] = useState(false);
  const [mount, setMount] = useState(true);

  const cartItems = useSelector(cartState)
  const totalCost = () => {
    let final = 0
    cartItems.map((item) => {
      let itemTotal = 0
      itemTotal = item.quantity * item.price
      final = final + itemTotal
    })
    return final
  }
  const dispatch = useDispatch()
  const removeFromCartFunction = (id: string, name: string): void => {
    dispatch(removeFromCart(id))
    showNotification({
      title: "Cart changed",
      message: `${name} has been removed from the cart`,
      color: 'red',
      icon: <ShoppingCartX />
    })
  }

  return (
    <>

      <Drawer position="right"
        size="lg"
        padding="xl"
        opened={opened}
        onClose={() => {
          setOpened(false)
          setMount(!mount)
        }
        }
        title="Cart"
      >
        <ScrollArea style={{ height: 500 }} type="auto" offsetScrollbars>
          {cartItems.length === 0 && <Text> cart is empty </Text>
          }

          {cartItems.map((item) => {
            return <React.Fragment key={item.id}>
              <SimpleGrid cols={4} spacing="sm" >
                <Avatar src={item.main_image} />
                <div>
                  <Text>{item.name}</Text>
                </div>
                <Badge color="green" variant="outline" size="md" >{item.quantity}</Badge>
                <ActionIcon onClick={() => { removeFromCartFunction(item.id, item.name) }}>
                  <Tooltip label="Remove from cart" position="bottom" radius="xl" color="red" >
                    <div>
                      <ShoppingCartOff size={30} color={'red'} />
                    </div>
                  </Tooltip>
                </ActionIcon>
              </SimpleGrid>
              <Space h="xl" />
            </React.Fragment>
          })
          }
          {cartItems.length > 0 &&
            <SimpleGrid cols={2} spacing="sm" >
              <Button fullWidth color="green">
                Checkout({totalCost()}) $
              </Button>
              <Button fullWidth color="red"
                onClick={() => { dispatch(emptyAllCart()) }}>
                Empty the cart </Button>
            </SimpleGrid>
          }
        </ScrollArea>
      </Drawer>

      <Affix position={{ top: 100, right: 10 }}>
        <Transition transition="slide-up" mounted={mount}>
          {(transitionStyles) => (
            <ActionIcon onClick={() => {
              setOpened(true)
              setMount(!mount)
            }
            } >
              <ShoppingCart size={30} />
            </ActionIcon>
          )}
        </Transition>
      </Affix>
    </>
  )
}
