import React, {useState} from 'react';
import {PizzaType} from "../../App";
import {useDispatch, useSelector} from "react-redux";
import {addItem} from "../../redux/slices/cartSlice";
import {RootState} from "../../redux/store";

export const PizzaBlock: React.FC<PizzaType> = ({
                                                    title, price, imageUrl, sizes,
                                                    types, id,count
                                                }) => {

    const [indexSize, setIndexSize] = useState<number>(0)
    const [indexType, setIndexType] = useState<number>(0)
    const typeNames = ["традиционное", "тонкое"]
    const dispatch = useDispatch()
    const onClickAdd = () => {
        const item = {
            id, title, price, imageUrl, type: typeNames[indexType], size: sizes[indexSize], count
        }
        dispatch(addItem(item))
    }
    const cardItem = useSelector((state:RootState)=> state.cart.items.find( obj => obj.id === id))
    const addedCount = cardItem ? cardItem.count : 0

    return (
        <div className="pizza-block-wrapper">
            <div className="pizza-block">
                <img
                    className="pizza-block__image"
                    src={imageUrl}
                    alt="Pizza"
                />
                <h4 className="pizza-block__title">{title}</h4>
                <div className="pizza-block__selector">
                    <ul>
                        {types.map((type, index) => {
                            return (
                                <li key={index} onClick={() => setIndexType(index)}
                                    className={indexType === index ? "active" : ""}>{typeNames[type]}</li>
                            )
                        })}
                    </ul>
                    <ul>
                        {sizes.map((size, index) => {
                            return (
                                <li key={index} onClick={() => setIndexSize(index)}
                                    className={indexSize === index ? "active" : ""}>{size} см.</li>
                            )
                        })}
                    </ul>
                </div>
                <div className="pizza-block__bottom">
                    <div className="pizza-block__price">от {price} ₽</div>
                    <button onClick={onClickAdd} className="button button--outline button--add">
                        <svg
                            width="12"
                            height="12"
                            viewBox="0 0 12 12"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                d="M10.8 4.8H7.2V1.2C7.2 0.5373 6.6627 0 6 0C5.3373 0 4.8 0.5373 4.8 1.2V4.8H1.2C0.5373 4.8 0 5.3373 0 6C0 6.6627 0.5373 7.2 1.2 7.2H4.8V10.8C4.8 11.4627 5.3373 12 6 12C6.6627 12 7.2 11.4627 7.2 10.8V7.2H10.8C11.4627 7.2 12 6.6627 12 6C12 5.3373 11.4627 4.8 10.8 4.8Z"
                                fill="white"
                            />
                        </svg>
                        <span >Добавить</span>
                        {addedCount > 0 && <i>{addedCount}</i>}
                    </button>
                </div>
            </div>
        </div>
    );
};

