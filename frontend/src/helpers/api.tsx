import axios from "axios"
import { IProduct ,ICategory,IBrand } from "./types"


export const getProducts = async () => {
    const data = await axios.get<IProduct[]>(`http://localhost:5000/api/products`)
    return data.data
}

export const getCategories = async () => {

    const data = await axios.get<ICategory[]>('http://localhost:5000/api/categories')
    return data.data
}

export const getBrands = async () => {
    const data = await axios.get<IBrand[]>('http://localhost:5000/api/brands')
    return data.data
}