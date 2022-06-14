import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { IProduct ,IProductCart} from '../../../helpers/types';
import { RootState } from "../store"


/* export interface IProductcart {
    id: string;
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
}; */

interface Items {
    product: IProduct;
    quantity: number;
    currentQuantity: number;

}

interface Id {
    _id: string;

}
interface State {
    items: IProductCart[]

}



const initialState: State = {
    items: [],
}

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addToCart: (state, action: PayloadAction<IProductCart>) => {
            const existingCartItemIndex = state.items.findIndex(
                (item) => item.id === action.payload.id
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

                state.items.push(action.payload)
            }

        },
        removeFromCart: (state, action : PayloadAction<string>) => {

            state.items = state.items.filter((item) => item.id !== action.payload);
        } ,
        emptyAllCart: (state) => {
            state.items = []
        }

    }
})


export const { addToCart ,removeFromCart ,emptyAllCart } = cartSlice.actions

export default cartSlice.reducer

export const cartState = (state: RootState) => state.cart.items