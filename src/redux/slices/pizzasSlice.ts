import {createSlice, createAsyncThunk, PayloadAction} from '@reduxjs/toolkit'
import {PizzaType} from "../../App";
import axios from "axios";

export type FilterStateType = {
    items: PizzaType[]
}
export type SearchPizzaParams = {
    sortBy: string;
    order: string;
    category: string;
    search: string;
    pageCount: number;
};


export const fetchPizzas = createAsyncThunk<PizzaType[], SearchPizzaParams>(
    'pizza/fetchPizzaStatus',
    async ({pageCount, order,sortBy,search,category}) => {
        const {data} = await axios.get<PizzaType[]>(`https://63c5d8f5f80fabd877f0fbbc.mockapi.io/items?page=${pageCount}&limit=4&${category}&sortBy=${sortBy}&order=${order}${search}`)
        return data
    }
)

const initialState: FilterStateType = {
    items: [],
}



export const pizzasSlice = createSlice({
    name: 'pizza',
    initialState,
    reducers: {
        setItems(state, action: PayloadAction<PizzaType[]>) {
            state.items = action.payload
        },
    },
    extraReducers: (builder) => {
        // Add reducers for additional action types here, and handle loading state as needed
        builder.addCase(fetchPizzas.fulfilled, (state, action) => {
            state.items = action.payload;
        })
    },
})

export const {setItems} = pizzasSlice.actions

export default pizzasSlice.reducer