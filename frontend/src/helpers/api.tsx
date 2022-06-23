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

export const getProductsByCategory = async (id :string) => {
    const data = await axios.get<IProduct[]>(`/api/products/bycategory?category=${id}`)
    return data.data
}

export const getProductsByBrand = async (id :string) => {
    const data = await axios.get<IProduct[]>(`/api/products/bybrand?brand=${id}`)
    return data.data
}