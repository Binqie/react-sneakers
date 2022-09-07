import Classes from './Card.module.scss'

function Card({title, price, src}) {
    return (
            <div className={Classes.card}>
                <div className={Classes.favorite}>
                    <img src="/img/heart-unliked.svg" alt="Unliked" />
                </div>
                <img width={133} height={112} src={src} alt="" />
                <h5>{title}</h5>
                <div className="d-flex justify-between align-center">
                    <div className="d-flex flex-column">
                        <span>Price:</span>
                        <b>{price} rub</b>
                    </div>
                    <button
                        className="button "
                        onClick={() => alert(title)}>
                        <img width={11} height={11} src="/img/plus.svg" alt="plus" />
                    </button>
                </div>
            </div>
    )
}

export default Card