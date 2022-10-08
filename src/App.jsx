import React from "react";
import { Route, Routes } from "react-router-dom";
import axios from "axios";

import Header from "./components/Header";
import Drawer from "./components/Drawer";

import Home from "./pages/Home";
import Favorites from "./pages/Favorites";
import Error from "./pages/Error";

import AppContext from "./Context";

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
            );

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

                setFavoriteItems((prev) =>
                    prev.filter((item) => item.id !== obj.id)
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

    const isItemAdded = (id) => {
        return cartItems.some((item) => Number(item.id) === Number(id));
    };

    return (
        <AppContext.Provider
            value={{
                items,
                cartItems,
                setCartItems,
                favoriteItems,
                isItemAdded,
                onClickFavorite,
                onClickPlus,
                toggleCart,
                searchValue,
                setSearchValue,
                onChangeSearchInput,
                isLoading,
            }}
        >
            <div className='wrapper clear'>
                {cartOpened && <Drawer />}
                <Header />
                <Routes>
                    <Route
                        exact
                        path='/'
                        element={<Home />}
                    ></Route>
                    <Route
                        path='/favorites'
                        element={<Favorites />}
                    ></Route>
                    <Route
                        path='*'
                        element={<Error />}
                    ></Route>
                </Routes>
            </div>
        </AppContext.Provider>
    );
}

export default App;
