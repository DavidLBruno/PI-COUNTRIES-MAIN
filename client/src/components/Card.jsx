import React from 'react';

export default function Card({ name, img, population}){
    return(
        <div>
            <h3>{name}</h3>
            <h5>{population}</h5>
            <img src={img} alt='Img not found' width='200px' height='250px' />
        </div>
    )
}