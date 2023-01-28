import React, {useEffect, useState} from 'react';
import {PizzaType, SearchContext} from "../App";
import {Categories} from "../components/Categories";
import {Sort} from "../components/Sort";
import {PizzaBlockSkeleton} from "../components/PizzaBlock/PizzaBlockSkeleton";
import {PizzaBlock} from "../components/PizzaBlock/PizzaBlock";
import {PaginationList} from "../components/Pagination/Pagination";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../redux/store";
import {setCategoryId, setPageCount} from "../redux/slices/filterSlice";
import axios from "axios";

export type SortingType = {
    name: string
    sortProperty: string
}


export const Home: React.FC = () => {
    const dispatch = useDispatch()
    const categoryId = useSelector((state: RootState) => state.filter.categoryId)
    const sorting = useSelector((state: RootState) => state.filter.sort.sortProperty)
    const pageCount = useSelector((state: RootState) => state.filter.pageCount)
    const onClickCategory = (i: number) => {
        dispatch(setCategoryId(i))
    }

    const onChangePage = (number: number) => {
        dispatch(setPageCount(number))
    }


    const {searchInput} = React.useContext(SearchContext)

    const [items, setItems] = useState<PizzaType[]>([])
    const [isLoading, setLoading] = useState(true)


    const category = categoryId > 0 ? `category=${categoryId}` : ""
    const order = sorting.includes("-") ? "acs" : "desc"
    const sortBy = sorting.replace("-", "")
    const search = searchInput ? `&search=${searchInput}` : ""
    
    

    useEffect(() => {
        axios.get(`https://63c5d8f5f80fabd877f0fbbc.mockapi.io/items?page=${pageCount}&limit=4&${category}&sortBy=${sortBy}&order=${order}${search}`)
            .then(r => {
                setItems(r.data)
                setLoading(false)
            })
        window.scroll(0, 0)
    }, [categoryId, sorting, searchInput, pageCount])

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
            <h2 className="content__title">Все пиццы</h2>
            <div className="content__items">
                {isLoading ? skeleton : pizzas}
            </div>

            <PaginationList currentPage={pageCount} onChangePage={onChangePage}/>
        </div>
    );
};

