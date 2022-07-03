import React, { useState } from 'react'
import { Text } from '@mantine/core';
import { Link } from 'react-router-dom';
import { authState } from '../../redux/slices/authSlice';
import { useSelector } from 'react-redux';
import UserMenu from './UserMenu';


const UserDisplay = () => {

    const userState = useSelector(authState)
    const { id } = userState
    if (id)
        return (
            <UserMenu />
        )
    else
        return (
            <Text size="sm" component={Link} to="/loginregister" >
                Login/Register
            </Text>
        )
}

export default UserDisplay
