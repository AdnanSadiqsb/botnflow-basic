import React, { useContext, useState } from 'react';
import {
    Search,
    LocationOn,
    Star,
    StarBorder,
    Phone,
    Email,
    Language,
    Close,
    FilterList,
    Sort,
    Save,
    Visibility,
    Add,
    ChevronLeft,
    ChevronRight,
    Restaurant,
    MedicalServices,
    Store,
    Build,
    FitnessCenter,
    School,
    DirectionsCar,
    ContentCut,
    Balance,
    Home,
    Laptop,
    TheaterComedy,
    Business,
    FileDownload,
    CheckBox,
    CheckBoxOutlineBlank
} from '@mui/icons-material';
import { ContentContext } from '../../context/ContextProvider';

const LeadGeneration = () => {
    const [showProfileFinderModal, setShowProfileFinderModal] = useState(false);
    const [showNewLeadModal, setShowNewLeadModal] = useState(false);
    const [showViewLeadModal, setShowViewLeadModal] = useState(false);
    const [showEditLeadModal, setShowEditLeadModal] = useState(false);
    const [showExportModal, setShowExportModal] = useState(false);
    const [showMoreFiltersModal, setShowMoreFiltersModal] = useState(false);
    const [searchProgress, setSearchProgress] = useState(false);
    const [progress, setProgress] = useState(0);

    const { themeColor, secondaryThemeColor } = useContext(ContentContext)

    // Data arrays
    const popularCategories = [
        { id: 'restaurants', name: 'Restaurants', description: 'Food & Dining', icon: <Restaurant />, color: 'bg-orange-100', textColor: 'text-orange-600' },
        { id: 'healthcare', name: 'Healthcare', description: 'Medical Services', icon: <MedicalServices />, color: 'bg-blue-100', textColor: 'text-blue-600' },
        { id: 'retail', name: 'Retail', description: 'Shopping', icon: <Store />, color: 'bg-green-100', textColor: 'text-green-600' },
        { id: 'services', name: 'Services', description: 'Professional', icon: <Build />, color: 'bg-purple-100', textColor: 'text-purple-600' },
        { id: 'fitness', name: 'Fitness', description: 'Gyms & Sports', icon: <FitnessCenter />, color: 'bg-red-100', textColor: 'text-red-600' },
        { id: 'education', name: 'Education', description: 'Schools & Training', icon: <School />, color: 'bg-yellow-100', textColor: 'text-yellow-600' },
        { id: 'automotive', name: 'Automotive', description: 'Car Services', icon: <DirectionsCar />, color: 'bg-indigo-100', textColor: 'text-indigo-600' },
        { id: 'beauty', name: 'Beauty', description: 'Salon & Spa', icon: <ContentCut />, color: 'bg-pink-100', textColor: 'text-pink-600' },
        { id: 'legal', name: 'Legal', description: 'Law Firms', icon: <Balance />, color: 'bg-gray-100', textColor: 'text-gray-600' },
        { id: 'real-estate', name: 'Real Estate', description: 'Property', icon: <Home />, color: 'bg-teal-100', textColor: 'text-teal-600' },
        { id: 'technology', name: 'Technology', description: 'IT Services', icon: <Laptop />, color: 'bg-cyan-100', textColor: 'text-cyan-600' },
        { id: 'entertainment', name: 'Entertainment', description: 'Events & Shows', icon: <TheaterComedy />, color: 'bg-violet-100', textColor: 'text-violet-600' }
    ];

    const searchResults = [
        {
            id: 1,
            name: 'Blue Bottle Coffee',
            address: '123 Main Street, San Francisco, CA 94102',
            rating: 4.8,
            reviews: 324,
            category: 'Coffee Shop',
            phone: '(415) 555-0123',
            email: 'info@bluebottle.com',
            website: 'www.bluebottle.com',
            source: 'Google Maps'
        },
        {
            id: 2,
            name: 'Riverside Bistro',
            address: '456 Oak Avenue, San Francisco, CA 94105',
            rating: 4.2,
            reviews: 187,
            category: 'Restaurant',
            phone: '(415) 555-4321',
            email: 'hello@riverside.com',
            website: 'www.riverside.com',
            source: 'Google Maps'
        }
    ];

    const modalSearchResults = [
        {
            id: 1,
            name: 'Riverside Coffee House',
            address: '123 Main St, New York, NY 10001',
            rating: 4.7,
            reviews: 142,
            phone: '(212) 555-1234',
            email: 'info@riversidecoffee.com',
            website: 'riversidecoffee.com'
        },
        {
            id: 2,
            name: 'City Bakery & Cafe',
            address: '456 Park Ave, New York, NY 10022',
            rating: 4.5,
            reviews: 98,
            phone: '(212) 555-7890',
            email: 'hello@citybakery.com',
            website: 'citybakery.com'
        },
        {
            id: 3,
            name: 'Urban Brew Co.',
            address: '789 Broadway, New York, NY 10003',
            rating: 4.8,
            reviews: 215,
            phone: '(212) 555-4321',
            email: 'contact@urbanbrewco.com',
            website: 'urbanbrewco.com'
        }
    ];

    // Helper functions
    const renderStars = (rating) => {
        const stars = [];
        const fullStars = Math.floor(rating);
        const hasHalfStar = rating % 1 >= 0.5;

        for (let i = 1; i <= 5; i++) {
            if (i <= fullStars) {
                stars.push(<Star key={i} className="text-yellow-400" />);
            } else if (i === fullStars + 1 && hasHalfStar) {
                stars.push(<Star key={i} className="text-yellow-400" />);
            } else {
                stars.push(<StarBorder key={i} className="text-yellow-400" />);
            }
        }

        return stars;
    };

    const startSearch = () => {
        setSearchProgress(true);
        setProgress(0);

        const interval = setInterval(() => {
            setProgress(prev => {
                if (prev >= 100) {
                    clearInterval(interval);
                    setSearchProgress(false);
                    return 100;
                }
                return prev + 10;
            });
        }, 300);
    };

    const selectCategory = (category) => {
        console.log(`Selected category: ${category}`);
    };

    const scrollCategories = (direction) => {
        const container = document.getElementById('categories-container');
        if (container) {
            const scrollAmount = direction === 'left' ? -200 : 200;
            container.scrollBy({ left: scrollAmount, behavior: 'smooth' });
        }
    };

    const saveLead = (id) => {
        alert(`Lead ${id} saved successfully!`);
    };

    const viewLead = (id) => {
        setShowViewLeadModal(true);
    };

    const editLead = (id) => {
        setShowViewLeadModal(false);
        setShowEditLeadModal(true);
    };

    const deleteLead = (id) => {
        if (window.confirm('Are you sure you want to delete this lead?')) {
            alert('Lead deleted successfully!');
        }
    };

    const submitNewLead = (e) => {
        e.preventDefault();
        alert('Lead search started! Results will appear shortly.');
        setShowNewLeadModal(false);
    };

    const submitEditLead = (e) => {
        e.preventDefault();
        alert('Lead updated successfully!');
        setShowEditLeadModal(false);
    };

    const submitExport = (e) => {
        e.preventDefault();
        alert('Export started! You will receive an email when ready.');
        setShowExportModal(false);
    };

    const applyFilters = (e) => {
        e.preventDefault();
        alert('Filters applied successfully!');
        setShowMoreFiltersModal(false);
    };

    return (
        <div className="bg-gray-100 font-sans">
            {/* Main Content Area */}
            <div id="main-content" className="pt-16 pb-8">
                {/* Page Header */}
                <div id="page-header" className="px-3 py-3 bg-gradient-to-r to-primary-700">
                    <div className="lg:flex flex-col md:flex-row md:items-center md:justify-between">
                        <div className="">
                            <h1 className="text-3xl font-bold">Business Profile Finder</h1>
                            <p className="mt-2">Discover and collect business leads from Google Maps, web searches, and social media platforms</p>
                        </div>
                        <div className="mt-4 lg:mt-0 flex items-center space-x-3">
                            <div
                                className="bg-opacity-20 backdrop-blur-sm rounded-lg px-4 py-2 transition-colors duration-200 cursor-pointer"
                                style={{ backgroundColor: themeColor }}
                                onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = secondaryThemeColor)}
                                onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = themeColor)}
                            >
                                <div className="flex items-center text-white">
                                    <i className="fa-solid fa-chart-line mr-2"></i>
                                    <span className="text-sm">24 searches today</span>
                                </div>
                            </div>
                            <div
                                className="bg-opacity-20 backdrop-blur-sm rounded-lg px-4 py-2 transition-colors duration-200 cursor-pointer"
                                style={{ backgroundColor: themeColor }}
                                onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = secondaryThemeColor)}
                                onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = themeColor)}
                            >
                                <div className="flex items-center text-white">
                                    <i className="fa-solid fa-chart-line mr-2"></i>
                                    <span className="text-sm">1,247 leads found</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Search Interface */}
                <div id="search-interface" className="px-3 mt-3 z-10">
                    <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
                        <div className="md:flex items-center gap-3">
                            <div className="flex-grow">
                                <label className="block text-sm font-medium text-gray-700 mb-2">What are you looking for?</label>
                                <div className="relative">
                                    <input
                                        type="text"
                                        placeholder="e.g., coffee shops, restaurants, dental clinics, auto repair shops"
                                        className="h-12 pl-12 pr-4 py-3 w-full border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 text-lg"
                                    />
                                    <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 text-lg" />
                                </div>
                            </div>
                            <div className="lg:w-64">
                                <label className="block text-sm font-medium text-gray-700 mb-2">Location</label>
                                <div className="relative">
                                    <input
                                        type="text"
                                        placeholder="City, State or ZIP code"
                                        className="h-12 pl-12 pr-4 py-3 w-full border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                                    />
                                    <LocationOn className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
                                </div>
                            </div>
                            <div className="lg:w-48">
                                <label className="text-sm font-medium text-gray-700 mb-2">Radius</label>
                                <select className="h-12 w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500">
                                    <option>5 miles</option>
                                    <option>10 miles</option>
                                    <option>25 miles</option>
                                    <option>50 miles</option>
                                    <option>100 miles</option>
                                </select>
                            </div>
                            <div
                                onClick={startSearch}
                                className="h-12 px-8 py-3 mt-5 text-white rounded-lg flex items-center font-medium transition-colors"
                                style={{ backgroundColor: themeColor }}
                                onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = secondaryThemeColor)}
                                onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = themeColor)}
                            >
                                <Search className="mr-2" />
                                Find Businesses
                            </div>
                        </div>

                        {/* Search Sources */}
                        <div className="mt-6 pt-6 border-t border-gray-200">
                            <label className="block text-sm font-medium text-gray-700 mb-3">Search Sources</label>
                            <div className="flex flex-wrap gap-4">
                                <label className="flex items-center bg-gray-50 px-4 py-2 rounded-lg hover:bg-gray-100 cursor-pointer">
                                    <input type="checkbox" defaultChecked className="mr-3 text-primary-600" />
                                    <i className="fa-solid fa-map-location-dot text-red-600 mr-2"></i>
                                    <span className="text-sm font-medium">Google Maps</span>
                                </label>
                                <label className="flex items-center bg-gray-50 px-4 py-2 rounded-lg hover:bg-gray-100 cursor-pointer">
                                    <input type="checkbox" defaultChecked className="mr-3 text-primary-600" />
                                    <i className="fa-brands fa-google text-blue-600 mr-2"></i>
                                    <span className="text-sm font-medium">Google Search</span>
                                </label>
                                <label className="flex items-center bg-gray-50 px-4 py-2 rounded-lg hover:bg-gray-100 cursor-pointer">
                                    <input type="checkbox" className="mr-3 text-primary-600" />
                                    <i className="fa-brands fa-linkedin text-blue-700 mr-2"></i>
                                    <span className="text-sm font-medium">LinkedIn</span>
                                </label>
                                <label className="flex items-center bg-gray-50 px-4 py-2 rounded-lg hover:bg-gray-100 cursor-pointer">
                                    <input type="checkbox" className="mr-3 text-primary-600" />
                                    <i className="fa-brands fa-facebook text-blue-600 mr-2"></i>
                                    <span className="text-sm font-medium">Facebook</span>
                                </label>
                                <label className="flex items-center bg-gray-50 px-4 py-2 rounded-lg hover:bg-gray-100 cursor-pointer">
                                    <input type="checkbox" className="mr-3 text-primary-600" />
                                    <i className="fa-brands fa-yelp text-red-600 mr-2"></i>
                                    <span className="text-sm font-medium">Yelp</span>
                                </label>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Quick Search Categories */}
                {/* <div id="quick-categories" className="px-6 mt-8">
                    <div className="flex items-center justify-between mb-4">
                        <h3 className="text-lg font-semibold text-gray-800">Popular Categories</h3>
                        <div className="flex items-center space-x-2">
                            <button
                                onClick={() => scrollCategories('left')}
                                className="p-2 rounded-full bg-white shadow-sm border border-gray-200 hover:bg-gray-50"
                            >
                                <ChevronLeft className="text-gray-600" />
                            </button>
                            <button
                                onClick={() => scrollCategories('right')}
                                className="p-2 rounded-full bg-white shadow-sm border border-gray-200 hover:bg-gray-50"
                            >
                                <ChevronRight className="text-gray-600" />
                            </button>
                        </div>
                    </div>
                    <div id="categories-container" className="overflow-x-auto scrollbar-hide">
                        <div className="flex space-x-4 pb-4 min-w-max">
                            {popularCategories.map((category) => (
                                <div
                                    key={category.id}
                                    onClick={() => selectCategory(category.id)}
                                    className="flex-shrink-0 bg-white p-4 rounded-lg shadow-sm border border-gray-200 hover:shadow-md hover:border-primary-300 transition-all cursor-pointer category-card w-32"
                                >
                                    <div className={`w-12 h-12 ${category.color} rounded-lg flex items-center justify-center mb-3`}>
                                        <span className={`${category.textColor} text-xl`}>{category.icon}</span>
                                    </div>
                                    <h4 className="font-medium text-gray-800 text-sm">{category.name}</h4>
                                    <p className="text-xs text-gray-500 mt-1">{category.description}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div> */}

                {/* Progress Bar (initially hidden) */}
                {searchProgress && (
                    <div id="search-progress" className="px-3 mt-8">
                        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                            <div className="flex items-center justify-between mb-4">
                                <h3 className="text-lg font-semibold text-gray-800">Searching for Businesses...</h3>
                                <div className="text-sm text-gray-500">
                                    <span id="progress-percentage">{progress}%</span> Complete
                                </div>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-2 mb-4">
                                <div
                                    id="progress-bar"
                                    className="bg-primary-600 h-2 rounded-full transition-all duration-300"
                                    style={{ width: `${progress}%` }}
                                ></div>
                            </div>
                            <div className="text-sm text-gray-600">
                                <div id="progress-status">
                                    {progress < 30 ? 'Initializing search...' :
                                        progress < 60 ? 'Scraping business data...' :
                                            progress < 90 ? 'Compiling results...' :
                                                'Finalizing search...'}
                                </div>
                                <div className="mt-2 flex items-center space-x-4">
                                    <span id="found-count">{Math.floor(progress * 12.47)} businesses found</span>
                                    <span id="search-location">Searching in: San Francisco, CA</span>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* Search Results */}
                <div id="search-results" className="px-3 mt-5">
                    <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
                        <div className="bg-gray-50 px-2 md:px-6 py-4 border-b border-gray-200 lg:flex justify-between items-center">
                            <div className="flex justify-between items-center">
                                <h3 className="text-md md:text-lg md:font-semibold font-medium text-gray-800">Search Results</h3>
                                <span className="ml-3 px-2 md:px-3 py-1 bg-primary-100 text-primary-800 text-sm rounded-full">1,247 businesses found</span>
                            </div>

                            <div className="md:flex justify-between items-center space-x-3 mt-3 lg:mt-0">
                                <div className='flex justify-between mt-3 md:mt-0'>
                                    <button
                                        onClick={() => setShowMoreFiltersModal(true)}
                                        className="flex items-center px-3 py-1.5 text-sm text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded"
                                    >
                                        <FilterList className="mr-1.5" />
                                        Filter
                                    </button>
                                    <button
                                        onClick={() => console.log('Sort')}
                                        className="flex items-center px-3 py-1.5 text-sm text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded"
                                    >
                                        <Sort className="mr-1.5" />
                                        Sort
                                    </button>
                                </div>
                                <div className='flex justify-between mt-3 md:mt-0'>
                                    <button
                                        onClick={() => setShowExportModal(true)}
                                        className="flex items-center px-3 py-1.5 text-sm rounded transition-colors duration-200"
                                        style={{ color: themeColor }}
                                        onMouseEnter={(e) => (e.currentTarget.style.color = secondaryThemeColor)}
                                        onMouseLeave={(e) => (e.currentTarget.style.color = themeColor)}
                                    >
                                        <FileDownload className="mr-1.5" />
                                        Export All
                                    </button>

                                    <button
                                        onClick={() => console.log("Save All")}
                                        className="flex items-center px-3 py-1.5 text-sm text-white rounded transition-colors duration-200"
                                        style={{ backgroundColor: themeColor }}
                                        onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = secondaryThemeColor)}
                                        onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = themeColor)}
                                    >
                                        <Save className="mr-1.5" />
                                        Save All
                                    </button>
                                </div>
                            </div>
                        </div>

                        <div className="divide-y divide-gray-200">
                            {searchResults.map((business) => (
                                <div key={business.id} className="p-3 hover:bg-gray-50 transition-colors">
                                    <div className="flex flex-col lg:flex-row lg:items-start gap-4">
                                        <div className="flex-shrink-0">
                                            <div style={{ backgroundColor: themeColor }} className="w-16 h-16 bg-gradient-to-br rounded-lg flex items-center justify-center">
                                                <Restaurant className="text-white text-2xl" />
                                            </div>
                                        </div>
                                        <div className="flex-grow">
                                            <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between">
                                                <div className="flex-grow">
                                                    <h4 className="text-lg font-semibold text-gray-900">{business.name}</h4>
                                                    <p className="text-gray-600 mt-1">{business.address}</p>
                                                    <div className="flex items-center mt-2 space-x-4">
                                                        <div className="flex items-center">
                                                            <div className="flex text-yellow-400">
                                                                {renderStars(business.rating)}
                                                            </div>
                                                            <span className="ml-1 text-sm text-gray-600">{business.rating} ({business.reviews} reviews)</span>
                                                        </div>
                                                        <span className="text-sm text-gray-500">{business.category}</span>
                                                    </div>
                                                </div>
                                                <div className="mt-4 lg:mt-0 lg:ml-6">
                                                    <div className="flex items-center space-x-2 mb-2">
                                                        <i className="fa-solid fa-map-location-dot text-red-600"></i>
                                                        <span className="text-sm text-gray-600">{business.source}</span>
                                                    </div>
                                                    <div className="text-sm text-gray-700 space-y-1">
                                                        <div className="flex items-center">
                                                            <Phone className="w-4 text-gray-400 mr-2" />
                                                            <span>{business.phone}</span>
                                                        </div>
                                                        <div className="flex items-center">
                                                            <Email className="w-4 text-gray-400 mr-2" />
                                                            <span>{business.email}</span>
                                                        </div>
                                                        <div className="flex items-center">
                                                            <Language className="w-4 text-gray-400 mr-2" />
                                                            <span>{business.website}</span>
                                                        </div>
                                                    </div>
                                                    <div className="mt-4 flex items-center space-x-2">
                                                        <button
                                                            onClick={() => saveLead(business.id)}
                                                            className="px-3 py-1.5 text-white rounded hover:bg-primary-700 flex items-center text-sm"
                                                            style={{ backgroundColor: themeColor }}
                                                            onMouseEnter={(e) => {
                                                                e.target.style.backgroundColor = secondaryThemeColor; 
                                                            }}
                                                            onMouseLeave={(e) => {
                                                                e.target.style.backgroundColor = themeColor;
                                                            }}
                                                        >
                                                            <Add className="mr-1.5" />
                                                            Save
                                                        </button>
                                                        <button
                                                            onClick={() => viewLead(business.id)}
                                                            className="px-3 py-1.5 border border-gray-300 text-gray-700 rounded hover:bg-gray-50 flex items-center text-sm"
                                                        >
                                                            <Visibility className="mr-1.5" />
                                                            View
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* Profile Finder Modal */}
            {showProfileFinderModal && (
                <div id="profile-finder-modal" className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white rounded-lg shadow-xl w-full max-w-4xl mx-4 md:mx-auto">
                        <div className="flex justify-between items-center border-b border-gray-200 px-6 py-4">
                            <h3 className="text-xl font-bold text-gray-900">Business Profile Finder</h3>
                            <button
                                onClick={() => setShowProfileFinderModal(false)}
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
                                                className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
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
                                                className="pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
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
                                    {modalSearchResults.map((business) => (
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
                                                    <Language className="text-gray-500 mr-2" />
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
                                onClick={() => setShowProfileFinderModal(false)}
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

            {/* New Lead Search Modal */}
            {showNewLeadModal && (
                <div id="new-lead-modal" className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl mx-4">
                        <div className="flex justify-between items-center border-b border-gray-200 px-6 py-4">
                            <h3 className="text-xl font-bold text-gray-900">New Lead Search</h3>
                            <button
                                onClick={() => setShowNewLeadModal(false)}
                                className="text-gray-400 hover:text-gray-500"
                            >
                                <Close />
                            </button>
                        </div>
                        <form onSubmit={submitNewLead} className="p-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Search Query</label>
                                    <input
                                        type="text"
                                        placeholder="e.g., restaurants in NYC"
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
                                    <input
                                        type="text"
                                        placeholder="City, State"
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                                    />
                                </div>
                            </div>
                            <div className="mb-4">
                                <label className="block text-sm font-medium text-gray-700 mb-1">Search Sources</label>
                                <div className="flex flex-wrap gap-3">
                                    <label className="flex items-center">
                                        <input type="checkbox" defaultChecked className="mr-2" />
                                        <span className="text-sm">Google Maps</span>
                                    </label>
                                    <label className="flex items-center">
                                        <input type="checkbox" defaultChecked className="mr-2" />
                                        <span className="text-sm">Google Search</span>
                                    </label>
                                    <label className="flex items-center">
                                        <input type="checkbox" className="mr-2" />
                                        <span className="text-sm">LinkedIn</span>
                                    </label>
                                    <label className="flex items-center">
                                        <input type="checkbox" className="mr-2" />
                                        <span className="text-sm">Facebook</span>
                                    </label>
                                </div>
                            </div>
                            <div className="flex justify-end space-x-3">
                                <button
                                    type="button"
                                    onClick={() => setShowNewLeadModal(false)}
                                    className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
                                >
                                    Cancel
                                </button>
                                <button type="submit" className="px-4 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700">
                                    Start Search
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* View Lead Modal */}
            {showViewLeadModal && (
                <div id="view-lead-modal" className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white rounded-lg shadow-xl w-full max-w-3xl mx-4">
                        <div className="flex justify-between items-center border-b border-gray-200 px-6 py-4">
                            <h3 className="text-xl font-bold text-gray-900">Lead Details</h3>
                            <button
                                onClick={() => setShowViewLeadModal(false)}
                                className="text-gray-400 hover:text-gray-500"
                            >
                                <Close />
                            </button>
                        </div>
                        <div className="p-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <h4 className="font-medium text-gray-800 mb-3">Business Information</h4>
                                    <div className="space-y-2">
                                        <div><strong>Name:</strong> Riverside Coffee House</div>
                                        <div><strong>Address:</strong> 123 Main St, New York, NY</div>
                                        <div><strong>Category:</strong> Restaurant/Cafe</div>
                                        <div><strong>Rating:</strong> ⭐ 4.7 (142 reviews)</div>
                                    </div>
                                </div>
                                <div>
                                    <h4 className="font-medium text-gray-800 mb-3">Contact Information</h4>
                                    <div className="space-y-2">
                                        <div><strong>Phone:</strong> (212) 555-1234</div>
                                        <div><strong>Email:</strong> info@riverside.com</div>
                                        <div><strong>Website:</strong> www.riverside.com</div>
                                        <div><strong>Source:</strong> Google Maps</div>
                                    </div>
                                </div>
                            </div>
                            <div className="mt-6 flex justify-end space-x-3">
                                <button
                                    onClick={() => setShowViewLeadModal(false)}
                                    className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
                                >
                                    Close
                                </button>
                                <button
                                    onClick={() => editLead(1)}
                                    className="px-4 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700"
                                >
                                    Edit Lead
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Edit Lead Modal */}
            {showEditLeadModal && (
                <div id="edit-lead-modal" className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl mx-4">
                        <div className="flex justify-between items-center border-b border-gray-200 px-6 py-4">
                            <h3 className="text-xl font-bold text-gray-900">Edit Lead</h3>
                            <button
                                onClick={() => setShowEditLeadModal(false)}
                                className="text-gray-400 hover:text-gray-500"
                            >
                                <Close />
                            </button>
                        </div>
                        <form onSubmit={submitEditLead} className="p-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Business Name</label>
                                    <input
                                        type="text"
                                        defaultValue="Riverside Coffee House"
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                                    <input
                                        type="text"
                                        defaultValue="Restaurant/Cafe"
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                                    />
                                </div>
                            </div>
                            <div className="mb-4">
                                <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
                                <input
                                    type="text"
                                    defaultValue="123 Main St, New York, NY"
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                                <input
                                    type="text"
                                    defaultValue="(212) 555-1234"
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                                <input
                                    type="text"
                                    defaultValue="info@riverside.com"
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-sm font-medium text-gray-700 mb-1">Website</label>
                                <input
                                    type="text"
                                    defaultValue="www.riverside.com"
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                                <select className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500">
                                    <option>Verified</option>
                                    <option>Pending</option>
                                    <option>Completed</option>
                                    <option>Paused</option>
                                    <option>Draft</option>
                                </select>
                            </div>
                            <div className="flex justify-end space-x-3">
                                <button
                                    type="button"
                                    onClick={() => setShowEditLeadModal(false)}
                                    className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
                                >
                                    Cancel
                                </button>
                                <button type="submit" className="px-4 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700">
                                    Save Changes
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* Export Modal */}
            {showExportModal && (
                <div id="export-modal" className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white rounded-lg shadow-xl w-full max-w-md mx-4">
                        <div className="flex justify-between items-center border-b border-gray-200 px-6 py-4">
                            <h3 className="text-xl font-bold text-gray-900">Export Leads</h3>
                            <button
                                onClick={() => setShowExportModal(false)}
                                className="text-gray-400 hover:text-gray-500"
                            >
                                <Close />
                            </button>
                        </div>
                        <form onSubmit={submitExport} className="p-6">
                            <div className="mb-4">
                                <label className="block text-sm font-medium text-gray-700 mb-1">Export Format</label>
                                <select className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500">
                                    <option>CSV</option>
                                    <option>Excel</option>
                                    <option>PDF</option>
                                </select>
                            </div>
                            <div className="mb-4">
                                <label className="block text-sm font-medium text-gray-700 mb-1">Include Fields</label>
                                <div className="space-y-2">
                                    <label className="flex items-center">
                                        <CheckBox defaultChecked className="mr-2 text-primary-600" />
                                        <span className="text-sm">Business Name</span>
                                    </label>
                                    <label className="flex items-center">
                                        <CheckBox defaultChecked className="mr-2 text-primary-600" />
                                        <span className="text-sm">Contact Info</span>
                                    </label>
                                    <label className="flex items-center">
                                        <CheckBoxOutlineBlank className="mr-2 text-gray-400" />
                                        <span className="text-sm">Address</span>
                                    </label>
                                    <label className="flex items-center">
                                        <CheckBoxOutlineBlank className="mr-2 text-gray-400" />
                                        <span className="text-sm">Source</span>
                                    </label>
                                </div>
                            </div>
                            <div className="flex justify-end space-x-3">
                                <button
                                    type="button"
                                    onClick={() => setShowExportModal(false)}
                                    className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
                                >
                                    Cancel
                                </button>
                                <button type="submit" className="px-4 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700">
                                    Export
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* More Filters Modal */}
            {showMoreFiltersModal && (
                <div id="more-filters-modal" className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl mx-4">
                        <div className="flex justify-between items-center border-b border-gray-200 px-6 py-4">
                            <h3 className="text-xl font-bold text-gray-900">Advanced Filters</h3>
                            <button
                                onClick={() => setShowMoreFiltersModal(false)}
                                className="text-gray-400 hover:text-gray-500"
                            >
                                <Close />
                            </button>
                        </div>
                        <form onSubmit={applyFilters} className="p-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Business Category</label>
                                    <select className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500">
                                        <option>All Categories</option>
                                        <option>Restaurant</option>
                                        <option>Retail</option>
                                        <option>Services</option>
                                        <option>Healthcare</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Rating</label>
                                    <select className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500">
                                        <option>Any Rating</option>
                                        <option>4+ Stars</option>
                                        <option>3+ Stars</option>
                                        <option>2+ Stars</option>
                                    </select>
                                </div>
                            </div>
                            <div className="mb-4">
                                <label className="block text-sm font-medium text-gray-700 mb-1">Has Contact Info</label>
                                <div className="flex flex-wrap gap-3">
                                    <label className="flex items-center">
                                        <CheckBoxOutlineBlank className="mr-2 text-gray-400" />
                                        <span className="text-sm">Has Phone</span>
                                    </label>
                                    <label className="flex items-center">
                                        <CheckBoxOutlineBlank className="mr-2 text-gray-400" />
                                        <span className="text-sm">Has Email</span>
                                    </label>
                                    <label className="flex items-center">
                                        <CheckBoxOutlineBlank className="mr-2 text-gray-400" />
                                        <span className="text-sm">Has Website</span>
                                    </label>
                                </div>
                            </div>
                            <div className="flex justify-end space-x-3">
                                <button
                                    type="button"
                                    onClick={() => setShowMoreFiltersModal(false)}
                                    className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
                                >
                                    Cancel
                                </button>
                                <button type="submit" className="px-4 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700">
                                    Apply Filters
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default LeadGeneration;