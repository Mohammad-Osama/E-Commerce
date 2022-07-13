import { createStyles, Container, Group, ActionIcon ,Image } from '@mantine/core';
import { BrandLinkedin, BrandYoutube, BrandInstagram, BrandGithub } from 'tabler-icons-react';



const useStyles = createStyles((theme) => ({
    footer: {
      marginTop: 20,
     
      borderTop: `1px solid ${
        theme.colorScheme === 'dark' ? theme.colors.dark[5] : theme.colors.gray[2]
      }`,
    },
  
    inner: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingTop: theme.spacing.xl,
      paddingBottom: theme.spacing.xl,
  
      [theme.fn.smallerThan('xs')]: {
        flexDirection: 'column',
      },
    },
  
    links: {
      [theme.fn.smallerThan('xs')]: {
        marginTop: theme.spacing.md,
      },
    },
  }));


const Footer = () => {
    const { classes } = useStyles();
    return (
        <div className={classes.footer}>
      <Container className={classes.inner}>
       <Image src ="/cart_17906.png"
              alt="cart"
              width={100}
              height={100}
              />
        <Group spacing={0} className={classes.links} position="right" noWrap>
        
          <ActionIcon size={55}
                      component ="a"   
                      href="https://www.linkedin.com/in/mohammad-osama-46131348/"                >
            <BrandLinkedin size={55} />
          </ActionIcon>
         
        </Group>
      </Container>
    </div>
    )
}

export default Footer
