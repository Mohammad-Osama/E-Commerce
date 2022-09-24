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
  Settings,
  ChevronDown,
} from 'tabler-icons-react';

import { useSelector , useDispatch } from 'react-redux';
import { authState, logout } from '../redux/slices/authSlice';
import { AppDispatch } from '../redux/store';
import { useNavigate } from "react-router-dom";
import { Link } from 'react-router-dom';




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

    const { id , first_name ,last_name} = useSelector(authState)
    const dispatch = useDispatch<AppDispatch>()
    const navigate = useNavigate()

    return (
        <Menu
            /* size={222}
            placement="center"
            transition="pop-top-right"
            className={classes.userMenu} */

            width={260}
            position="bottom-end"
            transition="pop-top-right"

            onClose={() => setUserMenuOpened(false)}
            onOpen={() => setUserMenuOpened(true)}
            /* control={
              
            } */
          >
            <Menu.Target>
            <UnstyledButton
                className={cx(classes.user, { [classes.userActive]: userMenuOpened })}
              >
                <Group spacing={7}>
                  <UserCircle  size={24} />
                  <Text weight={500} size="sm" sx={{ lineHeight: 1 }} mr={3}>
                     {first_name} {last_name}
                  </Text>
                  <ChevronDown size={12} />
                </Group>
              </UnstyledButton>

            </Menu.Target>
            <Menu.Item  icon={<Settings size={18}/>}
                        component={Link} to={'/dashboard'} 
                                    >
             Dashboard
            </Menu.Item>
   {/*          <Menu.Item icon={<Message size={18}  />}>
            Reviews
            </Menu.Item>
            <Menu.Item icon={<Star size={18}  />}>
             Orders
            </Menu.Item>
            <Menu.Label>Settings</Menu.Label>
            <Menu.Item icon={<Settings size={18} />}>Edit Profile</Menu.Item> */}
            <Menu.Item icon={<Logout size={18} />}
                        onClick={()=>  {  dispatch(logout())
                                           navigate("./")        
                                                    }}
                 >
                Logout
            </Menu.Item>
          </Menu>
    )
}

export default UserMenu
