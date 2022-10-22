import React, { useEffect, useState } from 'react'
import { Textarea, Text, Paper, Button, Group, TextInput, Stack } from '@mantine/core';
import { AlertCircle } from 'tabler-icons-react';
import { Rating } from '@smastrom/react-rating';
import { useForm } from '@mantine/form';
import { authState } from '../redux/slices/authSlice';
import { useSelector } from 'react-redux';
import * as api from '../helpers/api'
import { IReviewaddForm } from '../helpers/types';
import { showNotification } from '@mantine/notifications'
import { useModals } from '@mantine/modals';
//import { useNavigate } from "react-router-dom";
import { useRouter } from 'next/router';

interface AddReviewProps {
    productID: string | string[] | undefined,

}
const AddReview = (props: AddReviewProps) => {

    const { id } = useSelector(authState)

    interface IModalType {
        name: string;
        text: string;
        labelConfirm: string;
        labelCancel: string;
        ConfirmFunc: () => void;
    }

    const [modalType, setModalType] = useState<IModalType>()

    const form = useForm({
        initialValues: {
            title: '',
            text: '',
            rating: 0 ,
            user: id,
            product: props.productID,
        },
    });

    const router =useRouter()
   // const navigate = useNavigate()

    const onConfirmAddReview = async () => {
        const { title, text, rating, user, product } = form.values
       // console.log(form.values)
        const reviewAddInfo: IReviewaddForm = {
            title: title,
            text: text,
            rating: rating,
            user: user,
            product: product
        }

       await api.addReview(reviewAddInfo)
       window.location.reload()
    }

    const onConfirmLogin = () => {
        router.push('/login')
    }



    const modals = useModals();
    const confirmReviewModal = () => {
        if (form.values.rating === 0 || form.values.rating === null) {
            showNotification({
                title: "Error ",
                message: "Please add a rating ",
                color: 'red',
                icon: <AlertCircle />,
            })

        }
        else
            modals.openConfirmModal({
                title: 'Add a review',
                centered: true,
                children: (
                    <Text size="sm">
                        {modalType?.text}
                    </Text>
                ),
                labels: { confirm: modalType?.labelConfirm, cancel: "Go back" },
                confirmProps: { color: 'blue' },
                // onCancel: () => console.log('Cancel'),
                onConfirm: modalType?.ConfirmFunc,
            });
    }


    useEffect(() => {
        if (id !== null) {
            setModalType({
                name: "user",
                text: "Are you sure you want to add this review ?",
                labelConfirm: "Add Review",
                labelCancel: "string",
                ConfirmFunc: onConfirmAddReview,
            })
        }
        else
            setModalType({
                name: "no user",
                text: "Please log in before adding a review",
                labelConfirm: "log in",
                labelCancel: "string",
                ConfirmFunc: onConfirmLogin,
            })

    }, [form.values.rating])


    return (
        <Paper withBorder radius="md" mx="xl">
            <form onSubmit={form.onSubmit(confirmReviewModal)}>
                <Stack
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
                </Stack>
                <Group spacing="xl" position="center" m="xl">
                    <Rating
                        style={{ maxWidth: 100 }}
                        value={form.values.rating}
                        onChange={(newValue :any) => {  //maybe change any
                            form.setFieldValue('rating', newValue)
                        }}
                    />
                    <Button type="submit">Add Review</Button>
                </Group>
            </form>

        </Paper>
    )
}

export default AddReview
