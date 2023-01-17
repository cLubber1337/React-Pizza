import React, {useEffect, useState} from 'react';
import "./scss/app.scss"
import {Header} from "./components/Header";
import {Sort} from "./components/Sort";
import {PizzaBlock, PizzaType} from "./components/PizzaBlock";


const App = () => {

    const [items, setItems] = useState([])

    useEffect(() => {
        fetch("https://63c5d8f5f80fabd877f0fbbc.mockapi.io/items")
            .then(r => r.json())
            .then(arr => setItems(arr))
            .catch(()=>console.log("Error"))
    }, [])


    return (
        <div className="wrapper">
            <Header/>
            <div className="content">
                <div className="container">
                    <div className="content__top">
                        {/*<Categories/>*/}
                        <Sort/>
                    </div>
                    <h2 className="content__title">Все пиццы</h2>
                    <div className="content__items">
                        {items.map(pizzaObj => {
                            return (
                                <PizzaBlock {...pizzaObj as PizzaType} key={pizzaObj}   />
                            )
                        })}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default App;