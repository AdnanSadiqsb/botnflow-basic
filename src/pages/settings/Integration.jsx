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
    SmartToy as SmartToyIcon,
    Close as CloseIcon
} from '@mui/icons-material';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import useAxios from '../../utils/useAxios';
import { toast } from 'react-toastify';
import getToken from '../../utils/GetToken';

function Integration() {
    const { themeColor, secondaryThemeColor, userInfo, getUserInfo } = useContext(ContentContext)
    const token = getToken();
    const [loadingGoogle, setLoadingGoogle] = useState(false);
    const [loadingOpenAI, setLoadingOpenAI] = useState(false);
    const [openAIApiKey, setOpenAIApiKey] = useState('');
    const [showOpenAIModal, setShowOpenAIModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [deleteType, setDeleteType] = useState('');
    const [selectedTool, setSelectedTool] = useState(userInfo.companyId?.companyIntegratedTools || []);
    console.log("Selected Tools:", selectedTool);
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
            if (responseData && responseData.data.authUrl) {
window.open(responseData.data.authUrl, '_blank');
getUserInfo()
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
            setShowOpenAIModal(false);
            if (responseData && responseData.success) {
                toast.success("OpenAI integration enabled!", { autoClose: 2000 });
                getUserInfo()
                setSelectedTool(prev => [...prev, { type: "openai" }]);
            } else {
                toast.error("Failed to enable OpenAI integration");
            }
        } catch (error) {
            setLoadingOpenAI(false);
            toast.error("Failed to enable OpenAI integration");
        }
    };

    // Delete Integration
    const handleDeleteIntegration = async () => {
        let apiUrl = '';
        if (deleteType === 'openai') apiUrl = 'tool/open-ai';
        if (deleteType === 'google_calendar') apiUrl = 'tool/google-calendar';
        try {
            const [responseData, fetchError] = await useAxios(
                'DELETE',
                apiUrl,
                token
            );
            if (responseData && responseData.success) {
                toast.success("Integration deleted!", { autoClose: 2000 });
                getUserInfo()
                setSelectedTool(prev => prev.filter(tool => tool.type !== deleteType));
                setShowDeleteModal(false);
            } else {
                toast.error("Failed to delete integration");
            }
        } catch (error) {
            toast.error("Failed to delete integration");
        }
    };

    // Filter out enabled integrations
    const isGoogleEnabled = selectedTool.some(tool => tool.type === "google_calendar");
    const isOpenAIEnabled = selectedTool.some(tool => tool.type === "openai");

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
                            {/* <button type="button" className="inline-flex items-center justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white focus:outline-none focus:ring-2 focus:ring-offset-2 "
                                style={{ backgroundColor: themeColor }}
                                onMouseEnter={(e) => {
                                    e.currentTarget.style.backgroundColor = secondaryThemeColor;
                                }}
                                onMouseLeave={(e) => {
                                    e.currentTarget.style.backgroundColor = themeColor;
                                }}>
                                <AddIcon className="mr-2" />
                                Add Integration
                            </button> */}
                        </div>

                        {/* Active Integrations */}
                        <div className="mb-8">
                            <h3 className="text-base font-medium text-gray-800 mb-4">Active Integrations</h3>

                            <div className="space-y-4">
                                {/* Google Calendar Active */}
                                {isGoogleEnabled && (
                                    <div className="border rounded-lg p-4 bg-white flex justify-between items-center">
                                        <div className="flex items-center">
                                            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center mr-4">
                                                <CalendarTodayIcon className="text-blue-600 text-xl" />
                                            </div>
                                            <div>
                                                <h4 className="font-medium text-gray-800">Google Calendar</h4>
                                                <p className="text-sm text-gray-500">Connected</p>
                                            </div>
                                        </div>
                                        <div className="flex items-center space-x-2">
                                            <button className="text-gray-600 hover:text-red-600"
                                                onClick={() => { setDeleteType('google_calendar'); setShowDeleteModal(true); }}>
                                                <DeleteIcon fontSize="small" />
                                            </button>
                                        </div>
                                    </div>
                                )}
                                {/* OpenAI Active */}
                                {isOpenAIEnabled && (
                                    <div className="border rounded-lg p-4 bg-white flex justify-between items-center">
                                        <div className="flex items-center">
                                            <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center mr-4">
                                                <SmartToyIcon className="text-gray-700 text-xl" />
                                            </div>
                                            <div>
                                                <h4 className="font-medium text-gray-800">OpenAI</h4>
                                                <p className="text-sm text-gray-500">Connected</p>
                                            </div>
                                        </div>
                                        <div className="flex items-center space-x-2">
                                            <button className="text-gray-600 hover:text-red-600"
                                                onClick={() => { setDeleteType('openai'); setShowDeleteModal(true); }}>
                                                <DeleteIcon fontSize="small" />
                                            </button>
                                        </div>
                                    </div>
                                )}
                                {/* Example: Other active integrations */}
                                {/* ...existing active integrations... */}
                            </div>
                        </div>

                        {/* Available Integrations */}
                        <div>
                            <h3 className="text-base font-medium text-gray-800 mb-4">Available Integrations</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                {/* Google Calendar */}
                                {!isGoogleEnabled && (
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
                                )}

                                {/* OpenAI */}
                                {!isOpenAIEnabled && (
                                    <div className="border rounded-lg p-4 hover:shadow-md transition-shadow bg-white flex flex-col justify-between">
                                        <div>
                                            <div className="flex items-center mb-3">
                                                <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center mr-4">
                                                    <SmartToyIcon className="text-gray-700 text-xl" />
                                                </div>
                                                <h4 className="font-medium text-gray-800">OpenAI</h4>
                                            </div>
                                            <p className="text-sm text-gray-500 mb-3">Enable AI-powered features with OpenAI integration.</p>
                                        </div>
                                        <div className="mt-auto pt-2">
                                            <button
                                                className="text-sm font-medium"
                                                style={{ color: themeColor }}
                                                disabled={loadingOpenAI}
                                                onClick={() => setShowOpenAIModal(true)}
                                                onMouseEnter={e => {
                                                    e.currentTarget.style.color = secondaryThemeColor;
                                                }}
                                                onMouseLeave={e => {
                                                    e.currentTarget.style.color = themeColor;
                                                }}
                                            >
                                                Connect <ArrowForwardIcon className="ml-1" fontSize="small" />
                                            </button>
                                        </div>
                                    </div>
                                )}

                                {/* Coming Soon Integrations */}
                                <div className="border rounded-lg p-4 hover:shadow-md transition-shadow bg-white flex flex-col justify-between">
                                    <div>
                                        <div className="flex items-center mb-3">
                                            <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center mr-4">
                                                <CommentIcon className="text-purple-600 text-xl" />
                                            </div>
                                            <h4 className="font-medium text-gray-800">Slack</h4>
                                        </div>
                                        <p className="text-sm text-gray-500 mb-3">Get notifications and send messages directly from Slack.</p>
                                    </div>
                                    <div>
                                        <button className="text-sm font-medium px-4 py-2 rounded bg-gray-200 text-gray-500 cursor-not-allowed" disabled>
                                            Coming Soon
                                        </button>
                                    </div>
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
                                    <p className="text-sm text-gray-500 mb-3">Track message performance and campaign success analytics.</p>
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

            {/* OpenAI Modal */}
            {showOpenAIModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center">
                    <div
                        className="fixed inset-0 bg-black opacity-70"
                        onClick={() => setShowOpenAIModal(false)}
                    ></div>
                    <div className="bg-white rounded-lg max-w-md w-full p-6 relative z-50 mx-4" onClick={e => e.stopPropagation()}>
                        <div className="flex justify-between items-center mb-4">
                            <h4 className="font-medium text-lg text-gray-800">Connect OpenAI</h4>
                            <button
                                onClick={() => setShowOpenAIModal(false)}
                                className="text-gray-500 hover:text-gray-700"
                            >
                                <CloseIcon fontSize="small" />
                            </button>
                        </div>
                        <div className="mb-4 text-gray-700">
                            Enter your OpenAI API Key to enable integration.
                        </div>
                        <input
                            type="text"
                            className="w-full border border-gray-300 rounded-md p-2 mb-4"
                            placeholder="Enter OpenAI API Key"
                            value={openAIApiKey}
                            onChange={e => setOpenAIApiKey(e.target.value)}
                            disabled={loadingOpenAI}
                        />
                        <div className="flex justify-end gap-2">
                            <button
                                className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
                                onClick={() => setShowOpenAIModal(false)}
                                disabled={loadingOpenAI}
                            >
                                Cancel
                            </button>
                            <button
                                className="px-4 py-2 text-white rounded"
                                style={{ backgroundColor: themeColor }}
                                onClick={handleConnectOpenAI}
                                disabled={loadingOpenAI}
                                onMouseEnter={e => {
                                    e.currentTarget.style.backgroundColor = secondaryThemeColor;
                                }}
                                onMouseLeave={e => {
                                    e.currentTarget.style.backgroundColor = themeColor;
                                }}
                            >
                                {loadingOpenAI ? "Connecting..." : "Connect"}
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Delete Modal */}
            {showDeleteModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center">
                    <div
                        className="fixed inset-0 bg-black opacity-70"
                        onClick={() => setShowDeleteModal(false)}
                    ></div>
                    <div className="bg-white rounded-lg max-w-md w-full p-6 relative z-50 mx-4" onClick={e => e.stopPropagation()}>
                        <div className="flex justify-between items-center mb-4">
                            <h4 className="font-medium text-lg text-gray-800">Remove Integration</h4>
                            <button
                                onClick={() => setShowDeleteModal(false)}
                                className="text-gray-500 hover:text-gray-700"
                            >
                                <CloseIcon fontSize="small" />
                            </button>
                        </div>
                        <div className="mb-4 text-gray-700">
                            Are you sure you want to remove this integration? This action cannot be undone.
                        </div>
                        <div className="flex justify-end gap-2">
                            <button
                                className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
                                onClick={() => setShowDeleteModal(false)}
                            >
                                Cancel
                            </button>
                            <button
                                className="px-4 py-2 text-white rounded"
                                style={{ backgroundColor: themeColor }}
                                onClick={handleDeleteIntegration}
                                onMouseEnter={e => {
                                    e.currentTarget.style.backgroundColor = secondaryThemeColor;
                                }}
                                onMouseLeave={e => {
                                    e.currentTarget.style.backgroundColor = themeColor;
                                }}
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}

export default Integration
