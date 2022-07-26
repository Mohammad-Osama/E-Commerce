import { useForm } from '@mantine/hooks';
import InputPrice from '../components/addProductComponents/InputPrice';
import InputStock from '../components/addProductComponents/InputStock';
import InputText from '../components/addProductComponents/InputText';
import InputDesc from '../components/addProductComponents/InputDesc';
import { Group, Button, SimpleGrid, Autocomplete } from '@mantine/core';
import { useState, useEffect } from 'react';
import PhotoImport from '../components/addProductComponents/PhotoImport';
import { IBrand, ICategory } from '../../helpers/types';
import * as api from "../../helpers/api"
import InputBrandOrCategory from '../components/addProductComponents/InputBrandOrCategory';
import axios from 'axios';
import { AlertCircle } from 'tabler-icons-react';
import { showNotification } from '@mantine/notifications'

const AddProduct = () => {

	const [imageData, setImageData] = useState('')
	const [imagePath, setImagePath] = useState<File[]>()

	const [existingCategories, setExistingCategories] = useState<ICategory[]>([])
	const [existingBrands, setExistingBrands] = useState<IBrand[]>([])


	const form = useForm({
		initialValues: {
			name: '',
			model: '',
			stock: 1,
			price: 0,
			currency: 'egp',
			description: '',
			main_image: '',
			category: '',
			brand: '',
			code: ''
		}
	})

	interface IFormImage {
		file: File | null;
		signature: string;
		timestamp: string;
		api_key: number;
	}
	const formImage = useForm<IFormImage>({
		initialValues: {
			file: null,
			signature: '',
			timestamp: '',
			api_key: 0,
		}
	})

	// input functions 
	function nameInput(input: string) {
		form.setFieldValue('name', input)
	}

	function modelInput(input: string) {
		form.setFieldValue('model', input)
	}
	function priceInput(input: number) {

		form.setFieldValue('price', Number(input))
	}
	function currencyInput(input: string) {

		form.setFieldValue('currency', input)
	}
	function stockInput(input: number) {

		form.setFieldValue('stock', input)
	}
	function descInput(input: string) {

		form.setFieldValue('description', input)
	}

	function categoryInput(input: string) {
		form.setFieldValue('category', input)
	}
	function brandInput(input: string) {
		form.setFieldValue('brand', input)
	}
	function codeInput(input: string) {
		form.setFieldValue('code', input)
	}
	function imageInput(inputImage: File[]) {
		const uuu = URL.createObjectURL(inputImage[0]);
		setImageData(uuu)
		setImagePath(inputImage)
	}


	// cloudinary 

	async function getImageUrl(handlefunc: () => void) {
		if (imagePath) {
			const url = "https://api.cloudinary.com/v1_1/djzmh3ny5/auto/upload"
			const { signature, timestamp, api_key } = await api.getCloudinarySignature()
			/* console.log (signature, timestamp , api_key)
					formImage.setFieldValue('file', imagePath[0])
					formImage.setFieldValue ('signature' , signature)
					formImage.setFieldValue('timestamp',timestamp)
					formImage.setFieldValue('api_key',api_key)
			console.log (formImage.values) */
			const formData = new FormData();
			formData.append('file', imagePath[0]);
			formData.append('signature', signature);
			formData.append('timestamp', timestamp);
			formData.append('api_key', api_key);
			console.log(formData)
			const response = await axios.post(url, formData);
			const secured_url = response.data.secure_url;
			form.values.main_image = secured_url;

			handlefunc()

		}
	}

	//////////////////////////
	const handelSubmit = () => {
		const values = form.values;
		axios.post('/api/products', values)
			.then((response) => {
				console.log("resssssssssssss", response)
			})
			.catch(function (error) {
				
				showNotification({
					title: "Error ",
					message: `${error.response.data}`,
					color: 'red',
					icon: <AlertCircle />,
				})
			})
		//	}

	}

	const getCategories = async () => {
		const data = await api.getCategories()
		setExistingCategories(data)
		console.log(data)
	}

	const categoryData = () => {
		let results: any = []
		existingCategories?.map((c) => {
			return results.push({ value: c.name, id: c.id })
		})
		return results
	}

	const getBrands = async () => {
		const data = await api.getBrands()
		setExistingBrands(data)
		console.log(data)
	}
	const brandData = () => {
		let results: any = []
		existingBrands?.map((c) => {
			return results.push({ value: c.name, id: c.id })
		})
		return results
	}

	useEffect(() => {
		getCategories()
		getBrands()
	}, [])


	return (
		<form onSubmit={form.onSubmit(() => getImageUrl(handelSubmit))}>
			<SimpleGrid cols={2} breakpoints={[{ maxWidth: 'xs', cols: 2 }]}>
				<PhotoImport formFunc={imageInput} data={imageData} />
				<Group direction="column" className="overflow-auto d-inline-block">
					<InputText formFunc={nameInput}
						data={{
							label: 'Product Name',
							placeholder: 'Product Name',
							value: form.values.name
						}} />
					<InputText formFunc={modelInput}
						data={{
							label: 'Product Model',
							placeholder: 'Product Model',
							value: form.values.model
						}} />
					<Group>
						<InputBrandOrCategory
							formFunc={categoryInput}
							placeholder="Enter Category "
							data={categoryData()}

						/>
						<InputBrandOrCategory
							formFunc={brandInput}
							placeholder="Enter Brand "
							data={brandData()}

						/>
					</Group>


					<InputPrice formFuncPrice={priceInput}
						formFuncCurrency={currencyInput}
						priceData={form.values.price}
						currencyData={form.values.currency} />


					<InputStock formFunc={stockInput}
						value={form.values.stock}
					//	max=''
					/>
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
						<Button type="submit">Add Product</Button>

					</Group>
				</Group>
			</SimpleGrid>
		</form>
	)
}

export default AddProduct
