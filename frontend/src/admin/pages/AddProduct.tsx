import { useForm } from '@mantine/hooks';
import InputPrice from '../components/addProductComponents/InputPrice';
import InputStock from '../components/addProductComponents/InputStock';
import InputText from '../components/addProductComponents/InputText';
import InputDesc from '../components/addProductComponents/InputDesc';
import { Group, Button, SimpleGrid , Autocomplete} from '@mantine/core';
import { useState,useEffect} from 'react';
import PhotoImport from '../components/addProductComponents/PhotoImport';
import { IBrand, ICategory } from '../../helpers/types';
import * as api from "../../helpers/api"
import InputBrandOrCategory from '../components/addProductComponents/InputBrandOrCategory';

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
			image: '',
			category:'',
		}
	})

	function nameInput(input: string) {
		form.setFieldValue('name', input)
	}

	function modelInput(input: string) {
		form.setFieldValue('model', input)
	}
	function priceInput(input: number) {

		form.setFieldValue('price', Number (input))
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
	function imageInput(inputImage: File[]) {
		const uuu = URL.createObjectURL(inputImage[0]);
		setImageData(uuu)
		setImagePath(inputImage)
	}

	const getCategories = async () => {
		const data = await api.getCategories()
		setExistingCategories(data)
		console.log(data)
	}

	const categoryData = () => {
		let results :any= []
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
	
	useEffect(() => {
		getCategories()
		getBrands()
	}, [])

	return (
		<form onSubmit={form.onSubmit(() =>console.log("form.valuesssss" ,form.values))}>
			<SimpleGrid cols={2} breakpoints={[{ maxWidth: 'xs', cols: 1 }]}>
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
						<InputBrandOrCategory
									formFunc={categoryInput}
									placeholder="Enter Category "
									data={categoryData()}
									
						/>
					
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
					<Group position="right" mt="md">
						<Button type="submit">Add Product</Button>
					</Group>
				</Group>
			</SimpleGrid>
		</form>
	)
}

export default AddProduct
