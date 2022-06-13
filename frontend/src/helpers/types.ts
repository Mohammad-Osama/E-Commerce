export interface  IProduct  {
    _id?:string ;
    name: string;
    model: string;
    main_image: string;
    images: string;    
    description: string;
    price: number;
    currency: string;
    stock: number;
    sale:number;
    featured : boolean ;
    category?: string ; 
    brand?: string ;    
    vote_count : number;
    vote_total : number;    
};


export interface ICategory {
    _id?:string;
    name: string;
    description: string;
    logo:string
}

export interface IBrand {
    _id?: string;
    name: string;
    description: string;
    logo:string
}