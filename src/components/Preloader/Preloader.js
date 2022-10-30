import React from 'react'
import './Preloader.css'

const Preloader = ({states}) => {
    return (
        <div className={`preloader ${states.preloader && "preloader__visible"}`}>
            <div className="preloader__container">
                <span className="preloader__round"></span>
            </div>
        </div>
    )
};

export default Preloader
