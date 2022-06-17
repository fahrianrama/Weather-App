const express = require('express');
const axios = require('axios');
const path = require('path');
const app = express();
const bodyParser = require('body-parser');

// use ejs
app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({ extended: true }));

// response index ejs file
app.get('/', (req, res) => {
    res.render('index');
    }
);

// fetch data from api
app.post('/landing', (req, res) => {
    // get request city
    const city = req.body.city;
    axios.get('https://api.openweathermap.org/data/2.5/weather?q='+city+'&appid=55221fb5f3efbf284ecea1bc80042be4')
        .then(response => {
            // show response to landing view
            res.render('landing', {
                coord: response.data.coord,
                weather: response.data.weather,
                name: response.data.name,
                main: response.data.main,
                visibility: response.data.visibility,
                wind: response.data.wind,
                city: city,
                status: 'success'
            });
        }
        )
        .catch(error => {
            res.render('landing', {
                status: 'error',
            });
        });
});

// set port env
const port = process.env.PORT || 3000;
// start server
app.listen(port, () => {
    console.log('Server is running on port ' + port);
});