import React, {useEffect} from 'react';
import {PizzaType, SearchContext} from "../App";
import {Categories} from "../components/Categories";
import {Sort} from "../components/Sort";
import {PizzaBlockSkeleton} from "../components/PizzaBlock/PizzaBlockSkeleton";
import {PizzaBlock} from "../components/PizzaBlock/PizzaBlock";
import {PaginationList} from "../components/Pagination/Pagination";
import {useDispatch, useSelector} from "react-redux";
import {AppDispatch, RootState} from "../redux/store";
import {setCategoryId, setPageCount} from "../redux/slices/filterSlice";
import {fetchPizzas} from "../redux/slices/pizzasSlice";

export type SortingType = {
    name: string
    sortProperty: string
}


export const Home: React.FC = () => {
    const dispatch = useDispatch<AppDispatch>()
    const {categoryId, pageCount} = useSelector((state: RootState) => state.filter)
    const sorting = useSelector((state: RootState) => state.filter.sort.sortProperty)
    const {items, status} = useSelector((state: RootState) => state.pizzas)
    const {searchInput} = React.useContext(SearchContext)

    const getPizzas = async () => {
        const category = categoryId > 0 ? `category=${categoryId}` : ""
        const order = sorting.includes("-") ? "acs" : "desc"
        const sortBy = sorting.replace("-", "")
        const search = searchInput ? `&search=${searchInput}` : ""

        dispatch(fetchPizzas({
            category,
            order,
            sortBy,
            search,
            pageCount
        }))
    }

    useEffect(() => {
        getPizzas()
        window.scroll(0, 0)
    }, [categoryId, sorting, searchInput, pageCount])


    const onClickCategory = (i: number) => {
        dispatch(setCategoryId(i))
    }

    const onChangePage = (number: number) => {
        dispatch(setPageCount(number))
    }

    const pizzas = items.map(pizzaObj => {
        return <PizzaBlock {...pizzaObj as PizzaType} key={pizzaObj.id}/>
    })
    const skeleton = [...new Array(9)].map((_, i) => {
        return <PizzaBlockSkeleton key={i}/>
    })

    return (
        <div className="container">
            <div className="content__top">
                <Categories onClickCategoriesID={onClickCategory} CategoryID={categoryId}/>
                <Sort/>
            </div>
            <h2 className="content__title">?????? ??????????</h2>
            <div className="content__items">
                { status === "loading" ? skeleton : pizzas}
            </div>

            <PaginationList currentPage={pageCount} onChangePage={onChangePage}/>
        </div>
    );
};

