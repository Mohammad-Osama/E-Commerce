import React, { useState, useEffect } from 'react'
import { Divider, SimpleGrid, Text, Grid } from '@mantine/core';
import { authState } from '../../redux/slices/authSlice';
import { useSelector } from 'react-redux';
import * as api from "../../../helpers/api"
import { IUser } from '../../../helpers/types';
const Profile = () => {

    const { id, first_name, last_name, email } = useSelector(authState)

    const emptyUser = {} as IUser

    const [user, setUser] = useState<IUser>(emptyUser)

    async function getUserData() {
        const resData = await api.getUserData()
        setUser(resData)
        console.log("resDataaaa", resData)
    }

    useEffect(() => {
        getUserData()
    }, [])

    return (
        <>
            <Text align="center">
                Profile
            </Text>

            <Divider />
            <Divider />
            <Divider />
            <Grid columns={3} >  {/* coupon to be shown speratly from its document,to show the value not the id  */}
                {Object.entries(user).filter(([key, _]) => key !== "id" && key!=="coupon").map(([key, value]) => {
                    return (
                        <>
                            <Grid.Col span={1}>
                                <div>{key} :</div>
                            </Grid.Col>
                            <Grid.Col span={2}>

                                <Text >
                                    <div>{value.toString()}</div>
                                </Text>
                            </Grid.Col>
                        </>
                    )
                }
                )
                }
                {!user.coupon &&
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
