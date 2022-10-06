import Card from "../components/Card";

function Home({
    items,
    searchValue,
    onChangeSearchInput,
    setSearchValue,
    onClickPlus,
    onClickFavorite,
    isLoading,
}) {
    const renderItems = () => {
        const filteredItems = items.filter((item) => item.title.toLowerCase().includes(searchValue.toLowerCase))
    }
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
                {filteredItems
                    .map((obj) => (
                        <Card
                            key={obj.title}
                            onClickPlus={onClickPlus}
                            onClickFavorite={onClickFavorite}
                            loading={isLoading}
                            {...obj}
                        />
                    ))}
            </div>
        </div>
    );
}

export default Home;
