const express = require('express')
const router = express.Router()
const axios = require('axios');

router.get('/campaign', async (req, res) => {
    axios.get(process.env.BASE_URL + "/campaign/get/",
    {
        headers: {
            'Access-Token': process.env.ACCESS_TOKEN
        },
        params: {
            advertiser_id: process.env.ADVERTISER_ID,            
        },
    }).then(function (response) {            
        res.json(response.data.data.list);        
    }).catch(function (error) {
        console.error(error);
    })
})

module.exports = router