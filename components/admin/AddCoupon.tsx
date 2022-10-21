import { Group, Button, SimpleGrid, Text, Select } from '@mantine/core';
import { useForm } from '@mantine/form';
import { useState } from 'react';
import InputText from './add product/addProduct/InputText';
import axios from 'axios';
import { AlertCircle } from 'tabler-icons-react';
import { showNotification } from '@mantine/notifications'
import { useModals } from '@mantine/modals';
import { useRouter } from 'next/router';
import AddTitleText from './AddTitleText';

const AddCoupon = () => {

    const form = useForm({
        initialValues: {
            name: '',
            value: 0,
            code: ''
        }
    })


    const [value, setValue] = useState<string | null>(null);

    // console.log(value)
    //console.log( "formmm", form.values)

    function nameInput(input: string) {
        form.setFieldValue('name', input)
    }

    function valueInput(input: number) {

        form.setFieldValue('value', input)
    }
    function codeInput(input: string) {
        form.setFieldValue('code', input)
    }

    const router = useRouter()

    const modals = useModals();
    const confirmAddModal = () => {

        modals.openConfirmModal({
            title: 'Add a brand',
            centered: true,
            children: (
                <Text size="sm">
                    Are u sure you want to add this coupon ?
                </Text>
            ),
            labels: { confirm: "Yes , add this coupon", cancel: "Go back" },
            confirmProps: { color: 'blue' },
            // onCancel: () => console.log('Cancel'),
            onConfirm: () => handelSubmit()
        });

    }




    const handelSubmit = () => {
        const values = form.values;
        const token = localStorage.getItem("token")?.replace(/^"(.*)"$/, '$1')
		const config = {
			headers: { Authorization: `Bearer ` + token }
		};
        axios.post('/api/coupons',
                     values,
                     config)
            .then((response) => {
                //     console.log("resssssssssssss", response)
                modals.openConfirmModal({
                    title: 'Coupon added ',
                    centered: true,
                    cancelProps: undefined,
                    children: (
                        <Text size="sm">
                            Coupon succesfully added  !
                        </Text>
                    ),
                    labels: { confirm: "add another", cancel: "dashboard" },
                    confirmProps: { color: 'blue' },
                    onCancel: () => router.push('/adminPanel'),
                    onConfirm: () => clearInput()
                });
            }
            )
            .catch(function (error) {
                showNotification({
                    title: "Error ",
                    message: `${error.response.data}`,
                    color: 'red',
                    icon: <AlertCircle />,
                })
            })
    }

    const clearInput = () => {
        form.setFieldValue('name', '')
        form.setFieldValue('value', 0)
        form.setFieldValue('code', '')

    }

    return (
        <form onSubmit={form.onSubmit(confirmAddModal)}>
            <AddTitleText title="Add a coupon" />
            <SimpleGrid cols={1} breakpoints={[{ maxWidth: 'xs', cols: 2 }]}
            >

                <Group /* direction="row" */ style={{ width: "30%" }}>
                    <InputText formFunc={nameInput}
                        data={{
                            label: 'Coupon Name',
                            placeholder: 'Coupon Name',
                            value: form.values.name
                        }} />

                    <Select label="Coupon Value"
                            required
                            value={value} 
                        onChange={(x) => {
                          //  console.log(x)
                            setValue(x)
                            form.setFieldValue("value", Number(x))
                            form.setFieldValue("name", String(x) + " % Coupon")
                        }}
                        data={[
                            { value: '5', label: '5 %' },
                            { value: '10', label: '10 %' },
                            { value: '15', label: '15 %' },
                            { value: '20', label: '20 %' },
                            { value: '25', label: '25 %' },
                            { value: '30', label: '30 %' },
                        ]} />

                    <InputText formFunc={codeInput}
                        data={{
                            label: 'Code',
                            placeholder: 'Admin Code',
                            value: form.values.code
                        }} />
                    <Group position="right" mt="md">
                        <Button type="submit">Add Coupon</Button>
                    </Group>
                </Group>
            </SimpleGrid>
        </form>
    )
}

export default AddCoupon
