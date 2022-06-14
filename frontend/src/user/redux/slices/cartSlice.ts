import { createSlice , PayloadAction  } from '@reduxjs/toolkit'
import { IProduct } from '../../../helpers/types';
import {RootState} from "../store"

interface Items {
    product :IProduct ;
    quantity : number ;
    currentQuantity: number ;

}
interface State {
    items :Items[]

}
const initialState :State = {
    items: [],
}

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addToCart: (state, action :PayloadAction<Items>) => {
 
                state.items.push(action.payload)

          
        },


    }
})


export const { addToCart } = cartSlice.actions

export default cartSlice.reducer

export const cartState = ( state: RootState) => state.cart.items