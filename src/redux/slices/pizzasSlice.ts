import {createSlice, createAsyncThunk, PayloadAction} from '@reduxjs/toolkit'
import {PizzaType} from "../../App";
import axios from "axios";

export type PizzasStateType = {
    items: PizzaType[]
    status: string
}
export type SearchPizzaType = {
    sortBy: string;
    order: string;
    category: string;
    search: string;
    pageCount: number;
};

export const fetchPizzas = createAsyncThunk<PizzaType[], SearchPizzaType>(
    'pizza/fetchPizzaStatus',
    async ({pageCount, order,sortBy,search,category}) => {
        const {data} = await axios.get<PizzaType[]>(`https://63c5d8f5f80fabd877f0fbbc.mockapi.io/items?page=${pageCount}&limit=4&${category}&sortBy=${sortBy}&order=${order}${search}`)
        return data
    }
)

const initialState: PizzasStateType = {
    items: [],
    status: "loading"
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
            state.status = "success";
        })
        builder.addCase(fetchPizzas.pending, (state) => {
            state.status = "loading";
        })
        builder.addCase(fetchPizzas.rejected, (state) => {
            state.status = "rejected";
            state.items = []
        })
    },
})

export const {setItems} = pizzasSlice.actions

export default pizzasSlice.reducer