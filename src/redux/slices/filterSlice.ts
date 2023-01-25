import {createSlice} from '@reduxjs/toolkit'

export type FilterStateType = {
    categoryId: number
    pageCount: number
    sort: {
        name: string,
        sortProperty: string
    }
}

const initialState: FilterStateType = {
    pageCount: 1,
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
        },
        setPageCount(state, action) {
            state.pageCount = action.payload
        }

    },
})


export const {setCategoryId, setSort, setPageCount} = filterSlice.actions

export default filterSlice.reducer