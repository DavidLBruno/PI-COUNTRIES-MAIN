import React, { Fragment } from 'react';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getCountries } from '../actions';
import { Link } from 'react-router-dom';
import Card from './Card';

export default function Home(){
    const dispatch = useDispatch();
    const allCountries = useSelector((state) => state.countries);

    useEffect(() => {
        dispatch(getCountries());
    }, [])

    function handleClick(e){
        e.preventDefault();
        dispatch(getCountries());
    }

    return(
        <div>
            <Link to='/activity'>Create activity</Link>
            <h1>Go on</h1>
            <button onClick={e => {handleClick(e)}}>
                Recharge activities
            </button>
            <div>
                <select>
                    <option value = 'asc'>Ascendente</option>
                    <option value = 'desc'>Descendente</option>
                </select>
                <select>
                <option value = 'inv'>invieron</option>
                <option value = 'ver'>verano</option>
                <option value = 'oto'>oto?o</option>
                <option value = 'pri'>primaver</option>
                </select>
                <select>
                <option value = 'dif'>Dificiles</option>
                <option value = 'fac'>Faciles</option>
                <option value = 'int'>Intermedias</option>
                </select>
                { allCountries?.map(e => {
                    return(
                        <fragment>
                        <Link to={'/home/' + e.id}>
                        <Card name={e.name} img={e.img} population={e.population} />
                        </Link>
                        </fragment>
                        )
                })}
            </div>
        </div>
    )
}