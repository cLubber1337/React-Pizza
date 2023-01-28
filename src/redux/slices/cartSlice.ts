import {createSlice} from '@reduxjs/toolkit'


export type ItemsType = {
    id: number
    title: string
    price: number
    imageUrl: string
    type: number
    size: number
    count: number
}
export type FilterStateType = {
    totalItems: number
    totalPrice: number
    items: ItemsType[]
}
const initialState: FilterStateType = {
    totalItems: 0,
    totalPrice: 0,
    items: [],
}

export const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addItem(state, action) {
            let currentItem = state.items.find(obj => obj.id === action.payload.id)
            if (currentItem) {
                currentItem.count++
            } else {
                state.items.push({...action.payload, count: 1})
            }

            state.totalPrice = state.items.reduce((sum, obj) => obj.count * obj.price + sum, 0)
            state.totalItems = state.items.reduce((sum, obj) => sum + obj.count, 0)
        },
        removeItem(state, action) {
            state.items = state.items.filter((item) => item.id !== action.payload)

            state.totalPrice = state.items.reduce((sum, obj) => obj.count * obj.price + sum, 0)
            state.totalItems = state.items.reduce((sum, obj) => sum + obj.count, 0)
        },
        clearItems(state) {
            state.items = []

            state.totalPrice = state.items.reduce((sum, obj) => obj.count * obj.price + sum, 0)
            state.totalItems = state.items.reduce((sum, obj) => sum + obj.count, 0)
        },
        plusItem(state, action) {
            let currentItem = state.items.find(obj => obj.id === action.payload)
            if (currentItem) {
                currentItem.count++
            }
            state.totalPrice = state.items.reduce((sum, obj) => obj.count * obj.price + sum, 0)
            state.totalItems = state.items.reduce((sum, obj) => sum + obj.count, 0)
        },
        minusItem(state, action) {
            let currentItem = state.items.find(obj => obj.id === action.payload)
            if (currentItem) {
                currentItem.count--
            }
            state.totalPrice = state.items.reduce((sum, obj) => obj.count * obj.price + sum, 0)
            state.totalItems = state.items.reduce((sum, obj) => sum + obj.count, 0)
        },
    },
})

export const {addItem, removeItem, clearItems, plusItem, minusItem} = cartSlice.actions

export default cartSlice.reducer