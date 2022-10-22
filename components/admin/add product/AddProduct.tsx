import { useForm } from '@mantine/form';
import InputPrice from './addProduct/InputPrice';
import InputStockOrSale from './addProduct/InputStockOrSale';
import InputText from './addProduct/InputText';
import InputDesc from './addProduct/InputDesc';
import { Group, Button, SimpleGrid, Text } from '@mantine/core';
import { useState, useEffect } from 'react';
import PhotoImport from './addProduct/PhotoImport';
import { IBrand, ICategory } from '../../../helpers/types';
import * as api from "../../../helpers/api"
import InputBrandOrCategory from './addProduct/InputBrandOrCategory';
import axios from 'axios';
import { AlertCircle } from 'tabler-icons-react';
import { showNotification } from '@mantine/notifications'
import  { useModals }  from '@mantine/modals';
import { useRouter } from 'next/router';
import AddTitleText from '../AddTitleText';



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
			currency: 'USD',
			description: '',
			main_image: '',
			category: '',
			brand: '',
			featured: false,
			sale: 0,
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
	function featuredInput(input: any) {
		form.setFieldValue('featured', input)
	}
	function saleInput(input: any) {
		form.setFieldValue('sale', input)
	}
	function imageInput(inputImage: File[]) {
		const uuu = URL.createObjectURL(inputImage[0]);
		setImageData(uuu)
		setImagePath(inputImage)
	}

	const featuredData = [
		{ value: 'Is Featured', id: true },
		{ value: 'Not Featured', id: false },

	]

	// cloudinary 

	async function getImageUrl(handlefunc: () => void) {
	//	console.log(form.values)

		if (imagePath) {
			const url = "https://api.cloudinary.com/v1_1/djzmh3ny5/auto/upload"
			const { signature, timestamp, api_key } = await api.getCloudinarySignature()
			/* console.log (signature, timestamp , api_key)
			  this caused an error with cloudinary
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
		//	console.log(formData)
			const response = await axios.post(url, formData);
			const secured_url = response.data.secure_url;
			form.values.main_image = secured_url;

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
		
		axios.post('/api/products',
					 values,
					 config)
			.then((response) => {
				console.log("resssssssssssss", response)		
				modals.openConfirmModal({
					title: 'Product added ',
					centered: true,
					cancelProps:undefined,
					children: (
						<Text size="sm">
							Product succesfully added  !
						</Text>
					),
					labels: { confirm: "add another", cancel: "dashboard" },
					confirmProps: { color: 'blue' },
					onCancel: () =>router.push('/'),
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
	const router=useRouter()

	const modals = useModals();
	const confirmAddModal = () => {
		console.log(form.values)
		if (!imagePath) {
			showNotification({
				title: "Error ",
				message: "Please add the main image",
				color: 'red',
				icon: <AlertCircle />,
			})
		}
		else if (form.values.brand === '' || form.values.category === '') {
			showNotification({
				title: "Error ",
				message: "Please enter the right brand and category ",
				color: 'red',
				icon: <AlertCircle />,
			})
		}
		else {
			modals.openConfirmModal({
				title: 'Add a product',
				centered: true,
				
				children: (
					<Text size="sm">
						Are u sure you want to add this product ?
					</Text>
				),
				labels: { confirm: "Yes , add this product", cancel: "Go back" },
				confirmProps: { color: 'blue' },
				// onCancel: () => console.log('Cancel'),
				onConfirm: () => getImageUrl(handelSubmit)
			});
		}
	}

	const clearInput = () => {
		form.setFieldValue('name', '')
		form.setFieldValue('model', '')
		form.setFieldValue('price', 0)
		form.setFieldValue('currency', 'egp')
		form.setFieldValue('stock', 1)
		form.setFieldValue('description', '')
		form.setFieldValue('category', '')
		form.setFieldValue('brand', '')
		form.setFieldValue('code', '')
		form.setFieldValue('featured', false)
		form.setFieldValue('sale', 0)
		form.setFieldValue('main_image', '')
		setImageData('')
		setImagePath(undefined)
	}

	const getCategories = async () => {
		const data = await api.getCategories()
		setExistingCategories(data)
		//console.log(data)
	}

	const categoryData = () => {
		let results: any = []
		existingCategories?.map((c) => {
			return results.push({ value: c.name,
											id:
											(c.id		//to be fixed to _id when changing data in mongo,check types
											? c.id
											: c._id )
										})
		})
		return results
	}

	const getBrands = async () => {
		const data = await api.getBrands()
		setExistingBrands(data)
		//	console.log(data)
	}
	const brandData = () => {
		let results: any = []
		existingBrands?.map((c) => {
			return results.push({ value: c.name,
									 id:
									  (c.id		//to be fixed to _id when changing data in mongo,check types
									  ? c.id
									 : c._id )
									})
		})
		
		return results
		

	}

	useEffect(() => {

		getCategories()
		getBrands()
	}, [])


	return (
		<form onSubmit={form.onSubmit(confirmAddModal)}>
			<AddTitleText title="Add a Product"/>
			<SimpleGrid cols={2} breakpoints={[{ maxWidth: 'xs', cols: 2 }]}>
				<PhotoImport formFunc={imageInput} data={imageData} />
				<Group /* direction="column" */ className="overflow-auto d-inline-block">
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
							label="Enter Category"
							data={categoryData()}

						/>
						<InputBrandOrCategory
							formFunc={brandInput}
							placeholder="Enter Brand "
							label="Enter Brand"
							data={brandData()}

						/>
					</Group>


					<InputPrice formFuncPrice={priceInput}
						formFuncCurrency={currencyInput}
						priceData={form.values.price}
						currencyData={form.values.currency} />


					<InputStockOrSale formFunc={stockInput}
						label="Add Stock"
						value={form.values.stock}
						min={1}
						max={undefined}
						precision={undefined}
						step={undefined}
					/>
					<InputDesc formFunc={descInput}
						data={{
							label: 'Description',
							placeholder: 'description',
							value: form.values.description
						}} />

					<InputBrandOrCategory
						formFunc={featuredInput}
						placeholder="Enter featured "
						label="Enter featured"
						data={featuredData}

					/>
					<InputStockOrSale formFunc={saleInput}
						label="Add Sale %"
						value={form.values.sale}
						min={0}
						max={70}
						precision={2}
						step={0.25}
					/>
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
