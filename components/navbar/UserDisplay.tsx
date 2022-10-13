import { Text } from '@mantine/core';
import Link from 'next/link';
import { authState } from '../../redux/slices/authSlice';
import { useSelector } from 'react-redux';
import UserMenu from './UserMenu';


const UserDisplay = () => {

    const { id } = useSelector(authState)

    if (id)
        return (
            <UserMenu />
        )
    else
        return (
            <Link href="/login" passHref >
                <Text style={{ padding: '8px 12px', }} size="sm" component="a" >
                    Login
                </Text>
            </Link>
        )
}

export default UserDisplay
