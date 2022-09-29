import { useEffect } from 'react';
import { Container, Title, Accordion, createStyles } from '@mantine/core';
import {about} from '../../helpers/data'
const useStyles = createStyles((theme) => ({
    wrapper: {
        paddingTop: theme.spacing.xl * 2,
        paddingBottom: theme.spacing.xl * 2,
        minHeight: 650,
    },

    title: {
        marginBottom: theme.spacing.xl * 1.5,
    },

    item: {
        borderRadius: theme.radius.md,
        marginBottom: theme.spacing.lg,
        whiteSpace:"pre-wrap",
        border: `1px solid ${theme.colorScheme === 'dark' ? theme.colors.dark[4] : theme.colors.gray[3]
            }`,
            
    },
}));


const About = () => {

    const { classes } = useStyles();

    useEffect(() => {
        window.scrollTo(0, 0)

    }, [])

    return (
        <Container size="md" className={classes.wrapper}>
            <Title align="center" className={classes.title}>
                About this application
            </Title>

            <Accordion variant="separated">
                <Accordion.Item className={classes.item} value="desc">
                    <Accordion.Control>Application Description</Accordion.Control>
                    <Accordion.Panel >{about.desc}</Accordion.Panel>
                </Accordion.Item>
                <Accordion.Item className={classes.item} value="features">
                    <Accordion.Control>Application Features</Accordion.Control>
                    <Accordion.Panel >{about.features}</Accordion.Panel>
                </Accordion.Item>

                <Accordion.Item className={classes.item} value="user">
                    <Accordion.Control>What a user can do </Accordion.Control>
                    <Accordion.Panel>{about.user}</Accordion.Panel>
                </Accordion.Item>
                <Accordion.Item className={classes.item} value="admin">
                    <Accordion.Control>What an admin can do </Accordion.Control>
                    <Accordion.Panel>{about.admin}</Accordion.Panel>
                </Accordion.Item>
                <Accordion.Item className={classes.item} value="accounts">
                    <Accordion.Control>Accounts to use</Accordion.Control>
                    <Accordion.Panel>{about.accounts}</Accordion.Panel>
                </Accordion.Item>
                <Accordion.Item className={classes.item} value="issues">
                    <Accordion.Control>Problems and Issues </Accordion.Control>
                    <Accordion.Panel>{about.issues}</Accordion.Panel>
                </Accordion.Item>
                <Accordion.Item className={classes.item} value="plans">
                    <Accordion.Control>Plans </Accordion.Control>
                    <Accordion.Panel>{about.plans}</Accordion.Panel>
                </Accordion.Item>
            </Accordion>
        </Container>
    )
}

export default About
