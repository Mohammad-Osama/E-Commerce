export interface IProduct {
    _id: string;
    name: string;
    model: string;
    main_image: string;
    images: string;
    description: string;
    price: number;
    currency: string;
    stock: number;
    sale: number;
    featured: boolean;
    category?: string;
    brand?: string;
    rating_count: number;
    rating_total: number;
};

export interface IProductCart {
    _id: string;
    name: string;
    model: string;
    main_image: string;
    price: number;
    currency: string;
    stock: number;
    sale: number;
    rating_count: number;
    rating_total: number;
    quantity: number;    // only differece,maybe there is a better solution than a new whole type
    images: string;
    description: string;
    featured: boolean;
    category?: string;
    brand?: string;
};


export interface ICategory {  //remove id when data is fixed in mongo
    _id: string;
    id: string;
    name: string;
    description: string;
    logo: string
}

export interface IBrand {  //remove id when data is fixed in mongo
    _id: string;
    id: string;
    name: string;
    description: string;
    logo: string
}

export interface IReviewInfo {
    id: string;
    first_name: string;
    last_name: string;
    title: string;
    text: string;
    rating: number;
    updatedAt: string
}

export interface IReview {
    id: string ;
    title: string;
    text: string;
    rating: number;
    user: string;
    product: string;
};

export interface IUser {
    id: string;
    first_name: string;
    last_name: string;
    email: string;
    birthday: Date;
    phone: string;
    country: string;
    address: string;
    coupon: string;
    role:string;   //newly added
    status:string;
};


export interface IReviewaddForm {
    title: string
    text: string
    rating: number |null
    user: string |null
    product:string | string[] | undefined
}


export interface CategoriesProps {
    categories :ICategory[]
}
export interface BrandsProps {
    brands :IBrand[]
}
export interface MenuProps {
    categories :ICategory[]
    brands :IBrand[]
}