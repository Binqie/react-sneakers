import React from "react";
import Header from "./components/Header";
import Drawer from "./components/Drawer";
import Card from "./components/Card";

function App() {
    const [items, setItems] = React.useState([]);
    const [cartItems, setCartItems] = React.useState([]);
    const [cartOpened, setCartOpened] = React.useState(false);

    React.useEffect(() => {
        fetch("https://631b33f2fae3df4dcff7d120.mockapi.io/sneakers")
            .then((res) => res.json())
            .then((data) => {
                setItems(data);
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
    };

    const removeFromCart = (obj) => {
        let newCartItems = cartItems.filter(item => item != obj);
        setCartItems(newCartItems);
    } 

    return (
        <div className='wrapper clear'>
            {cartOpened && (
                <Drawer
                    items={cartItems}
                    toggleCart={toggleCart}
                />
            )}
            <Header toggleCart={toggleCart} />

            <div className='content p-40'>
                <div className='d-flex justify-between align-center mb-40'>
                    <h1>All sneakers</h1>
                    <div className='search-block d-flex'>
                        <img
                            src='/img/search.svg'
                            alt='Search'
                        />
                        <input
                            type='text'
                            placeholder='Search'
                        />
                    </div>
                </div>

                <div className='d-flex flex-wrap'>
                    {items.map((obj) => (
                        <Card
                            title={obj.title}
                            price={obj.price}
                            src={obj.src}
                            addToCart={() => addToCart(obj)}
                            removeFromCart={() => removeFromCart(obj)}
                            addToFavorite={() => console.log("fav")}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
}

export default App;
