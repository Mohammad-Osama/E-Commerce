import React, { useState, useEffect } from 'react';
import { createStyles, Box, Text, Group, Container, Grid, Paper } from '@mantine/core';
import { ListSearch } from 'tabler-icons-react';
import Profile from '../features/Profile';
import { useSelector } from 'react-redux';
import { authState } from '../../redux/slices/authSlice';
import { useNavigate } from 'react-router';
import ErrorPage from './ErrorPage';

const LINK_HEIGHT = 38;
const INDICATOR_SIZE = 10;
const INDICATOR_OFFSET = (LINK_HEIGHT - INDICATOR_SIZE) / 2;

const useStyles = createStyles((theme) => ({
  link: {
    ...theme.fn.focusStyles(),
    display: 'block',
    textDecoration: 'none',
    color: theme.colorScheme === 'dark' ? theme.colors.dark[0] : theme.black,
    lineHeight: `${LINK_HEIGHT}px`,
    fontSize: theme.fontSizes.sm,
    height: LINK_HEIGHT,
    borderTopRightRadius: theme.radius.sm,
    borderBottomRightRadius: theme.radius.sm,
    borderLeft: `2px solid ${theme.colorScheme === 'dark' ? theme.colors.dark[4] : theme.colors.gray[2]
      }`,


    '&:hover': {
      backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[0],

    },
  },

  linkActive: {
    fontWeight: 500,
    color: theme.colorScheme === 'dark' ? theme.colors.dark[0] : theme.colors.gray[7],

  },

  links: {
    position: 'relative',

  },

  indicator: {
    transition: 'transform 150ms ease',
    border: `2px solid `,
    backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.white,
    height: INDICATOR_SIZE,
    width: INDICATOR_SIZE,
    borderRadius: INDICATOR_SIZE,
    position: 'absolute',
    left: -INDICATOR_SIZE / 2 + 1,
    borderColor: "lightskyblue",
  },
}));


/* interface TableOfContentsFloatingProps {
  links: { label: string; link: string; order: number }[];
}
 */

const Dashboard = () => {
  const links = [
    {
      "label": "Profile",
      "link": "#Profile",
      "order": 1
    },
    {
      "label": "Reviews",
      "link": "#Reviews",
      "order": 1
    },
    {
      "label": "Orders",
      "link": "#Orders",
      "order": 1
    },
    {
      "label": "Edit Profile",
      "link": "#Edit Profile",
      "order": 1
    },
    {
      "label": "Reset Password",
      "link": "#Reset",
      "order": 1
    },
    {
      "label": "Logout",
      "link": "#Logout",
      "order": 1
    },
    /* {
      "label": "Examples",
      "link": "#1",
      "order": 1
    },
    {
      "label": "Show on focus",
      "link": "#2",
      "order": 2
    },
    {
      "label": "Show on hover",
      "link": "#3",
      "order": 2
    },
    {
      "label": "With form",
      "link": "#4",
      "order": 2
    } */
  ]

  const { classes, cx } = useStyles();
  const [active, setActive] = useState(0);
  const [type, setType] = useState("Profile");

  const items = links.map((item, index) => (
    <Box<'a'>
      component="a"
      href={item.link}
      onClick={(event) => {
        event.preventDefault();
        setActive(index)
        setType(item.label)
      }}
      key={item.label}
      className={cx(classes.link, { [classes.linkActive]: active === index })}
      sx={(theme) => ({ paddingLeft: item.order * theme.spacing.lg })}
      style={{ borderColor: "lightskyblue" }}
    >
      <Text weight={active === index
        ? 800
        : 400
            } >
        {item.label}
      </Text>
    </Box>
  ));

  const {id} = useSelector(authState)
  const navigate = useNavigate()

  useEffect(() => {
   
  }, [type , id])

  if (id===null)
   return (   
     <ErrorPage/>  
   )
   else 

            // margin and padding for the container to be done later 
  return (
    <Container size="lg" mb="xl"  >  
      <Grid m="xl" columns={12}>
        <Grid.Col span={4}>
          <Group mb="md">
            <ListSearch size={18} />
            <Text>Profile and options </Text>
          </Group>
          <div className={classes.links}>
            <div
              className={classes.indicator}
              style={{ transform: `translateY(${active * LINK_HEIGHT + INDICATOR_OFFSET}px)`, }}
            />
            {items}
          </div>
        </Grid.Col>
        <Grid.Col span={8}>
          <Paper shadow="sm" p="xl" withBorder style={{ minHeight: "100%" }}>
            {type === "Profile"
              ? <Profile/>
              : type === "Reviews"
                ? "Reviews"
                : type === "Orders"
                  ? "Orders"
                  : type === "Edit Profile"
                    ? "Edit Profile"
                    : type === "Reset Password"
                      ? "Reset Password"
                      : type === "Logout"
                        ? "Logout"
                        : "Error!"
            }
          </Paper>
        </Grid.Col>
      </Grid>
    </Container>
  )
}

export default Dashboard
