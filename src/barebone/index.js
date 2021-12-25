import CampaignContent from './CampaignContent.js';
import { useEffect, useState } from 'react'
const axios = require('axios');

function BareBoneIndex() {

    const [campaigns, setCampaigns] = useState(null);

    useEffect(() => {
        axios.get("/api/barebone/campaign",
        ).then(function (response) {
            setCampaigns(response.data);
        }).catch(function (error) {
            console.error(error);
        })
    }, []);

    const selectCampaign = (campaign_id) => {
        console.log(campaign_id);
    }

    return (
        <div className="App">
            <CampaignContent campaigns={campaigns} selectCampaign={selectCampaign} />
        </div>
    );
}

export default BareBoneIndex;
