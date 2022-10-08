import axios from "axios";
import React from "react";
import AppContext from "../../Context";
import Info from "../Info/Info";

function Drawer() {
    const [ordered, setOrdered] = React.useState(false);
    const [orderId, setOrderId] = React.useState(null);
    const [isLoading, setIsLoading] = React.useState(false);
    const { cartItems, onClickPlus, toggleCart, setCartItems } =
        React.useContext(AppContext);

    const onOrder = async (obj) => {
        try {
            setIsLoading(true);

            const { data } = await axios.post(
                "https://631b33f2fae3df4dcff7d120.mockapi.io/orders",
                { items: cartItems }
            );

            setOrdered(true);
            setCartItems([]);
            setOrderId(data.id);

            await axios.put(
                "https://631b33f2fae3df4dcff7d120.mockapi.io/cart",
                []
            );
        } catch (error) {
            alert("Failed order!", Error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className='overlay'>
            <div className='drawer'>
                <h2 className='d-flex justify-between mb-30'>
                    Cart
                    <img
                        className='removeBtn cu-p'
                        src='/img/btn-remove.svg'
                        onClick={toggleCart}
                        alt='Remove'
                    />
                </h2>

                {cartItems.length > 0 ? (
                    <>
                        <div className='items mb-40'>
                            {cartItems.map((obj) => {
                                return (
                                    <div
                                        key={obj.title}
                                        className='cartItem d-flex align-center mb-20'
                                    >
                                        <div
                                            style={{
                                                backgroundImage: `url(${obj.src})`,
                                            }}
                                            className='cartItemImg'
                                        ></div>

                                        <div className='mr-20 flex'>
                                            <p className='mb-5'>{obj.title}</p>
                                            <b>{obj.price} rub</b>
                                        </div>
                                        <img
                                            className='removeBtn'
                                            src='/img/btn-remove.svg'
                                            alt='Remove'
                                            onClick={() => onClickPlus(obj)}
                                        />
                                    </div>
                                );
                            })}
                        </div>

                        <div className='cartTotalBlock'>
                            <ul>
                                <li>
                                    <span>Total:</span>
                                    <div></div>
                                    <b>21 498 rub</b>
                                </li>
                                <li>
                                    <span>Tax 5%:</span>
                                    <div></div>
                                    <b>1074 rub</b>
                                </li>
                            </ul>

                            <button
                                disabled={isLoading}
                                onClick={onOrder}
                                className='btn-order'
                            >
                                Order
                                <img
                                    src='/img/arrow.svg'
                                    alt='Arrow'
                                />
                            </button>
                        </div>
                    </>
                ) : (
                    <Info
                        title={
                            ordered
                                ? "Ordered successfully!"
                                : "Cart is empty..."
                        }
                        img={
                            ordered ? "/img/ordered.jpg" : "/img/cartEmpty.jpg"
                        }
                        description={
                            ordered
                                ? `Your order #${orderId} will be delivered in few hours.`
                                : "Add at least one product to make an order!"
                        }
                    ></Info>
                )}
            </div>
        </div>
    );
}

export default Drawer;
