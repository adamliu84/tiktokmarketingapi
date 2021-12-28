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

router.post('/campaign', async (req, res) => {
    const currentTimeInMilliseconds = Date.now(); // unix timestamp in milliseconds
    axios.post(process.env.BASE_URL + "/campaign/create/",
        {
            advertiser_id: process.env.ADVERTISER_ID,
            "budget_mode": "BUDGET_MODE_DAY",
            "objective_type": "REACH",
            "budget": "99.99",
            "campaign_name": "Campaign " + currentTimeInMilliseconds,
        }, {
        headers: {
            'Access-Token': process.env.ACCESS_TOKEN
        }
    }
    ).then(function (response) {
        console.log(response.data);
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

router.post('/adgroup', async (req, res) => {
    const campaignId = req.body.campaignId;
    const currentTimeInMilliseconds = Date.now(); // unix timestamp in milliseconds
    //https://stackoverflow.com/questions/23593052/format-javascript-date-as-yyyy-mm-dd
    var date = new Date();
    date.setDate(date.getDate() + 1);
    axios.post(process.env.BASE_URL + "/adgroup/create/",
        {
            advertiser_id: process.env.ADVERTISER_ID,
            campaign_id: campaignId,
            adgroup_name: "AdGroup " + currentTimeInMilliseconds,
            external_type: "WEBSITE",
            placement: ["PLACEMENT_TIKTOK"],
            schedule_type: "SCHEDULE_FROM_NOW",
            schedule_start_time: date.toISOString().split('T')[0] + " 00:00:00",
            billing_event: "CPM",
            location: [
                "5128638", "1880251"
            ],
            budget: "99.99",
            frequency: "2",
            frequency_schedule: "3",
            bid: "1",
            budget_mode: "BUDGET_MODE_DAY",
            optimize_goal: "REACH"
        }, {
        headers: {
            'Access-Token': process.env.ACCESS_TOKEN
        }
    }
    ).then(function (response) {
        console.log(response.data);
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