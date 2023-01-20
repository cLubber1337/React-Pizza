import React, {useEffect, useState} from 'react';
import {PizzaType} from "../App";
import {Categories} from "../components/Categories";
import {Sort} from "../components/Sort";
import {PizzaBlockSkeleton} from "../components/PizzaBlock/PizzaBlockSkeleton";
import {PizzaBlock} from "../components/PizzaBlock/PizzaBlock";
import {PaginationList} from "../components/Pagination/Pagination";

export type SortingType = {
    name: string
    sortProperty: string
}
type HomePropsType = {
    searchInput: string
}

export const Home: React.FC<HomePropsType> = ({searchInput}) => {
    const [items, setItems] = useState<PizzaType[]>([])
    const [isLoading, setLoading] = useState(true)
    const [CategoryID, setCategoryID] = useState(0)
    const [currentPage, setCurrentPage] = useState(1)
    const [sorting, setSorting] = useState<SortingType>({
        name: "популярности",
        sortProperty: "rating"
    })

    const category = CategoryID > 0 ? `category=${CategoryID}` : ""
    const order = sorting.sortProperty.includes("-") ? "acs" : "desc"
    const sortBy = sorting.sortProperty.replace("-", "")
    const search =  searchInput ? `&search=${searchInput}` : ""

    useEffect(() => {
        setLoading(true)
        fetch(`https://63c5d8f5f80fabd877f0fbbc.mockapi.io/items?page=${currentPage}&limit=4&${category}&sortBy=${sortBy}&order=${order}${search}`)
            .then(r => r.json())
            .then(arr => {
                setItems(arr)
                setLoading(false)
            })
        window.scroll(0, 0)
    }, [CategoryID, sorting, searchInput, currentPage])

    const pizzas= items.map(pizzaObj => {
        return <PizzaBlock {...pizzaObj as PizzaType} key={pizzaObj.id}/>
    })
    const skeleton = [...new Array(9)].map((_, i) => {
        return <PizzaBlockSkeleton key={i}/>
    })

    return (
        <div className="container">
            <div className="content__top">
                <Categories onClickCategoriesID={(CategoryID) => setCategoryID(CategoryID)} CategoryID={CategoryID}/>
                <Sort onClickSortType={(sortObj) => setSorting(sortObj)} sortObj={sorting}/>
            </div>
            <h2 className="content__title">Все пиццы</h2>
            <div className="content__items">
                {isLoading ? skeleton : pizzas}
            </div>
            <PaginationList currentPage={currentPage} onChangePage={number => setCurrentPage(number)} />
        </div>
    );
};

