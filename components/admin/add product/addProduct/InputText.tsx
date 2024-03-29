import { useState } from 'react';
import { TextInput, createStyles } from '@mantine/core';

const useStyles = createStyles((theme ,{ floating }: { floating: boolean }) => ({
  root: {
    marginBottom: '23px',
    position: 'relative',
    width: '100%',
  },

  label: {
    position: 'absolute',
    zIndex: 2,
    top: 7,
    left: theme.spacing.sm,
    pointerEvents: 'none',
    color: floating
      ? theme.colorScheme === 'dark'
        ? theme.white
        : theme.black
      : theme.colorScheme === 'dark'
        ? theme.colors.dark[3]
        : theme.colors.gray[5],
    transition: 'transform 150ms ease, color 150ms ease, font-size 150ms ease',
    transform: floating ? `translate(-${theme.spacing.sm}px, -28px)` : 'none',
    fontSize: floating ? theme.fontSizes.xs : theme.fontSizes.sm,
    fontWeight: floating ? 500 : 400,
  },

  required: {
    transition: 'opacity 150ms ease',
    opacity: floating ? 1 : 0,
  },

  input: {
    '&::placeholder': {
      transition: 'color 150ms ease',
      color: !floating ? 'transparent' : undefined,
    },
  },
}));

interface InputTextProps {
  data : { label: string,
           placeholder: string ,
           value: string } 
  formFunc : (input :string)=>void
}

export default function InputText({ data, formFunc } : InputTextProps) {
  const [focused, setFocused] = useState(false);
  const { classes } = useStyles({ floating: data.value.trim().length !== 0 || focused });

  return (
    <TextInput
      label={data.label}
      placeholder={data.placeholder}
      required
      classNames={classes}
      value={data.value}
      onChange={(event) => formFunc(event.currentTarget.value)}
      onFocus={() => setFocused(true)}
      onBlur={() => setFocused(false)}
      mt="md"
      autoComplete="nope"
      radius='md'
      disabled={data.label==="Coupon Name"
                ? true
                :false
              }
    />
  );
}
