const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const axios = require ('axios');
const { Activity, Country } = require ('../db')


const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
const getApiInfo = async () => {
    try{
    const apiUrl = await axios.get('https://restcountries.com/v3.1/all');
    const apiInfo = await apiUrl.data.map(e => {
        return {
            id: e.cioc || e.cca3,
            name: e.name.common,
            img: e.flags.png,
            continent: e.region,
            capital: e.hasOwnProperty('capital') ? e.capital[0] : 'None',
            subregion: e.hasOwnProperty('subregion') ? e.subregion : 'Unknown',
            area: e.hasOwnProperty('area') ? e.area : 'Unknown',
            population: e.hasOwnProperty('population') ? e.population : 'Unknown',
        }
    })
    return apiInfo
    }catch(error){
        console.log('Database offline', error)
    }
};

//Si no recibe name devuelve todos los paises (Tambien si los paises no estan en la DataBase los crea)
router.get('/countries', async (req, res, next) => {
    try {
        if(!req.query.name){
            let countries = await getApiInfo()
            countries.forEach(e => {
                Country.findOrCreate({
                    where: {
                        id: e.id,
                        name: e.name,
                        img: e.img,
                        continent: e.continent,
                        capital: e.capital,
                        subregion: e.subregion,
                        area: e.area,
                        population: e.population
                }
            })
        })
        const allCountries = await Country.findAll({
            include: Activity
        })
        res.send(allCountries)
        }else if(req.query.name){
            const {name} = req.query;
            const allCountries2 = await Country.findAll({
                include: Activity
            })
            const country = allCountries2.filter(country => country.name.toLowerCase().includes(name.toLowerCase()))
            country.length ? res.send(country) : res.send('Country not found')
        }else{
            next()
        }
    } catch(error) {
        res.send(error)
    }
});

router.get('/countries/:id', async (req, res) => {
    try{
        const { id } = req.params;
        const countryById = await Country.findAll({
            where: {id: id.toUpperCase()},
            include: Activity
        })
        res.send(countryById);
    }catch(error){
        res.send(error);
    }
})

router.post('/activity', async (req, res) => {
    try{
        const { name, difficulty, duration, season, country } = req.body;
        const newActivity = await Activity.create({
            name,
            difficulty,
            duration,
            season,
            country
        })
        let activityCountry = await Country.findAll({
            where: { name: country }
        })
        activityCountry.forEach(e => {
            newActivity.addCountry(country)
        })
        res.send('Activity created successfully')
    }catch(error){
        res.send(error)
    }
})

module.exports = router;
