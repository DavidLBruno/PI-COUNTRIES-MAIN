const initialState = {
    countries : [],
    allCountries: [],
    activities : [],
    detail: [],
    countryDetail: {}
}

function rootReducer(state = initialState, action){
    switch(action.type){
        case 'GET_COUNTRIES':
            return{
                ...state,
                countries: action.payload,
                allCountries: action.payload
            }
        case 'FILTER_BY_CONTINENT':
            let allCountriesCont = state.allCountries;
            let continentFiltered = action.payload === 'All' ? allCountriesCont : allCountriesCont.filter(el  => el.continent === action.payload);
            return{
                ...state,
                countries: continentFiltered
            }
            case 'ORDER_BY_NAME':
                let orderedAZ = action.payload === 'asc' ?
                state.countries.sort(function(a, b){
                    if(a.name > b.name){
                    return 1;
                }
                if(b.name > a.name){
                    return -1;
                }
                return 0;
            }) :
            state.countries.sort(function(a, b){
                if(a.name > b.name){
                    return -1;
                }
                if(b.name > a.name){
                    return 1;
                }
            })
            return{
                ...state,
                countries: orderedAZ
            }
            case 'ORDER_BY_POPULATION':
                let orderedPopulation = action.payload === 'asc' ?
            state.countries.sort(function(a, b){
                if(a.population > b.population){
                    return 1;
                }
                if(b.population > a.population){
                    return -1;
                }
                return 0;
            }) :
            state.countries.sort(function(a, b){
                if(a.population > b.population){
                    return -1;
                }
                if(b.population > a.population){
                    return 1;
                }
            })
            return{
                ...state,
                countries: orderedPopulation
            }
            case 'GET_NAME_COUNTRIES':
                return {
                    ...state,
                countries: action.payload
            }
        case 'GET_DETAIL':
            return{
                ...state,
                detail: action.payload
            }
        case 'FILTER_BY_ACTIVITY':
            return{
                ...state,
                countries: state.countries.filter((c) => {
                    return c.activities?.some((a) => a.name === action.payload)
                })
            }
            default:
                return state;
    }
}

export default rootReducer;