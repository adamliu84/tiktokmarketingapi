import CampaignContent from './CampaignContent.js';
import { useEffect, useState } from 'react'
import AdgroupContent from './AdgroupContent.js';
const axios = require('axios');

function BareBoneIndex() {

    const [campaigns, setCampaigns] = useState(null);
    const [campaignId, setCampaignId] = useState(null);

    useEffect(() => {
        axios.get("/api/barebone/campaign",
        ).then(function (response) {
            setCampaigns(response.data);
        }).catch(function (error) {
            console.error(error);
        })
    }, []);

    const selectCampaign = (campaign_id) => {
        setCampaignId(campaign_id);
    }

    const selectAdgroup = (adgroup_id) => {
        console.log(adgroup_id);
    }

    return (
        <div className="App">
            <CampaignContent campaigns={campaigns} selectCampaign={selectCampaign} />
            {(null !== campaignId) &&
                <AdgroupContent campaignId={campaignId} selectAdgroup={selectAdgroup} />
            }
        </div>
    );
}

export default BareBoneIndex;
