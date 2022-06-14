import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { IProduct } from '../../../helpers/types';
import { RootState } from "../store"


export interface IProductcart {
    _id?: string;
    name: string;
    model: string;
    main_image: string;
    price: number;
    currency: string;
    stock: number;
    sale: number;
    vote_count: number;
    vote_total: number;
    quantity: number;
};

interface Items {
    product: IProduct;
    quantity: number;
    currentQuantity: number;

}
interface State {
    items: IProductcart[]

}



const initialState: State = {
    items: [],
}

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addToCart: (state, action: PayloadAction<IProductcart>) => {
            const existingCartItemIndex = state.items.findIndex(
                (item) => item._id === action.payload._id
            );
            const existingCartItem = state.items[existingCartItemIndex];
            let updatedItems;

            if (existingCartItem) {

                const updateItem = {
                    ...existingCartItem,
                    quantity: existingCartItem.quantity + action.payload.quantity
                }
                if (updateItem.quantity === 0) {
                    state.items = [...state.items.slice(0, existingCartItemIndex), ...state.items.slice(existingCartItemIndex + 1)]
                }
                else {
                    updatedItems = [...state.items]
                    updatedItems[existingCartItemIndex] = updateItem;
                    state.items = [...updatedItems]
                }
            }
            else {

                state.items.push(
                    action.payload

                )
            }

        },


    }
})


export const { addToCart } = cartSlice.actions

export default cartSlice.reducer

export const cartState = (state: RootState) => state.cart.items