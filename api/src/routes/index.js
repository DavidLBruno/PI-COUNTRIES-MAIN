const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const axios = require ('axios');
const { Activity, Country } = require ('../db')
const { Op } = require('sequelize');

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

const getDbInfo = async ()=>{
    return await Country.findAll({
        attributes: ['id', 'name', 'continent', 'population', 'img'],
        include:{
            model: Activity,
            attributes: ['name'],
            through:{
                attributes: []
            }
        }
    })
}

//Si no recibe name devuelve todos los paises (Tambien si los paises no estan en la DataBase los crea)
router.get('/countries', async (req, res) => {
    try {
        if(!req.query.name){

            let dbInfo = await getDbInfo();
            if(dbInfo.length){
                res.send(dbInfo)
            }else{
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
                dbInfo = await getDbInfo();
                res.send(dbInfo)
        }
    }else{
            const { name } = req.query;
            let allCountries = await getDbInfo();
            const country = allCountries.filter(e => e.name.toLowerCase().includes(name.toLowerCase()))
            return res.send(country);
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
    console.log(req)
    const { name, difficulty, duration, season, country } = req.body
    const createActivity = await Activity.create({
        name,
        difficulty,
        duration,
        season,
    });
    const dbCountry= await Country.findAll({
        where: {
            id: {
                [Op.in]: Array.isArray(country) ? country : [country]
            }
        }
    });
    await createActivity.setCountries(dbCountry);
    res.send('Funciono')
})

module.exports = router;
