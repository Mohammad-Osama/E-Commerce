import { Navbar, Group, Code, ScrollArea, createStyles,
     Image ,Box ,ThemeIcon } from '@mantine/core';
import { Logout } from 'tabler-icons-react';
//import { UserButton } from '../UserButton/UserButton';
import { LinksGroup } from './LinksGroup';
import { Logo } from "../components/Logo";
import { navbarAdminData } from '../../helpers/data';
import { useDispatch } from 'react-redux';
import { logout } from '../../user/redux/slices/authSlice';
import { AppDispatch } from '../../user/redux/store';
import {  useNavigate } from 'react-router-dom';


const useStyles = createStyles((theme) => ({
    navbar: {
        backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.white,
        // paddingBottom: 0,
    },

    header: {
        padding: theme.spacing.md,
        paddingTop: 0,
        marginLeft: -theme.spacing.md,
        marginRight: -theme.spacing.md,
        color: theme.colorScheme === 'dark' ? theme.white : theme.black,
        borderBottom: `1px solid ${theme.colorScheme === 'dark' ? theme.colors.dark[4] : theme.colors.gray[3]
            }`,
    },

    links: {
        marginLeft: -theme.spacing.md,
        marginRight: -theme.spacing.md,
    },

    linksInner: {
        paddingTop: theme.spacing.xl,
        paddingBottom: theme.spacing.xl,
    },

    footer: {
        marginLeft: -theme.spacing.md,
        marginRight: -theme.spacing.md,
        borderTop: `1px solid ${theme.colorScheme === 'dark' ? theme.colors.dark[4] : theme.colors.gray[3]
            }`,
    },
    linkIcon: {
        color: theme.colorScheme === 'dark' ? theme.colors.dark[2] : theme.colors.gray[6],
        marginRight: theme.spacing.sm,
    },
    link: {
        ...theme.fn.focusStyles(),
        display: 'flex',
        alignItems: 'center',
        textDecoration: 'none',
        fontSize: theme.fontSizes.sm,
        color: theme.colorScheme === 'dark' ? theme.colors.dark[1] : theme.colors.gray[7],
        padding: `${theme.spacing.xs}px ${theme.spacing.sm}px`,
        borderRadius: theme.radius.sm,
        fontWeight: 500,

        '&:hover': {
            backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.colors.gray[0],
            color: theme.colorScheme === 'dark' ? theme.white : theme.black,


        },
    },
}));
interface NavBarAdminProps {
    hidden: boolean
    handleClick: (t: string) => void
}

const NavBarAdmin = ({ hidden, handleClick }: NavBarAdminProps) => {

    const { classes } = useStyles();
    const links = navbarAdminData.map((item) => <LinksGroup {...item} key={item.label} handleClick={handleClick} />);

    const dispatch = useDispatch<AppDispatch>()
    const navigate = useNavigate()

    
    return (
        <Navbar hidden={hidden} hiddenBreakpoint="xs" height={500} width={{ sm: 200, lg: 300 }} p="md" className={classes.navbar}>
            <Navbar.Section className={classes.header}>
                <Group position="apart">
                    {/*  <Logo width={120} /> */}

                    <Image src="/cart_17906.png"
                        alt="cart"
                        width={50}
                        height={50}
                    />
                    <Code sx={{ fontWeight: 700 }}>v1.0.1</Code>
                </Group>
            </Navbar.Section>

            <Navbar.Section grow className={classes.links}  >
                <ScrollArea style={{ height: 350 }} offsetScrollbars>
                   
                    <div className={classes.linksInner}>{links}</div>
                </ScrollArea>
            </Navbar.Section>

            <Navbar.Section mt="xs" className={classes.footer}>
                <a href="#" className={classes.link} onClick={(event) => {event.preventDefault()
                                                                          dispatch(logout())
                                                                          navigate("/") }                   }>
                    <Logout className={classes.linkIcon} />
                    <span>Logout</span>
                </a>
            </Navbar.Section>
        </Navbar>
    )
}

export default NavBarAdmin
