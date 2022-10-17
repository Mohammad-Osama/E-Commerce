import React, { useState, useEffect } from 'react'
import { Divider, SimpleGrid, Text, Grid } from '@mantine/core';
import { authState } from '../redux/slices/authSlice';
import { useSelector } from 'react-redux';
import * as api from "../helpers/api"
import { IUser } from '../helpers/types';
import { Loader } from 'tabler-icons-react';
const Profile = () => {
    // not needed ?
    const { id, first_name, last_name, email } = useSelector(authState)

    const emptyUser = {} as IUser

    const [user, setUser] = useState<IUser>(emptyUser)
    const [userMapped, setUserMapped] = useState<any>()
    const [loading, setLoading] = useState(true)

    async function getUserData() {
        const resData = await api.getUserData()
        const mapped = new Map<any, any>([
            ["First Name", resData.first_name],
            ["Last Name", resData.last_name],
            ["Email", resData.email],
            ["Birthday", resData.birthday],
            ["Phone", resData.phone],
            ["Address", resData.address],
            ["Country", resData.country],
        ])


        let obj = []
        for (const [key, value] of mapped) {
            obj.push({ key, value });
        }
        setUser(resData)
        setUserMapped(obj)
        setLoading(false)




    }

    useEffect(() => {
        getUserData()
    }, [loading])


    if (loading === true)
        return (
            <Loader />
        )
    else

        return (
            <>

                <Divider label={
                            <>
                                <Text align="center">
                                    Profile
                                </Text>
                            </>
                         } 
                         labelPosition="center"
                          size="lg" />

                <Grid columns={3} mt="md">  {/* coupon to be shown speratly from its document,to show the value not the id  */}
                    {userMapped?.map((item: any) => {
                        return (
                            <React.Fragment key={item.key}>
                                <Grid.Col span={1}>
                                    <div>{item.key} :</div>
                                </Grid.Col>
                                <Grid.Col span={2}>
                                    <Text >
                                        <div>{item.value.toString()}</div>
                                    </Text>
                                </Grid.Col>
                            </React.Fragment>
                        )
                    }
                    )
                    }
                    {!user.coupon &&  // to be done later 
                        <>
                            <Grid.Col span={1}>
                                <div>coupon :</div>
                            </Grid.Col>
                            <Grid.Col span={2}>

                                <Text >
                                    <div> </div>
                                </Text>

                            </Grid.Col>
                        </>
                    }

                </Grid>
            </>
        )
}

export default Profile
