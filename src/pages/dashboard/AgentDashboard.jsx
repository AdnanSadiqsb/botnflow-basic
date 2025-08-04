import React, { useContext } from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import {
  People as PeopleIcon,
  AccessTime as AccessTimeIcon,
  TrendingUp as TrendingUpIcon,
  Chat as ChatIcon,
  PersonAdd as PersonAddIcon,
  Download as DownloadIcon,
  Add as AddIcon,
  Sort as SortIcon,
  ArrowUpward as ArrowUpwardIcon,
  ArrowDownward as ArrowDownwardIcon,
  Warning as WarningIcon,
  Equalizer as EqualizerIcon,
  Notifications as NotificationsIcon,
  Phone as PhoneIcon,
  CheckCircle as CheckCircleIcon,
  FiberManualRecord as FiberManualRecordIcon,
  MoreVert as MoreVertIcon,
  ArrowForward as ArrowForwardIcon,
  Email as EmailIcon,
  Schedule as ScheduleIcon,
  SwapHoriz as SwapHorizIcon,
  Computer as ComputerIcon,
  PhoneAndroid as PhoneAndroidIcon
} from '@mui/icons-material';
import { ContentContext } from '../../context/ContextProvider';

const AgentDashboard = () => {
  const { themeColor, secondaryThemeColor } = useContext(ContentContext)
  // Response Time Distribution Chart
  const responseChartOptions = {
    chart: {
      type: 'column'
    },
    title: {
      text: null
    },
    xAxis: {
      categories: ['<1 min', '1-5 min', '5-15 min', '15-30 min', '>30 min'],
      title: {
        text: 'Response Time'
      }
    },
    yAxis: {
      min: 0,
      title: {
        text: 'Number of Conversations'
      }
    },
    legend: {
      enabled: true
    },
    tooltip: {
      formatter: function () {
        return '<b>' + this.x + '</b><br/>' +
          this.series.name + ': ' + this.y;
      }
    },
    plotOptions: {
      column: {
        pointPadding: 0.2,
        borderWidth: 0
      }
    },
    series: [{
      name: 'Conversations',
      data: [42, 68, 23, 7, 2],
      color: '#0ea5e9'
    }, {
      name: 'Average',
      type: 'spline',
      data: [35, 55, 30, 15, 5],
      color: '#f59e0b'
    }]
  };

  // Agent Load Distribution Chart
  const loadChartOptions = {
    chart: {
      type: 'bar'
    },
    title: {
      text: null
    },
    xAxis: {
      categories: ['Ahmed H.', 'Sarah J.', 'Maria P.', 'Robert G.', 'James T.', 'Other Agents'],
      title: {
        text: null
      }
    },
    yAxis: {
      min: 0,
      title: {
        text: 'Number of Leads'
      }
    },
    legend: {
      enabled: false
    },
    tooltip: {
      formatter: function () {
        return '<b>' + this.x + '</b><br/>' +
          'Current leads: ' + this.y;
      }
    },
    plotOptions: {
      bar: {
        dataLabels: {
          enabled: true
        },
        colorByPoint: true,
        colors: ['#22c55e', '#22c55e', '#f59e0b', '#ef4444', '#22c55e', '#22c55e']
      }
    },
    series: [{
      name: 'Leads',
      data: [6, 8, 11, 15, 4, 3]
    }]
  };

  const agents = [
    {
      id: 1,
      initials: 'AH',
      name: 'Ahmed Hassan',
      team: 'Sales Team',
      color: 'bg-primary-600',
      leads: 48,
      conversion: '52%',
      conversionDiff: '+8% vs avg',
      conversionColor: 'text-green-600',
      response: '1.8 min',
      load: 6,
      loadPercentage: '40%',
      loadColor: 'bg-green-500',
      status: 'Online',
      statusColor: 'bg-green-100 text-green-800'
    },
    {
      id: 2,
      initials: 'SJ',
      name: 'Sarah Johnson',
      team: 'Sales Team',
      color: 'bg-indigo-600',
      leads: 42,
      conversion: '48%',
      conversionDiff: '+4% vs avg',
      conversionColor: 'text-green-600',
      response: '2.1 min',
      load: 8,
      loadPercentage: '53%',
      loadColor: 'bg-green-500',
      status: 'Online',
      statusColor: 'bg-green-100 text-green-800'
    },
    {
      id: 3,
      initials: 'MP',
      name: 'Maria Perez',
      team: 'Onboarding Team',
      color: 'bg-pink-600',
      leads: 36,
      conversion: '44%',
      conversionDiff: '0% vs avg',
      conversionColor: 'text-gray-500',
      response: '2.5 min',
      load: 11,
      loadPercentage: '73%',
      loadColor: 'bg-yellow-500',
      status: 'On Call',
      statusColor: 'bg-yellow-100 text-yellow-800'
    },
    {
      id: 4,
      initials: 'RG',
      name: 'Robert Garcia',
      team: 'Support Team',
      color: 'bg-amber-600',
      leads: 28,
      conversion: '36%',
      conversionDiff: '-8% vs avg',
      conversionColor: 'text-red-600',
      response: '3.2 min',
      load: 15,
      loadPercentage: '100%',
      loadColor: 'bg-red-500',
      status: 'Online',
      statusColor: 'bg-green-100 text-green-800'
    },
    {
      id: 5,
      initials: 'JT',
      name: 'James Thompson',
      team: 'Sales Team',
      color: 'bg-emerald-600',
      leads: 22,
      conversion: '41%',
      conversionDiff: '-3% vs avg',
      conversionColor: 'text-red-600',
      response: '2.9 min',
      load: 4,
      loadPercentage: '27%',
      loadColor: 'bg-green-500',
      status: 'Offline',
      statusColor: 'bg-gray-100 text-gray-800'
    }
  ];

  return (
    <div className="bg-gray-50 font-sans pb-6">
      {/* <main className="pt-16 pb-6"> */}
      <div className="max-w-7xl mx-auto px-3">
        {/* Filter Bar */}
        <div id="filter-bar" className="bg-white mt-3 p-4 rounded-lg shadow-sm mb-6 md:flex justify-between items-center">
          <div className="flex justify-between space-x-3">
            <div className="relative">
              <select className="bg-gray-50 border border-gray-300 text-gray-700 px-3 py-2 pr-8 rounded-md focus:outline-none focus:ring-primary-500 focus:border-primary-500">
                <option>All Teams</option>
                <option>Sales Team</option>
                <option>Support Team</option>
                <option>Onboarding Team</option>
              </select>
            </div>
            <div className="relative">
              <select className="bg-gray-50 border border-gray-300 text-gray-700 px-3 py-2 pr-8 rounded-md focus:outline-none focus:ring-primary-500 focus:border-primary-500">
                <option>All Locations</option>
                <option>New York</option>
                <option>San Francisco</option>
                <option>Remote</option>
              </select>
            </div>
          </div>
          <div className="flex justify-between items-center space-x-3">
            <div className="relative">
              <select className="bg-gray-50 border border-gray-300 text-gray-700 md:px-3 py-2 pr-8 rounded-md focus:outline-none focus:ring-primary-500 focus:border-primary-500">
                <option>Today</option>
                <option>This Week</option>
                <option>This Month</option>
                <option>Custom Range</option>
              </select>
            </div>
            <div className='flex gap-3'>
              <button className="bg-gray-100 hover:bg-gray-200 text-gray-700 md:px-4 px-1 rounded-md h-10 ded-md flex items-center">
                <DownloadIcon className="mr-2" />
                Export
              </button>
              <button style={{ backgroundColor: themeColor }} className="bg-primary-600 hover:bg-primary-700 h-10 text-white md:px-4 px-1 py-2 rounded-md flex items-center">
                <AddIcon className="mr-2" />
                Add
              </button>
            </div>
          </div>
        </div>

        {/* Top Agent Performance Cards */}
        <div id="performance-cards" className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-6">
          <div className="bg-white p-4 rounded-lg shadow-sm">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-sm font-medium text-gray-500">Active Agents Today</h3>
              <PeopleIcon className="text-primary-500" />
            </div>
            <div className="flex items-end">
              <span className="text-2xl font-bold text-gray-800">16</span>
              <span className="text-xs text-green-500 ml-2 mb-1 flex items-center">
                <ArrowUpwardIcon className="mr-1 text-xs" />
                3
              </span>
            </div>
            <div className="text-xs text-gray-500 mt-1">vs. yesterday</div>
          </div>

          <div className="bg-white p-4 rounded-lg shadow-sm">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-sm font-medium text-gray-500">Avg Response Time</h3>
              <AccessTimeIcon className="text-primary-500" />
            </div>
            <div className="flex items-end">
              <span className="text-2xl font-bold text-gray-800">2.4</span>
              <span className="text-sm ml-1 font-medium text-gray-600 mb-0.5">min</span>
              <span className="text-xs text-green-500 ml-2 mb-1 flex items-center">
                <ArrowDownwardIcon className="mr-1 text-xs" />
                0.5
              </span>
            </div>
            <div className="text-xs text-gray-500 mt-1">vs. last week</div>
          </div>

          <div className="bg-white p-4 rounded-lg shadow-sm">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-sm font-medium text-gray-500">Avg Lead Conversion</h3>
              <TrendingUpIcon className="text-primary-500" />
            </div>
            <div className="flex items-end">
              <span className="text-2xl font-bold text-gray-800">38</span>
              <span className="text-sm ml-1 font-medium text-gray-600 mb-0.5">%</span>
              <span className="text-xs text-green-500 ml-2 mb-1 flex items-center">
                <ArrowUpwardIcon className="mr-1 text-xs" />
                5%
              </span>
            </div>
            <div className="text-xs text-gray-500 mt-1">vs. last week</div>
          </div>

          <div className="bg-white p-4 rounded-lg shadow-sm">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-sm font-medium text-gray-500">Total Conversations</h3>
              <ChatIcon className="text-primary-500" />
            </div>
            <div className="flex items-end">
              <span className="text-2xl font-bold text-gray-800">142</span>
              <span className="text-xs text-green-500 ml-2 mb-1 flex items-center">
                <ArrowUpwardIcon className="mr-1 text-xs" />
                12
              </span>
            </div>
            <div className="text-xs text-gray-500 mt-1">vs. yesterday</div>
          </div>

          <div className="bg-white p-4 rounded-lg shadow-sm">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-sm font-medium text-gray-500">Leads Assigned Today</h3>
              <PersonAddIcon className="text-primary-500" />
            </div>
            <div className="flex items-end">
              <span className="text-2xl font-bold text-gray-800">87</span>
              <span className="text-xs text-red-500 ml-2 mb-1 flex items-center">
                <ArrowDownwardIcon className="mr-1 text-xs" />
                5
              </span>
            </div>
            <div className="text-xs text-gray-500 mt-1">vs. yesterday</div>
          </div>

          <div className="bg-white p-4 rounded-lg shadow-sm">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-sm font-medium text-gray-500">Missed Conversations</h3>
              <WarningIcon className="text-primary-500" />
            </div>
            <div className="flex items-end">
              <span className="text-2xl font-bold text-gray-800">8</span>
              <span className="text-xs text-red-500 ml-2 mb-1 flex items-center">
                <ArrowUpwardIcon className="mr-1 text-xs" />
                2
              </span>
            </div>
            <div className="text-xs text-gray-500 mt-1">vs. yesterday</div>
          </div>
        </div>

        {/* Smart Agent Suggestions */}
        <div id="smart-suggestions" className="bg-white p-4 rounded-lg shadow-sm mb-6">
          <div className="flex items-center mb-3">
            <ComputerIcon className="text-primary-600 mr-2" />
            <h3 className="text-md font-semibold text-gray-800">Smart Insights</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-primary-50 p-3 rounded-md border border-primary-100">
              <div className="flex items-center text-primary-700 mb-1">
                <EqualizerIcon className="mr-2" />
                <span className="font-medium">Top Performer</span>
              </div>
              <p className="text-sm text-gray-700">Agent Ahmed has highest conversion rate (52%) this week</p>
            </div>
            <div className="bg-amber-50 p-3 rounded-md border border-amber-100">
              <div className="flex items-center text-amber-700 mb-1">
                <NotificationsIcon className="mr-2" />
                <span className="font-medium">Follow-up Alert</span>
              </div>
              <p className="text-sm text-gray-700">3 agents missed &gt;5 follow-ups yesterday</p>
            </div>
            <div className="bg-red-50 p-3 rounded-md border border-red-100">
              <div className="flex items-center text-red-700 mb-1">
                <EqualizerIcon className="mr-2" />
                <span className="font-medium">Workload Imbalance</span>
              </div>
              <p className="text-sm text-gray-700">2 agents have 15+ leads while 4 agents have &lt;5 leads</p>
            </div>
          </div>
        </div>

        {/* Agent Leaderboard */}
        <div id="agent-leaderboard" className="bg-white rounded-lg shadow-sm mb-6">
          <div className="p-4 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-800">Agent Leaderboard</h2>
          </div>
          <div className="overflow-x-auto w-[295px] md:w-[740px] lg:w-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Agent
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Total Leads <SortIcon className="ml-1 text-xs" />
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Conversion % <SortIcon className="ml-1 text-xs" />
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Avg. Response <SortIcon className="ml-1 text-xs" />
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Current Load <SortIcon className="ml-1 text-xs" />
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
                    <div className="flex items-center">
                      <div className="h-10 w-10 rounded-full bg-primary-600 flex items-center justify-center text-white font-medium">
                        AH
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">Ahmed Hassan</div>
                        <div className="text-sm text-gray-500">Sales Team</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">48</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900 font-semibold">52%</div>
                    <div className="text-xs text-green-600">+8% vs avg</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">1.8 min</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="h-2.5 w-16 bg-gray-200 rounded-full mr-2">
                        <div className="h-2.5 bg-green-500 rounded-full" style={{ width: '40%' }}></div>
                      </div>
                      <span className="text-sm text-gray-900">6</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                      Online
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <button className="text-primary-600 hover:text-primary-900">View Details</button>
                  </td>
                </tr>
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="h-10 w-10 rounded-full bg-indigo-600 flex items-center justify-center text-white font-medium">
                        SJ
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">Sarah Johnson</div>
                        <div className="text-sm text-gray-500">Sales Team</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">42</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900 font-semibold">48%</div>
                    <div className="text-xs text-green-600">+4% vs avg</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">2.1 min</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="h-2.5 w-16 bg-gray-200 rounded-full mr-2">
                        <div className="h-2.5 bg-green-500 rounded-full" style={{ width: '53%' }}></div>
                      </div>
                      <span className="text-sm text-gray-900">8</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                      Online
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <button className="text-primary-600 hover:text-primary-900">View Details</button>
                  </td>
                </tr>
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="h-10 w-10 rounded-full bg-pink-600 flex items-center justify-center text-white font-medium">
                        MP
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">Maria Perez</div>
                        <div className="text-sm text-gray-500">Onboarding Team</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">36</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900 font-semibold">44%</div>
                    <div className="text-xs text-gray-500">0% vs avg</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">2.5 min</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="h-2.5 w-16 bg-gray-200 rounded-full mr-2">
                        <div className="h-2.5 bg-yellow-500 rounded-full" style={{ width: '73%' }}></div>
                      </div>
                      <span className="text-sm text-gray-900">11</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-yellow-100 text-yellow-800">
                      On Call
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <button className="text-primary-600 hover:text-primary-900">View Details</button>
                  </td>
                </tr>
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="h-10 w-10 rounded-full bg-amber-600 flex items-center justify-center text-white font-medium">
                        RG
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">Robert Garcia</div>
                        <div className="text-sm text-gray-500">Support Team</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">28</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900 font-semibold">36%</div>
                    <div className="text-xs text-red-600">-8% vs avg</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">3.2 min</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="h-2.5 w-16 bg-gray-200 rounded-full mr-2">
                        <div className="h-2.5 bg-red-500 rounded-full" style={{ width: '100%' }}></div>
                      </div>
                      <span className="text-sm text-gray-900">15</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                      Online
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <button className="text-primary-600 hover:text-primary-900">View Details</button>
                  </td>
                </tr>
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="h-10 w-10 rounded-full bg-emerald-600 flex items-center justify-center text-white font-medium">
                        JT
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">James Thompson</div>
                        <div className="text-sm text-gray-500">Sales Team</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">22</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900 font-semibold">41%</div>
                    <div className="text-xs text-red-600">-3% vs avg</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">2.9 min</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="h-2.5 w-16 bg-gray-200 rounded-full mr-2">
                        <div className="h-2.5 bg-green-500 rounded-full" style={{ width: '27%' }}></div>
                      </div>
                      <span className="text-sm text-gray-900">4</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-gray-100 text-gray-800">
                      Offline
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <button className="text-primary-600 hover:text-primary-900">View Details</button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          {/* <div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
            <button className="text-sm text-primary-600 hover:text-primary-900">View All Agents <ArrowForwardIcon className="ml-1 text-xs" /></button>
          </div> */}
          <div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
            <span
              className="text-xs cursor-pointer transition-colors duration-200 items-center"
              style={{ color: themeColor }}
              onMouseEnter={(e) => (e.currentTarget.style.color = secondaryThemeColor)}
              onMouseLeave={(e) => (e.currentTarget.style.color = themeColor)}
            >
              View All Agents <ArrowForwardIcon className="ml-1 text-xs"/>
            </span>
          </div>
        </div>

        {/* Two Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          {/* Response Time Distribution */}
          <div id="response-time-distribution" className="bg-white rounded-lg shadow-sm">
            <div className="p-4 border-b border-gray-200">
              <h2 className="text-lg font-semibold text-gray-800">Response Time Distribution</h2>
            </div>
            <div className="p-4">
              <HighchartsReact
                highcharts={Highcharts}
                options={responseChartOptions}
              />
            </div>
          </div>

          {/* Agent Load Distribution */}
          <div id="agent-load-distribution" className="bg-white rounded-lg shadow-sm">
            <div className="p-4 border-b border-gray-200">
              <h2 className="text-lg font-semibold text-gray-800">Agent Load Distribution</h2>
            </div>
            <div className="p-4">
              <HighchartsReact
                highcharts={Highcharts}
                options={loadChartOptions}
              />
            </div>
          </div>
        </div>

        {/* Missed or Delayed Follow-ups */}
        <div id="missed-followups" className="bg-white rounded-lg shadow-sm mb-6">
          <div className="p-4 border-b border-gray-200 flex justify-between items-center">
            <h2 className="text-lg font-semibold text-gray-800">Missed or Delayed Follow-ups</h2>
            <span className="px-3 py-1 text-sm bg-red-100 text-red-800 rounded-full">8 total</span>
          </div>
          <div className="overflow-x-auto w-[295px] md:w-[740px] lg:w-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Agent
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Lead Name
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Missed/Delayed By
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Scheduled Time
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Channel
                  </th>
                  <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="h-8 w-8 rounded-full bg-amber-600 flex items-center justify-center text-white font-medium text-xs">
                        RG
                      </div>
                      <div className="ml-3 text-sm font-medium text-gray-900">Robert Garcia</div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    Acme Corp
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="text-sm text-red-600 font-medium">4h 12m</span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    Today, 09:30 AM
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center text-sm text-gray-900">
                      <PhoneIcon className="text-gray-500 mr-2 text-sm" /> Call
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm">
                    <button className="text-primary-600 hover:text-primary-900 mr-3">Message</button>
                    <button className="text-gray-600 hover:text-gray-900 mr-3">Reschedule</button>
                    <button className="text-red-600 hover:text-red-900">Reassign</button>
                  </td>
                </tr>
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="h-8 w-8 rounded-full bg-emerald-600 flex items-center justify-center text-white font-medium text-xs">
                        JT
                      </div>
                      <div className="ml-3 text-sm font-medium text-gray-900">James Thompson</div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    TechStart Inc
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="text-sm text-red-600 font-medium">2h 45m</span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    Today, 11:00 AM
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center text-sm text-gray-900">
                      <PhoneAndroidIcon className="text-green-500 mr-2 text-sm" /> WhatsApp
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm">
                    <button className="text-primary-600 hover:text-primary-900 mr-3">Message</button>
                    <button className="text-gray-600 hover:text-gray-900 mr-3">Reschedule</button>
                    <button className="text-red-600 hover:text-red-900">Reassign</button>
                  </td>
                </tr>
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="h-8 w-8 rounded-full bg-pink-600 flex items-center justify-center text-white font-medium text-xs">
                        MP
                      </div>
                      <div className="ml-3 text-sm font-medium text-gray-900">Maria Perez</div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    Global Solutions Ltd
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="text-sm text-red-600 font-medium">1h 30m</span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    Today, 12:15 PM
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center text-sm text-gray-900">
                      <ChatIcon className="text-blue-500 mr-2 text-sm" /> Chat
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm">
                    <button className="text-primary-600 hover:text-primary-900 mr-3">Message</button>
                    <button className="text-gray-600 hover:text-gray-900 mr-3">Reschedule</button>
                    <button className="text-red-600 hover:text-red-900">Reassign</button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          {/* <div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
            <button className="text-sm text-primary-600 hover:text-primary-900">View All Missed Follow-ups <ArrowForwardIcon className="ml-1 text-xs" /></button>
          </div> */}
          <div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
            <span
              className="text-xs cursor-pointer transition-colors duration-200 items-center"
              style={{ color: themeColor }}
              onMouseEnter={(e) => (e.currentTarget.style.color = secondaryThemeColor)}
              onMouseLeave={(e) => (e.currentTarget.style.color = themeColor)}
            >
              View All Missed Follow-ups<ArrowForwardIcon className='ml-1 text-xs' />
            </span>
          </div>
        </div>

        {/* Real-time Agent Activity */}
        <div id="realtime-activity" className="bg-white rounded-lg shadow-sm ">
          <div className="p-4 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-800">Real-time Agent Activity</h2>
          </div>
          <div className="p-4 grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
            <div className="border rounded-lg p-3 relative">
              <div className="absolute top-3 right-3">
                <FiberManualRecordIcon className="text-green-500 text-xs" />
              </div>
              <div className="flex items-center mb-3">
                <div className="h-10 w-10 rounded-full bg-primary-600 flex items-center justify-center text-white font-medium">
                  AH
                </div>
                <div className="ml-3">
                  <div className="text-sm font-medium text-gray-900">Ahmed Hassan</div>
                  <div className="text-xs text-green-600">Active</div>
                </div>
              </div>
              <div className="text-xs text-gray-500 mb-1">Current lead:</div>
              <div className="text-sm font-medium text-gray-800 mb-2">Skyline Properties</div>
              <div className="text-xs text-gray-500">Last activity: <span className="text-gray-800">2m ago</span></div>
            </div>

            <div className="border rounded-lg p-3 relative">
              <div className="absolute top-3 right-3">
                <FiberManualRecordIcon className="text-yellow-500 text-xs" />
              </div>
              <div className="flex items-center mb-3">
                <div className="h-10 w-10 rounded-full bg-indigo-600 flex items-center justify-center text-white font-medium">
                  SJ
                </div>
                <div className="ml-3">
                  <div className="text-sm font-medium text-gray-900">Sarah Johnson</div>
                  <div className="text-xs text-yellow-600">On Call</div>
                </div>
              </div>
              <div className="text-xs text-gray-500 mb-1">Current lead:</div>
              <div className="text-sm font-medium text-gray-800 mb-2">Nexus Technologies</div>
              <div className="text-xs text-gray-500">Call duration: <span className="text-gray-800">14m 32s</span></div>
            </div>

            <div className="border rounded-lg p-3 relative">
              <div className="absolute top-3 right-3">
                <FiberManualRecordIcon className="text-yellow-500 text-xs" />
              </div>
              <div className="flex items-center mb-3">
                <div className="h-10 w-10 rounded-full bg-pink-600 flex items-center justify-center text-white font-medium">
                  MP
                </div>
                <div className="ml-3">
                  <div className="text-sm font-medium text-gray-900">Maria Perez</div>
                  <div className="text-xs text-yellow-600">On Call</div>
                </div>
              </div>
              <div className="text-xs text-gray-500 mb-1">Current lead:</div>
              <div className="text-sm font-medium text-gray-800 mb-2">Pinnacle Advisors</div>
              <div className="text-xs text-gray-500">Call duration: <span className="text-gray-800">8m 17s</span></div>
            </div>

            <div className="border rounded-lg p-3 relative">
              <div className="absolute top-3 right-3">
                <FiberManualRecordIcon className="text-green-500 text-xs" />
              </div>
              <div className="flex items-center mb-3">
                <div className="h-10 w-10 rounded-full bg-amber-600 flex items-center justify-center text-white font-medium">
                  RG
                </div>
                <div className="ml-3">
                  <div className="text-sm font-medium text-gray-900">Robert Garcia</div>
                  <div className="text-xs text-green-600">Active</div>
                </div>
              </div>
              <div className="text-xs text-gray-500 mb-1">Current lead:</div>
              <div className="text-sm font-medium text-gray-800 mb-2">Horizon Partners</div>
              <div className="text-xs text-gray-500">Last activity: <span className="text-gray-800">1m ago</span></div>
            </div>

            <div className="border rounded-lg p-3 relative">
              <div className="absolute top-3 right-3">
                <FiberManualRecordIcon className="text-gray-400 text-xs" />
              </div>
              <div className="flex items-center mb-3">
                <div className="h-10 w-10 rounded-full bg-emerald-600 flex items-center justify-center text-white font-medium">
                  JT
                </div>
                <div className="ml-3">
                  <div className="text-sm font-medium text-gray-900">James Thompson</div>
                  <div className="text-xs text-gray-600">Offline</div>
                </div>
              </div>
              <div className="text-xs text-gray-500 mb-1">Last lead:</div>
              <div className="text-sm font-medium text-gray-800 mb-2">Summit Enterprises</div>
              <div className="text-xs text-gray-500">Last seen: <span className="text-gray-800">45m ago</span></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AgentDashboard;