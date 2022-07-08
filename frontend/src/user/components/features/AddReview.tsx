import React, { useEffect } from 'react'
import { Textarea, Text, Paper, Button, Group, TextInput } from '@mantine/core';
import { AlertCircle } from 'tabler-icons-react';
import { Rating } from '@mui/material';
import { useForm } from '@mantine/hooks';
import { authState } from '../../redux/slices/authSlice';
import { useSelector } from 'react-redux';
import * as api from '../../../helpers/api'
import { IReviewaddForm } from '../../../helpers/types';
import { showNotification } from '@mantine/notifications'


interface AddReviewProps {
    productID: string | undefined,

}
const AddReview = (props: AddReviewProps) => {

    const { id } = useSelector(authState)
    const form = useForm({
        initialValues: {
            title: '',
            text: '',
            rating: 0 as number | null,
            user: id,
            product: props.productID,
        },

    });


     const handelSubmit = async () =>  {
        console.log("form review ", form.values)

        if (form.values.rating===0)
         {
            showNotification({
                title: "Error ",
                message: "Please add a rating ",
                color: 'red',
                icon: <AlertCircle />,
              })
              return
         }
        const { title, text, rating, user, product } = form.values
            const reviewAddInfo :IReviewaddForm = {
                title :title,
                text : text ,
                rating : rating ,
                user : user,
                product : product
        }

      await  api.addReview(reviewAddInfo)
    }


    useEffect(() => {

        console.log("form review ", form.values)
    }, [])


    return (
        <Paper withBorder radius="md" mx="xl">
            {/* <Text  mx="xl">
            Add a comment
        </Text> */}
            <form onSubmit={form.onSubmit(handelSubmit)}>
                <Group direction="column"
                    grow
                    spacing="xs"
                >
                    <TextInput style={{ width: "20%" }}
                        size="md"
                        m="xl"
                        /*   labelProps={{style:{fontSize:"15px"}}} */
                        required
                        label="Title"
                        placeholder="Enter a title"
                        value={form.values.title}
                        onChange={(event) => form.setFieldValue('title', event.currentTarget.value)}
                    />
                    <Textarea mx="xl"
                        placeholder="Your review"
                        label="Add a review"
                        radius="md"
                        size="md"
                        required
                        /*  icon={<LetterC/>} */
                        autosize
                        minRows={3}
                        maxRows={3}
                        value={form.values.text}
                        onChange={(event) => form.setFieldValue('text', event.currentTarget.value)}

                    />
                </Group>
                <Group spacing="xl" position="center" m="xl">

                    <Rating  aria-required={true}

                        size="large"
                        value={form.values.rating}
                        onChange={(event, newValue) => {
                            form.setFieldValue('rating', newValue);
                        }}
                    />
                    <Button type="submit">Add Review</Button>
                </Group>
            </form>

        </Paper>
    )
}

export default AddReview
