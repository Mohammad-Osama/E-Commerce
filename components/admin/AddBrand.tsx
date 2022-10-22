import { Group, Button, SimpleGrid, Text } from '@mantine/core';
import { useForm } from '@mantine/form';
import { useState} from 'react';
import PhotoImport from './add product/addProduct/PhotoImport';
import InputText from './add product/addProduct/InputText';
import InputDesc from './add product/addProduct/InputDesc';
import axios from 'axios';
import { AlertCircle } from 'tabler-icons-react';
import { showNotification } from '@mantine/notifications'
import { useModals } from '@mantine/modals';
import { useRouter } from 'next/router';
import * as api from "../../helpers/api"
import AddTitleText from './AddTitleText';

const AddBrand = () => {

    const form = useForm({
        initialValues: {
            name: '',
            description: '',
            logo: '',
            code: ''
        }
    })

    const [imageData, setImageData] = useState('')
    const [imagePath, setImagePath] = useState<File[]>()

    function logoInput(inputImage: File[]) {
        const uuu = URL.createObjectURL(inputImage[0]);
        setImageData(uuu)
        setImagePath(inputImage)
    }
    function nameInput(input: string) {
        form.setFieldValue('name', input)
    }

    function descInput(input: string) {

        form.setFieldValue('description', input)
    }
    function codeInput(input: string) {
        form.setFieldValue('code', input)
    }

    const router = useRouter()

    const modals = useModals();
    const confirmAddModal = () => {
        if (!imagePath) {
            showNotification({
                title: "Error ",
                message: "Please add the logo",
                color: 'red',
                icon: <AlertCircle />,
            })
        }
        else {
            modals.openConfirmModal({
                title: 'Add a brand',
                centered: true,
                children: (
                    <Text size="sm">
                        Are u sure you want to add this brand ?
                    </Text>
                ),
                labels: { confirm: "Yes , add this brand", cancel: "Go back" },
                confirmProps: { color: 'blue' },
                // onCancel: () => console.log('Cancel'),
                onConfirm: () => getImageUrl(handelSubmit)
            });
        }
    }

    // cloudinary 

    async function getImageUrl(handlefunc: () => void) {
      //  console.log(form.values)
        if (imagePath) {
            const url = "https://api.cloudinary.com/v1_1/djzmh3ny5/auto/upload"
            const { signature, timestamp, api_key } = await api.getCloudinarySignature()
            const formData = new FormData();
            formData.append('file', imagePath[0]);
            formData.append('signature', signature);
            formData.append('timestamp', timestamp);
            formData.append('api_key', api_key);
         //   console.log(formData)
            const response = await axios.post(url, formData);
            const secured_url = response.data.secure_url;
            form.values.logo = secured_url;

            handlefunc()
        }
    }

    //////////////////////////
    const handelSubmit = () => {
        const values = form.values;
        	// Removes double quotes from token start and end,caused backend problems
		const token = localStorage.getItem("token")?.replace(/^"(.*)"$/, '$1')
		const config = {
			headers: { Authorization: `Bearer ` + token }
		};
        axios.post('/api/brands',
                     values,
                     config)
            .then((response) => {
              //  console.log("resssssssssssss", response)
                modals.openConfirmModal({
                    title: 'Brand added ',
                    centered: true,
                    cancelProps: undefined,
                    children: (
                        <Text size="sm">
                            Brand succesfully added  !
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
        form.setFieldValue('description', '')
        form.setFieldValue('code', '')
        setImageData('')
        setImagePath(undefined)
    }

    return (
        <form onSubmit={form.onSubmit(confirmAddModal)}>
            <AddTitleText title="Add a brand" />
            <SimpleGrid cols={2} breakpoints={[{ maxWidth: 'xs', cols: 2 }]}>
                <PhotoImport formFunc={logoInput} data={imageData} />
                <Group /* direction="column"  */className="overflow-auto d-inline-block">
                    <InputText formFunc={nameInput}
                        data={{
                            label: 'Brand Name',
                            placeholder: 'Brand Name',
                            value: form.values.name
                        }} />

                    <InputDesc formFunc={descInput}
                        data={{
                            label: 'Description',
                            placeholder: 'description',
                            value: form.values.description
                        }} />

                    <InputText formFunc={codeInput}
                        data={{
                            label: 'Code',
                            placeholder: 'Admin Code',
                            value: form.values.code
                        }} />
                    <Group position="right" mt="md">
                        <Button type="submit">Add Brand</Button>
                    </Group>
                </Group>
            </SimpleGrid>
        </form>
    )
}

export default AddBrand
