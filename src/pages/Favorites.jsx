import Card from "../components/Card";

function Favorites({ items, onClickPlus, onClickFavorite }) {
    return (
        <div className='content p-40'>
            <div className='d-flex justify-between align-center mb-40'>
                <h1>My favorites</h1>
            </div>
            <div className='d-flex flex-wrap'>
                {items.map((obj) => (
                    <Card
                        key={obj.title}
                        onClickPlus={onClickPlus}
                        onClickFavorite={onClickFavorite}
                        {...obj}
                    />
                ))}
            </div>
        </div>
    );
}

export default Favorites;
