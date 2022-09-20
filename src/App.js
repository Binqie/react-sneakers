import React from "react";
import axios from "axios";
import Header from "./components/Header";
import Drawer from "./components/Drawer";
import Card from "./components/Card";

function App() {
    const [items, setItems] = React.useState([]);
    const [cartItems, setCartItems] = React.useState([]);
    const [favoriteItems, setFavoriteItems] = React.useState([]);
    const [searchValue, setSearchValue] = React.useState("");
    const [cartOpened, setCartOpened] = React.useState(false);

    React.useEffect(() => {
        axios
            .get("https://631b33f2fae3df4dcff7d120.mockapi.io/sneakers")
            .then((res) => {
                setItems(res.data);
            });
        axios
            .get("https://631b33f2fae3df4dcff7d120.mockapi.io/cart")
            .then((res) => {
                setCartItems(res.data);
            });
    }, []);

    const toggleCart = () => {
        setCartOpened(!cartOpened);
    };

    const addToCart = (obj) => {
        let flag = false;

        cartItems.forEach((item) => {
            if (item === obj) flag = true;
        });

        if (flag) return;

        setCartItems((prev) => [...prev, obj]);

        axios.post("https://631b33f2fae3df4dcff7d120.mockapi.io/cart", obj);
    };

    const removeFromCart = (id) => {
        setCartItems((prev) => prev.filter((item) => item.id !== id));

        axios.delete(`https://631b33f2fae3df4dcff7d120.mockapi.io/cart/${id}`);
    };
    
    const addToFavorite = (obj) => {
        // console.log('add', obj);
        let flag = false;

        favoriteItems.forEach((item) => {
            if (item === obj) flag = true;
        });

        if (flag) return;

        setFavoriteItems((prev) => [...prev, obj]);

        // axios.post("https://631b33f2fae3df4dcff7d120.mockapi.io/favorites", obj);
    };

    const removeFromFavorite = (id) => {
        // console.log('remove', id);
        setFavoriteItems((prev) => prev.filter((item) => item.id !== id));

        // axios.delete(`https://631b33f2fae3df4dcff7d120.mockapi.io/favorites/${id}`);
    };

    const onChangeSearchInput = (event) => {
        setSearchValue(event.target.value);
    };

    return (
        <div className='wrapper clear'>
            {cartOpened && (
                <Drawer
                    items={cartItems}
                    toggleCart={toggleCart}
                    removeFromCart={removeFromCart}
                />
            )}
            <Header toggleCart={toggleCart} />

            <div className='content p-40'>
                <div className='d-flex justify-between align-center mb-40'>
                    <h1>
                        {searchValue
                            ? `Search by: ${searchValue}`
                            : "All sneakers"}
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
                            obj.title
                                .toLowerCase()
                                .includes(searchValue.toLowerCase())
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
        </div>
    );
}

export default App;
