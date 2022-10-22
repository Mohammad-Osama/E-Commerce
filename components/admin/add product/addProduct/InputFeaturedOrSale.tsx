import { Group, Button, SimpleGrid, NativeSelect, Select } from '@mantine/core';


interface InputProps {
    label: string
    placeholder: string
    value: any
    data:any
    formFunc: (input: boolean) => void
}


const InputFeaturedOrSale = ({label,placeholder,data,formFunc}:InputProps) => {
    return (
        <Select required
            label={label}
            placeholder={placeholder}
            data={data}
           // value ={value} 
            onSelect={(e) => {formFunc(data)
                            }   }
            itemComponent={data}
            
        />
    )
}

export default InputFeaturedOrSale
