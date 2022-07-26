import { useRef } from 'react';
import { createStyles, NumberInput, ActionIcon } from '@mantine/core';
import { Plus, Minus } from 'tabler-icons-react';

const useStyles = createStyles((theme : any) => ({ //any for error at borderColor
  wrapper: {
    marginTop: '18px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: `6px ${theme.spacing.xs}px`,
    borderRadius: theme.radius.sm,
    border: `1px solid ${theme.colorScheme === 'dark' ? 'transparent' : theme.colors.gray[3]}`,
    backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[5] : theme.white,
    '&:focus-within': {
      borderColor: theme.colors[theme.primaryColor][6] 
    },
  },

  control: {
    backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.white,
    border: `1px solid ${theme.colorScheme === 'dark' ? 'transparent' : theme.colors.gray[3]}`,
    '&:disabled': {
      borderColor: theme.colorScheme === 'dark' ? 'transparent' : theme.colors.gray[3],
      opacity: 0.5,
      backgroundColor: 'transparent'
    }
  },
  input: {
    textAlign: 'center',
    paddingRight: `${theme.spacing.sm}px !important`,
    paddingLeft: `${theme.spacing.sm}px !important`,
    height: 28,
    flex: 1
  }

}));

interface InputStockProps {
  value: number 
  formFunc : (input :number)=>void
}

export default function InputStock({ value , formFunc } :InputStockProps) {
  const { classes } = useStyles();
  const ref = useRef<any>(); // any bc kept getting errors below 

  return (
    <div style={{ width: '100%' }} className={classes.wrapper}>
      Add Stock
      <ActionIcon
        size={28}
        variant="transparent"
        onClick={() => ref.current.decrement()}
        disabled={value === 1}
        className={classes.control}
        onMouseDown={(e:any) => e.preventDefault()}
      >

        <Minus size={16} />
      </ActionIcon>
      <NumberInput
        variant='unstyled'
        min={1}
        handlersRef={ref}
        value={value}
        onChange={formFunc}
        classNames={{ input: classes.input }}
      />
      <ActionIcon
        size={28}
        variant="transparent"
        onClick={() => ref.current.increment()}
        className={classes.control}
        onMouseDown={(e: any) => e.preventDefault()}
      >
        <Plus size={16} />
      </ActionIcon>
    </div>
  )
}
