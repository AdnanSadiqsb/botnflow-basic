import React, { useState, useEffect, useContext } from 'react';
import {
  Phone,
  PhoneDisabled,
  PhoneForwarded,
  PhoneInTalk,
  Voicemail,
  Groups,
  BarChart,
  Settings,
  ExpandMore,
  AddCall,
  Call,
  CallEnd,
  MoreVert,
  FiberManualRecord,
  Check,
  Notifications,
  Schedule,
  MicOff,
  VolumeUp,
  Pause,
  SwapCalls,
  CheckCircle,
  AccessTime,
  HourglassEmpty,
  Headset,
  DoubleArrow,
  Close,
  CalendarToday,
  NotificationsNone
} from '@mui/icons-material';
import { ContentContext } from '../../context/ContextProvider';

const Dialer = () => {
  const { themeColor, secondaryThemeColor } = useContext(ContentContext)

  const [status, setStatus] = useState('Available');
  const [showDialer, setShowDialer] = useState(false);
  const [showLiveCall, setShowLiveCall] = useState(false);
  const [showIncomingCall, setShowIncomingCall] = useState(false);
  const [countdown, setCountdown] = useState(20);
  const [phoneNumber, setPhoneNumber] = useState('');

  const handleStatusChange = (e) => {
    setStatus(e.target.value);
  };

  const toggleDialer = () => {
    setShowDialer(!showDialer);
    setShowLiveCall(false);
    setShowIncomingCall(false);
  };

  const toggleLiveCall = () => {
    setShowLiveCall(!showLiveCall);
    setShowDialer(false);
    setShowIncomingCall(false);
  };

  const toggleIncomingCall = () => {
    setShowIncomingCall(!showIncomingCall);
    setShowDialer(false);
    setShowLiveCall(false);
    setCountdown(20);
  };

  const handleDialerButton = (digit) => {
    setPhoneNumber(phoneNumber + digit);
  };

  useEffect(() => {
    let interval;
    if (showIncomingCall && countdown > 0) {
      interval = setInterval(() => {
        setCountdown((prev) => prev - 1);
      }, 1000);
    } else if (countdown === 0) {
      setShowIncomingCall(false);
    }
    return () => clearInterval(interval);
  }, [showIncomingCall, countdown]);

  const getStatusClasses = () => {
    switch (status) {
      case 'Busy':
        return 'bg-yellow-100 text-yellow-800';
      case 'Offline':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-green-100 text-green-800';
    }
  };

  return (
    <div className="bg-gray-50 mt-16 font-sans pb-3">
      {/* Top notification bar */}
      <div id="notification-bar" className="bg-blue-50 p-3 flex items-center justify-between w-full">
        <div className="md:flex items-center">
          {/* <span className="text-yellow-400 mr-2">👉</span> */}
          <p className="text-sm text-blue-800">Welcome to your call center dashboard. Complete your profile to unlock all features.</p>
          <span className="text-sm text-blue-600 md:ml-2 font-medium hover:underline cursor-pointer">Complete now</span>
        </div>
      </div>

      <div className="flex h-[calc(100vh-36px)]">

        {/* Main Content */}
        <div id="main-content" className="flex-1 overflow-auto">
          <div className="p-3">
            <div className="md:flex justify-between items-center mb-6">
              <div>
                <h1 className="text-2xl font-semibold text-gray-800">Agent Dashboard</h1>
                <p className="text-gray-600">Thursday, July 3, 2025</p>
              </div>
              <div className="md:flex gap-2 mt-3 md:mt-0">
                <button
                  onClick={toggleDialer}
                  className="px-4 py-2 w-full md:w-36 text-white rounded-md flex items-center"
                  style={{ backgroundColor: themeColor }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = secondaryThemeColor;
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = themeColor;
                  }}
                >
                  <AddCall className="mr-2" />
                  Start Dialer
                </button>
                <button
                  onClick={toggleLiveCall}
                  className="px-4 py-2 my-2 md:my-0 w-full md:w-32 bg-green-600 text-white rounded-md hover:bg-green-700 flex items-center"
                >
                  <Phone className="mr-2" />
                  Live Call
                </button>
                <button
                  onClick={toggleIncomingCall}
                  className="px-4 py-2 w-full md:w-44 bg-orange-600 text-white rounded-md hover:bg-orange-700 flex items-center"
                >
                  <PhoneInTalk className="mr-2" />
                  Incoming Call
                </button>
              </div>
            </div>

            {/* Dialer Panel */}
            {showDialer && (
              <div id="dialer-panel" className="bg-white rounded-lg border border-gray-200 shadow-sm p-6 mb-6">
                <h2 className="text-xl font-semibold mb-4">Dialer</h2>
                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <div className="mb-4">
                      <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
                      <input
                        type="text"
                        id="phone-input"
                        value={phoneNumber}
                        onChange={(e) => setPhoneNumber(e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Enter phone number"
                      />
                    </div>
                    <div className="mb-4">
                      <label className="block text-sm font-medium text-gray-700 mb-2">Outbound Number</label>
                      <select className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
                        <option>(415) 555-0100</option>
                        <option>(415) 555-0200</option>
                      </select>
                    </div>
                    <div className="grid grid-cols-3 gap-2 mb-4">
                      {['1', '2', '3', '4', '5', '6', '7', '8', '9', '*', '0', '#'].map((digit) => (
                        <button
                          key={digit}
                          onClick={() => handleDialerButton(digit)}
                          className="dialer-btn h-12 bg-gray-100 hover:bg-gray-200 rounded-md font-semibold"
                        >
                          {digit}
                        </button>
                      ))}
                    </div>
                    <div className="flex gap-2">
                      <button className="flex-1 px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 flex items-center justify-center">
                        <Phone className="mr-2" />
                        Call
                      </button>
                      <button className="flex-1 px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 flex items-center justify-center">
                        <PhoneDisabled className="mr-2" />
                        End Call
                      </button>
                    </div>
                  </div>
                  <div>
                    <h3 className="font-medium mb-3">Recent Numbers</h3>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between p-2 bg-gray-50 rounded-md">
                        <span>(415) 555-1234</span>
                        <button className="text-blue-600 hover:text-blue-700">
                          <Phone />
                        </button>
                      </div>
                      <div className="flex items-center justify-between p-2 bg-gray-50 rounded-md">
                        <span>(628) 555-7890</span>
                        <button className="text-blue-600 hover:text-blue-700">
                          <Phone />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Live Call Panel */}
            {showLiveCall && (
              <div id="live-call-panel" className="bg-white rounded-lg border border-gray-200 shadow-sm p-6 mb-6">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-xl font-semibold">Live Call</h2>
                  <button className="text-gray-400 hover:text-gray-600">
                    <DoubleArrow />
                  </button>
                </div>
                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <div className="flex items-center mb-4">
                      <img src="https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-3.jpg" className="w-16 h-16 rounded-full mr-4" alt="Caller" />
                      <div>
                        <h3 className="text-lg font-semibold">Michael Johnson</h3>
                        <p className="text-gray-600">(415) 555-1234</p>
                        <div className="flex items-center mt-1">
                          <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full mr-2">Premium</span>
                          <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">VIP</span>
                        </div>
                      </div>
                    </div>
                    <div className="text-center mb-4">
                      <div className="text-3xl font-mono font-semibold text-green-600">05:42</div>
                      <p className="text-sm text-gray-500">Call Duration</p>
                    </div>
                    <div className="flex justify-center gap-3 mb-4">
                      <button className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center text-gray-600 hover:bg-gray-200">
                        <MicOff />
                      </button>
                      <button className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center text-gray-600 hover:bg-gray-200">
                        <Pause />
                      </button>
                      <button className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center text-gray-600 hover:bg-gray-200">
                        <SwapCalls />
                      </button>
                      <button className="w-12 h-12 rounded-full bg-red-500 flex items-center justify-center text-white hover:bg-red-600">
                        <PhoneDisabled />
                      </button>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Call Notes</label>
                      <textarea className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" rows="3" placeholder="Add notes during call..."></textarea>
                    </div>
                  </div>
                  <div>
                    <h3 className="font-medium mb-3">Contact Information</h3>
                    <div className="space-y-3">
                      <div className="p-3 bg-gray-50 rounded-md">
                        <p className="text-sm font-medium">Last Interaction</p>
                        <p className="text-sm text-gray-600">Billing inquiry - June 28, 2025</p>
                      </div>
                      <div className="p-3 bg-gray-50 rounded-md">
                        <p className="text-sm font-medium">Account Status</p>
                        <p className="text-sm text-green-600">Active - Premium Plan</p>
                      </div>
                      <div className="p-3 bg-gray-50 rounded-md">
                        <p className="text-sm font-medium">Previous Calls</p>
                        <p className="text-sm text-gray-600">3 calls this month</p>
                      </div>
                    </div>
                    <div className="mt-4">
                      <label className="block text-sm font-medium text-gray-700 mb-2">Call Disposition</label>
                      <select className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
                        <option>Select disposition...</option>
                        <option>Resolved</option>
                        <option>Follow-up Required</option>
                        <option>Escalated</option>
                        <option>No Answer</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Incoming Call Popup */}
            {showIncomingCall && (
              <div id="incoming-call-popup" className="fixed top-4 right-4 bg-white rounded-lg border border-gray-200 shadow-lg p-4 z-50 w-80">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-semibold text-green-600">Incoming Call</h3>
                  <button onClick={() => setShowIncomingCall(false)} className="text-gray-400 hover:text-gray-600">
                    <Close />
                  </button>
                </div>
                <div className="flex items-center mb-4">
                  <img src="https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-8.jpg" className="w-12 h-12 rounded-full mr-3" alt="Caller" />
                  <div>
                    <h4 className="font-medium">David Wilson</h4>
                    <p className="text-sm text-gray-600">(650) 555-2468</p>
                    <p className="text-xs text-gray-500">Last call: 2 days ago</p>
                  </div>
                </div>
                <div className="flex gap-2">
                  <button className="flex-1 px-3 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 flex items-center justify-center">
                    <Phone className="mr-2" />
                    Answer
                  </button>
                  <button className="flex-1 px-3 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 flex items-center justify-center">
                    <PhoneDisabled className="mr-2" />
                    Decline
                  </button>
                  <button className="px-3 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 flex items-center justify-center">
                    <Voicemail />
                  </button>
                </div>
                <div className="mt-2 text-center">
                  <div className="text-xs text-gray-500">Auto-dismiss in <span id="countdown">{countdown}</span>s</div>
                </div>
              </div>
            )}

            {/* Stats Overview */}
            <div id="stats-overview" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
              <div className="bg-white rounded-lg border border-gray-200 p-4 shadow-sm">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-500">Calls Today</p>
                    <h3 className="text-2xl font-semibold">24</h3>
                  </div>
                  <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
                    <Phone className="text-blue-600" />
                  </div>
                </div>
                <div className="mt-2 text-xs text-green-600 flex items-center">
                  <FiberManualRecord className="text-xs mr-1" />
                  <span>8% from yesterday</span>
                </div>
              </div>

              <div className="bg-white rounded-lg border border-gray-200 p-4 shadow-sm">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-500">Missed Calls</p>
                    <h3 className="text-2xl font-semibold">3</h3>
                  </div>
                  <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center">
                    <PhoneDisabled className="text-red-600" />
                  </div>
                </div>
                <div className="mt-2 text-xs text-red-600 flex items-center">
                  <FiberManualRecord className="text-xs mr-1" />
                  <span>2 more than yesterday</span>
                </div>
              </div>

              <div className="bg-white rounded-lg border border-gray-200 p-4 shadow-sm">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-500">Avg. Call Time</p>
                    <h3 className="text-2xl font-semibold">4:12</h3>
                  </div>
                  <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center">
                    <AccessTime className="text-purple-600" />
                  </div>
                </div>
                <div className="mt-2 text-xs text-green-600 flex items-center">
                  <FiberManualRecord className="text-xs mr-1" />
                  <span>30 sec less than avg</span>
                </div>
              </div>

              <div className="bg-white rounded-lg border border-gray-200 p-4 shadow-sm">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-500">Resolution Rate</p>
                    <h3 className="text-2xl font-semibold">92%</h3>
                  </div>
                  <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
                    <CheckCircle className="text-green-600" />
                  </div>
                </div>
                <div className="mt-2 text-xs text-green-600 flex items-center">
                  <FiberManualRecord className="text-xs mr-1" />
                  <span>5% above target</span>
                </div>
              </div>
            </div>

            {/* Quick Stats Bar */}
            <div id="quick-stats-bar" className="bg-white rounded-lg border border-gray-200 p-4 mb-6 md:flex justify-between shadow-sm">
              <div className="flex items-center justify-between mt-3 md:mt-0">
                <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center mr-3">
                  <PhoneInTalk className="text-green-600 text-sm" />
                </div>
                <div>
                  <p className="text-xs text-gray-500">Active Calls</p>
                  <p className="font-semibold">2</p>
                </div>
              </div>

              <div className="flex items-center justify-between mt-3 md:mt-0">
                <div className="w-8 h-8 rounded-full bg-yellow-100 flex items-center justify-center mr-3">
                  <HourglassEmpty className="text-yellow-600 text-sm" />
                </div>
                <div>
                  <p className="text-xs text-gray-500">Queued Calls</p>
                  <p className="font-semibold">5</p>
                </div>
              </div>

              <div className="flex items-center justify-between mt-3 md:mt-0">
                <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center mr-3">
                  <Voicemail className="text-blue-600 text-sm" />
                </div>
                <div>
                  <p className="text-xs text-gray-500">Voicemails</p>
                  <p className="font-semibold">3</p>
                </div>
              </div>

              <div className="flex items-center justify-between mt-3 md:mt-0">
                <div className="w-8 h-8 rounded-full bg-purple-100 flex items-center justify-center mr-3">
                  <Headset className="text-purple-600 text-sm" />
                </div>
                <div>
                  <p className="text-xs text-gray-500">Avg. Wait Time</p>
                  <p className="font-semibold">0:42</p>
                </div>
              </div>

              <div className="flex items-center justify-between mt-3 md:mt-0">
                <div className="w-8 h-8 rounded-full bg-red-100 flex items-center justify-center mr-3">
                  <PhoneDisabled className="text-red-600 text-sm" />
                </div>
                <div>
                  <p className="text-xs text-gray-500">Abandoned</p>
                  <p className="font-semibold">1</p>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 lg:gap-6 gap-y-3">
              {/* Active Calls */}
              <div id="active-calls" className="col-span-2">
                <div className="bg-white rounded-lg border border-gray-200 overflow-hidden shadow-sm">
                  <div className="px-4 py-3 border-b border-gray-200 flex justify-between items-center">
                    <h2 className="font-semibold text-gray-800">Active Calls</h2>
                    <button className="text-gray-400 hover:text-gray-600">
                      <MoreVert />
                    </button>
                  </div>

                  <div className="divide-y divide-gray-200">
                    {/* Active Call 1 */}
                    <div className="p-4 hover:bg-gray-50">
                      <div className="flex items-center">
                        <div className="relative">
                          <img src="https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-3.jpg" className="w-10 h-10 rounded-full mr-3" alt="Caller" />
                          <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 border-2 border-white rounded-full"></div>
                        </div>
                        <div className="flex-1">
                          <div className="flex justify-between items-start">
                            <div>
                              <h3 className="font-medium">Michael Johnson</h3>
                              <p className="text-sm text-gray-500">(415) 555-1234</p>
                            </div>
                            <div className="flex items-center">
                              <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full mr-2">On Call</span>
                              <span className="text-sm font-medium">03:24</span>
                            </div>
                          </div>
                          <div className="mt-2 flex">
                            <button className="mr-2 w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-600 hover:bg-gray-200">
                              <MicOff />
                            </button>
                            <button className="mr-2 w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-600 hover:bg-gray-200">
                              <VolumeUp />
                            </button>
                            <button className="mr-2 w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-600 hover:bg-gray-200">
                              <Pause />
                            </button>
                            <button className="w-8 h-8 rounded-full bg-red-500 flex items-center justify-center text-white hover:bg-red-600">
                              <PhoneDisabled />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Active Call 2 */}
                    <div className="p-4 hover:bg-gray-50">
                      <div className="flex items-center">
                        <div className="relative">
                          <img src="https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-5.jpg" className="w-10 h-10 rounded-full mr-3" alt="Caller" />
                          <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 border-2 border-white rounded-full"></div>
                        </div>
                        <div className="flex-1">
                          <div className="flex justify-between items-start">
                            <div>
                              <h3 className="font-medium">Sarah Williams</h3>
                              <p className="text-sm text-gray-500">(628) 555-7890</p>
                            </div>
                            <div className="flex items-center">
                              <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full mr-2">On Call</span>
                              <span className="text-sm font-medium">01:45</span>
                            </div>
                          </div>
                          <div className="mt-2 flex">
                            <button className="mr-2 w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-600 hover:bg-gray-200">
                              <MicOff />
                            </button>
                            <button className="mr-2 w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-600 hover:bg-gray-200">
                              <VolumeUp />
                            </button>
                            <button className="mr-2 w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-600 hover:bg-gray-200">
                              <Pause />
                            </button>
                            <button className="w-8 h-8 rounded-full bg-red-500 flex items-center justify-center text-white hover:bg-red-600">
                              <PhoneDisabled />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Upcoming Call */}
                    <div className="p-4 hover:bg-gray-50">
                      <div className="flex items-center">
                        <div className="relative">
                          <img src="https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-9.jpg" className="w-10 h-10 rounded-full mr-3" alt="Caller" />
                          <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-yellow-500 border-2 border-white rounded-full"></div>
                        </div>
                        <div className="flex-1">
                          <div className="flex justify-between items-start">
                            <div>
                              <h3 className="font-medium">Robert Davis</h3>
                              <p className="text-sm text-gray-500">(510) 555-9876</p>
                            </div>
                            <div className="flex items-center">
                              <span className="px-2 py-1 bg-yellow-100 text-yellow-800 text-xs rounded-full mr-2">In Queue</span>
                              <span className="text-sm font-medium">Next</span>
                            </div>
                          </div>
                          <div className="mt-2 flex">
                            <button className="mr-2 px-3 py-1 bg-green-500 text-white rounded-md hover:bg-green-600 flex items-center">
                              <Phone className="mr-1" />
                              Accept
                            </button>
                            <button className="px-3 py-1 bg-red-100 text-red-600 rounded-md hover:bg-red-200 flex items-center">
                              <PhoneForwarded className="mr-1" />
                              Transfer
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Notifications Panel */}
              <div id="notifications-panel">
                <div className="bg-white rounded-lg border border-gray-200 overflow-hidden shadow-sm">
                  <div className="px-4 py-3 border-b border-gray-200 flex justify-between items-center">
                    <h2 className="font-semibold text-gray-800">Notifications</h2>
                    <div className="flex">
                      <button className="text-gray-400 hover:text-gray-600 mr-2">
                        <Check />
                      </button>
                      <button className="text-gray-400 hover:text-gray-600">
                        <MoreVert />
                      </button>
                    </div>
                  </div>

                  <div className="divide-y divide-gray-200">
                    <div className="p-4 bg-blue-50 border-l-4 border-blue-500">
                      <div className="flex">
                        <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center mr-3">
                          <Voicemail className="text-blue-600" />
                        </div>
                        <div>
                          <p className="font-medium">New voicemail</p>
                          <p className="text-sm text-gray-600">From: Robert Davis (510) 555-9876</p>
                          <p className="text-xs text-gray-500 mt-1">2 minutes ago</p>
                        </div>
                      </div>
                    </div>

                    <div className="p-4">
                      <div className="flex">
                        <div className="w-8 h-8 rounded-full bg-red-100 flex items-center justify-center mr-3">
                          <PhoneDisabled className="text-red-600" />
                        </div>
                        <div>
                          <p className="font-medium">Missed call</p>
                          <p className="text-sm text-gray-600">From: Emily Brown (408) 555-4321</p>
                          <p className="text-xs text-gray-500 mt-1">15 minutes ago</p>
                        </div>
                      </div>
                    </div>

                    <div className="p-4">
                      <div className="flex">
                        <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center mr-3">
                          <Check className="text-green-600" />
                        </div>
                        <div>
                          <p className="font-medium">Call completed</p>
                          <p className="text-sm text-gray-600">With: James Wilson - 4:35 duration</p>
                          <p className="text-xs text-gray-500 mt-1">42 minutes ago</p>
                        </div>
                      </div>
                    </div>

                    <div className="p-4">
                      <div className="flex">
                        <div className="w-8 h-8 rounded-full bg-purple-100 flex items-center justify-center mr-3">
                          <CalendarToday className="text-purple-600" />
                        </div>
                        <div>
                          <p className="font-medium">Scheduled callback</p>
                          <p className="text-sm text-gray-600">For: Lisa Thompson at 2:30 PM</p>
                          <p className="text-xs text-gray-500 mt-1">1 hour ago</p>
                        </div>
                      </div>
                    </div>

                    <div className="p-4">
                      <div className="flex">
                        <div className="w-8 h-8 rounded-full bg-yellow-100 flex items-center justify-center mr-3">
                          <NotificationsNone className="text-yellow-600" />
                        </div>
                        <div>
                          <p className="font-medium">System notification</p>
                          <p className="text-sm text-gray-600">Updated call routing rules applied</p>
                          <p className="text-xs text-gray-500 mt-1">2 hours ago</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dialer;