import {Action, configureStore, ThunkAction} from '@reduxjs/toolkit'
import filter from "./slices/filterSlice";
import cart from "./slices/cartSlice"
import pizzas from "./slices/pizzasSlice";
import { useDispatch } from 'react-redux'

export const store = configureStore({
    reducer: {
        filter, cart, pizzas,
    },
})




// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch
export const useAppDispatch: () => AppDispatch = useDispatch
export type AppThunk<ReturnType = void> = ThunkAction<
    ReturnType,
    RootState,
    unknown,
    Action<string>
    >;