import { Text } from '@mantine/core'


interface IAddTitleTextProps {
    title: string
    //   type: string 
}

const AddTitleText = ({ title }: IAddTitleTextProps) => {
    return (
        <Text
            p="xl"
            align="center"
            weight={400}
            color="blue"
            style={{
                fontFamily: 'Greycliff CF, sans-serif',
                fontSize: "30px",
                minWidth: "60px",
                //  borderStyle:"solid" ,
                //  borderColor:"yellow"	
            }}
        >
            {title}
        </Text>
    )
}

export default AddTitleText
