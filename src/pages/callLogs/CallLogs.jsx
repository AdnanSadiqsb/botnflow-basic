import React, { useContext, useState } from 'react';
import {
  Dashboard,
  Phone,
  History,
  Voicemail,
  Settings,
  Download,
  Notifications,
  Search,
  PlayArrow,
  ExpandMore,
  HeadsetMic,
  CheckCircle,
  Warning,
  MailOutline,
  ChevronRight,
  Person,
  Schedule,
  LocationOn,
  ArrowDownward
} from '@mui/icons-material';
import { ContentContext } from '../../context/ContextProvider';

const CallLogs = () => {
  const { themeColor, secondaryThemeColor } = useContext(ContentContext)
  const [expandedRows, setExpandedRows] = useState([]);

  const toggleRow = (rowId) => {
    if (expandedRows.includes(rowId)) {
      setExpandedRows(expandedRows.filter(id => id !== rowId));
    } else {
      setExpandedRows([...expandedRows, rowId]);
    }
  };

  const callLogs = [
    {
      id: 'call-1',
      date: 'Jan 15, 2024',
      time: '2:30 PM',
      agent: {
        name: 'John Smith',
        id: 'A001',
        avatar: 'https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-2.jpg'
      },
      caller: {
        number: '+1 (555) 123-4567',
        name: 'Michael Johnson'
      },
      duration: '5m 32s',
      outcome: 'Completed',
      type: 'Inbound',
      queueTime: '1m 15s',
      holdTime: '0m 45s',
      customerId: 'CUS-001234',
      location: 'New York, NY',
      previousCalls: 3,
      notes: 'Customer inquiry about billing. Resolved payment issue and updated account.',
      tags: ['Billing'],
      recording: true
    },
    {
      id: 'call-2',
      date: 'Jan 15, 2024',
      time: '1:45 PM',
      agent: {
        name: 'Sarah Johnson',
        id: 'A002',
        avatar: 'https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-5.jpg'
      },
      caller: {
        number: '+1 (555) 987-6543',
        name: 'Emma Wilson'
      },
      duration: '3m 18s',
      outcome: 'Missed',
      type: 'Outbound',
      attempts: 2,
      reason: 'No Answer',
      customerId: 'CUS-001235',
      location: 'Los Angeles, CA',
      previousCalls: 1,
      notes: 'Follow-up call scheduled. Customer requested callback after 3 PM.',
      tags: ['Follow-up'],
      recording: false
    },
    {
      id: 'call-3',
      date: 'Jan 15, 2024',
      time: '12:20 PM',
      agent: {
        name: 'Mike Davis',
        id: 'A003',
        avatar: 'https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-3.jpg'
      },
      caller: {
        number: '+1 (555) 456-7890',
        name: 'Robert Brown'
      },
      duration: '8m 45s',
      outcome: 'Voicemail',
      type: 'Inbound',
      queueTime: '0m 30s',
      holdTime: '0m 00s',
      customerId: 'CUS-001236',
      location: 'Chicago, IL',
      previousCalls: 5,
      notes: 'Left detailed voicemail about service upgrade options.',
      tags: ['Sales'],
      recording: true
    }
  ];

  const getStatusBadge = (outcome) => {
    switch (outcome) {
      case 'Completed':
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
            <CheckCircle className="mr-1" fontSize="small" />
            {outcome}
          </span>
        );
      case 'Missed':
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
            <Warning className="mr-1" fontSize="small" />
            {outcome}
          </span>
        );
      case 'Voicemail':
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
            <MailOutline className="mr-1" fontSize="small" />
            {outcome}
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
            {outcome}
          </span>
        );
    }
  };

  return (
    <div className="bg-gray-50 mt-16 h-screen flex">

      {/* Main Content */}
      <div className="flex-1 overflow-hidden flex flex-col">
        {/* Header */}
        <header id="header" className="bg-white shadow-sm border-b border-gray-200">
          <div className="p-3">
            <div className="md:flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold text-gray-900">Call Logs & History</h2>
                <p className="text-sm text-gray-500">Track and manage all call activities</p>
              </div>
              <div className="flex items-center space-x-4 mt-3 md:mt-0">
                <button className="flex items-center space-x-2 px-4 py-2 text-white rounded-lg"
                  style={{ backgroundColor: themeColor }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = secondaryThemeColor;
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = themeColor;
                  }}>
                  <Download fontSize="small" />
                  <span>Export</span>
                </button>
                <div className="relative">
                  <button className="flex items-center justify-center w-10 h-10 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200">
                    <Notifications />
                    <span className="w-2 h-2 bg-red-500 rounded-full absolute top-1 right-1"></span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Content Area */}
        <main className="p-3 overflow-y-auto flex-1">
          {/* Filters Section */}
          <div id="filters-section" className="bg-white rounded-lg shadow-sm p-2 md:p-6 mb-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Search</label>
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Search calls..."
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Date Range</label>
                <input
                  type="date"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 md:mb-2">Agent</label>
                <select className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                  <option>All Agents</option>
                  <option>John Smith</option>
                  <option>Sarah Johnson</option>
                  <option>Mike Davis</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 md:mb-2">Status</label>
                <select className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                  <option>All Status</option>
                  <option>Completed</option>
                  <option>Missed</option>
                  <option>Voicemail</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 md:mb-2">Tags</label>
                <select className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                  <option>All Tags</option>
                  <option>Follow-up</option>
                  <option>Complaint</option>
                  <option>Support</option>
                </select>
              </div>
            </div>
          </div>

          {/* Call Logs Table */}
          <div id="call-logs-table" className="bg-white rounded-lg shadow-sm">
            <div className="px-6 py-4 border-b border-gray-200">
              <div className="md:flex items-center justify-between">
                <h3 className="text-lg font-semibold text-gray-900">Recent Calls</h3>
                <div className="flex items-center space-x-2 text-sm text-gray-500">
                  <span>Showing 1-10 of 247 calls</span>
                  <button className="text-gray-400 hover:text-gray-600">
                    <ArrowDownward fontSize="small" />
                  </button>
                </div>
              </div>
            </div>

            <div className="overflow-x-auto w-[295px] md:w-[740px] lg:w-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date/Time</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Agent</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Caller</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Duration</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Outcome</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Recording</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {callLogs.map((call) => (
                    <React.Fragment key={call.id}>
                      <tr
                        className="hover:bg-gray-50 cursor-pointer"
                        onClick={() => toggleRow(call.id)}
                      >
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">{call.date}</div>
                          <div className="text-sm text-gray-500">{call.time}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <img src={call.agent.avatar} alt="Agent" className="w-8 h-8 rounded-full mr-3" />
                            <div>
                              <div className="text-sm font-medium text-gray-900">{call.agent.name}</div>
                              <div className="text-sm text-gray-500">{call.agent.id}</div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">{call.caller.number}</div>
                          <div className="text-sm text-gray-500">{call.caller.name}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {call.duration}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          {getStatusBadge(call.outcome)}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          {call.recording ? (
                            <button className="text-blue-500 hover:text-blue-600">
                              <PlayArrow />
                            </button>
                          ) : (
                            <span className="text-gray-400">N/A</span>
                          )}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          <button className="text-gray-400 hover:text-gray-600">
                            {expandedRows.includes(call.id) ? <ExpandMore /> : <ChevronRight />}
                          </button>
                        </td>
                      </tr>
                      {expandedRows.includes(call.id) && (
                        <tr className="bg-gray-50">
                          <td colSpan="7" className="px-6 py-4">
                            <div className="bg-white rounded-lg p-4 border border-gray-200">
                              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                <div>
                                  <h4 className="font-medium text-gray-900 mb-2">Call Details</h4>
                                  <div className="space-y-1 text-sm">
                                    <p className="flex items-center">
                                      <span className="text-gray-500 w-24">Call Type:</span>
                                      <span>{call.type}</span>
                                    </p>
                                    {call.queueTime && (
                                      <p className="flex items-center">
                                        <span className="text-gray-500 w-24">Queue Time:</span>
                                        <span>{call.queueTime}</span>
                                      </p>
                                    )}
                                    {call.holdTime && (
                                      <p className="flex items-center">
                                        <span className="text-gray-500 w-24">Hold Time:</span>
                                        <span>{call.holdTime}</span>
                                      </p>
                                    )}
                                    {call.attempts && (
                                      <p className="flex items-center">
                                        <span className="text-gray-500 w-24">Attempts:</span>
                                        <span>{call.attempts}</span>
                                      </p>
                                    )}
                                    {call.reason && (
                                      <p className="flex items-center">
                                        <span className="text-gray-500 w-24">Reason:</span>
                                        <span>{call.reason}</span>
                                      </p>
                                    )}
                                  </div>
                                </div>
                                <div>
                                  <h4 className="font-medium text-gray-900 mb-2">Customer Info</h4>
                                  <div className="space-y-1 text-sm">
                                    <p className="flex items-center">
                                      <Person className="text-gray-500 mr-2" fontSize="small" />
                                      <span className="text-gray-500 w-20">Customer ID:</span>
                                      <span>{call.customerId}</span>
                                    </p>
                                    <p className="flex items-center">
                                      <LocationOn className="text-gray-500 mr-2" fontSize="small" />
                                      <span className="text-gray-500 w-20">Location:</span>
                                      <span>{call.location}</span>
                                    </p>
                                    <p className="flex items-center">
                                      <Schedule className="text-gray-500 mr-2" fontSize="small" />
                                      <span className="text-gray-500 w-20">Previous Calls:</span>
                                      <span>{call.previousCalls}</span>
                                    </p>
                                  </div>
                                </div>
                                <div>
                                  <h4 className="font-medium text-gray-900 mb-2">Notes</h4>
                                  <p className="text-sm text-gray-600 mb-2">{call.notes}</p>
                                  <div className="flex flex-wrap gap-2">
                                    {call.tags.map((tag, index) => (
                                      <span
                                        key={index}
                                        className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${tag === 'Billing' ? 'bg-blue-100 text-blue-800' :
                                          tag === 'Follow-up' ? 'bg-yellow-100 text-yellow-800' :
                                            'bg-purple-100 text-purple-800'
                                          }`}
                                      >
                                        {tag}
                                      </span>
                                    ))}
                                  </div>
                                </div>
                              </div>
                            </div>
                          </td>
                        </tr>
                      )}
                    </React.Fragment>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default CallLogs;