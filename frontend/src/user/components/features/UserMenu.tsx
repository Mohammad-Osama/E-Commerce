import React, { useState } from 'react';
import {
  createStyles,
  UnstyledButton,
  Group,
  Text,
  Menu
} from '@mantine/core';

import {
  Logout,UserCircle ,
  Heart,
  Star,
  Message,
  Settings,
  ChevronDown,
} from 'tabler-icons-react';




const useStyles = createStyles((theme) => ({
    userMenu: {
      [theme.fn.smallerThan('xs')]: {
        display: 'none',
      },
    },
    user: {
      color: theme.colorScheme === 'dark' ? theme.colors.dark[0] : theme.black,
      padding: `${theme.spacing.xs}px ${theme.spacing.sm}px`,
      borderRadius: theme.radius.sm,
      transition: 'background-color 100ms ease',
  
      '&:hover': {
        backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.white,
      },
    },
    userActive: {
      backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.white,
    },
  }));

const UserMenu = () => {
    const { classes, theme, cx } = useStyles();
    const [userMenuOpened, setUserMenuOpened] = useState(false);


    return (
        <Menu
            size={222}
            placement="center"
            transition="pop-top-right"
            className={classes.userMenu}
            onClose={() => setUserMenuOpened(false)}
            onOpen={() => setUserMenuOpened(true)}
            control={
              <UnstyledButton
                className={cx(classes.user, { [classes.userActive]: userMenuOpened })}
              >
                <Group spacing={7}>
                  <UserCircle  size={24} />
                  <Text weight={500} size="sm" sx={{ lineHeight: 1 }} mr={3}>
                     Welcome 
                  </Text>
                  <ChevronDown size={12} />
                </Group>
              </UnstyledButton>
            }
          >
            <Menu.Item icon={<UserCircle size={18}  />}>
             Profile
            </Menu.Item>
            <Menu.Item icon={<Message size={18}  />}>
            Reviews
            </Menu.Item>
            <Menu.Item icon={<Star size={18}  />}>
             Orders
            </Menu.Item>
            <Menu.Label>Settings</Menu.Label>
            <Menu.Item icon={<Settings size={14} />}>Edit Profile</Menu.Item>
            <Menu.Item icon={<Logout size={14} />}>Logout</Menu.Item>
          </Menu>
    )
}

export default UserMenu
