import React, { useContext, useState } from 'react'
import { ContentContext } from '../../context/ContextProvider';
import {
    Edit as EditIcon,
    Delete as DeleteIcon,
    Add as AddIcon,
    Comment as CommentIcon,
    ShoppingCart as ShoppingCartIcon,
    Analytics as AnalyticsIcon,
    Support as SupportIcon,
    ArrowForward as ArrowForwardIcon,
    CalendarToday as CalendarTodayIcon,
    SmartToy as SmartToyIcon
} from '@mui/icons-material';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import useAxios from '../../utils/useAxios';
import { toast } from 'react-toastify';
import getToken from '../../utils/GetToken';

function Integration() {
    const { themeColor, secondaryThemeColor } = useContext(ContentContext)
    const token = getToken();
    const [loadingGoogle, setLoadingGoogle] = useState(false);
    const [loadingOpenAI, setLoadingOpenAI] = useState(false);
    const [openAIApiKey, setOpenAIApiKey] = useState('');

    // Connect Google Calendar
    const handleConnectGoogle = async () => {
        setLoadingGoogle(true);
        try {
            const [responseData, fetchError] = await useAxios(
                'POST',
                'auth/google-auth/initiate',
                token,
                {}
            );
            setLoadingGoogle(false);
            if (responseData && responseData.url) {
                window.location.href = responseData.url;
            } else {
                toast.error("Failed to initiate Google Calendar connection");
            }
        } catch (error) {
            setLoadingGoogle(false);
            toast.error("Failed to initiate Google Calendar connection");
        }
    };

    // Connect OpenAI with payload
    const handleConnectOpenAI = async () => {
        if (!openAIApiKey) {
            toast.error("Please enter your OpenAI API Key");
            return;
        }
        setLoadingOpenAI(true);
        const payload = {
            type: "openai",
            toolObject: {
                openai: {
                    apiKey: openAIApiKey
                }
            }
        };
        try {
            const [responseData, fetchError] = await useAxios(
                'POST',
                'tool/open-ai',
                token,
                payload
            );
            setLoadingOpenAI(false);
            if (responseData && responseData.success) {
                toast.success("OpenAI integration enabled!", { autoClose: 2000 });
            } else {
                toast.error("Failed to enable OpenAI integration");
            }
        } catch (error) {
            setLoadingOpenAI(false);
            toast.error("Failed to enable OpenAI integration");
        }
    };

    return (
        <div>
            <div className="space-y-6">
                <div className="bg-white shadow-sm rounded-lg overflow-hidden">
                    <div className="p-6">
                        <div className="flex justify-between items-center mb-4">
                            <div>
                                <h2 className="text-lg font-medium text-gray-800">Integrations</h2>
                                <p className="text-gray-600">Connect your CPaaS portal to other services</p>
                            </div>
                            <button type="button" className="inline-flex items-center justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white focus:outline-none focus:ring-2 focus:ring-offset-2 "
                                style={{ backgroundColor: themeColor }}
                                onMouseEnter={(e) => {
                                    e.currentTarget.style.backgroundColor = secondaryThemeColor;
                                }}
                                onMouseLeave={(e) => {
                                    e.currentTarget.style.backgroundColor = themeColor;
                                }}>
                                <AddIcon className="mr-2" />
                                Add Integration
                            </button>
                        </div>

                        {/* Active Integrations */}
                        <div className="mb-8">
                            <h3 className="text-base font-medium text-gray-800 mb-4">Active Integrations</h3>

                            <div className="space-y-4">
                                {/* Salesforce Integration */}
                                <div className="border rounded-lg p-4 bg-white">
                                    <div className="flex justify-between items-center">
                                        <div className="flex items-center">
                                            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center mr-4">
                                                <CommentIcon className="text-blue-600 text-xl" />
                                            </div>
                                            <div>
                                                <h4 className="font-medium text-gray-800">Salesforce</h4>
                                                <p className="text-sm text-gray-500">Connected on Jun 15, 2023</p>
                                            </div>
                                        </div>
                                        <div className="flex items-center space-x-2">
                                            <button className="text-gray-600 hover:text-gray-800">
                                                <EditIcon fontSize="small" />
                                            </button>
                                            <button className="text-gray-600 hover:text-red-600">
                                                <DeleteIcon fontSize="small" />
                                            </button>
                                        </div>
                                    </div>
                                </div>

                                {/* Zapier Integration */}
                                <div className="border rounded-lg p-4 bg-white">
                                    <div className="flex justify-between items-center">
                                        <div className="flex items-center">
                                            <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center mr-4">
                                                <CommentIcon className="text-orange-600 text-xl" />
                                            </div>
                                            <div>
                                                <h4 className="font-medium text-gray-800">Zapier</h4>
                                                <p className="text-sm text-gray-500">Connected on May 3, 2023</p>
                                            </div>
                                        </div>
                                        <div className="flex items-center space-x-2">
                                            <button className="text-gray-600 hover:text-gray-800">
                                                <EditIcon fontSize="small" />
                                            </button>
                                            <button className="text-gray-600 hover:text-red-600">
                                                <DeleteIcon fontSize="small" />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Available Integrations */}
                        <div>
                            <h3 className="text-base font-medium text-gray-800 mb-4">Available Integrations</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                {/* Google Calendar */}
                                <div className="border rounded-lg p-4 hover:shadow-md transition-shadow bg-white flex flex-col justify-between">
                                    <div>
                                        <div className="flex items-center mb-3">
                                            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center mr-4">
                                                <CalendarTodayIcon className="text-blue-600 text-xl" />
                                            </div>
                                            <h4 className="font-medium text-gray-800">Google Calendar</h4>
                                        </div>
                                        <p className="text-sm text-gray-500 mb-3">Sync your events and reminders with Google Calendar.</p>
                                    </div>
                                    <div className="mt-auto pt-2">
                                        <button
                                            className="text-sm font-medium"
                                            style={{ color: themeColor }}
                                            disabled={loadingGoogle}
                                            onClick={handleConnectGoogle}
                                            onMouseEnter={e => {
                                                e.currentTarget.style.color = secondaryThemeColor;
                                            }}
                                            onMouseLeave={e => {
                                                e.currentTarget.style.color = themeColor;
                                            }}
                                        >
                                            {loadingGoogle ? "Connecting..." : <>Connect <ArrowForwardIcon className="ml-1" fontSize="small" /></>}
                                        </button>
                                    </div>
                                </div>

                                {/* OpenAI */}
                                <div className="border rounded-lg p-4 hover:shadow-md transition-shadow bg-white flex flex-col justify-between">
                                    <div>
                                        <div className="flex items-center mb-3">
                                            <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center mr-4">
                                                <SmartToyIcon className="text-gray-700 text-xl" />
                                            </div>
                                            <h4 className="font-medium text-gray-800">OpenAI</h4>
                                        </div>
                                        <p className="text-sm text-gray-500 mb-3">Enable AI-powered features with OpenAI integration.</p>
                                        <input
                                            type="text"
                                            className="w-full border border-gray-300 rounded-md p-2 mb-2"
                                            placeholder="Enter OpenAI API Key"
                                            value={openAIApiKey}
                                            onChange={e => setOpenAIApiKey(e.target.value)}
                                            disabled={loadingOpenAI}
                                        />
                                    </div>
                                    <div className="mt-auto pt-2">
                                        <button
                                            className="text-sm font-medium"
                                            style={{ color: themeColor }}
                                            disabled={loadingOpenAI}
                                            onClick={handleConnectOpenAI}
                                            onMouseEnter={e => {
                                                e.currentTarget.style.color = secondaryThemeColor;
                                            }}
                                            onMouseLeave={e => {
                                                e.currentTarget.style.color = themeColor;
                                            }}
                                        >
                                            {loadingOpenAI ? "Connecting..." : <>Connect <ArrowForwardIcon className="ml-1" fontSize="small" /></>}
                                        </button>
                                    </div>
                                </div>

                                {/* Other integrations - show "Coming Soon" */}
                                <div className="border rounded-lg p-4 hover:shadow-md transition-shadow bg-white">
                                    <div className="flex items-center mb-3">
                                        <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center mr-4">
                                            <CommentIcon className="text-purple-600 text-xl" />
                                        </div>
                                        <h4 className="font-medium text-gray-800">Slack</h4>
                                    </div>
                                    <p className="text-sm text-gray-500 mb-3">Get notifications and send messages directly from Slack.</p>
                                    <button className="text-sm font-medium px-4 py-2 rounded bg-gray-200 text-gray-500 cursor-not-allowed" disabled>
                                        Coming Soon
                                    </button>
                                </div>
                                <div className="border rounded-lg p-4 hover:shadow-md transition-shadow bg-white">
                                    <div className="flex items-center mb-3">
                                        <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center mr-4">
                                            <CommentIcon className="text-orange-600 text-xl" />
                                        </div>
                                        <h4 className="font-medium text-gray-800">HubSpot</h4>
                                    </div>
                                    <p className="text-sm text-gray-500 mb-3">Sync contacts and automate communications with HubSpot CRM.</p>
                                    <button className="text-sm font-medium px-4 py-2 rounded bg-gray-200 text-gray-500 cursor-not-allowed" disabled>
                                        Coming Soon
                                    </button>
                                </div>
                                <div className="border rounded-lg p-4 hover:shadow-md transition-shadow bg-white">
                                    <div className="flex items-center mb-3">
                                        <div className="w-10 h-10 bg-yellow-100 rounded-lg flex items-center justify-center mr-4">
                                            <AnalyticsIcon className="text-yellow-600 text-xl" />
                                        </div>
                                        <h4 className="font-medium text-gray-800">Google Analytics</h4>
                                    </div>
                                    <p className="text-sm text-gray-500 mb-3">Track message performance and campaign analytics.</p>
                                    <button className="text-sm font-medium px-4 py-2 rounded bg-gray-200 text-gray-500 cursor-not-allowed" disabled>
                                        Coming Soon
                                    </button>
                                </div>
                                <div className="border rounded-lg p-4 hover:shadow-md transition-shadow bg-white">
                                    <div className="flex items-center mb-3">
                                        <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center mr-4">
                                            <ShoppingCartIcon className="text-green-600 text-xl" />
                                        </div>
                                        <h4 className="font-medium text-gray-800">Shopify</h4>
                                    </div>
                                    <p className="text-sm text-gray-500 mb-3">Send order updates and promotional messages to customers.</p>
                                    <button className="text-sm font-medium px-4 py-2 rounded bg-gray-200 text-gray-500 cursor-not-allowed" disabled>
                                        Coming Soon
                                    </button>
                                </div>
                                <div className="border rounded-lg p-4 hover:shadow-md transition-shadow bg-white">
                                    <div className="flex items-center mb-3">
                                        <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center mr-4">
                                            <SupportIcon className="text-blue-600 text-xl" />
                                        </div>
                                        <h4 className="font-medium text-gray-800">Zendesk</h4>
                                    </div>
                                    <p className="text-sm text-gray-500 mb-3">Integrate messaging with your customer support workflow.</p>
                                    <button className="text-sm font-medium px-4 py-2 rounded bg-gray-200 text-gray-500 cursor-not-allowed" disabled>
                                        Coming Soon
                                    </button>
                                </div>
                                <div className="border rounded-lg p-4 hover:shadow-md transition-shadow bg-gray-50">
                                    <div className="h-full flex flex-col items-center justify-center text-center">
                                        <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center mb-3">
                                            <MoreHorizIcon className="text-gray-600" />
                                        </div>
                                        <h4 className="font-medium text-gray-800 mb-2">More Integrations</h4>
                                        <p className="text-sm text-gray-500 mb-3">Explore our marketplace for more integration options.</p>
                                        <button className="text-sm font-medium px-4 py-2 rounded bg-gray-200 text-gray-500 cursor-not-allowed" disabled>
                                            Coming Soon
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Integration
