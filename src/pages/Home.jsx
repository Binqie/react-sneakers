import React from "react";
import Card from "../components/Card";
import AppContext from "../Context";

function Home({
    items,
    searchValue,
    onChangeSearchInput,
    setSearchValue,
    onClickPlus,
    onClickFavorite,
    isLoading,
}) {
    const { isItemAdded } = React.useContext(AppContext)

    const renderItems = () => {
        const filteredItems = items.filter((item) =>
            item.title.toLowerCase().includes(searchValue.toLowerCase())
        );
        return (isLoading ? [...Array(8)] : filteredItems).map((obj, index) => (
            <Card
                key={index}
                onClickPlus={onClickPlus}
                onClickFavorite={onClickFavorite}
                loading={isLoading}
                added={isItemAdded(obj && obj.id)}
                {...obj}
            />
        ));
    };
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
            <div className='d-flex flex-wrap'>{renderItems()}</div>
        </div>
    );
}

export default Home;
