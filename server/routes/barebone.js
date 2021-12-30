const express = require('express')
const router = express.Router()
const axios = require('axios');
const md5File = require('md5-file')
const FormData = require('form-data');
fs = require('fs');

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

router.post('/ad', async (req, res) => {
    const adgroupId = req.body.adgroupId;
    const [image_id, video_id] = await Promise.all([adImageAssetUpload(), adVideoAssetUpload()]);
    const currentTimeInMilliseconds = Date.now(); // unix timestamp in milliseconds
    axios.post(process.env.BASE_URL + "/ad/create/",
        {
            advertiser_id: process.env.ADVERTISER_ID,
            adgroup_id: adgroupId,
            creatives: [
                {
                    ad_name: "Ad " + currentTimeInMilliseconds,
                    app_name: "AppName " + currentTimeInMilliseconds,
                    ad_text: "AdText " + currentTimeInMilliseconds,
                    display_name: "DisplayName " + currentTimeInMilliseconds,
                    ad_format: "SINGLE_VIDEO",
                    video_id: video_id,
                    image_ids: [image_id]
                }
            ]
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

const adImageAssetUpload = async () => {
    const image_path = "./adasset/image.png";
    const image_hash = md5File.sync(image_path)

    let image_data = new FormData();
    image_data.append('image_file', fs.createReadStream(image_path), 'image.png');
    image_data.append('image_signature', image_hash);
    image_data.append('advertiser_id', process.env.ADVERTISER_ID);
    return await axios.post(process.env.BASE_URL + "/file/image/ad/upload/",
        image_data,
        {
            headers: {
                'Content-Type': `multipart/form-data; boundary=${image_data._boundary}`,
                'Access-Token': process.env.ACCESS_TOKEN,
            }
        }
    ).then(function (response) {
        return (response.data.data.id);
    }).catch(function (error) {
        return "";
    });
}

const adVideoAssetUpload = async () => {
    const video_path = "./adasset/video.mov";
    const video_hash = md5File.sync(video_path)

    let video_data = new FormData();
    video_data.append('advertiser_id', process.env.ADVERTISER_ID);
    video_data.append('upload_type', 'UPLOAD_BY_FILE');
    video_data.append('video_file', fs.createReadStream(video_path));
    video_data.append('file_name', 'video.mov');
    video_data.append('video_signature', video_hash);
    return await axios.post(process.env.BASE_URL + "/file/video/ad/upload/",
        video_data,
        {
            headers: {
                'Content-Type': `multipart/form-data; boundary=${video_data._boundary}`,
                'Access-Token': process.env.ACCESS_TOKEN,
            }
        }
    ).then(function (response) {
        return (response.data.data[0].video_id);
    }).catch(function (error) {
        return "";
    });
}

module.exports = router