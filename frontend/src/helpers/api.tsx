import axios from "axios"
import { IProduct ,ICategory,IBrand } from "./types"


export const getProducts = async () => {
    const data = await axios.get<IProduct[]>(`/api/products`)
    return data.data
}

export const getCategories = async () => {

    const data = await axios.get<ICategory[]>('/api/categories')
    return data.data
}

export const getBrands = async () => {
    const data = await axios.get<IBrand[]>('/api/brands')
    return data.data
}