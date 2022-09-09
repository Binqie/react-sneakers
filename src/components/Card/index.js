import React from "react";
import Classes from "./Card.module.scss";

function Card({ title, price, src, addToCart, addToFavorite, removeFromCart}) {
    const [isAdded, setIsAdded] = React.useState(false);

    const onClickPlus = () => {
        setIsAdded(!isAdded);
        if (isAdded) { 
            removeFromCart()
        } else {
            addToCart();
        }
    };

    return (
        <div className={Classes.card}>
            <div
                className={Classes.favorite}
                onClick={addToFavorite}
            >
                <img
                    src='/img/heart-unliked.svg'
                    alt='Unliked'
                />
            </div>
            <img
                width={133}
                height={112}
                alt='Favorite'
                src={src}
            />
            <h5>{title}</h5>
            <div className='d-flex justify-between align-center'>
                <div className='d-flex flex-column'>
                    <span>Price:</span>
                    <b>{price} rub</b>
                </div>
                <img
                    className={Classes.plus}
                    onClick={onClickPlus}
                    alt='Plus'
                    src={isAdded ? "/img/btn-checked.svg" : "/img/btn-plus.svg"}
                />
            </div>
        </div>
    );
}

export default Card;
