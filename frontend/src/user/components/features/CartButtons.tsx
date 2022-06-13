import React from 'react'
import { ActionIcon ,Group , useMantineTheme} from '@mantine/core';
import { Plus, Minus } from 'tabler-icons-react';


const CartButtons = () => {
    const theme = useMantineTheme();

    return (
        <Group position="center" style={{ marginRight: '0px', gap: '10px', width: '90%', marginBottom: 5, marginTop: theme.spacing.sm }}>
            <ActionIcon
                size={28}
                variant="transparent"
               
            >
                <Plus size={16} />
            </ActionIcon>
            <span>qqqqq</span>
            <ActionIcon
                size={28}
                variant="transparent"
               
            >
                <Minus size={16} />
            </ActionIcon>
        </Group>
    )
}

export default CartButtons
