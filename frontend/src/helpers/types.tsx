export interface  IProduct  {
    id?:string ;
    name: string;
    model: string;
    main_image: string;
    images: string;    
    description: string;
    price: number;
    currency: string;
    stock: number;
    category?: string ; 
    brand?: string ;    
    vote_count : number;
    vote_total : number;    
};


export interface ICategory {
    id?:string;
    name: string;
    description: string;
    logo:string
}

export interface IBrand {
    id?: string;
    name: string;
    description: string;
    logo:string
}