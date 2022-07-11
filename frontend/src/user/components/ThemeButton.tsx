import { useMantineColorScheme, SegmentedControl, Group, Center, Box, ColorScheme } from '@mantine/core';
import { Sun, Moon } from 'tabler-icons-react';


const ThemeButton = () => {

    const { colorScheme, toggleColorScheme } :{colorScheme : ColorScheme , toggleColorScheme : (colorScheme: ColorScheme) => void } = useMantineColorScheme();
   
    return (
        <Group position="center" my="xl">
            <SegmentedControl
                value={colorScheme}
                onChange={toggleColorScheme}
                data={[
                    {
                        value: 'light',
                        label: (
                            <Center>
                                <Sun size={16} />
                                <Box ml={10}>Light</Box>
                            </Center>
                        ),
                    },
                    {
                        value: 'dark',
                        label: (
                            <Center>
                                <Moon size={16} />
                                <Box ml={10}>Dark</Box>
                            </Center>
                        ),
                    },
                ]}
            />
        </Group>
    )
}

export default ThemeButton
