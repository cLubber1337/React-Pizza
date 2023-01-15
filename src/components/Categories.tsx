import React, {useState} from 'react';

export const Categories = () => {

    const [activeIndex, setActiveIndex] = useState(0)

    const onClickCategory = (index: number) => {
        setActiveIndex(index)
    }

    const categories = ["Все", "Мясные", "Вегетарианская", "Гриль", "Острые", "Закрытые",]


    return (
        <div className="categories">
            <ul>
                {categories.map((category, index) => {
                    return (
                        <li key={index} onClick={() => onClickCategory(index)}
                            className={activeIndex === index ? "active" : ""}>{category}</li>
                    )
                })}
            </ul>
        </div>
    );
};


