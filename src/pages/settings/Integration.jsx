import React, { useContext } from 'react'
import { ContentContext } from '../../context/ContextProvider';
import {
    Edit as EditIcon,
    Delete as DeleteIcon,
    Add as AddIcon,
    Comment as CommentIcon,
    ShoppingCart as ShoppingCartIcon,
    Analytics as AnalyticsIcon,
    Support as SupportIcon,
    ArrowForward as ArrowForwardIcon
} from '@mui/icons-material';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';


function Integration() {
    const { themeColor, secondaryThemeColor } = useContext(ContentContext)

    return (
        <div>
            <div className="space-y-6">
                <div className="bg-white dark:bg-gray-800 shadow-sm rounded-lg overflow-hidden">
                    <div className="p-6">
                        <div className="flex justify-between items-center mb-4">
                            <div>
                                <h2 className="text-lg font-medium text-gray-800 dark:text-white">Integrations</h2>
                                <p className="text-gray-600 dark:text-gray-300">Connect your CPaaS portal to other services</p>
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
                            <h3 className="text-base font-medium text-gray-800 dark:text-white mb-4">Active Integrations</h3>

                            <div className="space-y-4">
                                {/* Salesforce Integration */}
                                <div className="border rounded-lg p-4">
                                    <div className="flex justify-between items-center">
                                        <div className="flex items-center">
                                            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center mr-4">
                                                <CommentIcon className="text-blue-600 text-xl" />
                                            </div>
                                            <div>
                                                <h4 className="font-medium text-gray-800 dark:text-white">Salesforce</h4>
                                                <p className="text-sm text-gray-500 dark:text-gray-400">Connected on Jun 15, 2023</p>
                                            </div>
                                        </div>
                                        <div className="flex items-center space-x-2">
                                            <button className="text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-white">
                                                <EditIcon fontSize="small" />
                                            </button>
                                            <button className="text-gray-600 dark:text-gray-300 hover:text-red-600">
                                                <DeleteIcon fontSize="small" />
                                            </button>
                                        </div>
                                    </div>
                                </div>

                                {/* Zapier Integration */}
                                <div className="border rounded-lg p-4">
                                    <div className="flex justify-between items-center">
                                        <div className="flex items-center">
                                            <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center mr-4">
                                                <CommentIcon className="text-orange-600 text-xl" />
                                            </div>
                                            <div>
                                                <h4 className="font-medium text-gray-800 dark:text-white">Zapier</h4>
                                                <p className="text-sm text-gray-500 dark:text-gray-400">Connected on May 3, 2023</p>
                                            </div>
                                        </div>
                                        <div className="flex items-center space-x-2">
                                            <button className="text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-white">
                                                <EditIcon fontSize="small" />
                                            </button>
                                            <button className="text-gray-600 dark:text-gray-300 hover:text-red-600">
                                                <DeleteIcon fontSize="small" />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Available Integrations */}
                        <div>
                            <h3 className="text-base font-medium text-gray-800 dark:text-white mb-4">Available Integrations</h3>

                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                {/* Slack */}
                                <div className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                                    <div className="flex items-center mb-3">
                                        <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center mr-4">
                                            <CommentIcon className="text-purple-600 text-xl" />
                                        </div>
                                        <h4 className="font-medium text-gray-800 dark:text-white">Slack</h4>
                                    </div>
                                    <p className="text-sm text-gray-500 dark:text-gray-400 mb-3">Get notifications and send messages directly from Slack.</p>
                                    <button className="text-sm font-medium"
                                        style={{ color: themeColor }}
                                        onMouseEnter={(e) => {
                                            e.currentTarget.style.color = secondaryThemeColor;
                                        }}
                                        onMouseLeave={(e) => {
                                            e.currentTarget.style.color = themeColor;
                                        }}>
                                        Connect <ArrowForwardIcon className="ml-1" fontSize="small" />
                                    </button>
                                </div>

                                {/* HubSpot */}
                                <div className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                                    <div className="flex items-center mb-3">
                                        <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center mr-4">
                                            <CommentIcon className="text-orange-600 text-xl" />
                                        </div>
                                        <h4 className="font-medium text-gray-800 dark:text-white">HubSpot</h4>
                                    </div>
                                    <p className="text-sm text-gray-500 dark:text-gray-400 mb-3">Sync contacts and automate communications with HubSpot CRM.</p>
                                    <button className="text-sm font-medium"
                                        style={{ color: themeColor }}
                                        onMouseEnter={(e) => {
                                            e.currentTarget.style.color = secondaryThemeColor;
                                        }}
                                        onMouseLeave={(e) => {
                                            e.currentTarget.style.color = themeColor;
                                        }}>
                                        Connect <ArrowForwardIcon className="ml-1" fontSize="small" />
                                    </button>
                                </div>

                                {/* Google Analytics */}
                                <div className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                                    <div className="flex items-center mb-3">
                                        <div className="w-10 h-10 bg-yellow-100 rounded-lg flex items-center justify-center mr-4">
                                            <AnalyticsIcon className="text-yellow-600 text-xl" />
                                        </div>
                                        <h4 className="font-medium text-gray-800 dark:text-white">Google Analytics</h4>
                                    </div>
                                    <p className="text-sm text-gray-500 dark:text-gray-400 mb-3">Track message performance and campaign analytics.</p>
                                    <button className="text-sm font-medium"
                                        style={{ color: themeColor }}
                                        onMouseEnter={(e) => {
                                            e.currentTarget.style.color = secondaryThemeColor;
                                        }}
                                        onMouseLeave={(e) => {
                                            e.currentTarget.style.color = themeColor;
                                        }}>
                                        Connect <ArrowForwardIcon className="ml-1" fontSize="small" />
                                    </button>
                                </div>

                                {/* Shopify */}
                                <div className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                                    <div className="flex items-center mb-3">
                                        <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center mr-4">
                                            <ShoppingCartIcon className="text-green-600 text-xl" />
                                        </div>
                                        <h4 className="font-medium text-gray-800 dark:text-white">Shopify</h4>
                                    </div>
                                    <p className="text-sm text-gray-500 dark:text-gray-400 mb-3">Send order updates and promotional messages to customers.</p>
                                    <button className="text-sm font-medium"
                                        style={{ color: themeColor }}
                                        onMouseEnter={(e) => {
                                            e.currentTarget.style.color = secondaryThemeColor;
                                        }}
                                        onMouseLeave={(e) => {
                                            e.currentTarget.style.color = themeColor;
                                        }}>
                                        Connect <ArrowForwardIcon className="ml-1" fontSize="small" />
                                    </button>
                                </div>

                                {/* Zendesk */}
                                <div className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                                    <div className="flex items-center mb-3">
                                        <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center mr-4">
                                            <SupportIcon className="text-blue-600 text-xl" />
                                        </div>
                                        <h4 className="font-medium text-gray-800 dark:text-white">Zendesk</h4>
                                    </div>
                                    <p className="text-sm text-gray-500 dark:text-gray-400 mb-3">Integrate messaging with your customer support workflow.</p>
                                    <button className="text-sm font-medium"
                                        style={{ color: themeColor }}
                                        onMouseEnter={(e) => {
                                            e.currentTarget.style.color = secondaryThemeColor;
                                        }}
                                        onMouseLeave={(e) => {
                                            e.currentTarget.style.color = themeColor;
                                        }}>
                                        Connect <ArrowForwardIcon className="ml-1" fontSize="small" />
                                    </button>
                                </div>

                                {/* More Integrations */}
                                <div className="border rounded-lg p-4 hover:shadow-md transition-shadow bg-gray-50 dark:bg-gray-700">
                                    <div className="h-full flex flex-col items-center justify-center text-center">
                                        <div className="w-10 h-10 bg-gray-200 dark:bg-gray-600 rounded-full flex items-center justify-center mb-3">
                                            <MoreHorizIcon className="text-gray-600 dark:text-gray-300" />
                                        </div>
                                        <h4 className="font-medium text-gray-800 dark:text-white mb-2">More Integrations</h4>
                                        <p className="text-sm text-gray-500 dark:text-gray-400 mb-3">Explore our marketplace for more integration options.</p>
                                        <button className="text-sm font-medium"
                                            style={{ color: themeColor }}
                                            onMouseEnter={(e) => {
                                                e.currentTarget.style.color = secondaryThemeColor;
                                            }}
                                            onMouseLeave={(e) => {
                                                e.currentTarget.style.color = themeColor;
                                            }}>
                                            View All <ArrowForwardIcon className="ml-1" fontSize="small" />
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
