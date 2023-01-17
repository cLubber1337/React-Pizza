import React, {useEffect, useState} from 'react';
import "./scss/app.scss"
import {Header} from "./components/Header";
import {Sort} from "./components/Sort";
import {PizzaBlock} from "./components/PizzaBlock/PizzaBlock";
import {Categories} from "./components/Categories";
import {PizzaBlockSkeleton} from "./components/PizzaBlock/PizzaBlockSkeleton";

export type PizzaType =
    {
        id: number;
        imageUrl: string;
        title: string;
        types: number[];
        sizes: number[];
        price: number;
        category: number;
        rating: number;
    }

const App = () => {

    const [items, setItems] = useState<PizzaType[]>([])
    const [isLoading, setLoading] = useState(true)

    useEffect(() => {

        fetch("https://63c5d8f5f80fabd877f0fbbc.mockapi.io/items")
            .then(r => r.json())
            .then(arr => {
                setItems(arr)
            })
    }, [])
    return (
        <div className="wrapper">
            <Header/>
            <div className="content">
                <div className="container">
                    <div className="content__top">
                        <Categories/>
                        <Sort/>
                    </div>
                    <h2 className="content__title">Все пиццы</h2>
                    <div className="content__items">
                        {items.map(pizzaObj => {
                            return (
                                isLoading ? <PizzaBlockSkeleton/> :
                                    <PizzaBlock {...pizzaObj as PizzaType} key={pizzaObj.id}/>
                            )
                        })}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default App;