import {createSlice} from '@reduxjs/toolkit'


export type FilterStateType = {
    categoryId: number
    sort: { name: string, sortProperty: string }
}

const initialState: FilterStateType = {
    categoryId: 0,
    sort: {
        name: "популярности",
        sortProperty: "rating"
    }
}

export const filterSlice = createSlice({
    name: 'filters',
    initialState,
    reducers: {
        setCategoryId(state, action) {
            state.categoryId = action.payload
        },
        setSort(state, action) {
            state.sort = action.payload
        }
    },
})


export const {setCategoryId, setSort} = filterSlice.actions

export default filterSlice.reducer