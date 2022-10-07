import React from "react";
import { Route, Routes } from "react-router-dom";
import axios from "axios";
import Header from "./components/Header";
import Drawer from "./components/Drawer";
// import Card from "./components/Card";
import Home from "./pages/Home";
import Favorites from "./pages/Favorites";
import Error from "./pages/Error";

function App() {
    const [items, setItems] = React.useState([]);
    const [cartItems, setCartItems] = React.useState([]);
    const [favoriteItems, setFavoriteItems] = React.useState([]);
    const [searchValue, setSearchValue] = React.useState("");
    const [cartOpened, setCartOpened] = React.useState(false);
    const [isLoading, setIsLoading] = React.useState(true);

    React.useEffect(() => {
        (async () => {
            const cartRes = await axios.get(
                "https://631b33f2fae3df4dcff7d120.mockapi.io/cart"
            );
            const favoritesRes = await axios.get(
                "https://631b33f2fae3df4dcff7d120.mockapi.io/favorites"
            );
            const itemsRes = await axios.get(
                "https://631b33f2fae3df4dcff7d120.mockapi.io/sneakers"
            )

            setCartItems(cartRes.data);
            setFavoriteItems(favoritesRes.data);
            setItems(itemsRes.data);
            setIsLoading(false);
        })();
    }, []);

    const toggleCart = () => {
        setCartOpened(!cartOpened);
    };

    const onClickPlus = async (obj) => {
        try {
            if (cartItems.find((item) => Number(item.id) === Number(obj.id))) {
                axios.delete(
                    `https://631b33f2fae3df4dcff7d120.mockapi.io/cart/${obj.id}`
                );
                setCartItems((prev) =>
                    prev.filter((item) => item.id !== obj.id)
                );
            } else {
                const { data } = await axios.post(
                    "https://631b33f2fae3df4dcff7d120.mockapi.io/cart",
                    obj
                );

                setCartItems((prev) => [...prev, data]);
            }
        } catch (error) {
            alert("Error: " + error);
        }
    };

    const onClickFavorite = async (obj) => {
        try {
            if (
                favoriteItems.find((item) => Number(item.id) === Number(obj.id))
            ) {
                axios.delete(
                    `https://631b33f2fae3df4dcff7d120.mockapi.io/favorites/${obj.id}`
                );
            } else {
                const { data } = await axios.post(
                    "https://631b33f2fae3df4dcff7d120.mockapi.io/favorites",
                    obj
                );

                setFavoriteItems((prev) => [...prev, data]);
            }
        } catch (error) {
            alert("Error: " + error);
        }
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
                    onClickPlus={onClickPlus}
                />
            )}
            <Header toggleCart={toggleCart} />
            <Routes>
                <Route
                    exact
                    path='/'
                    element={
                        <Home
                            items={items}
                            searchValue={searchValue}
                            setSearchValue={setSearchValue}
                            onClickPlus={onClickPlus}
                            onClickFavorite={onClickFavorite}
                            onChangeSearchInput={onChangeSearchInput}
                            isLoading={isLoading}
                        />
                    }
                ></Route>
                <Route
                    path='/favorites'
                    element={
                        <Favorites
                            items={favoriteItems}
                            onClickPlus={onClickPlus}
                            onClickFavorite={onClickFavorite}
                        />
                    }
                ></Route>
                <Route
                    path='*'
                    element={<Error />}
                ></Route>
            </Routes>
        </div>
    );
}

export default App;
