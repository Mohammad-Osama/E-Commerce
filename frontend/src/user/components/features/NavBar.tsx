import React  from 'react'
import { createStyles, Header, ActionIcon, Group, Burger, Container,Text,Autocomplete } from '@mantine/core';
import { useBooleanToggle } from '@mantine/hooks';
import { ShoppingCart } from 'tabler-icons-react';
import { Link } from 'react-router-dom';
import { useNavigate } from "react-router-dom";
import { useState , useEffect , useRef} from 'react';
import UserDisplay from './UserDisplay';


const useStyles = createStyles((theme) => ({
    search: {
        border: 'none',
    },
    inner: {
        height: 56,
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
    },

    links: {
        [theme.fn.smallerThan('sm')]: {
            display: 'none',
        },
    },

    burger: {
        [theme.fn.largerThan('sm')]: {
            display: 'none',
        },
    },

    link: {
        display: 'block',
        lineHeight: 1,
        padding: '8px 12px',
        borderRadius: theme.radius.sm,
        textDecoration: 'none',
        color: theme.colorScheme === 'dark' ? theme.colors.dark[0] : theme.colors.gray[7],
        fontSize: theme.fontSizes.sm,
        fontWeight: 500,

        '&:hover': {
            backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[0],
        },
    },

    linkLabel: {
        marginRight: 5,
    },
}));



export function Navbar() {
    const [opened, toggleOpened] = useBooleanToggle(false);
    const { classes } = useStyles();
 
    return (
        <Header height={56} mb={12}>
            <Container>
                <div className={classes.inner}>
                    <Link style={{ textDecoration: 'none', color: 'black' }} to="./">
                        <h2>Home</h2>
                    </Link>
                    <Autocomplete 
                            transition="pop-top-left"
                            transitionDuration={80}
                            transitionTimingFunction="ease"
                            radius="lg"
                            limit={10}
                            className={classes.search}
                            placeholder="Search"
                         
                            data={['p', 'pp', 'ppp', 'pppp']}
                          
                />
                    <Group spacing={5} className={classes.links} >
                    <ActionIcon<typeof Link> component={Link} to="/cart" >
                        <ShoppingCart />
                    </ActionIcon>
                    <Text > Cart </Text>
                    </Group>
                
                    <UserDisplay/>
                    <Burger
                        opened={opened}
                        onClick={() => toggleOpened()}
                        className={classes.burger}
                        size="sm"
                    />
                </div>
            </Container>
        </Header>
    );
}
