import React from 'react'
import { Divider, SimpleGrid, Text, Grid } from '@mantine/core';
import { authState } from '../../redux/slices/authSlice';
import { useSelector } from 'react-redux';

const Profile = () => {

    const {id , first_name , last_name , email} = useSelector(authState)

    return (
        <>
            <Text align="center">
                Profile
            </Text>

            <Divider />
            <Divider />
            <Divider />
            <Grid columns={3} >
                <Grid.Col span={1}>

                    loop with object enteries like in the recent tabs 
                    <Text align="center" >
                        hhgd
                    </Text>

                </Grid.Col>
                <Grid.Col span={2}>

                    <Text >
                        dfgdddss
                    </Text>
                </Grid.Col>

            </Grid>
        </>
    )
}

export default Profile
