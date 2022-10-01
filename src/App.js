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
        console.log("add", obj);
        let flag = false;

        favoriteItems.forEach((item) => {
            if (item === obj) flag = true;
        });

        if (flag) return;

        setFavoriteItems((prev) => [...prev, obj]);

        axios.post(
            "https://631b33f2fae3df4dcff7d120.mockapi.io/favorites",
            obj
        );
    };

    const removeFromFavorite = (id) => {
        console.log("remove", id);
        setFavoriteItems((prev) => prev.filter((item) => item.id !== id));

        axios.delete(
            `https://631b33f2fae3df4dcff7d120.mockapi.io/favorites/${id}`
        );
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
            <Routes>
                <Route
                    exact
                    path='/'
                    element={
                        <Home
                            items={items}
                            searchValue={searchValue}
                            setSearchValue={setSearchValue}
                            addToCart={addToCart}
                            removeFromCart={removeFromCart}
                            addToFavorite={addToFavorite}
                            removeFromFavorite={removeFromFavorite}
                            onChangeSearchInput={onChangeSearchInput}
                        />
                    }
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
    );
}

export default App;
