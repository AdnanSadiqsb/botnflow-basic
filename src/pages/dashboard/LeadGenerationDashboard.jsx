import React, { useContext } from 'react';
import {
  Bolt, Notifications, Settings, KeyboardArrowDown,
  ChevronRight, FilterAlt, Download, ShowChart,
  People, Campaign, ArrowUpward, ArrowDownward,
  Phone, Chat, PersonAdd, Check, MoreVert,
  Warning, Schedule, TrendingUp, Add,
  Tag, Build, Percent, Language,
  Facebook, WhatsApp
} from '@mui/icons-material';
import { ContentContext } from '../../context/ContextProvider';

const LeadGenerationDashboard = () => {
  const { themeColor, secondaryThemeColor } = useContext(ContentContext)

  return (
    <div className="bg-gray-50 font-sans pb-6">

      {/* <main className="pt-16 pb-6"> */}
      <div className="max-w-7xl mx-auto px-3">
        {/* Date & Filter Controls */}
        <div className="md:flex justify-between items-center mb-6">
          <h1 className="md:text-2xl md:font-bold font-semibold text-gray-800">Lead Generation Dashboard</h1>
          <div className="flex items-center space-x-3">
            <div className="relative">
              <select className="bg-white border border-gray-300 rounded-md pl-3 pr-8 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500">
                <option>Today</option>
                <option>Yesterday</option>
                <option>Last 7 days</option>
                <option>Last 30 days</option>
                <option>Custom Range</option>
              </select>
            </div>
            <button className="w-26 bg-white border border-gray-300 rounded-md md:px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500">
              <FilterAlt className="mr-1" fontSize="small" />
              Filters
            </button>
            <button style={{ backgroundColor: themeColor }} className="w-26 text-white rounded-md md:px-4 py-2 text-sm font-medium hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
              <Download className="mr-1" fontSize="small" />
              Export
            </button>
          </div>
        </div>

        {/* Top-Level Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <div className="bg-white rounded-lg shadow p-5">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm font-medium text-gray-500">New Leads Today</p>
                <h3 className="text-2xl font-bold text-gray-800 mt-1">127</h3>
              </div>
              <div className="p-2 bg-green-100 rounded-md">
                <PersonAdd className="text-green-600" fontSize="small" />
              </div>
            </div>
            <div className="mt-2 flex items-center text-sm">
              <span className="text-green-600 flex items-center">
                <ArrowUpward className="mr-1 text-xs" />
                12.5%
              </span>
              <span className="text-gray-500 ml-2">vs yesterday</span>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-5">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm font-medium text-gray-500">Total Leads in Pipeline</p>
                <h3 className="text-2xl font-bold text-gray-800 mt-1">1,842</h3>
              </div>
              <div className="p-2 bg-blue-100 rounded-md">
                <FilterAlt className="text-blue-600" fontSize="small" />
              </div>
            </div>
            <div className="mt-2 flex items-center text-sm">
              <span className="text-green-600 flex items-center">
                <ArrowUpward className="mr-1 text-xs" />
                3.2%
              </span>
              <span className="text-gray-500 ml-2">this week</span>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-5">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm font-medium text-gray-500">Qualified Leads</p>
                <h3 className="text-2xl font-bold text-gray-800 mt-1">428</h3>
              </div>
              <div className="p-2 bg-purple-100 rounded-md">
                <Check className="text-purple-600" fontSize="small" />
              </div>
            </div>
            <div className="mt-2 flex items-center text-sm">
              <span className="text-red-600 flex items-center">
                <ArrowDownward className="mr-1 text-xs" />
                2.1%
              </span>
              <span className="text-gray-500 ml-2">this week</span>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-5">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm font-medium text-gray-500">Conversion Rate</p>
                <h3 className="text-2xl font-bold text-gray-800 mt-1">23.4%</h3>
              </div>
              <div className="p-2 bg-orange-100 rounded-md">
                <Percent className="text-orange-600" fontSize="small" />
              </div>
            </div>
            <div className="mt-2 flex items-center text-sm">
              <span className="text-green-600 flex items-center">
                <ArrowUpward className="mr-1 text-xs" />
                1.8%
              </span>
              <span className="text-gray-500 ml-2">this month</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column */}
          <div className="lg:col-span-2 space-y-6">
            {/* Lead Funnel Overview */}
            <div className="bg-white rounded-lg shadow">
              <div className="px-5 py-4 border-b border-gray-200">
                <div className="flex items-center justify-between">
                  <h2 className="text-lg font-medium text-gray-800">Lead Funnel Overview</h2>
                  <div className="flex space-x-2">
                    <button className="p-1 text-gray-500 hover:text-gray-700">
                      <MoreVert />
                    </button>
                  </div>
                </div>
              </div>
              <div className="p-5">
                <div className="flex justify-between items-center h-[200px]">
                  {/* Funnel Stage: New */}
                  <div className="funnel-stage flex flex-col items-center w-1/5">
                    <div className="w-full bg-blue-500 rounded-t-md h-[120px] flex items-center justify-center">
                      <span className="text-white font-semibold">752</span>
                    </div>
                    <div className="w-3/4 h-0 border-l-[15px] border-r-[15px] border-t-[15px] border-transparent border-t-blue-500"></div>
                    <p className="mt-2 text-sm md:font-medium text-gray-700">New</p>
                    <p className="text-xs text-gray-500">100%</p>
                  </div>

                  {/* Funnel Stage: Contacted */}
                  <div className="funnel-stage flex flex-col items-center w-1/5">
                    <div className="w-full bg-green-500 rounded-t-md h-[100px] flex items-center justify-center">
                      <span className="text-white font-semibold">524</span>
                    </div>
                    <div className="w-3/4 h-0 border-l-[15px] border-r-[15px] border-t-[15px] border-transparent border-t-green-500"></div>
                    <p className="mt-2 text-sm md:font-medium text-gray-700">Contacted</p>
                    <p className="text-xs text-gray-500">69.7%</p>
                  </div>

                  {/* Funnel Stage: Qualified */}
                  <div className="funnel-stage flex flex-col items-center w-1/5">
                    <div className="w-full bg-yellow-500 rounded-t-md h-[80px] flex items-center justify-center">
                      <span className="text-white font-semibold">428</span>
                    </div>
                    <div className="w-3/4 h-0 border-l-[15px] border-r-[15px] border-t-[15px] border-transparent border-t-yellow-500"></div>
                    <p className="mt-2 text-sm md:font-medium text-gray-700">Qualified</p>
                    <p className="text-xs text-gray-500">56.9%</p>
                  </div>

                  {/* Funnel Stage: Converted */}
                  <div className="funnel-stage flex flex-col items-center w-1/5">
                    <div className="w-full bg-purple-500 rounded-t-md h-[60px] flex items-center justify-center">
                      <span className="text-white font-semibold">176</span>
                    </div>
                    <div className="w-3/4 h-0 border-l-[15px] border-r-[15px] border-t-[15px] border-transparent border-t-purple-500"></div>
                    <p className="mt-2 text-sm md:font-medium text-gray-700">Converted</p>
                    <p className="text-xs text-gray-500">23.4%</p>
                  </div>

                  {/* Funnel Stage: Lost */}
                  <div className="funnel-stage flex flex-col items-center w-1/5">
                    <div className="w-full bg-red-500 rounded-t-md h-[40px] flex items-center justify-center">
                      <span className="text-white font-semibold">148</span>
                    </div>
                    <div className="w-3/4 h-0 border-l-[15px] border-r-[15px] border-t-[15px] border-transparent border-t-red-500"></div>
                    <p className="mt-2 text-sm md:font-medium text-gray-700">Lost</p>
                    <p className="text-xs text-gray-500">19.7%</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Channel Source Analytics */}
            <div className="bg-white rounded-lg shadow">
              <div className="px-5 py-4 border-b border-gray-200">
                <div className="md:flex items-center justify-between">
                  <h2 className="text-lg font-medium text-gray-800">Channel Source Analytics</h2>
                  <div className="flex items-center space-x-3">
                    <div className="relative">
                      <select className="bg-white border border-gray-300 rounded-md pl-3 pr-8 py-1 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500">
                        <option>Today</option>
                        <option>This Week</option>
                        <option>This Month</option>
                        <option>Custom Range</option>
                      </select>
                    </div>
                    <div className="flex h-10 border border-gray-300 rounded-md">
                      <button className="px-3 py-1 text-sm bg-blue-50 text-blue-600 border-r border-gray-300">Chart</button>
                      <button className="px-3 py-1 text-sm text-gray-700">Table</button>
                    </div>
                  </div>
                </div>
              </div>
              <div className="p-5">
                <div id="channel-chart" style={{ height: '300px' }}></div>
              </div>
            </div>

            {/* Lead Origin Map */}
            <div className="bg-white rounded-lg shadow">
              <div className="px-5 py-4 border-b border-gray-200">
                <div className="flex items-center justify-between">
                  <h2 className="text-lg font-medium text-gray-800">Lead Origin Map</h2>
                  <div className="flex space-x-2">
                    <button className="p-1 text-gray-500 hover:text-gray-700">
                      <MoreVert />
                    </button>
                  </div>
                </div>
              </div>
              <div className="p-5 h-[300px] flex items-center justify-center">
                <img
                  className="w-full h-full object-contain"
                  src="https://storage.googleapis.com/uxpilot-auth.appspot.com/63e3e895c0-8dab11488799942253d5.png"
                  alt="geographic heatmap showing lead distribution across a country with hotspots in major cities, data visualization, professional UI"
                />
              </div>
            </div>
          </div>

          {/* Right Column */}
          <div className="space-y-6">
            {/* Live Lead Activity Feed */}
            <div className="bg-white rounded-lg shadow">
              <div className="px-5 py-4 border-b border-gray-200">
                <div className="flex items-center justify-between">
                  <h2 className="text-lg font-medium text-gray-800">Live Lead Activity</h2>
                  <div className="flex space-x-2">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                      <span className="w-2 h-2 mr-1 bg-green-500 rounded-full animate-pulse"></span>
                      Live
                    </span>
                  </div>
                </div>
              </div>
              <div className="p-3 max-h-[400px] overflow-y-auto">
                <ul className="divide-y divide-gray-200">
                  <li className="py-3 px-2 hover:bg-gray-50 rounded-md">
                    <div className="flex items-start">
                      <div className="p-2 bg-green-100 rounded-full mr-3">
                        <WhatsApp className="text-green-600" fontSize="small" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="flex justify-between">
                          <p className="text-sm font-medium text-gray-900">Michael Johnson</p>
                          <p className="text-xs text-gray-500">2m ago</p>
                        </div>
                        <p className="text-xs text-gray-500">San Francisco, CA</p>
                        <p className="mt-1 text-sm text-gray-600 truncate">Hi, I'm interested in your services...</p>
                      </div>
                    </div>
                    <div className="mt-2 flex justify-end space-x-2">
                      <button className="p-1 text-gray-500 hover:text-blue-600">
                        <Phone fontSize="small" />
                      </button>
                      <button className="p-1 text-gray-500 hover:text-blue-600">
                        <Chat fontSize="small" />
                      </button>
                      <button className="p-1 text-gray-500 hover:text-blue-600">
                        <PersonAdd fontSize="small" />
                      </button>
                      <button className="p-1 text-gray-500 hover:text-blue-600">
                        <Check fontSize="small" />
                      </button>
                    </div>
                  </li>

                  <li className="py-3 px-2 hover:bg-gray-50 rounded-md">
                    <div className="flex items-start">
                      <div className="p-2 bg-blue-100 rounded-full mr-3">
                        <Language className="text-blue-600" fontSize="small" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="flex justify-between">
                          <p className="text-sm font-medium text-gray-900">Sarah Williams</p>
                          <p className="text-xs text-gray-500">12m ago</p>
                        </div>
                        <p className="text-xs text-gray-500">Chicago, IL</p>
                        <p className="mt-1 text-sm text-gray-600 truncate">Form submission: Business inquiry</p>
                      </div>
                    </div>
                    <div className="mt-2 flex justify-end space-x-2">
                      <button className="p-1 text-gray-500 hover:text-blue-600">
                        <Phone fontSize="small" />
                      </button>
                      <button className="p-1 text-gray-500 hover:text-blue-600">
                        <Chat fontSize="small" />
                      </button>
                      <button className="p-1 text-gray-500 hover:text-blue-600">
                        <PersonAdd fontSize="small" />
                      </button>
                      <button className="p-1 text-gray-500 hover:text-blue-600">
                        <Check fontSize="small" />
                      </button>
                    </div>
                  </li>

                  <li className="py-3 px-2 hover:bg-gray-50 rounded-md">
                    <div className="flex items-start">
                      <div className="p-2 bg-purple-100 rounded-full mr-3">
                        <Phone className="text-purple-600" fontSize="small" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="flex justify-between">
                          <p className="text-sm font-medium text-gray-900">David Thompson</p>
                          <p className="text-xs text-gray-500">45m ago</p>
                        </div>
                        <p className="text-xs text-gray-500">New York, NY</p>
                        <p className="mt-1 text-sm text-gray-600 truncate">Inbound call (2:14) - pricing inquiry</p>
                      </div>
                    </div>
                    <div className="mt-2 flex justify-end space-x-2">
                      <button className="p-1 text-gray-500 hover:text-blue-600">
                        <Phone fontSize="small" />
                      </button>
                      <button className="p-1 text-gray-500 hover:text-blue-600">
                        <Chat fontSize="small" />
                      </button>
                      <button className="p-1 text-gray-500 hover:text-blue-600">
                        <PersonAdd fontSize="small" />
                      </button>
                      <button className="p-1 text-gray-500 hover:text-blue-600">
                        <Check fontSize="small" />
                      </button>
                    </div>
                  </li>

                  <li className="py-3 px-2 hover:bg-gray-50 rounded-md">
                    <div className="flex items-start">
                      <div className="p-2 bg-blue-100 rounded-full mr-3">
                        <Facebook className="text-blue-600" fontSize="small" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="flex justify-between">
                          <p className="text-sm font-medium text-gray-900">Emily Rodriguez</p>
                          <p className="text-xs text-gray-500">1h ago</p>
                        </div>
                        <p className="text-xs text-gray-500">Austin, TX</p>
                        <p className="mt-1 text-sm text-gray-600 truncate">Facebook Lead Ad - Summer Campaign</p>
                      </div>
                    </div>
                    <div className="mt-2 flex justify-end space-x-2">
                      <button className="p-1 text-gray-500 hover:text-blue-600">
                        <Phone fontSize="small" />
                      </button>
                      <button className="p-1 text-gray-500 hover:text-blue-600">
                        <Chat fontSize="small" />
                      </button>
                      <button className="p-1 text-gray-500 hover:text-blue-600">
                        <PersonAdd fontSize="small" />
                      </button>
                      <button className="p-1 text-gray-500 hover:text-blue-600">
                        <Check fontSize="small" />
                      </button>
                    </div>
                  </li>
                </ul>
              </div>
              <div className="px-5 py-3 border-t border-gray-200 text-center">
                <span className="text-sm font-medium text-blue-600 hover:text-blue-700 cursor-pointer">View all activity</span>
              </div>
            </div>

            {/* Smart Lead Insights */}
            <div className="bg-white rounded-lg shadow">
              <div className="px-5 py-4 border-b border-gray-200">
                <div className="flex items-center justify-between">
                  <h2 className="text-lg font-medium text-gray-800">Smart Lead Insights</h2>
                  <div className="flex space-x-2">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                      AI-Powered
                    </span>
                  </div>
                </div>
              </div>
              <div className="p-4 space-y-3">
                <div className="p-3 bg-yellow-50 border border-yellow-200 rounded-md">
                  <div className="flex">
                    <div className="flex-shrink-0">
                      <Warning className="text-yellow-500" fontSize="small" />
                    </div>
                    <div className="ml-3">
                      <p className="text-sm font-medium text-yellow-800">5 hot leads are unassigned</p>
                      <p className="mt-1 text-sm text-yellow-700">Assign these leads to maximize conversion opportunity</p>
                    </div>
                  </div>
                  <div className="mt-2 text-right">
                    <button className="text-xs font-medium text-yellow-800 hover:text-yellow-900">View leads <ChevronRight fontSize="inherit" /></button>
                  </div>
                </div>

                <div className="p-3 bg-red-50 border border-red-200 rounded-md">
                  <div className="flex">
                    <div className="flex-shrink-0">
                      <Schedule className="text-red-500" fontSize="small" />
                    </div>
                    <div className="ml-3">
                      <p className="text-sm font-medium text-red-800">3 leads contacted but no reply in 24 hours</p>
                      <p className="mt-1 text-sm text-red-700">Follow up with these leads to re-engage them</p>
                    </div>
                  </div>
                  <div className="mt-2 text-right">
                    <button className="text-xs font-medium text-red-800 hover:text-red-900">Follow up <ChevronRight fontSize="inherit" /></button>
                  </div>
                </div>

                <div className="p-3 bg-green-50 border border-green-200 rounded-md">
                  <div className="flex">
                    <div className="flex-shrink-0">
                      <TrendingUp className="text-green-500" fontSize="small" />
                    </div>
                    <div className="ml-3">
                      <p className="text-sm font-medium text-green-800">Leads from Campaign X are converting faster</p>
                      <p className="mt-1 text-sm text-green-700">28% higher conversion rate than other campaigns</p>
                    </div>
                  </div>
                  <div className="mt-2 text-right">
                    <button className="text-xs font-medium text-green-800 hover:text-green-900">View campaign <ChevronRight fontSize="inherit" /></button>
                  </div>
                </div>
              </div>
            </div>

            {/* Follow-ups & Reminders */}
            {/* <div className="bg-white rounded-lg shadow">
                <div className="px-5 py-4 border-b border-gray-200">
                  <div className="flex items-center justify-between">
                    <h2 className="text-lg font-medium text-gray-800">Follow-ups & Reminders</h2>
                    <div className="flex space-x-2">
                      <button className="text-sm text-blue-600 hover:text-blue-700 font-medium">
                        Add New
                      </button>
                    </div>
                  </div>
                </div>
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Lead Name</th>
                        <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Time</th>
                        <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Agent</th>
                        <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                        <th scope="col" className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Action</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      <tr>
                        <td className="px-4 py-3 whitespace-nowrap text-sm font-medium text-gray-900">John Smith</td>
                        <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">Today, 2:30 PM</td>
                        <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">Alex Wilson</td>
                        <td className="px-4 py-3 whitespace-nowrap">
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                            Upcoming
                          </span>
                        </td>
                        <td className="px-4 py-3 whitespace-nowrap text-right text-sm font-medium">
                          <button className="text-blue-600 hover:text-blue-900 mr-2">Call</button>
                          <button className="text-gray-600 hover:text-gray-900">Reschedule</button>
                        </td>
                      </tr>
                      <tr>
                        <td className="px-4 py-3 whitespace-nowrap text-sm font-medium text-gray-900">Maria Garcia</td>
                        <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">Today, 4:00 PM</td>
                        <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">Sarah Johnson</td>
                        <td className="px-4 py-3 whitespace-nowrap">
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                            Upcoming
                          </span>
                        </td>
                        <td className="px-4 py-3 whitespace-nowrap text-right text-sm font-medium">
                          <button className="text-blue-600 hover:text-blue-900 mr-2">Call</button>
                          <button className="text-gray-600 hover:text-gray-900">Reschedule</button>
                        </td>
                      </tr>
                      <tr>
                        <td className="px-4 py-3 whitespace-nowrap text-sm font-medium text-gray-900">Robert Chen</td>
                        <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">Today, 11:00 AM</td>
                        <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">Michael Brown</td>
                        <td className="px-4 py-3 whitespace-nowrap">
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
                            Missed
                          </span>
                        </td>
                        <td className="px-4 py-3 whitespace-nowrap text-right text-sm font-medium">
                          <button className="text-blue-600 hover:text-blue-900 mr-2">Call</button>
                          <button className="text-gray-600 hover:text-gray-900">Reschedule</button>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <div className="px-5 py-3 border-t border-gray-200 text-center">
                  <span className="text-sm font-medium text-blue-600 hover:text-blue-700 cursor-pointer">View all follow-ups</span>
                </div>
              </div> */}

            {/* Quick Actions Panel */}
            <div className="bg-white rounded-lg shadow">
              <div className="px-5 py-4 border-b border-gray-200">
                <h2 className="text-lg font-medium text-gray-800">Quick Actions</h2>
              </div>
              <div className="p-5 grid grid-cols-2 lg:grid-cols-3 gap-3">
                <button className="flex flex-col items-center justify-center p-3 bg-gray-50 hover:bg-gray-100 rounded-md">
                  <Add className="text-blue-600 text-lg" />
                  <span className="mt-1 text-xs font-medium text-gray-700">Add Lead</span>
                </button>
                <button className="flex flex-col items-center justify-center p-3 bg-gray-50 hover:bg-gray-100 rounded-md">
                  <Phone className="text-blue-600 text-lg" />
                  <span className="mt-1 text-xs font-medium text-gray-700">Initiate Call</span>
                </button>
                <button className="flex flex-col items-center justify-center p-3 bg-gray-50 hover:bg-gray-100 rounded-md">
                  <WhatsApp className="text-blue-600 text-lg" />
                  <span className="mt-1 text-xs font-medium text-gray-700">Send WhatsApp</span>
                </button>
                <button className="flex flex-col items-center justify-center p-3 bg-gray-50 hover:bg-gray-100 rounded-md">
                  <Tag className="text-blue-600 text-lg" />
                  <span className="mt-1 text-xs font-medium text-gray-700">Tag Lead</span>
                </button>
                <button className="flex flex-col items-center justify-center p-3 bg-gray-50 hover:bg-gray-100 rounded-md">
                  <Build className="text-blue-600 text-lg" />
                  <span className="mt-1 text-xs font-medium text-gray-700">Automation</span>
                </button>
                <button className="flex flex-col items-center justify-center p-3 bg-gray-50 hover:bg-gray-100 rounded-md">
                  <People className="text-blue-600 text-lg" />
                  <span className="mt-1 text-xs font-medium text-gray-700">Assign Agent</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Recent Campaign Leads */}
        <div className="mt-6 bg-white rounded-lg shadow">
          <div className="px-5 py-4 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-medium text-gray-800">Recent Campaign Leads</h2>
              <span
                className="text-sm font-medium cursor-pointer transition-colors duration-200"
                style={{
                  color: themeColor,
                }}
                onMouseEnter={(e) => (e.currentTarget.style.color = secondaryThemeColor)}
                onMouseLeave={(e) => (e.currentTarget.style.color = themeColor)}
              >
                View all campaigns
              </span>
            </div>
          </div>
          <div className="p-5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-medium text-gray-900">Summer Promotion</h3>
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                  Active
                </span>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm text-gray-500">Leads Generated:</span>
                  <span className="text-sm font-medium">143</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-500">Leads Contacted:</span>
                  <span className="text-sm font-medium">98</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-500">Conversion Rate:</span>
                  <span className="text-sm font-medium">28.7%</span>
                </div>
              </div>
              <div className="mt-3 text-right">
                <span
                  className="text-xs font-medium cursor-pointer transition-colors duration-200 inline-flex items-center"
                  style={{ color: themeColor }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = secondaryThemeColor)}
                  onMouseLeave={(e) => (e.currentTarget.style.color = themeColor)}
                >
                  View Campaign <ChevronRight fontSize="inherit" />
                </span>
              </div>
            </div>

            <div className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-medium text-gray-900">Facebook Retargeting</h3>
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                  Active
                </span>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm text-gray-500">Leads Generated:</span>
                  <span className="text-sm font-medium">87</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-500">Leads Contacted:</span>
                  <span className="text-sm font-medium">76</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-500">Conversion Rate:</span>
                  <span className="text-sm font-medium">19.5%</span>
                </div>
              </div>
              <div className="mt-3 text-right">
                <span
                  className="text-xs font-medium cursor-pointer transition-colors duration-200 inline-flex items-center"
                  style={{ color: themeColor }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = secondaryThemeColor)}
                  onMouseLeave={(e) => (e.currentTarget.style.color = themeColor)}
                >
                  View Campaign <ChevronRight fontSize="inherit" />
                </span>
              </div>
            </div>

            <div className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-medium text-gray-900">Email Newsletter</h3>
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                  Active
                </span>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm text-gray-500">Leads Generated:</span>
                  <span className="text-sm font-medium">212</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-500">Leads Contacted:</span>
                  <span className="text-sm font-medium">185</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-500">Conversion Rate:</span>
                  <span className="text-sm font-medium">24.1%</span>
                </div>
              </div>
              <div className="mt-3 text-right">
                <span
                  className="text-xs font-medium cursor-pointer transition-colors duration-200 inline-flex items-center"
                  style={{ color: themeColor }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = secondaryThemeColor)}
                  onMouseLeave={(e) => (e.currentTarget.style.color = themeColor)}
                >
                  View Campaign <ChevronRight fontSize="inherit" />
                </span>
              </div>
            </div>

            <div className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-medium text-gray-900">Google Search Ads</h3>
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                  Paused
                </span>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm text-gray-500">Leads Generated:</span>
                  <span className="text-sm font-medium">156</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-500">Leads Contacted:</span>
                  <span className="text-sm font-medium">132</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-500">Conversion Rate:</span>
                  <span className="text-sm font-medium">31.4%</span>
                </div>
              </div>
              <div className="mt-3 text-right">
                <span
                  className="text-xs font-medium cursor-pointer transition-colors duration-200 inline-flex items-center"
                  style={{ color: themeColor }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = secondaryThemeColor)}
                  onMouseLeave={(e) => (e.currentTarget.style.color = themeColor)}
                >
                  View Campaign <ChevronRight fontSize="inherit" />
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* </main> */}
    </div>
  );
};

export default LeadGenerationDashboard;