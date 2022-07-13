import { Text } from '@mantine/core'
import { Link } from 'react-router-dom';


interface ITitleTextProps { // title would be needed if brands would be added later 
    title : string 
    type: string 
    typeId: string | undefined
   
}

const TitleText = ({ title , type, typeId  }: ITitleTextProps) => {

    if (type === "On Sale" || type === "Featured" || type === "Cart")
        return (
            <Text
                p="xl"
                align="justify"
                weight={700}
                color="blue"
                style={{ fontFamily: 'Greycliff CF, sans-serif', fontSize: "30px", minWidth: "60px" }}
            >
                {title}
            </Text>
        )
    else
        return (
           <Link to={`/browse/${typeId}`} 
                  state={{ type: type  }}
                  style={{ textDecoration: 'none' }}
                >
            <Text
                p="xl"
                align="justify"
                weight={700}
                color="blue"
                style={{ fontFamily: 'Greycliff CF, sans-serif', fontSize: "30px", minWidth: "60px" }}
            >
                {title}
            </Text>
            </Link>
        )
}

export default TitleText
