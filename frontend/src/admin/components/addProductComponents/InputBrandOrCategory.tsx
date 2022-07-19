import { Autocomplete ,Text} from '@mantine/core';
import { useRef ,forwardRef  } from 'react';

interface InputProps {
    placeholder: string,
    data: any
   formFunc: (input: string) => void
}
const InputBrandOrCategory = ({placeholder,data , formFunc}:InputProps) => {
    const query = useRef(null);
    return (
        <Autocomplete transition="pop-top-left"
            transitionDuration={80}
            transitionTimingFunction="ease"
            size="lg"
            limit={10}
            placeholder={placeholder}
            data={data}
            ref={query}
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
