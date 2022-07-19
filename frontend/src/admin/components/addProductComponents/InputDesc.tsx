import { Textarea } from '@mantine/core';


interface InputDescProps {
  data : { label: string,
           placeholder: string ,
           value: string } 
  formFunc : (input :string)=>void
}
export default function InputDesc({ data, formFunc } : InputDescProps) {
  return (
    <Textarea
      placeholder={data.placeholder}
      label={data.label}
      required
      value={data.value}
      onChange={(event) => formFunc(event.currentTarget.value)}
      autosize
      minRows={3}
      mt="md"
      style={{ width: '100%' }}
    />
  );
}
