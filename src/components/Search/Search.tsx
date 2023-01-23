import React from 'react';
import s from "./Search.module.scss"
import {SearchContext} from "../../App";


export const Search: React.FC = () => {

    const {searchInput, setSearchInput} = React.useContext(SearchContext)

    return (
        <div className={s.root}>
            <svg viewBox="0 0 512 512" xmlSpace="preserve" xmlns="http://www.w3.org/2000/svg"
                 enableBackground="new 0 0 512 512" className={s.icon}>
                <path
                    d="M344.5 298c15-23.6 23.8-51.6 23.8-81.7 0-84.1-68.1-152.3-152.1-152.3C132.1 64 64 132.2 64 216.3c0 84.1 68.1 152.3 152.1 152.3 30.5 0 58.9-9 82.7-24.4l6.9-4.8L414.3 448l33.7-34.3-108.5-108.6 5-7.1zm-43.1-166.8c22.7 22.7 35.2 52.9 35.2 85s-12.5 62.3-35.2 85c-22.7 22.7-52.9 35.2-85 35.2s-62.3-12.5-85-35.2c-22.7-22.7-35.2-52.9-35.2-85s12.5-62.3 35.2-85c22.7-22.7 52.9-35.2 85-35.2s62.3 12.5 85 35.2z"
                    fill="#fe5f1e"></path>
            </svg>
            <input value={searchInput} onChange={(e)=>setSearchInput(e.currentTarget.value)} className={s.input} placeholder={"Поиск пиццы..."}/>
        </div>
    );
};

