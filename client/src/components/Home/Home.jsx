import React, { Fragment } from 'react';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getCountries, filterByContinent, filterCountriesByActivity, orderByName, orderByPopulation, filterByActivity } from '../../actions/index';
import { Link } from 'react-router-dom';
import Card from '../Card/Card';
import Paginated from '../Paginated/Paginated';
import SearchBar from '../SearchBar/SearchBar';
import styles from './Home.module.css';

export default function Home(){
    const dispatch = useDispatch();
    const allCountries = useSelector((state) => state.countries);
    const activities = useSelector((state) => state.activities);
    const [ orden, setOrden ] = useState('')
    const [ activity, setActivity ] = useState('')
    const [ currentPage, setCurrentPage ] = useState(1);
    const [ countriesPerPage, setCountriesPerPage ] = useState(10);
    const indexOfLastCountrie = currentPage * countriesPerPage;
    const indexOfFirstCountrie = indexOfLastCountrie - countriesPerPage;
    const currentCountries = allCountries.slice(indexOfFirstCountrie, indexOfLastCountrie);


    const paginated = (pageNumber) => {
        setCurrentPage(pageNumber)
    }

    useEffect(() => {
        dispatch(getCountries());
    }, [])

    useEffect(() => {
        setCurrentPage(1);
    }, [allCountries]);

    function handleClick(){
        dispatch(getCountries())
    };
    function handleFilterContinent(e){
        dispatch(filterByContinent(e.target.value))
    };
    function handleSortByName(e){
        e.preventDefault();
        dispatch(orderByName(e.target.value))
        setCurrentPage(1);
        setOrden(`Ordenado ${e.target.value}`)
    };
    function handleSortByPopulation(e){
        e.preventDefault();
        dispatch(orderByPopulation(e.target.value))
        setCurrentPage(1);
        setOrden(`Ordenado ${e.target.value}`)
    };
    function setInputHandle(e){
        e.preventDefault()
        dispatch(filterByActivity(activity))
    };
    function inputActivityHandler(e){
        setActivity(e.target.value)
    };

    return(
        <div className={styles.body}>

            <div className={styles.home}>

            <h1 className={styles.title}>Countries</h1>
                <Link to='/activity'>
                    <button className={styles.btnActivity}>Create Activity</button>
                </Link>

            <div className={styles.searchBar}>

            <SearchBar />

            <form onSubmit={setInputHandle}>
            <label>Activity: </label>
            <input placeholder="find by activity and enter..." type="text" value={activity} onChange={inputActivityHandler}/>
            </form>

            </div>

            <button onClick= { e => { handleClick(e) }}>
                Recharge countries
            </button>

                <select onChange={ handleSortByName }>
                    <option>-</option>
                    <option value = 'asc'>A-Z</option>
                    <option value = 'des'>Z-A</option>
                </select>

                <select onChange={ handleSortByPopulation }>
                <option>-</option>
                <option value = 'des'>Population ↑</option>
                <option value = 'asc'>Population ↓</option>
                </select>

                <select onChange={ handleFilterContinent }>
                <option value = 'All'>All</option>
                <option value = 'Europe'>Europe</option>
                <option value = 'Africa'>Africa</option>
                <option value = 'Americas'>Americas</option>
                <option value = 'Asia'>Asia</option>
                <option value = 'Oceania'>Oceania</option>
                <option value = 'Antarctic'>Antarctic</option>
                </select>
            </div>

            <div className={styles.cards}>
                { currentCountries?.map(e => {
                    return(
                        <Card name={e.name} continent={e.continent} img={e.img} id={e.id}/>
                        )
                })}
            </div>

            <div className={styles.paginated}>
            <Paginated
                countriesPerPage = { countriesPerPage }
                allCountries = { allCountries.length }
                paginated = { paginated }
                />
            </div>

        </div>
    )
}