import { createStyles, Container, Title, Text, Button ,Group} from '@mantine/core';
import { useNavigate } from 'react-router';

const useStyles = createStyles((theme) => ({
    root: {
      paddingTop: 80,
      paddingBottom: 80,
    },
  
    label: {
      textAlign: 'center',
      fontWeight: 900,
      fontSize: 220,
      lineHeight: 1,
      marginBottom: theme.spacing.xl * 1.5,
      color: theme.colorScheme === 'dark' ? theme.colors.dark[1] : theme.colors.gray[6],
  
      [theme.fn.smallerThan('sm')]: {
        fontSize: 120,
      },
    },
  
    title: {
      fontFamily: `Greycliff CF, ${theme.fontFamily}`,
      textAlign: 'center',
      fontWeight: 900,
      fontSize: 38,
  
      [theme.fn.smallerThan('sm')]: {
        fontSize: 32,
      },
    },
  
    description: {
      maxWidth: 500,
      margin: 'auto',
      marginTop: theme.spacing.xl,
      marginBottom: theme.spacing.xl * 1.5,
    },
    control: {
        [theme.fn.smallerThan('sm')]: {
          width: '100%',
        },
      },
  }));


const ErrorPage = () => {

    const { classes } = useStyles()
    const navigate = useNavigate()

    return (
        <Container className={classes.root}>
        <div className={classes.label}>404</div>
        <Title className={classes.title}>Page Not Found</Title>
        <Text  size="lg" align="center" className={classes.description}>
            The page you are trying to open does not exist.
        </Text>
        <Group position="center">
          <Button variant="outline" size="md" mt="xl" className={classes.control}
                  onClick={()=>navigate('/')}>
            Home page
          </Button>
        </Group>
      </Container>
    );
    
}

export default ErrorPage
