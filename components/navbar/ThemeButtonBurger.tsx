import {
    createStyles,
    UnstyledButton,
    Text,
    Center,
    useMantineColorScheme,
    Group,
  } from '@mantine/core';
  import { upperFirst } from '@mantine/hooks';
  import { Sun, Moon } from 'tabler-icons-react';
  
  const useStyles = createStyles((theme) => ({
    control: {
      backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.colors.gray[0],
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      borderRadius: 1000,
      paddingLeft: theme.spacing.sm,
      paddingRight: 4,
      width: 136,
      height: 36,
    },
  
    iconWrapper: {
      height: 28,
      width: 28,
      borderRadius: 28,
      backgroundColor: theme.colorScheme === 'dark' ? theme.colors.yellow[4] : theme.colors.dark[4],
      color: theme.colorScheme === 'dark' ? theme.black : theme.colors.blue[2],
    },
  
    value: {
      lineHeight: 1,
    },
  }));


  interface X {
    toggle: () => void;
  }
const ThemeButtonBurger = ({toggle}:X) => {
    const { classes } = useStyles();
  const { colorScheme, toggleColorScheme } = useMantineColorScheme();
  const Icon = colorScheme === 'dark' ? Sun : Moon;
    return (
        <Group position="center" my="xl">
        <div    // changed to div, error with nested buttons 
          aria-label="Toggle theme"
          className={classes.control}
          onClick={() =>{ toggleColorScheme()
                          toggle() }                 }
          title="Ctrl + J"
        >
          <Text size="sm" className={classes.value}>
            {upperFirst(colorScheme === 'light' ? 'dark' : 'light')} theme
          </Text>
  
          <Center className={classes.iconWrapper}>
            <Icon size={18}/>
          </Center>
        </div>
      </Group>
    )
}

export default ThemeButtonBurger
