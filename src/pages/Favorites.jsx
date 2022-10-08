import React from "react";
import Card from "../components/Card";
import AppContext from "../Context";

function Favorites() {
    const { favoriteItems } = React.useContext(AppContext);

    return (
        <div className='content p-40'>
            <div className='d-flex justify-between align-center mb-40'>
                <h1>My favorites</h1>
            </div>
            <div className='d-flex flex-wrap'>
                {favoriteItems.map((obj) => (
                    <Card
                        key={obj.title}
                        favorite
                        {...obj}
                    />
                ))}
            </div>
        </div>
    );
}

export default Favorites;
