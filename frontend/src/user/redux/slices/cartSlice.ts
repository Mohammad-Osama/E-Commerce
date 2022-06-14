import { createSlice , PayloadAction  } from '@reduxjs/toolkit'
import { IProduct } from '../../../helpers/types';
import {RootState} from "../store"


export interface  IProductcart  {
    _id?:string ;
    name: string;
    model: string;
    main_image: string; 
    price: number;
    currency: string;
    stock: number;
    sale:number;   
    vote_count : number;
    vote_total : number; 
    quantity: number; 
};

interface Items {
    product :IProduct ;
    quantity : number ;
    currentQuantity: number ;

}
interface State {
    items :IProductcart[]

}



const initialState :State = {
    items: [],
}

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addToCart: (state, action :PayloadAction<IProductcart>) => {
 
                state.items.push(
                   action.payload
                    
                )

          
        },


    }
})


export const { addToCart } = cartSlice.actions

export default cartSlice.reducer

export const cartState = ( state: RootState) => state.cart.items