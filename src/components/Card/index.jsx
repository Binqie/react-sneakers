import React from "react";
import Classes from "./Card.module.scss";
import ContentLoader from "react-content-loader";
import AppContext from "../../Context";

function Card({
    id,
    title,
    price,
    src,
    favorite = false,
}) { 
    const { isItemAdded, onClickPlus, onClickFavorite, isLoading = false } = React.useContext(AppContext);
    const [isFavorite, setIsFavorite] = React.useState(favorite);

    const onPlus = () => {
        onClickPlus({ id, title, src, price, favorite });
    };

    const onFavorite = (event) => {
        event.stopPropagation();
        setIsFavorite(!isFavorite);
        onClickFavorite({ id, title, src, price, favorite });
    };

    return (
        <div className={Classes.card}>
            {isLoading ? (
                <ContentLoader
                    speed={2}
                    width={180}
                    height={195}
                    viewBox='0 0 180 195'
                    backgroundColor='#f3f3f3'
                    foregroundColor='#ecebeb'
                >
                    <rect
                        x='0'
                        y='0'
                        rx='10'
                        ry='10'
                        width='180'
                        height='100'
                    />
                    <rect
                        x='0'
                        y='115'
                        rx='5'
                        ry='5'
                        width='180'
                        height='15'
                    />
                    <rect
                        x='0'
                        y='135'
                        rx='5'
                        ry='5'
                        width='120'
                        height='15'
                    />
                    <rect
                        x='0'
                        y='170'
                        rx='10'
                        ry='10'
                        width='110'
                        height='25'
                    />
                    <rect
                        x='132'
                        y='166'
                        rx='0'
                        ry='0'
                        width='1'
                        height='6'
                    />
                    <rect
                        x='148'
                        y='161'
                        rx='10'
                        ry='10'
                        width='32'
                        height='32'
                    />
                </ContentLoader>
            ) : (
                <>
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
                            src={
                                isItemAdded(id)
                                    ? "/img/btn-checked.svg"
                                    : "/img/btn-plus.svg"
                            }
                        />
                    </div>
                </>
            )}
        </div>
    );
}

export default Card;
