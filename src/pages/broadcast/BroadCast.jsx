import React, { useContext, useState } from 'react';
import {
    Search,
    KeyboardArrowDown,
    FilterAlt,
    Add,
    FileDownload,
    Warning,
    Campaign,
    PlayArrow,
    CheckCircle,
    Reply,
    Store,
    WhatsApp,
    Business,
    Phone,
    LocalOffer,
    Science,
    Notifications,
    MoreVert,
    ChevronLeft,
    ChevronRight,
    Close,
    Public,
    Email,
    Star,
    LocationOn,
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { ContentContext } from '../../context/ContextProvider';

const BroadCast = () => {
    const { themeColor, secondaryThemeColor } = useContext(ContentContext)
    const [showProfileFinder, setShowProfileFinder] = useState(false);

    const navigate = useNavigate()

    const handleNavigate = () => {
        navigate('/create-broadcast')
    }

    const campaigns = [
        {
            id: 1,
            name: "Local Business Outreach",
            recipients: "5,240",
            channel: "WhatsApp",
            status: "Active",
            created: "Jul 15, 2023",
            delivery: "98.2%",
            engagement: "45.7%",
            icon: <Store />,
            iconColor: "text-indigo-600",
            bgColor: "bg-indigo-100",
            statusColor: "bg-green-100 text-green-800"
        },
        {
            id: 2,
            name: "Corporate Client Welcome",
            recipients: "842",
            channel: "Voice",
            status: "Active",
            created: "Jul 12, 2023",
            delivery: "92.4%",
            engagement: "38.1%",
            icon: <Business />,
            iconColor: "text-purple-600",
            bgColor: "bg-purple-100",
            statusColor: "bg-green-100 text-green-800"
        },
        {
            id: 3,
            name: "Summer Promotion",
            recipients: "12,458",
            channel: "WhatsApp",
            status: "Completed",
            created: "Jun 28, 2023",
            delivery: "99.1%",
            engagement: "52.3%",
            icon: <LocalOffer />,
            iconColor: "text-blue-600",
            bgColor: "bg-blue-100",
            statusColor: "bg-gray-100 text-gray-800"
        },
        {
            id: 4,
            name: "New Product A/B Test",
            recipients: "2,500",
            channel: "WhatsApp",
            status: "A/B Test",
            created: "Jul 10, 2023",
            delivery: "97.8%",
            engagement: "41.2%",
            icon: <Science />,
            iconColor: "text-yellow-600",
            bgColor: "bg-yellow-100",
            statusColor: "bg-yellow-100 text-yellow-800"
        },
        {
            id: 5,
            name: "Service Reminder",
            recipients: "3,125",
            channel: "Voice",
            status: "Paused",
            created: "Jul 5, 2023",
            delivery: "89.5%",
            engagement: "32.7%",
            icon: <Notifications />,
            iconColor: "text-red-600",
            bgColor: "bg-red-100",
            statusColor: "bg-orange-100 text-orange-800"
        }
    ];

    const businessProfiles = [
        {
            id: 1,
            name: "Riverside Coffee House",
            address: "123 Main St, New York, NY 10001",
            rating: 4.7,
            reviews: 142,
            website: "riversidecoffee.com",
            phone: "(212) 555-1234",
            email: "info@riversidecoffee.com"
        },
        {
            id: 2,
            name: "City Bakery & Cafe",
            address: "456 Park Ave, New York, NY 10022",
            rating: 4.5,
            reviews: 98,
            website: "citybakery.com",
            phone: "(212) 555-7890",
            email: "hello@citybakery.com"
        },
        {
            id: 3,
            name: "Urban Brew Co.",
            address: "789 Broadway, New York, NY 10003",
            rating: 4.8,
            reviews: 215,
            website: "urbanbrewco.com",
            phone: "(212) 555-4321",
            email: "contact@urbanbrewco.com"
        }
    ];

    return (
        <div className="bg-gray-100 font-sans p-3">
            {/* Main Content Area */}
            <div id="main-content" className="pt-16">
                {/* New Feature Announcement Banner */}
                {/* <div id="feature-announcement" className="bg-yellow-50 text-center py-2 border-b border-yellow-200 flex items-center justify-center">
          <Warning className="w-5 h-5 text-yellow-500 mr-2" />
          <span className="text-gray-700">
            New! Try our Business Profile Finder tool to discover and save business profiles.
            <span 
              className="underline text-primary-600 hover:text-primary-800 font-medium cursor-pointer ml-1" 
              onClick={() => setShowProfileFinder(true)}
            >
              Learn more
            </span>
          </span>
        </div> */}

                {/* Page Header */}
                <div id="page-header" className="mb-3 flex flex-col md:flex-row md:items-center md:justify-between">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-800">Campaigns</h1>
                        <p className="text-gray-600 mt-1">Manage, monitor and analyze all your communication campaigns</p>
                    </div>
                    <div className="mt-4 md:mt-0 flex space-x-3">
                        <button className="px-4 py-2 bg-white border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 flex items-center">
                            <FileDownload className="mr-2" />
                            Export
                        </button>
                        <button className="px-4 py-2 text-white rounded-md flex items-center" onClick={handleNavigate}
                            style={{ backgroundColor: themeColor }}
                            onMouseEnter={(e) => {
                                e.currentTarget.style.backgroundColor = secondaryThemeColor;
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.backgroundColor = themeColor;
                            }}
                        >
                            <Add className="mr-2" />
                            New Campaign
                        </button>
                    </div>
                </div>

                {/* Campaign Summary Cards */}
                <div id="campaign-summary" className=" grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                    <div className="bg-white rounded-lg shadow-sm p-5">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-gray-500 uppercase font-medium">Total Campaigns</p>
                                <h3 className="text-2xl font-bold text-gray-800 mt-1">24</h3>
                            </div>
                            <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
                                <Campaign className="text-blue-600" />
                            </div>
                        </div>
                        <div className="flex items-center mt-4 text-sm">
                            <div className="flex items-center text-green-600">
                                <span className="mr-1">↑</span>
                                <span>12%</span>
                            </div>
                            <span className="text-gray-500 ml-2">vs last month</span>
                        </div>
                    </div>

                    <div className="bg-white rounded-lg shadow-sm p-5">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-gray-500 uppercase font-medium">Active Campaigns</p>
                                <h3 className="text-2xl font-bold text-gray-800 mt-1">7</h3>
                            </div>
                            <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
                                <PlayArrow className="text-green-600" />
                            </div>
                        </div>
                        <div className="flex items-center mt-4 text-sm">
                            <div className="flex items-center text-green-600">
                                <span className="mr-1">↑</span>
                                <span>3</span>
                            </div>
                            <span className="text-gray-500 ml-2">new this week</span>
                        </div>
                    </div>

                    <div className="bg-white rounded-lg shadow-sm p-5">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-gray-500 uppercase font-medium">Avg. Delivery Rate</p>
                                <h3 className="text-2xl font-bold text-gray-800 mt-1">96.3%</h3>
                            </div>
                            <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center">
                                <CheckCircle className="text-purple-600" />
                            </div>
                        </div>
                        <div className="flex items-center mt-4 text-sm">
                            <div className="flex items-center text-green-600">
                                <span className="mr-1">↑</span>
                                <span>1.2%</span>
                            </div>
                            <span className="text-gray-500 ml-2">vs last month</span>
                        </div>
                    </div>

                    <div className="bg-white rounded-lg shadow-sm p-5">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-gray-500 uppercase font-medium">Avg. Engagement</p>
                                <h3 className="text-2xl font-bold text-gray-800 mt-1">42.8%</h3>
                            </div>
                            <div className="w-10 h-10 rounded-full bg-orange-100 flex items-center justify-center">
                                <Reply className="text-orange-600" />
                            </div>
                        </div>
                        <div className="flex items-center mt-4 text-sm">
                            <div className="flex items-center text-red-600">
                                <span className="mr-1">↓</span>
                                <span>3.1%</span>
                            </div>
                            <span className="text-gray-500 ml-2">vs last month</span>
                        </div>
                    </div>
                </div>

                {/* Campaign Filter Controls */}
                <div id="campaign-filters" className="md:flex flex-wrap items-center gap-4 mb-6">
                    <div className="relative">
                        <input
                            type="text"
                            placeholder="Search campaigns..."
                            className="pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 w-64"
                        />
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    </div>

                    <div className="relative w-30 flex">
                        <select
                            className='border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500'
                        >
                            <option>All channels</option>
                            <option>WhatsApp</option>
                            <option>Voice</option>
                            <option>SMS</option>
                            <option>Email</option>
                        </select>
                        {/* <KeyboardArrowDown 
                        // className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none"
                         /> */}
                    </div>

                    <div className="relative w-30 flex">
                        <select
                            className='border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500'
                        >
                            <option>All statuses</option>
                            <option>Active</option>
                            <option>Completed</option>
                            <option>Paused</option>
                            <option>Draft</option>
                        </select>
                        {/* <KeyboardArrowDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" /> */}
                    </div>

                    <div className="relative w-30 flex">
                        <select
                            className='border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500'
                        >
                            <option>Last 30 days</option>
                            <option>Last 7 days</option>
                            <option>This month</option>
                            <option>Last month</option>
                            <option>Custom range</option>
                        </select>
                        {/* <KeyboardArrowDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" /> */}
                    </div>

                    <button className="md:ml-auto px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 flex items-center">
                        <FilterAlt className="mr-2" />
                        More Filters
                    </button>
                </div>

                {/* Campaign Table */}
                <div id="campaign-table" className=" bg-white shadow-sm rounded-lg overflow-hidden mb-6">
                    <div className="overflow-x-auto w-[295px] md:w-[740px] lg:w-auto">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Campaign Name
                                    </th>
                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Channel
                                    </th>
                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Status
                                    </th>
                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Created
                                    </th>
                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Delivery
                                    </th>
                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Engagement
                                    </th>
                                    <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Actions
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {campaigns.map((campaign) => (
                                    <tr key={campaign.id} className="hover:bg-gray-50">
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="flex items-center">
                                                <div className={`flex-shrink-0 h-10 w-10 ${campaign.bgColor} rounded-md flex items-center justify-center`}>
                                                    {React.cloneElement(campaign.icon, { className: campaign.iconColor })}
                                                </div>
                                                <div className="ml-4">
                                                    <div className="text-sm font-medium text-gray-900">{campaign.name}</div>
                                                    <div className="text-sm text-gray-500">{campaign.recipients} recipients</div>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="flex items-center">
                                                {campaign.channel === "WhatsApp" ? (
                                                    <WhatsApp className="text-green-600 mr-2" />
                                                ) : (
                                                    <Phone className="text-red-600 mr-2" />
                                                )}
                                                <span className="text-sm text-gray-900">{campaign.channel}</span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${campaign.statusColor}`}>
                                                {campaign.status}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                            {campaign.created}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="text-sm text-gray-900">{campaign.delivery}</div>
                                            <div className="w-24 h-1.5 bg-gray-200 rounded-full mt-1">
                                                <div
                                                    className="h-1.5 bg-green-500 rounded-full"
                                                    style={{ width: campaign.delivery }}
                                                ></div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="text-sm text-gray-900">{campaign.engagement}</div>
                                            <div className="w-24 h-1.5 bg-gray-200 rounded-full mt-1">
                                                <div
                                                    className="h-1.5 bg-blue-500 rounded-full"
                                                    style={{ width: campaign.engagement }}
                                                ></div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                            <span className="mr-3 cursor-pointer"
                                                style={{ color: themeColor }}
                                                onMouseEnter={(e) => {
                                                    e.currentTarget.style.color = secondaryThemeColor;
                                                }}
                                                onMouseLeave={(e) => {
                                                    e.currentTarget.style.color = themeColor;
                                                }}
                                            >View</span>
                                            <span className="text-gray-600 hover:text-gray-900 mr-3 cursor-pointer">Edit</span>
                                            <span className="text-gray-600 hover:text-gray-900 cursor-pointer">
                                                <MoreVert />
                                            </span>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    <div className="px-6 py-3 flex items-center justify-between border-t border-gray-200">
                        <div className="flex-1 flex justify-between sm:hidden">
                            <span className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 cursor-pointer">
                                Previous
                            </span>
                            <span className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 cursor-pointer">
                                Next
                            </span>
                        </div>
                        <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
                            <div>
                                <p className="text-sm text-gray-700">
                                    Showing <span className="font-medium">1</span> to <span className="font-medium">5</span> of <span className="font-medium">24</span> results
                                </p>
                            </div>
                            <div>
                                <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
                                    <span className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 cursor-pointer">
                                        <span className="sr-only">Previous</span>
                                        <ChevronLeft className="h-5 w-5" />
                                    </span>
                                    <span className="z-10 bg-primary-50 border-primary-500 text-primary-600 relative inline-flex items-center px-4 py-2 border text-sm font-medium cursor-pointer" aria-current="page"
                                    >
                                        1
                                    </span>
                                    <span className="bg-white border-gray-300 text-gray-500 hover:bg-gray-50 relative inline-flex items-center px-4 py-2 border text-sm font-medium cursor-pointer">
                                        2
                                    </span>
                                    <span className="bg-white border-gray-300 text-gray-500 hover:bg-gray-50 relative inline-flex items-center px-4 py-2 border text-sm font-medium cursor-pointer">
                                        3
                                    </span>
                                    <span className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700">
                                        ...
                                    </span>
                                    <span className="bg-white border-gray-300 text-gray-500 hover:bg-gray-50 relative inline-flex items-center px-4 py-2 border text-sm font-medium cursor-pointer">
                                        5
                                    </span>
                                    <span className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 cursor-pointer">
                                        <span className="sr-only">Next</span>
                                        <ChevronRight className="h-5 w-5" />
                                    </span>
                                </nav>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Profile Finder Modal */}
            {showProfileFinder && (
                <div id="profile-finder-modal" className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white rounded-lg shadow-xl w-full max-w-4xl mx-4 md:mx-auto">
                        <div className="flex justify-between items-center border-b border-gray-200 px-6 py-4">
                            <h3 className="text-xl font-bold text-gray-900">Business Profile Finder</h3>
                            <button
                                onClick={() => setShowProfileFinder(false)}
                                className="text-gray-400 hover:text-gray-500"
                            >
                                <Close />
                            </button>
                        </div>

                        <div className="p-6">
                            <p className="text-gray-600 mb-6">
                                Our new Business Profile Finder tool helps you discover business profiles by searching Google Maps, websites, and social media pages. Find complete business details including websites, phone numbers, and email addresses, then save them directly to your contact management system.
                            </p>

                            <div className="bg-gray-50 p-4 rounded-lg mb-6">
                                <div className="flex flex-col md:flex-row md:items-end gap-4">
                                    <div className="flex-grow">
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Business Search</label>
                                        <div className="relative">
                                            <input
                                                type="text"
                                                placeholder="Search for businesses (e.g., 'coffee shops in New York')"
                                                className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                                            />
                                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                                        </div>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
                                        <div className="relative">
                                            <input
                                                type="text"
                                                placeholder="City, State or ZIP"
                                                className="pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                                            />
                                            <LocationOn className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                                        </div>
                                    </div>
                                    <button className="px-4 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700 flex items-center">
                                        <Search className="mr-2" />
                                        Find Businesses
                                    </button>
                                </div>
                            </div>

                            <div className="border border-gray-200 rounded-lg overflow-hidden mb-6">
                                <div className="bg-gray-50 px-4 py-3 border-b border-gray-200 flex justify-between items-center">
                                    <h4 className="font-medium text-gray-700">Search Results</h4>
                                    <div className="flex items-center text-sm text-gray-500">
                                        <span>20 businesses found</span>
                                        <button className="ml-4 text-primary-600 hover:text-primary-700 flex items-center">
                                            <FileDownload className="mr-1.5" />
                                            Export All
                                        </button>
                                    </div>
                                </div>

                                <div className="divide-y divide-gray-200">
                                    {businessProfiles.map((business) => (
                                        <div key={business.id} className="p-4 hover:bg-gray-50 flex flex-col md:flex-row md:items-center">
                                            <div className="flex-grow">
                                                <div className="flex items-start">
                                                    <div className="w-12 h-12 bg-gray-200 rounded-md flex items-center justify-center mr-3">
                                                        <Business className="text-gray-500 text-xl" />
                                                    </div>
                                                    <div>
                                                        <h5 className="font-medium text-gray-900">{business.name}</h5>
                                                        <p className="text-sm text-gray-600">{business.address}</p>
                                                        <div className="mt-1 flex items-center text-sm">
                                                            <span className="text-yellow-500 flex items-center mr-2">
                                                                <Star className="mr-1" />
                                                                {business.rating}
                                                            </span>
                                                            <span className="text-gray-500">({business.reviews} reviews)</span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="mt-4 md:mt-0 md:ml-4 flex flex-col md:items-end">
                                                <div className="flex items-center mb-2">
                                                    <Public className="text-gray-500 mr-2" />
                                                    <span className="text-primary-600 hover:underline cursor-pointer">{business.website}</span>
                                                </div>
                                                <div className="flex items-center mb-2">
                                                    <Phone className="text-gray-500 mr-2" />
                                                    <span className="text-gray-700">{business.phone}</span>
                                                </div>
                                                <div className="flex items-center">
                                                    <Email className="text-gray-500 mr-2" />
                                                    <span className="text-gray-700">{business.email}</span>
                                                </div>
                                            </div>
                                            <div className="mt-4 md:mt-0 md:ml-6">
                                                <button className="px-3 py-1.5 bg-primary-600 text-white rounded hover:bg-primary-700 flex items-center">
                                                    <Add className="mr-1.5" />
                                                    Save
                                                </button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className="flex flex-col md:flex-row justify-between items-center bg-gray-50 p-4 rounded-lg">
                                <div>
                                    <h4 className="font-medium text-gray-800 mb-1">Save to Contact Management</h4>
                                    <p className="text-sm text-gray-600">All saved businesses will be added to your contact list for easy campaign targeting</p>
                                </div>
                                <div className="mt-4 md:mt-0">
                                    <button className="px-4 py-2 bg-white border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50">
                                        View Contact List
                                    </button>
                                </div>
                            </div>
                        </div>

                        <div className="bg-gray-50 px-6 py-4 flex justify-end border-t border-gray-200">
                            <button
                                onClick={() => setShowProfileFinder(false)}
                                className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-100 mr-3"
                            >
                                Close
                            </button>
                            <button className="px-4 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700">
                                Learn More
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default BroadCast;