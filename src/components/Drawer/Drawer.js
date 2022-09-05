function Drawer() {
    return (
        <div style={{display: 'none'}} className="overlay">
            <div className="drawer">

                <h2 className="d-flex justify-between mb-30">Cart
                    <img className="removeBtn cu-p" src="/img/btn-remove.svg" alt="Remove" />
                </h2>

                <div className="items mb-40">
                    <div className="cartItem d-flex align-center mb-20">
                        <div style={ {backgroundImage: 'url(/img/sneakers/NikeLeBronXVIII.png)'} } className="cartItemImg"></div>

                        <div className="mr-20 flex">
                            <p className="mb-5">Nike LeBron XVIII</p>
                            <b>12 000 rub</b>
                        </div>
                        <img className="removeBtn" src="/img/btn-remove.svg" alt="Remove" />
                    </div>

                    <div className="cartItem d-flex align-center mb-20">
                        <div style={ {backgroundImage: 'url(/img/sneakers/NikeLeBronXVIII.png)'} } className="cartItemImg"></div>

                        <div className="mr-20 flex">
                            <p className="mb-5">Nike LeBron XVIII</p>
                            <b>12 000 rub</b>
                        </div>
                        <img className="removeBtn" src="/img/btn-remove.svg" alt="Remove" />
                    </div>
                </div>

                <div className="cartTotalBlock">
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

                    <button className="btn-order">Order <img src="/img/arrow.svg" alt="Arrow" /></button>
                </div>
                
            </div>
        </div>
    )
}

export default Drawer