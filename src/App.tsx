import React from 'react';
import "./scss/app.scss"
import {Header} from "./components/Header";
import {Categories} from "./components/Categories";
import {Sort} from "./components/Sort";
import {PizzaBlock} from "./components/PizzaBlock";
import pizzas from "./assets/pizzas.json"


const App = () => {
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
                        {pizzas.map(m => {
                            return (
                                    <PizzaBlock title={m.title} price={m.price}/>
                            )
                        })}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default App;