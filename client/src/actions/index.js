import axios from 'axios';

export function getCountries(){
    return async function (dispatch){
        let json = await axios('http://localhost:3001/countries');
        return dispatch({
            type: 'GET_COUNTRIES',
            payload: json.data
        })
    }
};

export function filterByContinent(payload){
    return{
        type: 'FILTER_BY_CONTINENT',
        payload
    }
};

export function filterCountriesByActivity(payload){
    return{
        type: 'FILTER_BY_ACTIVITY',
        payload
    }
};

export function orderByName(payload){
    return{
        type: 'ORDER_BY_NAME',
        payload
    }
};

export function orderByPopulation(payload){
    return{
        type: 'ORDER_BY_POPULATION',
        payload
    }
};

export function getNameCountries(name){
    return async function(dispatch){
        try{
            var json = await axios.get('http://localhost:3001/countries?name=' + name);
            return dispatch({
                type: 'GET_NAME_COUNTRIES',
                payload: json.data
            });
        }catch(error){
            console.log(error)
        }
    }
};

export function postActivities(payload){
        return async function(){
        await axios.post('http://localhost:3001/activity', payload);
    }
};

export function getDetail(id){
    return async function(dispatch){
        try{
            var json = await axios.get('http://localhost:3001/countries/' + id);
            return dispatch({
                type: "GET_DETAIL",
                payload: json.data
            })
        }catch(error){
            console.log(error)
        }
    }
};

export function filterByActivity(payload){
    return {
        type: 'FILTER_BY_ACTIVITY',
        payload
    }
}

