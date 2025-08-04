import React, { useContext, useState } from 'react'
import { ShowChart, People, Campaign } from '@mui/icons-material';
import LeadGenerationDashboard from './LeadGenerationDashboard';
import CampaignDashboard from './CampaignDashboard';
import AgentDashboard from './AgentDashboard';
import { ContentContext } from '../../context/ContextProvider';

function DashboardList() {
    const [dashboard, setDashboard] = useState('leadgenerationdashboard')
    const { themeColor } = useContext(ContentContext)

    const tabStyle = (tabName) => ({
        color: dashboard === tabName ? themeColor : '',
        borderBottom: dashboard === tabName ? `2px solid ${themeColor}` : '2px solid transparent'
    });

    return (
        <div className='mt-16 bg-gray-50'>
            <div className="bg-white border-b sticky top-16 z-10">
                <div className="max-w-7xl mx-auto">
                    <nav className="md:flex -mb-px">
                        <span
                            style={tabStyle('leadgenerationdashboard')}
                            className={`whitespace-nowrap py-4 px-5 font-medium text-sm flex items-center cursor-pointer`}
                            onClick={() => setDashboard('leadgenerationdashboard')}
                        >
                            <ShowChart className="mr-2" />
                            <span>Lead Generation Dashboard</span>
                        </span>
                        <span
                            style={tabStyle('agentdashboard')}
                            className={`whitespace-nowrap py-4 px-5 font-medium text-sm flex items-center cursor-pointer`}
                            onClick={() => setDashboard('agentdashboard')}
                        >
                            <People className="mr-2" />
                            <span>Agent Dashboard</span>
                        </span>
                        <span
                            style={tabStyle('campaigndashboard')}
                            className={`whitespace-nowrap py-4 px-5 font-medium text-sm flex items-center cursor-pointer`}
                            onClick={() => setDashboard('campaigndashboard')}
                        >
                            <Campaign className="mr-2" />
                            <span>Campaign Dashboard</span>
                        </span>
                    </nav>
                </div>
            </div>
            <div className='pt-2'>
                {dashboard === 'leadgenerationdashboard' ?
                    <LeadGenerationDashboard />
                    : dashboard === 'agentdashboard' ?
                        <AgentDashboard />
                        : <CampaignDashboard />
                }
            </div>
        </div>
    )
}

export default DashboardList
