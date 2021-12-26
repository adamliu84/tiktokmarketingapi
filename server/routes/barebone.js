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

router.get('/adgroup', async (req, res) => {
    const campaignId = req.query.campaignId;
    axios.get(process.env.BASE_URL + "/adgroup/get/",
        {
            headers: {
                'Access-Token': process.env.ACCESS_TOKEN
            },
            params: {
                advertiser_id: process.env.ADVERTISER_ID,
                filtering: { campaign_ids: [campaignId] }
            },
        }).then(function (response) {
            res.json(response.data.data.list);
        }).catch(function (error) {
            console.error(error);
        })
})

router.get('/ad', async (req, res) => {
    const adgroupId = req.query.adgroupId;
    axios.get(process.env.BASE_URL + "/ad/get/",
        {
            headers: {
                'Access-Token': process.env.ACCESS_TOKEN
            },
            params: {
                advertiser_id: process.env.ADVERTISER_ID,
                filtering: { adgroup_ids: [adgroupId] }
            },
        }).then(function (response) {
            res.json(response.data.data.list);
        }).catch(function (error) {
            console.error(error);
        })
})

module.exports = router