import React from 'react'
import AppContext from '../../Context';

const Info = ({ title, img, description }) => {
    const {toggleCart} = React.useContext(AppContext)
    return (
        <div className='cartEmpty d-flex align-center justify-center flex-column flex'>
            <img
                className='mb-20'
                width={120}
                height={120}
                src={img}
            />
            <h2>{title}</h2>
            <p className='opacity-6'>
                {description}
            </p>
            <button onClick={toggleCart} className='greenButton btn-order'>
                <img
                    src='/img/arrow.svg'
                    alt='Arrow'
                />
                Return back
            </button>
        </div>
    );
    }

export default Info