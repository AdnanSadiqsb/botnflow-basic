import React, { useState, useRef, useEffect } from 'react';
import {
    Add as AddIcon,
    Notifications as NotificationsIcon,
    HelpOutline as HelpOutlineIcon,
    Search as SearchIcon,
    KeyboardArrowDown as KeyboardArrowDownIcon,
    Apps as AppsIcon,
    ViewList as ViewListIcon,
    OpenInNew as OpenInNewIcon,
    MoreVert as MoreVertIcon,
    Headset as HeadsetIcon,
    ShoppingCart as ShoppingCartIcon,
    HelpOutline as QuestionIcon,
    Phone as PhoneIcon,
    CalendarToday as CalendarIcon,
    Equalizer as EqualizerIcon,
    Favorite as FavoriteIcon,
    School as SchoolIcon,
    Close as CloseIcon,
    Edit as EditIcon,
    FileCopy as FileCopyIcon,
    Sync as SyncIcon,
    CloudDownload as CloudDownloadIcon,
    Delete as DeleteIcon,
    Warning as WarningIcon,
    Lock as LockIcon
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { ContentContext } from '../../context/ContextProvider';

const AiAgentList = () => {
    const { themeColor, secondaryThemeColor } = useContext(ContentContext)

    const [showCreateModal, setShowCreateModal] = useState(false);
    const [showContextMenu, setShowContextMenu] = useState(false);
    const [contextMenuPosition, setContextMenuPosition] = useState({ top: 0, left: 0 });
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [showKeyboardShortcuts, setShowKeyboardShortcuts] = useState(false);
    const [showPermissionsNote, setShowPermissionsNote] = useState(true);

    const contextMenuRef = useRef(null);
    const ellipsisRefs = useRef([]);
    const navigate = useNavigate()

    const agents = [
        {
            id: 1,
            name: "Support Assistant",
            language: "English",
            icon: <HeadsetIcon className="text-green-600" />,
            status: "Ready",
            statusColor: "bg-green-100 text-green-800",
            description: "Customer support agent trained to handle technical issues and product inquiries.",
            intents: 42,
            entities: 18,
            phrases: 320,
            lastUpdated: "2 days ago",
            lastTrained: "Today"
        },
        {
            id: 2,
            name: "Sales Bot",
            language: "English",
            icon: <ShoppingCartIcon className="text-blue-600" />,
            status: "Training",
            statusColor: "bg-blue-100 text-blue-800",
            description: "Assists customers with product recommendations and purchase decisions.",
            intents: 28,
            entities: 12,
            phrases: 186,
            lastUpdated: "4 hours ago",
            lastTrained: "38%"
        },
        {
            id: 3,
            name: "FAQ Assistant",
            language: "Arabic",
            icon: <QuestionIcon className="text-purple-600" />,
            status: "Ready",
            statusColor: "bg-green-100 text-green-800",
            description: "Answers frequently asked questions about products, services, and policies.",
            intents: 35,
            entities: 8,
            phrases: 210,
            lastUpdated: "1 week ago",
            lastTrained: "2 days ago"
        },
        {
            id: 4,
            name: "Voice Assistant",
            language: "English",
            icon: <PhoneIcon className="text-yellow-600" />,
            status: "Ready",
            statusColor: "bg-green-100 text-green-800",
            description: "Handles voice interactions for customer support and appointment scheduling.",
            intents: 38,
            entities: 14,
            phrases: 256,
            lastUpdated: "3 days ago",
            lastTrained: "Yesterday"
        },
        {
            id: 5,
            name: "Booking Agent",
            language: "Urdu",
            icon: <CalendarIcon className="text-red-600" />,
            status: "Archived",
            statusColor: "bg-gray-100 text-gray-800",
            description: "Manages appointment scheduling and calendar management for services.",
            intents: 24,
            entities: 10,
            phrases: 142,
            lastUpdated: "2 months ago",
            lastTrained: "2 months ago"
        },
        {
            id: 6,
            name: "Analytics Assistant",
            language: "English",
            icon: <EqualizerIcon className="text-indigo-600" />,
            status: "Training",
            statusColor: "bg-blue-100 text-blue-800",
            description: "Helps users interpret data and generate reports from analytics platforms.",
            intents: 32,
            entities: 16,
            phrases: 178,
            lastUpdated: "12 hours ago",
            lastTrained: "72%"
        },
        {
            id: 7,
            name: "Healthcare Bot",
            language: "English",
            icon: <FavoriteIcon className="text-pink-600" />,
            status: "Ready",
            statusColor: "bg-green-100 text-green-800",
            description: "Provides health information and symptom checking for patients.",
            intents: 48,
            entities: 22,
            phrases: 394,
            lastUpdated: "5 days ago",
            lastTrained: "3 days ago"
        },
        {
            id: 8,
            name: "Educational Tutor",
            language: "English",
            icon: <SchoolIcon className="text-teal-600" />,
            status: "Ready",
            statusColor: "bg-green-100 text-green-800",
            description: "Assists students with learning materials and answers educational questions.",
            intents: 52,
            entities: 18,
            phrases: 420,
            lastUpdated: "1 day ago",
            lastTrained: "1 day ago"
        }
    ];

    const handleEllipsisClick = (e, index) => {
        e.preventDefault();
        e.stopPropagation();

        const rect = ellipsisRefs.current[index].getBoundingClientRect();
        setContextMenuPosition({
            top: rect.bottom + window.scrollY,
            left: rect.left + window.scrollX - 120
        });

        setShowContextMenu(true);
    };

    const handleClickOutside = (e) => {
        if (contextMenuRef.current && !contextMenuRef.current.contains(e.target)) {
            setShowContextMenu(false);
        }
    };

    const handleNavigate = () => {
        navigate('/ai-agent')
    }

    useEffect(() => {
        document.addEventListener('click', handleClickOutside);
        return () => {
            document.removeEventListener('click', handleClickOutside);
        };
    }, []);

    useEffect(() => {
        const handleKeyDown = (e) => {
            // Command/Ctrl + K for search
            if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
                e.preventDefault();
                document.querySelector('input[type="text"]').focus();
            }

            // Command/Ctrl + N for new agent
            if ((e.metaKey || e.ctrlKey) && e.key === 'n') {
                e.preventDefault();
                setShowCreateModal(true);
            }
        };

        document.addEventListener('keydown', handleKeyDown);
        return () => {
            document.removeEventListener('keydown', handleKeyDown);
        };
    }, []);

    return (
        <div className="bg-gray-50 mt-16 font-sans">

            {/* Main Content */}
            <div className="container mx-auto p-3">
                <div className="flex justify-between items-center mb-3">
                    <div className="flex items-center">
                        <h1 className="text-xl font-semibold text-gray-800">AI Agents</h1>
                    </div>
                    <div className="flex items-center space-x-4">
                        <button
                            id="create-agent-btn"
                            className="bg-primary-600 hover:bg-primary-700 text-white px-4 py-2 rounded-md flex items-center text-sm font-medium transition-colors"
                            // onClick={() => setShowCreateModal(true)}
                            onClick={handleNavigate}
                        >
                            <AddIcon className="mr-2" style={{ fontSize: '1rem' }} />
                            Create New Agent
                        </button>
                    </div>
                </div>
                {/* Search & Filters */}
                <div className="mb-6">
                    <div className="lg:flex justify-between items-center gap-4">
                        <div className="relative flex-grow">
                            <SearchIcon className="absolute left-3 top-3 text-gray-400" />
                            <input
                                type="text"
                                placeholder="Search agents by name or keyword"
                                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all"
                            />
                        </div>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-x-3">
                            <select
                                className='bg-white border border-gray-300 rounded-lg px-4 h-10 pr-8 focus:ring-2 focus:ring-primary-500 focus:border-primary-500 text-sm'
                            >
                                <option value="">Language: All</option>
                                <option value="en">English</option>
                                <option value="ur">Urdu</option>
                                <option value="ar">Arabic</option>
                            </select>
                            <select className="bg-white border border-gray-300 rounded-lg px-4 h-10 pr-8 focus:ring-2 focus:ring-primary-500 focus:border-primary-500 text-sm">
                                <option value="">Status: All</option>
                                <option value="ready">Ready</option>
                                <option value="training">Training</option>
                                <option value="archived">Archived</option>
                            </select>
                            <select className="bg-white border border-gray-300 rounded-lg px-4 h-10 pr-8 focus:ring-2 focus:ring-primary-500 focus:border-primary-500 text-sm">
                                <option value="">Domain: All</option>
                                <option value="support">Support</option>
                                <option value="sales">Sales</option>
                                <option value="faq">FAQ Bot</option>
                            </select>
                            <select className="bg-white border border-gray-300 rounded-lg px-4 h-10 pr-8 focus:ring-2 focus:ring-primary-500 focus:border-primary-500 text-sm">
                                <option value="">Created By: All</option>
                                <option value="me">Me</option>
                                <option value="team">Team</option>
                            </select>
                        </div>
                    </div>
                </div>

                {/* View Toggle */}
                <div className="flex justify-between items-center mb-4">
                    <div className="text-sm text-gray-500">
                        Showing <span className="font-medium">8</span> agents
                    </div>
                    <div className="flex items-center">
                        <span className="text-sm text-gray-600">View:</span>
                        <button className="bg-primary-100 text-primary-600 p-1.5 rounded">
                            <AppsIcon style={{ fontSize: '1.5rem' }} />
                        </button>
                        <button className="text-gray-400 hover:text-gray-600  rounded">
                            <ViewListIcon style={{ fontSize: '1.5rem' }} />
                        </button>
                    </div>
                </div>

                {/* Agent Grid */}
                <div className="grid grid-cols-1 mb-3 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
                    {agents.map((agent, index) => (
                        <div key={agent.id} className="bg-white rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition-shadow overflow-hidden">
                            <div className="p-5">
                                <div className="flex justify-between items-start mb-3">
                                    <div className="flex items-center">
                                        <div className={`w-10 h-10 rounded-full ${agent.icon.props.className.includes('text-green-600') ? 'bg-green-100' :
                                            agent.icon.props.className.includes('text-blue-600') ? 'bg-blue-100' :
                                                agent.icon.props.className.includes('text-purple-600') ? 'bg-purple-100' :
                                                    agent.icon.props.className.includes('text-yellow-600') ? 'bg-yellow-100' :
                                                        agent.icon.props.className.includes('text-red-600') ? 'bg-red-100' :
                                                            agent.icon.props.className.includes('text-indigo-600') ? 'bg-indigo-100' :
                                                                agent.icon.props.className.includes('text-pink-600') ? 'bg-pink-100' :
                                                                    'bg-teal-100'} flex items-center justify-center mr-3`}>
                                            {agent.icon}
                                        </div>
                                        <div>
                                            <h3 className="font-semibold text-gray-800">{agent.name}</h3>
                                            <span className="text-xs text-gray-500">{agent.language}</span>
                                        </div>
                                    </div>
                                    <span className={`px-2 py-1 ${agent.statusColor} text-xs rounded-full font-medium`}>
                                        {agent.status}
                                    </span>
                                </div>
                                <p className="text-sm text-gray-600 mb-4 line-clamp-2">{agent.description}</p>

                                <div className="flex flex-wrap gap-2 mb-4">
                                    <div className="flex items-center text-xs text-gray-500">
                                        <span className="mr-1">🧠</span>
                                        <span>{agent.intents} Intents</span>
                                    </div>
                                    <div className="flex items-center text-xs text-gray-500">
                                        <span className="mr-1">🏷️</span>
                                        <span>{agent.entities} Entities</span>
                                    </div>
                                    <div className="flex items-center text-xs text-gray-500">
                                        <span className="mr-1">💬</span>
                                        <span>{agent.phrases} Phrases</span>
                                    </div>
                                </div>

                                <div className="flex justify-between items-center text-xs text-gray-500">
                                    <span>Last updated: {agent.lastUpdated}</span>
                                    <span>{agent.status === "Training" ? `Training: ${agent.lastTrained}` : `Last trained: ${agent.lastTrained}`}</span>
                                </div>
                            </div>
                            <div className="border-t border-gray-200 px-5 py-3 bg-gray-50 flex justify-between">
                                <button className=" font-medium text-sm flex items-center" onClick={handleNavigate}
                                    style={{ color: themeColor }}
                                    onMouseEnter={(e) => {
                                        e.currentTarget.style.color = secondaryThemeColor;
                                    }}
                                    onMouseLeave={(e) => {
                                        e.currentTarget.style.color = themeColor;
                                    }}>
                                    <OpenInNewIcon className="mr-1.5" style={{ fontSize: '1rem' }} />
                                    Open
                                </button>
                                <div className="relative">
                                    <button
                                        className="text-gray-500 hover:text-gray-700"
                                        onClick={(e) => handleEllipsisClick(e, index)}
                                        ref={el => ellipsisRefs.current[index] = el}
                                    >
                                        <MoreVertIcon style={{ fontSize: '1rem' }} />
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Create Agent Modal */}
            {showCreateModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white rounded-lg shadow-xl max-w-md w-full">
                        <div className="p-6">
                            <div className="flex justify-between items-center mb-4">
                                <h3 className="text-xl font-semibold text-gray-800">Create New Agent</h3>
                                <button
                                    className="text-gray-400"
                                    onClick={() => setShowCreateModal(false)}
                                    style={{ backgroundColor: themeColor }}
                                    onMouseEnter={(e) => {
                                        e.currentTarget.style.backgroundColor = secondaryThemeColor;
                                    }}
                                    onMouseLeave={(e) => {
                                        e.currentTarget.style.backgroundColor = themeColor;
                                    }}
                                >
                                    <CloseIcon />
                                </button>
                            </div>

                            <div className="mb-4">
                                <label className="block text-sm font-medium text-gray-700 mb-1">Agent Name*</label>
                                <input
                                    type="text"
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                                    placeholder="Enter agent name"
                                />
                            </div>

                            <div className="mb-4">
                                <label className="block text-sm font-medium text-gray-700 mb-1">Description (optional)</label>
                                <textarea
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                                    rows="3"
                                    placeholder="Describe what this agent will do"
                                />
                            </div>

                            <div className="mb-4">
                                <label className="block text-sm font-medium text-gray-700 mb-1">Language (optional)</label>
                                <select className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary-500 focus:border-primary-500">
                                    <option value="en">English</option>
                                    <option value="ur">Urdu</option>
                                    <option value="ar">Arabic</option>
                                    <option value="fr">French</option>
                                    <option value="es">Spanish</option>
                                </select>
                            </div>

                            <div className="mb-6">
                                <label className="block text-sm font-medium text-gray-700 mb-1">Domain or Use Case (optional)</label>
                                <select className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary-500 focus:border-primary-500">
                                    <option value="">Select domain</option>
                                    <option value="support">Customer Support</option>
                                    <option value="sales">Sales</option>
                                    <option value="faq">FAQ Bot</option>
                                    <option value="healthcare">Healthcare</option>
                                    <option value="education">Education</option>
                                    <option value="custom">Custom</option>
                                </select>
                            </div>

                            <div className="flex justify-end space-x-3">
                                <button
                                    className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
                                    onClick={() => setShowCreateModal(false)}
                                >
                                    Cancel
                                </button>
                                <button className="px-4 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700">
                                    Create Agent
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Context Menu for Agent Actions */}
            {showContextMenu && (
                <div
                    ref={contextMenuRef}
                    // className="absolute bg-white shadow-lg rounded-md overflow-hidden border border-gray-200 z-20 w-48"
                    className='w-48 bg-white shadow-lg rounded-md absolute mt-[-13%] ml-[-5%]'
                    style={{ top: `${contextMenuPosition.top}px`, left: `${contextMenuPosition.left}px` }}
                >
                    <ul className="py-1">
                        <li>
                            <span className="px-4 py-2 hover:bg-gray-100 flex items-center text-sm text-gray-700 cursor-pointer">
                                <EditIcon className="mr-2" style={{ fontSize: '1rem' }} />
                                Rename
                            </span>
                        </li>
                        <li>
                            <span className="px-4 py-2 hover:bg-gray-100 flex items-center text-sm text-gray-700 cursor-pointer">
                                <FileCopyIcon className="mr-2" style={{ fontSize: '1rem' }} />
                                Duplicate Agent
                            </span>
                        </li>
                        <li>
                            <span className="px-4 py-2 hover:bg-gray-100 flex items-center text-sm text-gray-700 cursor-pointer">
                                <SyncIcon className="mr-2" style={{ fontSize: '1rem' }} />
                                Train Now
                            </span>
                        </li>
                        <li>
                            <span className="px-4 py-2 hover:bg-gray-100 flex items-center text-sm text-gray-700 cursor-pointer">
                                <CloudDownloadIcon className="mr-2" style={{ fontSize: '1rem' }} />
                                Export Agent
                            </span>
                        </li>
                        <li className="border-t border-gray-200">
                            <span
                                className="px-4 py-2 hover:bg-gray-100 flex items-center text-sm text-red-600 cursor-pointer"
                                onClick={() => {
                                    setShowContextMenu(false);
                                    setShowDeleteModal(true);
                                }}
                            >
                                <DeleteIcon className="mr-2" style={{ fontSize: '1rem' }} />
                                Delete
                            </span>
                        </li>
                    </ul>
                </div>
            )}

            {/* Delete Confirmation Modal */}
            {showDeleteModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white rounded-lg shadow-xl max-w-md w-full">
                        <div className="p-6">
                            <div className="flex items-start mb-4">
                                <div className="bg-red-100 p-2 rounded-full mr-4">
                                    <WarningIcon className="text-red-500" />
                                </div>
                                <div>
                                    <h3 className="text-lg font-medium">Delete AI Agent</h3>
                                    <p className="text-gray-600 mt-1">Are you sure you want to delete this agent? This action cannot be undone and all training data will be permanently lost.</p>
                                </div>
                            </div>

                            <div className="flex justify-end gap-3 mt-6">
                                <button
                                    className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
                                    onClick={() => setShowDeleteModal(false)}
                                >
                                    Cancel
                                </button>
                                <button
                                    className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
                                    onClick={() => setShowDeleteModal(false)}
                                >
                                    Delete Agent
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Keyboard Shortcut Modal */}
            {showKeyboardShortcuts && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white rounded-lg shadow-xl max-w-md w-full">
                        <div className="p-6">
                            <div className="flex justify-between items-center mb-4">
                                <h3 className="text-xl font-semibold text-gray-800">Keyboard Shortcuts</h3>
                                <button
                                    className="text-gray-400 hover:text-gray-600"
                                    onClick={() => setShowKeyboardShortcuts(false)}
                                >
                                    <CloseIcon />
                                </button>
                            </div>

                            <div className="space-y-3">
                                <div className="flex justify-between items-center">
                                    <span className="text-gray-700">Search agents</span>
                                    <div className="flex items-center">
                                        <span className="bg-gray-100 text-gray-800 px-2 py-1 rounded text-xs font-mono">⌘</span>
                                        <span className="mx-1 text-gray-500">+</span>
                                        <span className="bg-gray-100 text-gray-800 px-2 py-1 rounded text-xs font-mono">K</span>
                                    </div>
                                </div>
                                <div className="flex justify-between items-center">
                                    <span className="text-gray-700">Create new agent</span>
                                    <div className="flex items-center">
                                        <span className="bg-gray-100 text-gray-800 px-2 py-1 rounded text-xs font-mono">⌘</span>
                                        <span className="mx-1 text-gray-500">+</span>
                                        <span className="bg-gray-100 text-gray-800 px-2 py-1 rounded text-xs font-mono">N</span>
                                    </div>
                                </div>
                                <div className="flex justify-between items-center">
                                    <span className="text-gray-700">Toggle view</span>
                                    <div className="flex items-center">
                                        <span className="bg-gray-100 text-gray-800 px-2 py-1 rounded text-xs font-mono">⌘</span>
                                        <span className="mx-1 text-gray-500">+</span>
                                        <span className="bg-gray-100 text-gray-800 px-2 py-1 rounded text-xs font-mono">V</span>
                                    </div>
                                </div>
                                <div className="flex justify-between items-center">
                                    <span className="text-gray-700">Refresh list</span>
                                    <div className="flex items-center">
                                        <span className="bg-gray-100 text-gray-800 px-2 py-1 rounded text-xs font-mono">⌘</span>
                                        <span className="mx-1 text-gray-500">+</span>
                                        <span className="bg-gray-100 text-gray-800 px-2 py-1 rounded text-xs font-mono">R</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Permissions Note */}
            {showPermissionsNote && (
                <div className="fixed bottom-0 right-0 m-6 max-w-xs bg-white rounded-lg shadow-lg border border-gray-200 p-4 z-10">
                    <div className="flex items-start">
                        <LockIcon className="text-gray-500 mt-1 mr-3" style={{ fontSize: '1rem' }} />
                        <div>
                            <h4 className="font-medium text-gray-800 mb-1">Permissions Note</h4>
                            <p className="text-sm text-gray-600">Some actions may be restricted based on your role. Contact your administrator for more access.</p>
                            <button
                                className="text-primary-600 text-sm mt-2"
                                onClick={() => setShowPermissionsNote(false)}
                            >
                                Dismiss
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AiAgentList;