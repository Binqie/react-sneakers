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
        axios
            .get("https://631b33f2fae3df4dcff7d120.mockapi.io/favorites")
            .then((res) => {
                setFavoriteItems(res.data);
            });
    }, []);

    const toggleCart = () => {
        setCartOpened(!cartOpened);
    };

    // const onClickPlus = (obj) => {
    //     if (cartItems.find((item) => item.id === obj.id)) {
    //         axios.delete(
    //             `https://631b33f2fae3df4dcff7d120.mockapi.io/cart/${obj.id}`
    //         );
    //         setCartItems((prev) => prev.filter((item) => item.id !== obj.id))
    //     } else {
    //         axios.post('https://631b33f2fae3df4dcff7d120.mockapi.io/cart', obj)
    //         setCartItems((prev) => [...prev, obj])
    //     }
    // }

    const onClickPlus = async (obj) => {
        try {
            if (cartItems.find((item) => item.id === obj.id)) {
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
            alert('Error: ' + error)
        }
    };

    const onClickFavorite = async (obj) => {
        try {
            if (favoriteItems.find((item) => item.id === obj.id)) {
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
            alert('Error: ' + error)
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
