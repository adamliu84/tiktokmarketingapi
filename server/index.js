const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const axios = require('axios');
require('dotenv/config');
const PORT = 3001

app.use(cors());
app.use(bodyParser.json());

//Root routing
app.get('/test', async (req, res) => {
    axios.get(process.env.BASE_URL + "/reports/integrated/get/",
        {
            headers: {
                'Access-Token': process.env.ACCESS_TOKEN
            },
            params: {
                advertiser_id: process.env.ADVERTISER_ID,
                dimensions: '["adgroup_id"]',
                report_type: 'BASIC',
                data_level: 'AUCTION_ADGROUP',
                start_date: '2021-01-01',
                end_date: '2021-12-31',
            },
        }).then(function (response) {            
            res.json(response.data.data);
        }).catch(function (error) {
            console.error(error);
        })
});

const bareboneRouter = require('./routes/barebone');
app.use('/api/barebone', bareboneRouter);

console.log("START BACKEND SERVER");
app.listen(PORT);