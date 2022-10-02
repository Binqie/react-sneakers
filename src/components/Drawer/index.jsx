function Drawer({ toggleCart, onClickPlus, items = [] }) {
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

                {items.length > 0 ? (
                    <>
                        <div className='items mb-40'>
                            {items.map((obj) => {
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

                            <button className='btn-order'>
                                Order{" "}
                                <img
                                    src='/img/arrow.svg'
                                    alt='Arrow'
                                />
                            </button>
                        </div>
                    </>
                ) : (
                    <div className='cartEmpty d-flex align-center justify-center flex-column flex'>
                        <img
                            className='mb-20'
                            width={120}
                            height={120}
                            src='/img/cartEmpty.jpg'
                        />
                        <h2>Cart is empty...</h2>
                        <p className='opacity-6'>
                            Add at least one product to make an order!
                        </p>
                        <button className='greenButton btn-order'>
                            <img
                                src='/img/arrow.svg'
                                alt='Arrow'
                            />
                            Return back
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}

export default Drawer;
