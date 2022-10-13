import axios from "axios"
import {
    IProduct,
    ICategory,
    IBrand,
    IReviewInfo,
    IUser,
    IReviewaddForm,
    IReview
} from "./types"

const apiUrl=process.env.NEXT_PUBLIC_URL
export const getProducts = async () => {
    const data = await axios.get<IProduct[]>(`/api/products`)
    return data.data
}

export const getCategories = async () => {

    const data = await axios.get<ICategory[]>(`${apiUrl}/api/categories`)
    return data.data
}

export const getBrands = async () => {
    const data = await axios.get<IBrand[]>(`${apiUrl}/api/brands`)
    return data.data
}

export const getProductsByCategory = async (id: string) => {
    const data = await axios.get<IProduct[]>(`/api/products/bycategory?category=${id}`)
    return data.data
}

export const getProductsByBrand = async (id: string) => {
    const data = await axios.get<IProduct[]>(`/api/products/bybrand?brand=${id}`)
    return data.data
}
export const searchProducts = async (q: string) => {
    const data = await axios.get<IProduct[]>(`${apiUrl}/api/products/search?name=${q}`)
    return data.data
}

export const getProductById = async (id: string) => {
    const data = await axios.get<IProduct>(`/api/products/product/${id}`)
    return data.data
}

export const getReviewInfo = async (id: string) => {
    const data = await axios.get<IReviewInfo[]>(`/api/reviews/reviewinfo?product=${id}`)
    // console.log("getReviewInfo----->" , data)
    return data.data
}

export const getUserData = async () => {
    const token = JSON.parse(localStorage.getItem('token') as string)
    const data = await axios.get<IUser>("/api/users/profile",
        { headers: { "Authorization": `Bearer ${token}` } })
    return data.data
}


export const addReview = async (body: IReviewaddForm) => {
    // console.log("front body ", body)
    const data = await axios.post("/api/reviews", body)

    return data.data
}

export const getReviewProductUser = async (product: string, user: string) => {
    const data = await axios.get<IReview>(`/api/reviews/productuser?product=${product}&user=${user}`)
    return data.data
}

export const getCloudinarySignature = async () => {
    const data = await axios.get("/api/cloudnarysignature")
    return data.data
}

export const getAllUsers = async () => {
    const token = JSON.parse(localStorage.getItem('token') as string)
    const data = await axios.get<IUser[]>(`/api/users/all`,
               { headers: { "Authorization": `Bearer ${token}` } })
    return data.data
}