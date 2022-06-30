import axios from "axios"
import { IProduct ,ICategory,IBrand, IReviewInfo } from "./types"


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
export const searchProducts = async (q :string) => {
    const data = await axios.get<IProduct[]>(`/api/products/search?name=${q}`)
    return data.data
}

export const getProductById = async (id :string) => {
    const data = await axios.get<IProduct>(`/api/products/product/${id}`)
    return data.data
}

export const getReviewInfo = async (id :string) => {
    const data = await axios.get<IReviewInfo[]>(`/api/reviews/reviewinfo?product=${id}`)
    console.log("getReviewInfo----->" , data)
    return data.data
}