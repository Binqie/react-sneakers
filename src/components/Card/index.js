import React from "react";
import Classes from "./Card.module.scss";

function Card({
    id,
    title,
    price,
    src,
    onClickPlus,
    onClickFavorite,
    favorite = false,
}) {
    const [isAdded, setIsAdded] = React.useState(false);
    const [isFavorite, setIsFavorite] = React.useState(favorite);

    const onPlus = () => {
        setIsAdded(!isAdded);
        onClickPlus({ id, title, src, price, favorite });
    };

    const onFavorite = (event) => {
        event.stopPropagation();
        setIsFavorite(!isFavorite);
        onClickFavorite({id, title, src, price, favorite});
    };

    return (
        <div className={Classes.card}>
            <div
                className={Classes.favorite}
                onClick={onFavorite}
            >
                <img
                    src={
                        isFavorite
                            ? "/img/heart-liked.svg"
                            : "/img/heart-unliked.svg"
                    }
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
                    onClick={onPlus}
                    alt='Plus'
                    src={isAdded ? "/img/btn-checked.svg" : "/img/btn-plus.svg"}
                />
            </div>
        </div>
    );
}

export default Card;
