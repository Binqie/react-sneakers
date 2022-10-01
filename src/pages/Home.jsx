import Card from "../components/Card";

function Home({
    items,
    searchValue,
    onChangeSearchInput,
    setSearchValue,
    addToCart,
    removeFromCart,
    addToFavorite,
    removeFromFavorite,
}) {
    return (
        <div className='content p-40'>
            <div className='d-flex justify-between align-center mb-40'>
                <h1>
                    {searchValue ? `Search by: ${searchValue}` : "All sneakers"}
                </h1>
                <div className='search-block d-flex'>
                    <img
                        src='/img/search.svg'
                        alt='Search'
                    />
                    <input
                        type='text'
                        placeholder='Search...'
                        value={searchValue}
                        onInput={onChangeSearchInput}
                    />
                    {searchValue && (
                        <img
                            className='removeBtn cu-p'
                            src='/img/btn-remove.svg'
                            onClick={() => setSearchValue("")}
                            alt='Clear'
                        />
                    )}
                </div>
            </div>
            <div className='d-flex flex-wrap'>
                {items
                    .filter((obj) =>
                        obj.title.toLowerCase().includes(searchValue.toLowerCase())
                    )
                    .map((obj) => (
                        <Card
                            id={obj.id}
                            key={obj.title}
                            title={obj.title}
                            price={obj.price}
                            src={obj.src}
                            addToCart={() => addToCart(obj)}
                            removeFromCart={(id) => removeFromCart(id)}
                            addToFavorite={() => addToFavorite(obj)}
                            removeFromFavorite={(id) => removeFromFavorite(id)}
                        />
                    ))}
            </div>
        </div>
    )
}

export default Home;
