import React, { useState, useEffect, useContext } from 'react';
import {
    Assessment,
    Phone,
    History,
    Voicemail,
    Settings,
    Logout,
    Person,
    PhoneDisabled,
    MicOff,
    Info,
    Timeline,
    Check,
    AccessTime
} from '@mui/icons-material';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { ContentContext } from '../../context/ContextProvider';

const AgentDashBoard = () => {
    const {themeColor, secondaryThemeColor} = useContext(ContentContext)
    const [status, setStatus] = useState('Available');
    const [callTime, setCallTime] = useState({ minutes: 2, seconds: 45 });
    const [queuedCall, setQueuedCall] = useState({ name: 'Mike Davis', number: '+1 (555) 987-6543', position: 2 });

    // Update call timer every second
    useEffect(() => {
        const timer = setInterval(() => {
            setCallTime(prev => {
                let seconds = prev.seconds + 1;
                let minutes = prev.minutes;

                if (seconds >= 60) {
                    minutes++;
                    seconds = 0;
                }

                return { minutes, seconds };
            });
        }, 1000);

        return () => clearInterval(timer);
    }, []);

    const handleStatusChange = (e) => {
        setStatus(e.target.value);
    };

    const formatTime = (minutes, seconds) => {
        return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    };

    return (
        <div className="flex mt-16 h-screen bg-gray-50 pb-3">
            {/* Main Content */}
            <main className="flex-1 overflow-auto">
                <header className="bg-white border-b border-gray-200 p-3">
                    <div className="md:flex items-center justify-between">
                        <div>
                            <h1 className="text-2xl font-bold text-gray-900">Agent Dashboard</h1>
                            <p className="text-gray-500">Welcome back, John! Here's your call center overview.</p>
                        </div>

                        <div className="flex items-center space-x-4">
                            <div className="relative">
                                <select
                                    value={status}
                                    onChange={handleStatusChange}
                                    className={`${status === 'Available' ? 'bg-green-400' : status === 'Busy' ? 'bg-yellow-400' : 'bg-gray-400'} text-white px-4 py-2 rounded-lg font-medium pr-8 cursor-pointer`}
                                >
                                    <option value="Available">Available</option>
                                    <option value="Busy">Busy</option>
                                    <option value="Offline">Offline</option>
                                </select>
                            </div>
                            <div className="flex items-center md:space-x-2">
                                <div className={`w-3 h-3 rounded-full animate-pulse ${status === 'Available' ? 'bg-success' : status === 'Busy' ? 'bg-warning' : 'bg-gray-400'}`}></div>
                                <span className="hidden md:inline text-sm font-medium text-gray-700">
                                    {status === 'Available' ? 'Online' : status === 'Busy' ? 'Busy' : 'Offline'}
                                </span>
                            </div>
                        </div>
                    </div>
                </header>

                <div className="p-3">
                    {/* Stats Overview */}
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm font-medium text-gray-500">Calls Today</p>
                                    <p className="text-3xl font-bold text-gray-900">24</p>
                                </div>
                                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                                    <Phone className="text-blue-600" />
                                </div>
                            </div>
                            <div className="mt-4 flex items-center">
                                <span className="text-success text-sm font-medium">+12%</span>
                                <span className="text-gray-500 text-sm ml-2">vs yesterday</span>
                            </div>
                        </div>

                        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm font-medium text-gray-500">Missed Calls</p>
                                    <p className="text-3xl font-bold text-gray-900">3</p>
                                </div>
                                <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
                                    <PhoneDisabled className="text-red-600" />
                                </div>
                            </div>
                            <div className="mt-4 flex items-center">
                                <span className="text-danger text-sm font-medium">-5%</span>
                                <span className="text-gray-500 text-sm ml-2">vs yesterday</span>
                            </div>
                        </div>

                        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm font-medium text-gray-500">Avg Call Time</p>
                                    <p className="text-3xl font-bold text-gray-900">4:32</p>
                                </div>
                                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                                    <AccessTime className="text-green-600" />
                                </div>
                            </div>
                            <div className="mt-4 flex items-center">
                                <span className="text-success text-sm font-medium">+8%</span>
                                <span className="text-gray-500 text-sm ml-2">vs yesterday</span>
                            </div>
                        </div>

                        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm font-medium text-gray-500">Voicemails</p>
                                    <p className="text-3xl font-bold text-gray-900">7</p>
                                </div>
                                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                                    <Voicemail className="text-purple-600" />
                                </div>
                            </div>
                            <div className="mt-4 flex items-center">
                                <span className="text-warning text-sm font-medium">+2</span>
                                <span className="text-gray-500 text-sm ml-2">new today</span>
                            </div>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                        {/* Active Calls Widget */}
                        <div className="lg:col-span-2 bg-white rounded-xl shadow-sm border border-gray-200">
                            <div className="p-3 md:p-6 border-b border-gray-200">
                                <div className="flex sm:flex gap-2 items-center justify-between">
                                    <h2 className="text-xl font-bold text-gray-900">Active Calls</h2>
                                    <button className="text-white md:px-4 px-1 py-2 rounded-lg font-medium transition-colors"
                                        style={{ backgroundColor: themeColor }}
                                        onMouseEnter={(e) => {
                                            e.currentTarget.style.backgroundColor = secondaryThemeColor;
                                        }}
                                        onMouseLeave={(e) => {
                                            e.currentTarget.style.backgroundColor = themeColor;
                                        }}>
                                        <Phone className="mr-2" /> Start Dialer
                                    </button>
                                </div>
                            </div>

                            <div className="p-6">
                                <div className="space-y-4">
                                    <div className="md:flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                                        <div className="flex items-center space-x-4">
                                            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                                                <Person className="text-blue-600" />
                                            </div>
                                            <div>
                                                <p className="font-medium text-gray-900">Sarah Johnson</p>
                                                <p className="text-sm text-gray-500">+1 (555) 123-4567</p>
                                            </div>
                                        </div>
                                        <div className="flex items-center ml-3 md:ml-0 space-x-4 mt-3 md:mt-0">
                                            <div className="text-start md:text-right">
                                                <p className="text-sm font-medium text-gray-900">
                                                    {formatTime(callTime.minutes, callTime.seconds)}
                                                </p>
                                                <p className="text-xs text-gray-500">In Progress</p>
                                            </div>
                                            <div className="flex space-x-2">
                                                <button className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center hover:bg-red-200">
                                                    <PhoneDisabled className="text-red-600 text-sm" />
                                                </button>
                                                <button className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center hover:bg-gray-200">
                                                    <MicOff className="text-gray-600 text-sm" />
                                                </button>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="md:flex items-center justify-between p-4 bg-yellow-50 rounded-lg">
                                        <div className="flex items-center space-x-4">
                                            <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center">
                                                <Person className="text-yellow-600" />
                                            </div>
                                            <div>
                                                <p className="font-medium text-gray-900">{queuedCall.name}</p>
                                                <p className="text-sm text-gray-500">{queuedCall.number}</p>
                                            </div>
                                        </div>
                                        <div className="flex items-center space-x-4 mt-3 md:mt-0">
                                            <div className="text-start ml-3 md:ml-0 md:text-right">
                                                <p className="text-sm font-medium text-gray-900">Waiting</p>
                                                <p className="text-xs text-gray-500">Queue #{queuedCall.position}</p>
                                            </div>
                                            <button className="bg-success text-white px-3 py-1 rounded-lg text-sm font-medium hover:bg-green-700">
                                                Answer
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Right Sidebar */}
                        <div className="space-y-6">
                            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                                <h3 className="text-lg font-bold text-gray-900 mb-4">Quick Stats</h3>
                                <div className="space-y-4">
                                    <div className="flex items-center justify-between">
                                        <span className="text-gray-600">Active Calls</span>
                                        <span className="font-bold text-gray-900">1</span>
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <span className="text-gray-600">Queued Calls</span>
                                        <span className="font-bold text-warning">3</span>
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <span className="text-gray-600">Voicemails</span>
                                        <span className="font-bold text-purple-600">7</span>
                                    </div>
                                </div>
                            </div>

                            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                                <h3 className="text-lg font-bold text-gray-900 mb-4">Recent Notifications</h3>
                                <div className="space-y-3">
                                    <div className="flex items-start space-x-3 p-3 bg-red-50 rounded-lg">
                                        <PhoneDisabled className="text-red-500 mt-1" />
                                        <div>
                                            <p className="text-sm font-medium text-gray-900">Missed Call</p>
                                            <p className="text-xs text-gray-500">John Doe - 2 min ago</p>
                                        </div>
                                    </div>

                                    <div className="flex items-start space-x-3 p-3 bg-purple-50 rounded-lg">
                                        <Voicemail className="text-purple-500 mt-1" />
                                        <div>
                                            <p className="text-sm font-medium text-gray-900">New Voicemail</p>
                                            <p className="text-xs text-gray-500">Jane Smith - 5 min ago</p>
                                        </div>
                                    </div>

                                    <div className="flex items-start space-x-3 p-3 bg-blue-50 rounded-lg">
                                        <Info className="text-blue-500 mt-1" />
                                        <div>
                                            <p className="text-sm font-medium text-gray-900">System Update</p>
                                            <p className="text-xs text-gray-500">Call routing updated - 1h ago</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default AgentDashBoard;