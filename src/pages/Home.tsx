import React, {useEffect, useState} from 'react';
import {PizzaType} from "../App";
import {Categories} from "../components/Categories";
import {Sort} from "../components/Sort";
import {PizzaBlockSkeleton} from "../components/PizzaBlock/PizzaBlockSkeleton";
import {PizzaBlock} from "../components/PizzaBlock/PizzaBlock";

export type SortingType = {
    name: string
    sortProperty: string
}


export const Home = () => {
    const [items, setItems] = useState<PizzaType[]>([])
    const [isLoading, setLoading] = useState(true)
    const [CategoryID, setCategoryID] = useState(0)
    const [sorting, setSorting] = useState<SortingType>({
        name: "популярности",
        sortProperty: "rating"
    })
// ${category}&sortBy=${sortBy}&order=${order}`)
    const category = CategoryID > 0 ? `category=${CategoryID}` : ""
    const order = sorting.sortProperty.includes("-") ? "acs" : "desc"
    const sortBy = sorting.sortProperty.replace("-", "")

    //items?category=1&sortBy=price&order=acs
    useEffect(() => {
        setLoading(true)
        fetch(`https://63c5d8f5f80fabd877f0fbbc.mockapi.io/items?${category}&sortBy=${sortBy}&order=${order}`)
            .then(r => r.json())
            .then(arr => {
                setItems(arr)
                setLoading(false)
            })
        window.scroll(0, 0)
    }, [CategoryID, sorting])

    return (
        <div className="container">
            <div className="content__top">
                <Categories onClickCategoriesID={(CategoryID) => setCategoryID(CategoryID)} CategoryID={CategoryID}/>
                <Sort onClickSortType={(sortObj) => setSorting(sortObj)} sortObj={sorting}/>
            </div>
            <h2 className="content__title">Все пиццы</h2>
            <div className="content__items">
                {isLoading ? [...new Array(9)].map((_, i) => {
                        return <PizzaBlockSkeleton key={i}/>
                    })
                    : items.map(pizzaObj => {
                        return <PizzaBlock {...pizzaObj as PizzaType} key={pizzaObj.id}/>
                    })
                }
            </div>
        </div>
    );
};

