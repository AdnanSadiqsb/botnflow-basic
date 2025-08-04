import React, { useState, useEffect, useContext } from 'react';
import {
  Dashboard as DashboardIcon,
  List as ListIcon,
  Phone as PhoneIcon,
  History as HistoryIcon,
  Voicemail as VoicemailIcon,
  Settings as SettingsIcon,
  People as PeopleIcon,
  AccessTime as AccessTimeIcon,
  Warning as WarningIcon,
  Person as PersonIcon,
  Sync as SyncIcon,
  PlayArrow as PlayArrowIcon,
  PhoneEnabled as PhoneEnabledIcon,
  Info as InfoIcon,
  CheckCircle as CheckCircleIcon
} from '@mui/icons-material';
import { ContentContext } from '../../context/ContextProvider';

const CallQueue = () => {
  const { themeColor, secondaryThemeColor } = useContext(ContentContext)

  const [callQueue, setCallQueue] = useState([
    {
      id: 1,
      position: 1,
      name: "Sarah Johnson",
      phone: "+1 (555) 123-4567",
      waitTime: "08:15",
      status: "Waiting",
      priority: "VIP",
      iconColor: "blue"
    },
    {
      id: 2,
      position: 2,
      name: "Michael Chen",
      phone: "+1 (555) 987-6543",
      waitTime: "05:42",
      status: "New",
      priority: "Repeat",
      iconColor: "green"
    },
    {
      id: 3,
      position: 3,
      name: "Unknown Caller",
      phone: "+1 (555) 246-8135",
      waitTime: "02:18",
      status: "New",
      priority: "Standard",
      iconColor: "gray"
    },
    {
      id: 4,
      position: 4,
      name: "David Wilson",
      phone: "+1 (555) 369-2580",
      waitTime: "12:05",
      status: "Missed",
      priority: "Escalated",
      iconColor: "red"
    }
  ]);

  const [lastUpdated, setLastUpdated] = useState("2 seconds ago");
  const [agentStatus, setAgentStatus] = useState("Available");

  // Update wait times every second
  useEffect(() => {
    const interval = setInterval(() => {
      setCallQueue(prevQueue =>
        prevQueue.map(caller => {
          const [minutes, seconds] = caller.waitTime.split(':').map(Number);
          let newSeconds = seconds + 1;
          let newMinutes = minutes;

          if (newSeconds >= 60) {
            newMinutes++;
            newSeconds = 0;
          }

          return {
            ...caller,
            waitTime: `${newMinutes.toString().padStart(2, '0')}:${newSeconds.toString().padStart(2, '0')}`
          };
        })
      );
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  // Simulate queue updates every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setLastUpdated("just now");
      setTimeout(() => setLastUpdated("2 seconds ago"), 2000);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const getStatusBadge = (status) => {
    switch (status) {
      case "Waiting":
        return "bg-yellow-100 text-yellow-800";
      case "New":
        return "bg-blue-100 text-blue-800";
      case "Missed":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getPriorityBadge = (priority) => {
    switch (priority) {
      case "VIP":
        return "bg-purple-100 text-purple-800";
      case "Repeat":
        return "bg-orange-100 text-orange-800";
      case "Escalated":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getIconColorClass = (color) => {
    switch (color) {
      case "blue":
        return "bg-blue-100 text-blue-600";
      case "green":
        return "bg-green-100 text-green-600";
      case "red":
        return "bg-red-100 text-red-600";
      default:
        return "bg-gray-100 text-gray-600";
    }
  };

  return (
    <div className="flex mt-16 h-screen bg-gray-50">

      {/* Main Content */}
      <main className="flex-1 overflow-auto">
        <header className="bg-white border-b border-gray-200 p-3">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Call Queue</h1>
              <p className="text-gray-600">Monitor incoming calls and queue status</p>
            </div>

            {/* <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <div className={`w-3 h-3 rounded-full animate-pulse ${
                  agentStatus === "Available" ? "bg-green-500" : "bg-red-500"
                }`}></div>
                <span className="text-sm font-medium text-gray-700">{agentStatus}</span>
              </div>
              
              <div className="flex items-center space-x-2">
                <img 
                  src="https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-2.jpg" 
                  alt="Agent" 
                  className="w-8 h-8 rounded-full"
                />
                <span className="text-sm font-medium text-gray-700">John Smith</span>
              </div>
            </div> */}
          </div>
        </header>

        <div className="p-3">
          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Total in Queue</p>
                  <p className="text-3xl font-bold text-gray-900 mt-1">12</p>
                </div>
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                  <PeopleIcon className="text-blue-600 text-xl" />
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Avg Wait Time</p>
                  <p className="text-3xl font-bold text-gray-900 mt-1">2:34</p>
                </div>
                <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
                  <AccessTimeIcon className="text-yellow-600 text-xl" />
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Longest Wait</p>
                  <p className="text-3xl font-bold text-red-600 mt-1">8:15</p>
                </div>
                <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
                  <WarningIcon className="text-red-600 text-xl" />
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Available Agents</p>
                  <p className="text-3xl font-bold text-green-600 mt-1">5</p>
                </div>
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                  <CheckCircleIcon className="text-green-600 text-xl" />
                </div>
              </div>
            </div>
          </div>

          {/* Queue Controls */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
            <div className="md:flex items-center justify-between">
              <div className="md:flex items-center space-x-4">
                <button className="w-full md:w-70 flex px-4 py-2 text-white rounded-lg transition-colors"
                  style={{ backgroundColor: themeColor }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = secondaryThemeColor;
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = themeColor;
                  }}>
                  <PlayArrowIcon className="mr-2" />
                  Auto-Refresh
                </button>
                <select className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-blue-600">
                  <option>All Queues</option>
                  <option>Sales Queue</option>
                  <option>Support Queue</option>
                  <option>VIP Queue</option>
                </select>
              </div>

              <div className="flex items-center space-x-2 text-sm text-gray-600">
                <SyncIcon />
                <span>Last updated: {lastUpdated}</span>
              </div>
            </div>
          </div>

          {/* Queue Table */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900">Callers in Queue</h3>
            </div>

            <div className="overflow-x-auto w-[295px] md:w-[740px] lg:w-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Position</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Caller</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Phone Number</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Wait Time</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Priority</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {callQueue.map(caller => (
                    <tr key={caller.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{caller.position}</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className={`w-8 h-8 rounded-full flex items-center justify-center mr-3 ${getIconColorClass(caller.iconColor)}`}>
                            <PersonIcon className="text-sm" />
                          </div>
                          <span className="text-sm font-medium text-gray-900">{caller.name}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{caller.phone}</td>
                      <td className={`px-6 py-4 whitespace-nowrap text-sm font-medium ${parseInt(caller.waitTime.split(':')[0]) > 5 ? "text-red-600" :
                        parseInt(caller.waitTime.split(':')[0]) > 2 ? "text-orange-600" : "text-green-600"
                        }`}>
                        {caller.waitTime}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusBadge(caller.status)}`}>
                          {caller.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 py-1 text-xs font-medium rounded-full ${getPriorityBadge(caller.priority)}`}>
                          {caller.priority}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm">
                        <button className="text-blue-600 hover:text-blue-700 mr-3">
                          <PhoneEnabledIcon />
                        </button>
                        <button className="text-gray-400 hover:text-gray-600">
                          <InfoIcon />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default CallQueue;