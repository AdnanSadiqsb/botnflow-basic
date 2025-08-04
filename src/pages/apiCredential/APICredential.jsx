import React, { useState } from 'react';
import {
    Visibility as VisibilityIcon,
    Edit as EditIcon,
    Delete as DeleteIcon,
    Settings as SettingsIcon,
    KeyboardArrowDown as KeyboardArrowDownIcon,
    KeyboardArrowUp as KeyboardArrowUpIcon,
    Close as CloseIcon,
    Search as SearchIcon,
    Shield as ShieldIcon,
    ContentCopy as ContentCopyIcon
} from '@mui/icons-material';

const APICredential = () => {
    const [apiModal, setApiModal] = useState(true);

    const toggleApiModal = () => {
        setApiModal(!apiModal);
    };

    return (
        <div className="bg-gray-50 min-h-screen font-sans text-gray-900">
            {/* <div className="flex mt-16 h-screen overflow-hidden"> */}
            {/* Main Content */}
            <main id="main-content" className="mt-16 p-3">
                {/* Security Warning Banner */}
                <div id="security-banner" className="bg-amber-50 border-l-4 border-amber-400 p-4 m-3 rounded-md">
                    <div className="flex">
                        <div className="flex-shrink-0">
                            <ShieldIcon className="text-amber-400" />
                        </div>
                        <div className="ml-3">
                            <h3 className="text-sm font-medium text-amber-800">Security Best Practices</h3>
                            <div className="mt-2 text-sm text-amber-700">
                                <ul className="list-disc pl-5 space-y-1">
                                    <li>Never share your secret API keys publicly or in client-side code</li>
                                    <li>Rotate credentials periodically for enhanced security</li>
                                    <li><span className="font-medium underline cursor-pointer">Learn more in our API Documentation</span></li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Tabs */}
                <div id="tabs-section" className="px-3">
                    <div className="border-b border-gray-200">
                        <nav className="-mb-px md:flex space-x-8">
                            <span className="w-full block border-primary-500 text-primary-600 py-4 px-1 border-b-2 font-medium text-sm cursor-pointer">
                                API Keys
                            </span>
                            <span className="w-full block border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 py-4 px-1 border-b-2 font-medium text-sm cursor-pointer">
                                Webhook Secrets
                            </span>
                            <span className="w-full block border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 py-4 px-1 border-b-2 font-medium text-sm cursor-pointer">
                                OAuth Clients
                            </span>
                        </nav>
                    </div>
                </div>

                {/* Search and Filter */}
                <div id="search-filter-section" className="px-3 py-4 flex flex-wrap justify-between items-center">
                    <div className="relative w-full md:w-64 mb-4 md:mb-0">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <SearchIcon className="text-gray-400" />
                        </div>
                        <input
                            type="text"
                            className="pl-10 pr-4 py-2 border border-gray-300 rounded-md w-full focus:ring-primary-500 focus:border-primary-500"
                            placeholder="Search by key name..."
                        />
                    </div>
                    <div className="flex space-x-3">
                        <div className="relative">
                            <select className="bg-white border border-gray-300 rounded-md pl-3 pr-8 py-2 focus:ring-primary-500 focus:border-primary-500">
                                <option>All Statuses</option>
                                <option>Active</option>
                                <option>Expired</option>
                                <option>Revoked</option>
                            </select>
                        </div>
                        <div className="relative">
                            <select className="bg-white border border-gray-300 rounded-md pl-3 pr-8 py-2 focus:ring-primary-500 focus:border-primary-500">
                                <option>All Scopes</option>
                                <option>Messaging</option>
                                <option>Lead Access</option>
                                <option>Voice</option>
                            </select>
                        </div>
                    </div>
                </div>

                {/* API Keys Table */}
                <div id="api-keys-table" className="px-3 pb-3">
                    <div className="overflow-x-auto w-[260px] sm:w-[380px] md:w-[412px] lg:w-auto">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Key Name
                                    </th>
                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Public Key
                                    </th>
                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Created On
                                    </th>
                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Expiry Date
                                    </th>
                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Scopes
                                    </th>
                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Status
                                    </th>
                                    <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Actions
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                <tr>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="text-sm font-medium text-gray-900">CRM Integration</div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="text-sm text-gray-500 flex items-center">
                                            <span>sk_live_1234...89ab</span>
                                            <button className="ml-2 text-primary-600">
                                                <ContentCopyIcon fontSize="small" />
                                            </button>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="text-sm text-gray-500">June 15, 2023</div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="text-sm text-gray-500">June 15, 2024</div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="flex flex-wrap gap-1">
                                            <span className="px-2 py-1 text-xs rounded-full bg-blue-100 text-blue-800">Messaging</span>
                                            <span className="px-2 py-1 text-xs rounded-full bg-green-100 text-green-800">Lead Access</span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <span className="px-2 py-1 text-xs rounded-full bg-green-100 text-green-800">Active</span>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                        <div className="flex justify-end space-x-2">
                                            <button className="text-primary-600 hover:text-primary-800">
                                                <VisibilityIcon fontSize="small" />
                                            </button>
                                            <button className="text-gray-600 hover:text-gray-800">
                                                <EditIcon fontSize="small" />
                                            </button>
                                            <button className="text-red-600 hover:text-red-800">
                                                <DeleteIcon fontSize="small" />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                                <tr>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="text-sm font-medium text-gray-900">Marketing Bot</div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="text-sm text-gray-500 flex items-center">
                                            <span>sk_live_5678...cd12</span>
                                            <button className="ml-2 text-primary-600">
                                                <ContentCopyIcon fontSize="small" />
                                            </button>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="text-sm text-gray-500">May 22, 2023</div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="text-sm text-gray-500">-</div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="flex flex-wrap gap-1">
                                            <span className="px-2 py-1 text-xs rounded-full bg-blue-100 text-blue-800">Messaging</span>
                                            <span className="px-2 py-1 text-xs rounded-full bg-purple-100 text-purple-800">Campaigns</span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <span className="px-2 py-1 text-xs rounded-full bg-gray-100 text-gray-800">Revoked</span>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                        <div className="flex justify-end space-x-2">
                                            <button className="text-primary-600 hover:text-primary-800">
                                                <VisibilityIcon fontSize="small" />
                                            </button>
                                            <button className="text-gray-600 hover:text-gray-800">
                                                <EditIcon fontSize="small" />
                                            </button>
                                            <button className="text-red-600 hover:text-red-800">
                                                <DeleteIcon fontSize="small" />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                                <tr>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="text-sm font-medium text-gray-900">Analytics Dashboard</div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="text-sm text-gray-500 flex items-center">
                                            <span>sk_live_9012...ef34</span>
                                            <button className="ml-2 text-primary-600">
                                                <ContentCopyIcon fontSize="small" />
                                            </button>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="text-sm text-gray-500">April 10, 2023</div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="text-sm text-gray-500">April 10, 2023</div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="flex flex-wrap gap-1">
                                            <span className="px-2 py-1 text-xs rounded-full bg-yellow-100 text-yellow-800">Read Only</span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <span className="px-2 py-1 text-xs rounded-full bg-red-100 text-red-800">Expired</span>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                        <div className="flex justify-end space-x-2">
                                            <button className="text-primary-600 hover:text-primary-800">
                                                <VisibilityIcon fontSize="small" />
                                            </button>
                                            <button className="text-gray-600 hover:text-gray-800">
                                                <EditIcon fontSize="small" />
                                            </button>
                                            <button className="text-red-600 hover:text-red-800">
                                                <DeleteIcon fontSize="small" />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Advanced Settings (Collapsible) */}
                <div id="advanced-settings" className="px-3 pb-3">
                    <div className="bg-white shadow-sm rounded-lg border border-gray-200 overflow-hidden">
                        <button
                            className="w-full px-6 py-4 text-left flex items-center justify-between"
                            id="advanced-toggle"
                            onClick={toggleApiModal}
                        >
                            <div className="flex items-center">
                                <SettingsIcon className="mr-2 text-gray-500" />
                                <span className="font-medium">Advanced Settings</span>
                            </div>
                            {apiModal ? <KeyboardArrowUpIcon className="text-gray-500" /> : <KeyboardArrowDownIcon className="text-gray-500" />}
                        </button>
                        <div className={`px-6 py-4 border-t border-gray-200 ${apiModal ? '' : 'hidden'}`} id="advanced-content">
                            <div className="space-y-4">
                                <div>
                                    <h3 className="text-sm font-medium text-gray-700 mb-2">IP Whitelist</h3>
                                    <div className="flex items-center">
                                        <input
                                            type="text"
                                            className="flex-1 border border-gray-300 rounded-l-md px-3 py-2 focus:ring-primary-500 focus:border-primary-500"
                                            placeholder="Add IP address..."
                                        />
                                        <button className="bg-primary-600 text-white px-4 py-2 rounded-r-md">Add</button>
                                    </div>
                                    <div className="mt-2 text-xs text-gray-500">No IP addresses whitelisted</div>
                                </div>
                                <div>
                                    <h3 className="text-sm font-medium text-gray-700 mb-2">Webhook Secret</h3>
                                    <div className="flex items-center">
                                        <input
                                            type="text"
                                            className="flex-1 border border-gray-300 rounded-l-md px-3 py-2 focus:ring-primary-500 focus:border-primary-500"
                                            value="whsec_••••••••••••••••••••••••"
                                            disabled
                                        />
                                        <button className="bg-gray-100 text-gray-700 px-4 py-2 border-t border-b border-r border-gray-300 flex items-center">
                                            <ContentCopyIcon className="mr-1" fontSize="small" />
                                            Copy
                                        </button>
                                        <button className="bg-gray-100 text-gray-700 px-4 py-2 rounded-r-md border-t border-b border-r border-gray-300">
                                            Rotate
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
            {/* </div> */}

            {/* Generate API Key Modal */}
            {apiModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center">
                    <div
                        className="fixed inset-0 bg-black opacity-70"
                        onClick={() => setApiModal(!apiModal)}
                    ></div>

                    <div
                        className="bg-white h-[90vh] overflow-auto rounded-lg md:max-w-md md:w-full p-2 md:p-6 relative z-50 mx-4"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div className="flex justify-between items-center border-b pb-3 md:mb-4">
                            <h2 className="text-lg font-medium">Generate New API Key</h2>
                            <button className="text-gray-400 hover:text-gray-500" onClick={() => setApiModal(!apiModal)}>
                                <CloseIcon />
                            </button>
                        </div>
                        <div className="md:px-6 md:py-4 py-2">
                            <div className="space-y-4">
                                <div>
                                    <label htmlFor="key-name" className="block text-sm font-medium text-gray-700 mb-1">Key Name</label>
                                    <input
                                        type="text"
                                        id="key-name"
                                        className="w-full border border-gray-300 rounded-md px-3 md:py-2 py-1 focus:ring-primary-500 focus:border-primary-500"
                                        placeholder="e.g. CRM Integration"
                                    />
                                </div>
                                <div>
                                    <label htmlFor="expiry-date" className="block text-sm font-medium text-gray-700 mb-1">Expiry Date (Optional)</label>
                                    <input
                                        type="date"
                                        id="expiry-date"
                                        className="w-full border border-gray-300 rounded-md px-3 md:py-2 py-1 focus:ring-primary-500 focus:border-primary-500"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 md:mb-2">Allowed Scopes</label>
                                    <div className="space-y-1 md:space-y-2">
                                        <div className="flex items-center">
                                            <input id="scope-messaging" type="checkbox" className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded" />
                                            <label htmlFor="scope-messaging" className="ml-2 block text-sm text-gray-700">Messaging</label>
                                        </div>
                                        <div className="flex items-center">
                                            <input id="scope-leads" type="checkbox" className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded" />
                                            <label htmlFor="scope-leads" className="ml-2 block text-sm text-gray-700">Read Leads</label>
                                        </div>
                                        <div className="flex items-center">
                                            <input id="scope-campaigns" type="checkbox" className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded" />
                                            <label htmlFor="scope-campaigns" className="ml-2 block text-sm text-gray-700">Access Campaigns</label>
                                        </div>
                                        <div className="flex items-center">
                                            <input id="scope-voice" type="checkbox" className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded" />
                                            <label htmlFor="scope-voice" className="ml-2 block text-sm text-gray-700">Voice</label>
                                        </div>
                                    </div>
                                </div>
                                <div>
                                    <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">Description (Optional)</label>
                                    <textarea
                                        id="description"
                                        rows="2"
                                        className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-primary-500 focus:border-primary-500"
                                        placeholder="What will this API key be used for?"
                                    ></textarea>
                                </div>
                            </div>
                        </div>
                        <div className="px-6 py-4 bg-gray-50 rounded-b-lg flex justify-end space-x-3">
                            <button className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 bg-white hover:bg-gray-50" onClick={() => setApiModal(!apiModal)}>
                                Cancel
                            </button>
                            <button className="px-4 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700">
                                Generate Key
                            </button>
                        </div>
                    </div>
                </div>
            )}

        </div>
    );
};

export default APICredential;