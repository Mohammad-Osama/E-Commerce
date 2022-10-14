import { Autocomplete ,Text} from '@mantine/core';
import { useRef ,forwardRef  } from 'react';
import { isTemplateExpression } from 'typescript';

interface InputProps {
    label:string
    placeholder: string,
    data: any
   formFunc: (input: string) => void
}
const InputBrandOrCategory = ({placeholder,data ,label, formFunc}:InputProps) => {
    const query = useRef(null);
    return (
        <Autocomplete transition="pop-top-left"
            transitionDuration={80}
            transitionTimingFunction="ease"
            size="md"
            limit={10}
            placeholder={placeholder}
            data={data}
            ref={query}
            required={true}
            label={label}
            itemComponent={forwardRef(({ id, value, ...others }, query) => {
                return (
                    <div {...others} ref={query}>
                        <Text>{value}</Text>
                    </div>
                )
            })}
            onItemSubmit={(item) =>
                formFunc(item.id)
            }
        />
    )
}

export default InputBrandOrCategory
