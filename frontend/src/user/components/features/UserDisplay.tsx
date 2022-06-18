import React from 'react'
import { Text } from '@mantine/core';
import { Link } from 'react-router-dom';


const UserDisplay = () => {
    return (
        <Text size="sm" component={Link} to="/loginregister" >
                Login/Register
        </Text>
    )
}

export default UserDisplay
