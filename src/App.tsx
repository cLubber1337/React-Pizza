import React from 'react';
import "./scss/app.scss"
import {Header} from "./components/Header";
import {Home} from "./pages/Home";
import {Route, Routes} from "react-router-dom";
import {NotFoundBlock} from "./components/NotFoundBlock";
import {Cart} from "./pages/Cart";

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

export type SearchInputType = {
    searchInput: string
    setSearchInput:  React.Dispatch<React.SetStateAction<string>>
}

export const SearchContext = React.createContext<SearchInputType>({} as SearchInputType)

const App = () => {

    const [searchInput, setSearchInput] = React.useState("")
    
    return (
        <div className="wrapper">
            <SearchContext.Provider value={{searchInput, setSearchInput}}>
                <Header />
                <div className="content">
                    <Routes>
                        <Route path={"/cart"} element={<Cart/>}/>
                        <Route path={"/"} element={<Home />}/>
                        <Route path={"/*"} element={<NotFoundBlock/>}/>
                    </Routes>
                </div>
            </SearchContext.Provider>
        </div>
    );
};

export default App;