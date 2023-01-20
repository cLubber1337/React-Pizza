import React from 'react';

type CategoriesPropsType = {
    onClickCategoriesID: (CategoryID: number)=> void
    CategoryID: number
}

export const Categories: React.FC<CategoriesPropsType> = ({onClickCategoriesID, CategoryID}) => {





    const categories = ["Все", "Мясные", "Вегетарианская", "Гриль", "Острые", "Закрытые",]


    return (
        <div className="categories">
            <ul>
                {categories.map((category, index) => {
                    return (
                        <li key={index} onClick={() => onClickCategoriesID(index)}
                            className={CategoryID === index ? "active" : ""}>{category}</li>
                    )
                })}
            </ul>
        </div>
    );
};


