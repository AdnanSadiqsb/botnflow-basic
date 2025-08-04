import React, { useContext } from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import {
  CalendarToday,
  ExpandMore,
  Add,
  Download,
  MoreVert,
  HelpOutline,
  TrendingUp,
  FilterList,
  Search,
  Visibility,
  Edit,
  Pause,
  FileCopy,
  Warning,
  Lightbulb,
  Timeline,
  Phone,
  Email,
  Chat,
  CheckCircle
} from '@mui/icons-material';
import { WhatsApp } from '@mui/icons-material';
import { ContentContext } from '../../context/ContextProvider';

const CampaignDashboard = () => {
  const { themeColor, secondaryThemeColor } = useContext(ContentContext)
  // Campaign Performance Chart options
  const campaignChartOptions = {
    chart: {
      type: 'line',
      style: {
        fontFamily: 'Inter, sans-serif'
      }
    },
    title: {
      text: null
    },
    xAxis: {
      categories: ['Apr 1', 'Apr 5', 'Apr 10', 'Apr 15', 'Apr 20', 'Apr 25', 'Apr 30'],
      labels: {
        style: {
          fontSize: '10px'
        }
      }
    },
    yAxis: [{
      title: {
        text: null
      },
      labels: {
        style: {
          fontSize: '10px'
        }
      }
    }, {
      title: {
        text: null
      },
      opposite: true,
      labels: {
        format: '{value}%',
        style: {
          fontSize: '10px'
        }
      }
    }],
    legend: {
      enabled: false
    },
    credits: {
      enabled: false
    },
    series: [{
      name: 'Leads Generated',
      data: [65, 85, 110, 145, 180, 210, 245],
      color: '#4f46e5',
      marker: {
        symbol: 'circle'
      }
    }, {
      name: 'Conversion Rate',
      data: [18, 22, 24, 26, 28, 25, 27],
      color: '#22c55e',
      yAxis: 1,
      marker: {
        symbol: 'circle'
      }
    }, {
      name: 'Engagement',
      data: [42, 45, 48, 46, 52, 54, 58],
      color: '#f59e0b',
      yAxis: 1,
      marker: {
        symbol: 'circle'
      }
    }],
    tooltip: {
      shared: true
    }
  };
  // Campaign Type Breakdown Chart options
  const campaignTypeChartOptions = {
    chart: {
      type: 'pie',
      style: {
        fontFamily: 'Inter, sans-serif'
      }
    },
    title: {
      text: null
    },
    tooltip: {
      pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
    },
    accessibility: {
      point: {
        valueSuffix: '%'
      }
    },
    plotOptions: {
      pie: {
        allowPointSelect: true,
        cursor: 'pointer',
        dataLabels: {
          enabled: false
        },
        showInLegend: false
      }
    },
    credits: {
      enabled: false
    },
    series: [{
      name: 'Campaign Type',
      colorByPoint: true,
      data: [{
        name: 'Lead Generation',
        y: 38,
        color: '#4f46e5'
      }, {
        name: 'Promotional',
        y: 25,
        color: '#22c55e'
      }, {
        name: 'Follow-up Nurturing',
        y: 20,
        color: '#f59e0b'
      }, {
        name: 'Event/Reminder',
        y: 12,
        color: '#ef4444'
      }, {
        name: 'Abandoned Cart',
        y: 5,
        color: '#a855f7'
      }]
    }]
  };

  const campaigns = [
    {
      name: 'Summer Promo 2023',
      goal: 'Lead Generation',
      dates: 'Apr 01 - Apr 30',
      leads: 486,
      conversion: '42.5%',
      conversionColor: 'bg-green-100 text-green-800',
      cpl: '$3.28',
      channels: [<WhatsApp className="text-green-600" />, <Email className="text-purple-600" />],
      statusColor: 'bg-green-500'
    },
    {
      name: 'New Product Launch',
      goal: 'Promotional',
      dates: 'Apr 05 - Apr 25',
      leads: 324,
      conversion: '38.2%',
      conversionColor: 'bg-green-100 text-green-800',
      cpl: '$4.12',
      channels: [<Chat className="text-blue-600" />, <Email className="text-purple-600" />],
      statusColor: 'bg-green-500'
    },
    {
      name: 'Abandoned Cart Recovery',
      goal: 'Abandoned Cart',
      dates: 'Apr 01 - Apr 30',
      leads: 198,
      conversion: '24.3%',
      conversionColor: 'bg-yellow-100 text-yellow-800',
      cpl: '$5.76',
      channels: [<WhatsApp className="text-green-600" />],
      statusColor: 'bg-yellow-500'
    },
    {
      name: 'Spring Sale Reminder',
      goal: 'Event/Reminder',
      dates: 'Apr 10 - Apr 15',
      leads: 156,
      conversion: '12.8%',
      conversionColor: 'bg-red-100 text-red-800',
      cpl: '$8.45',
      channels: [<Phone className="text-amber-600" />, <Email className="text-purple-600" />],
      statusColor: 'bg-red-500'
    },
    {
      name: 'Customer Feedback',
      goal: 'Follow-up Nurturing',
      dates: 'Apr 01 - Apr 30',
      leads: 245,
      conversion: '32.1%',
      conversionColor: 'bg-green-100 text-green-800',
      cpl: '$3.95',
      channels: [<WhatsApp className="text-green-600" />, <Chat className="text-blue-600" />],
      statusColor: 'bg-green-500'
    }
  ];

  return (
    <div className="bg-gray-50 font-sans">
      <div className="min-h-screen">
        <div className="p-3">

          <div id="dashboard-controls" className="lg:flex justify-between items-center mb-6 lg:space-y-0 space-y-3">
            <div className="md:flex justify-between items-center md:space-x-3 space-y-2 md:space-y-0">
              <div className="relative">
                <div className="border border-gray-300 rounded-md px-4 py-2 flex items-center bg-white">
                  <CalendarToday className="mr-2 text-gray-500" style={{ fontSize: '1rem' }} />
                  <span className="text-sm text-gray-700">Apr 1, 2023 - Apr 30, 2023</span>
                  <ExpandMore className="ml-4 text-gray-500" style={{ fontSize: '0.75rem' }} />
                </div>
              </div>
              <div className="relative">
                <div className="border border-gray-300 rounded-md px-4 py-2 flex items-center bg-white">
                  <span className="text-sm text-gray-700">All Campaigns</span>
                  <ExpandMore className="ml-4 text-gray-500" style={{ fontSize: '0.75rem' }} />
                </div>
              </div>
            </div>
            <div id="quick-actions" className="md:flex justify-between space-x-2 space-y-3 md:space-y-0">
              <button style={{ backgroundColor: themeColor }} className=" text-white w-full md:w-fit px-4 py-2 rounded-md text-sm font-medium flex items-center">
                <Add className="mr-2" style={{ fontSize: '1rem' }} />
                Create Campaign
              </button>
              <div className='flex justify-between gap-2'>
                <button className="border border-gray-300 bg-white text-gray-700 px-4 py-2 rounded-md text-sm font-medium flex items-center">
                  <Download className="mr-2" style={{ fontSize: '1rem' }} />
                  Export Report
                </button>
                <button className="border border-gray-300 bg-white text-gray-700 px-3 py-2 rounded-md">
                  <MoreVert style={{ fontSize: '1rem' }} />
                </button>
              </div>
            </div>
          </div>

          {/* Top Campaign Summary Cards */}
          <div id="summary-cards" className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-6">
            <div className="bg-white rounded-lg shadow-sm p-4 border border-gray-100">
              <div className="flex justify-between items-center mb-2">
                <h3 className="text-xs font-medium text-gray-500">TOTAL CAMPAIGNS RUNNING</h3>
                <HelpOutline className="text-gray-300" style={{ fontSize: '0.75rem' }} />
              </div>
              <div className="flex items-center">
                <span className="text-2xl font-bold mr-2">16</span>
                <span className="text-xs px-2 py-1 bg-green-100 text-green-600 rounded-full flex items-center">
                  <TrendingUp className="mr-1" style={{ fontSize: '0.75rem' }} />
                  +3
                </span>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-sm p-4 border border-gray-100">
              <div className="flex justify-between items-center mb-2">
                <h3 className="text-xs font-medium text-gray-500">LEADS GENERATED THIS WEEK</h3>
                <HelpOutline className="text-gray-300" style={{ fontSize: '0.75rem' }} />
              </div>
              <div className="flex items-center">
                <span className="text-2xl font-bold mr-2">1,245</span>
                <span className="text-xs px-2 py-1 bg-green-100 text-green-600 rounded-full flex items-center">
                  <TrendingUp className="mr-1" style={{ fontSize: '0.75rem' }} />
                  12%
                </span>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-sm p-4 border border-gray-100">
              <div className="flex justify-between items-center mb-2">
                <h3 className="text-xs font-medium text-gray-500">OVERALL CONVERSION RATE</h3>
                <HelpOutline className="text-gray-300" style={{ fontSize: '0.75rem' }} />
              </div>
              <div className="flex items-center">
                <span className="text-2xl font-bold mr-2">24.8%</span>
                <span className="text-xs px-2 py-1 bg-green-100 text-green-600 rounded-full flex items-center">
                  <TrendingUp className="mr-1" style={{ fontSize: '0.75rem' }} />
                  3.2%
                </span>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-sm p-4 border border-gray-100">
              <div className="flex justify-between items-center mb-2">
                <h3 className="text-xs font-medium text-gray-500">TOP PERFORMING CAMPAIGN</h3>
                <HelpOutline className="text-gray-300" style={{ fontSize: '0.75rem' }} />
              </div>
              <div className="flex flex-col">
                <span className="text-sm font-medium">Summer Promo 2023</span>
                <span className="text-xs text-gray-500">42.5% conversion</span>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-sm p-4 border border-gray-100">
              <div className="flex justify-between items-center mb-2">
                <h3 className="text-xs font-medium text-gray-500">COST PER LEAD (AVG)</h3>
                <HelpOutline className="text-gray-300" style={{ fontSize: '0.75rem' }} />
              </div>
              <div className="flex items-center">
                <span className="text-2xl font-bold mr-2">$4.35</span>
                <span className="text-xs px-2 py-1 bg-red-100 text-red-600 rounded-full flex items-center">
                  <TrendingUp className="mr-1" style={{ fontSize: '0.75rem' }} />
                  $0.20
                </span>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-sm p-4 border border-gray-100">
              <div className="flex justify-between items-center mb-2">
                <h3 className="text-xs font-medium text-gray-500">MOST ENGAGED CHANNEL</h3>
                <HelpOutline className="text-gray-300" style={{ fontSize: '0.75rem' }} />
              </div>
              <div className="flex flex-col">
                <span className="text-sm font-medium">WhatsApp</span>
                <span className="text-xs text-gray-500">36.7% engagement rate</span>
              </div>
            </div>
          </div>

          {/* Campaign Performance Chart */}
          <div id="performance-chart" className="bg-white rounded-lg shadow-sm p-4 border border-gray-100 mb-6">
            <div className="md:flex justify-between items-center mb-4">
              <h3 className="font-medium">Campaign Performance</h3>
              <div className="md:flex items-center space-x-3 space-y-1 md:space-y-0">
                <div className="flex items-center">
                  <span className="w-3 h-3 bg-indigo-500 rounded-full mr-1"></span>
                  <span className="text-xs text-gray-600">Leads Generated</span>
                </div>
                <div className="flex items-center">
                  <span className="w-3 h-3 bg-green-500 rounded-full mr-1"></span>
                  <span className="text-xs text-gray-600">Conversion Rate</span>
                </div>
                <div className="flex items-center">
                  <span className="w-3 h-3 bg-amber-500 rounded-full mr-1"></span>
                  <span className="text-xs text-gray-600">Engagement</span>
                </div>
                <div className="border border-gray-200 rounded-md p-1">
                  <button className="text-xs px-2 py-1 bg-indigo-50 text-indigo-600 rounded">Daily</button>
                  <button className="text-xs px-2 py-1 text-gray-500">Weekly</button>
                  <button className="text-xs px-2 py-1 text-gray-500">Monthly</button>
                </div>
              </div>
            </div>
            <HighchartsReact
              highcharts={Highcharts}
              options={campaignChartOptions}
              containerProps={{ style: { height: '300px' } }}
            />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
            {/* Campaign Type Breakdown */}
            <div id="campaign-type" className="bg-white rounded-lg shadow-sm p-4 border border-gray-100">
              <div className="flex justify-between items-center mb-4">
                <h3 className="font-medium">Campaign Type Breakdown</h3>
                <button className="text-gray-400">
                  <MoreVert style={{ fontSize: '1rem' }} />
                </button>
              </div>
              <HighchartsReact
                highcharts={Highcharts}
                options={campaignTypeChartOptions}
                containerProps={{ style: { height: '200px' } }}
              />
              <div className="grid grid-cols-2 gap-2 mt-4">
                <div className="flex items-center">
                  <span className="w-3 h-3 bg-indigo-500 rounded-full mr-2"></span>
                  <span className="text-xs">Lead Generation (38%)</span>
                </div>
                <div className="flex items-center">
                  <span className="w-3 h-3 bg-green-500 rounded-full mr-2"></span>
                  <span className="text-xs">Promotional (25%)</span>
                </div>
                <div className="flex items-center">
                  <span className="w-3 h-3 bg-amber-500 rounded-full mr-2"></span>
                  <span className="text-xs">Follow-up Nurturing (20%)</span>
                </div>
                <div className="flex items-center">
                  <span className="w-3 h-3 bg-red-500 rounded-full mr-2"></span>
                  <span className="text-xs">Event/Reminder (12%)</span>
                </div>
                <div className="flex items-center">
                  <span className="w-3 h-3 bg-purple-500 rounded-full mr-2"></span>
                  <span className="text-xs">Abandoned Cart (5%)</span>
                </div>
              </div>
            </div>

            {/* A/B Test Results */}
            <div id="ab-test" className="bg-white rounded-lg shadow-sm p-4 border border-gray-100">
              <div className="flex justify-between items-center mb-4">
                <h3 className="font-medium">A/B Test Results</h3>
                <button className="text-xs text-indigo-600 font-medium">View All Tests</button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div className="border border-gray-200 rounded-md p-3">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-medium text-gray-500">VERSION A</span>
                    <span className="text-xs px-2 py-0.5 bg-green-100 text-green-600 rounded-full">Winner</span>
                  </div>
                  <h4 className="font-medium text-sm mb-3">Summer Promo - CTA Button</h4>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-xs text-gray-500">Leads:</span>
                      <span className="text-xs font-medium">342</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-xs text-gray-500">Conversion:</span>
                      <span className="text-xs font-medium">28.5%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-xs text-gray-500">Response Time:</span>
                      <span className="text-xs font-medium">1.2s</span>
                    </div>
                  </div>
                </div>
                <div className=" border border-gray-200 rounded-md p-3">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-medium text-gray-500">VERSION B</span>
                  </div>
                  <h4 className="font-medium text-sm mb-3">Summer Promo - CTA Button</h4>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-xs text-gray-500">Leads:</span>
                      <span className="text-xs font-medium">298</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-xs text-gray-500">Conversion:</span>
                      <span className="text-xs font-medium">24.8%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-xs text-gray-500">Response Time:</span>
                      <span className="text-xs font-medium">1.5s</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="mt-3 p-2 bg-indigo-50 rounded-md">
                <p className="text-xs text-indigo-700">Version A outperformed by 15% with "Get Started" vs "Learn More" CTA text.</p>
              </div>
            </div>

            {/* Smart Campaign Insights */}
            <div id="campaign-insights" className="bg-white rounded-lg shadow-sm p-4 border border-gray-100">
              <div className="flex justify-between items-center mb-4">
                <h3 className="font-medium">Smart Campaign Insights</h3>
                <span className="text-xs bg-indigo-100 text-indigo-600 px-2 py-1 rounded-full">AI Powered</span>
              </div>
              <div className="space-y-3">
                <div className="p-3 bg-red-50 border border-red-100 rounded-md">
                  <div className="flex">
                    <Warning className="text-red-500 mt-0.5 mr-2" style={{ fontSize: '1rem' }} />
                    <div>
                      <h4 className="text-sm font-medium text-red-700">High CPL Alert</h4>
                      <p className="text-xs text-red-600 mt-1">Spring Sale campaign has 3x higher CPL than average — check targeting settings.</p>
                    </div>
                  </div>
                </div>
                <div className="p-3 bg-green-50 border border-green-100 rounded-md">
                  <div className="flex">
                    <Lightbulb className="text-green-500 mt-0.5 mr-2" style={{ fontSize: '1rem' }} />
                    <div>
                      <h4 className="text-sm font-medium text-green-700">Channel Insight</h4>
                      <p className="text-xs text-green-600 mt-1">Promo Campaign "Summer Special" is converting best on Webchat (32% vs 18% avg).</p>
                    </div>
                  </div>
                </div>
                <div className="p-3 bg-amber-50 border border-amber-100 rounded-md">
                  <div className="flex">
                    <Timeline className="text-amber-500 mt-0.5 mr-2" style={{ fontSize: '1rem' }} />
                    <div>
                      <h4 className="text-sm font-medium text-amber-700">Performance Trend</h4>
                      <p className="text-xs text-amber-600 mt-1">Voice campaigns have 15% higher conversion this month compared to previous period.</p>
                    </div>
                  </div>
                </div>
                <button className="w-full text-xs text-indigo-600 font-medium mt-2">View All Insights</button>
              </div>
            </div>
          </div>

          {/* Geo Heatmap of Campaign Response */}
          <div id="geo-heatmap" className="bg-white rounded-lg shadow-sm p-4 border border-gray-100 mb-6">
            <div className="md:flex justify-between items-center mb-4">
              <h3 className="font-medium text-sm md:text-md">Geo Distribution of Campaign Responses</h3>
              <div className="flex items-center space-x-3 mt-3 md:mt-0">
                <div className="relative">
                  <div className="border border-gray-300 rounded-md px-3 py-1.5 flex items-center bg-white text-sm">
                    <span className="text-gray-700">All Campaigns</span>
                    <ExpandMore className="ml-0 md:ml-2 text-gray-500" style={{ fontSize: '0.75rem' }} />
                  </div>
                </div>
                <div className="relative">
                  <div className="border border-gray-300 rounded-md px-3 py-1.5 flex items-center bg-white text-sm">
                    <span className="text-gray-700">All Channels</span>
                    <ExpandMore className="ml-0 md:ml-2 text-gray-500" style={{ fontSize: '0.75rem' }} />
                  </div>
                </div>
              </div>
            </div>
            <div className="md:flex md:space-x-4">
              <div className="flex-3">
                <div className="h-[300px] bg-gray-100 rounded-md overflow-hidden">
                  <img className="w-full h-full object-cover" src="https://storage.googleapis.com/uxpilot-auth.appspot.com/b3329cb48a-395eb8786e950816ae4b.png" alt="map visualization showing heat map of campaign responses across different regions with darker colors showing higher engagement" />
                </div>
              </div>
              <div className="flex-1 mt-5 md:mt-0">
                <h4 className="text-sm font-medium mb-3">Top Performing Regions</h4>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="w-2 h-8 bg-indigo-600 rounded-sm mr-2"></div>
                      <div>
                        <h5 className="text-sm font-medium">New York</h5>
                        <p className="text-xs text-gray-500">342 leads</p>
                      </div>
                    </div>
                    <span className="text-xs font-medium">32.5%</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="w-2 h-8 bg-indigo-500 rounded-sm mr-2"></div>
                      <div>
                        <h5 className="text-sm font-medium">Los Angeles</h5>
                        <p className="text-xs text-gray-500">286 leads</p>
                      </div>
                    </div>
                    <span className="text-xs font-medium">27.2%</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="w-2 h-8 bg-indigo-400 rounded-sm mr-2"></div>
                      <div>
                        <h5 className="text-sm font-medium">Chicago</h5>
                        <p className="text-xs text-gray-500">214 leads</p>
                      </div>
                    </div>
                    <span className="text-xs font-medium">20.4%</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="w-2 h-8 bg-indigo-300 rounded-sm mr-2"></div>
                      <div>
                        <h5 className="text-sm font-medium">Miami</h5>
                        <p className="text-xs text-gray-500">198 leads</p>
                      </div>
                    </div>
                    <span className="text-xs font-medium">18.9%</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Channel-wise Campaign Summary */}
          <div id="channel-summary" className="bg-white rounded-lg shadow-sm p-4 border border-gray-100 mb-3">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-medium">Channel Performance</h3>
              <button
                className="text-xs cursor-pointer transition-colors duration-200"
                style={{ color: themeColor }}
                onMouseEnter={(e) => (e.currentTarget.style.color = secondaryThemeColor)}
                onMouseLeave={(e) => (e.currentTarget.style.color = themeColor)}
              >
                View Detailed Report
              </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="border border-gray-200 rounded-md p-3">
                <div className="flex items-center mb-3">
                  <div className="w-8 h-8 bg-green-100 rounded-md flex items-center justify-center mr-2">
                    <WhatsApp className="text-green-600" style={{ fontSize: '1.25rem' }} />
                  </div>
                  <h4 className="font-medium">WhatsApp</h4>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-xs text-gray-500">Campaigns:</span>
                    <span className="text-xs font-medium">8</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-xs text-gray-500">Messages Sent:</span>
                    <span className="text-xs font-medium">12,456</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-xs text-gray-500">Response Rate:</span>
                    <span className="text-xs font-medium">68.2%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-xs text-gray-500">Conversion:</span>
                    <span className="text-xs font-medium">32.5%</span>
                  </div>
                </div>
              </div>
              <div className="border border-gray-200 rounded-md p-3">
                <div className="flex items-center mb-3">
                  <div className="w-8 h-8 bg-blue-100 rounded-md flex items-center justify-center mr-2">
                    <Chat className="text-blue-600" style={{ fontSize: '1.25rem' }} />
                  </div>
                  <h4 className="font-medium">Webchat</h4>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-xs text-gray-500">Campaigns:</span>
                    <span className="text-xs font-medium">5</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-xs text-gray-500">Sessions:</span>
                    <span className="text-xs font-medium">8,932</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-xs text-gray-500">Response Rate:</span>
                    <span className="text-xs font-medium">54.1%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-xs text-gray-500">Conversion:</span>
                    <span className="text-xs font-medium">28.7%</span>
                  </div>
                </div>
              </div>
              <div className="border border-gray-200 rounded-md p-3">
                <div className="flex items-center mb-3">
                  <div className="w-8 h-8 bg-amber-100 rounded-md flex items-center justify-center mr-2">
                    <Phone className="text-amber-600" style={{ fontSize: '1.25rem' }} />
                  </div>
                  <h4 className="font-medium">Voice</h4>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-xs text-gray-500">Campaigns:</span>
                    <span className="text-xs font-medium">4</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-xs text-gray-500">Calls Made:</span>
                    <span className="text-xs font-medium">3,245</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-xs text-gray-500">Answer Rate:</span>
                    <span className="text-xs font-medium">42.8%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-xs text-gray-500">Conversion:</span>
                    <span className="text-xs font-medium">18.3%</span>
                  </div>
                </div>
              </div>
              <div className="border border-gray-200 rounded-md p-3">
                <div className="flex items-center mb-3">
                  <div className="w-8 h-8 bg-purple-100 rounded-md flex items-center justify-center mr-2">
                    <Email className="text-purple-600" style={{ fontSize: '1.25rem' }} />
                  </div>
                  <h4 className="font-medium">Email</h4>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-xs text-gray-500">Campaigns:</span>
                    <span className="text-xs font-medium">6</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-xs text-gray-500">Emails Sent:</span>
                    <span className="text-xs font-medium">24,876</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-xs text-gray-500">Open Rate:</span>
                    <span className="text-xs font-medium">32.4%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-xs text-gray-500">Conversion:</span>
                    <span className="text-xs font-medium">12.1%</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Campaign List & Stats */}
          <div id="campaign-list" className="bg-white rounded-lg shadow-sm p-4 border border-gray-100 mb-3">
            <div className="md:flex justify-between items-center mb-4">
              <h3 className="font-medium">Campaign List</h3>
              <div className="md:flex items-center space-x-3">
                  <div className="w-fit border border-gray-300 rounded-md px-3 py-1.5 flex items-center bg-white text-sm">
                    <FilterList className="mr-2 text-gray-500" style={{ fontSize: '1rem' }} />
                    <span className="text-gray-700">Filter</span>
                    <ExpandMore className="ml-2 text-gray-500" style={{ fontSize: '0.75rem' }} />
                  </div>
                  <div className="w-fit flex mt-3 md:mt-0 items-center border border-gray-300 rounded-md overflow-hidden">
                    <input type="text" placeholder="Search campaigns..." className="text-sm px-3 py-1.5 focus:outline-none" />
                      <Search className="text-gray-500" style={{ fontSize: '1rem' }} />
                </div>
              </div>
            </div>
            <div className="overflow-x-auto w-[260px] sm:w-[380px] md:w-[412px] lg:w-auto">
              <table className="min-w-full bg-white text-sm text-left text-gray-700">
                <thead>
                  <tr className="text-xs font-medium text-gray-500 uppercase bg-gray-50 tracking-wider">
                    {['Campaign Name', 'Goal', 'Dates', 'Leads', 'Conversion', 'CPL', 'Channels', 'Actions'].map((heading) => (
                      <th key={heading} className="px-4 py-3 border-b border-gray-200 whitespace-nowrap">
                        <div className="flex items-center">
                          {heading}
                          {['Campaign Name', 'Goal', 'Dates', 'Leads', 'Conversion', 'CPL'].includes(heading) && (
                            <ExpandMore className="ml-1" style={{ fontSize: '1rem' }} />
                          )}
                        </div>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {campaigns.map((campaign, idx) => (
                    <tr key={idx}>
                      <td className="px-4 py-3 whitespace-nowrap">
                        <div className="flex items-center">
                          <span className={`w-2 h-2 ${campaign.statusColor} rounded-full `}></span>
                          <span className="font-medium text-sm">{campaign.name}</span>
                        </div>
                      </td>
                      <td className="px-4 py-3 text-sm">{campaign.goal}</td>
                      <td className="px-4 py-3 text-sm">{campaign.dates}</td>
                      <td className="px-4 py-3 text-sm font-medium">{campaign.leads}</td>
                      <td className="px-4 py-3">
                        <span className={`px-2 py-1 text-xs font-medium rounded-full ${campaign.conversionColor}`}>
                          {campaign.conversion}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-sm">{campaign.cpl}</td>
                      <td className="px-4 py-3">
                        <div className="flex space-x-1">
                          {campaign.channels.map((icon, i) => (
                            <span key={i} className="inline-block">{icon}</span>
                          ))}
                        </div>
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex space-x-2">
                          <button className="text-indigo-600 hover:text-indigo-800">
                            <Visibility style={{ fontSize: '1.25rem' }} />
                          </button>
                          <button className="text-gray-600 hover:text-gray-800">
                            <Edit style={{ fontSize: '1.25rem' }} />
                          </button>
                          <button className="text-gray-600 hover:text-gray-800">
                            <Pause style={{ fontSize: '1.25rem' }} />
                          </button>
                          <button className="text-gray-600 hover:text-gray-800">
                            <FileCopy style={{ fontSize: '1.25rem' }} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="md:flex items-center justify-between mt-4">
              <div className="text-sm text-gray-500">Showing 5 of 16 campaigns</div>
              <div className="flex space-x-1 mt-2 md:mt-0">
                <button className="px-3 py-1 border border-gray-300 rounded-md text-sm">Previous</button>
                <button style={{ backgroundColor: themeColor }} className="px-3 py-1 text-white rounded-md text-sm">1</button>
                <button className="px-3 py-1 border border-gray-300 rounded-md text-sm">2</button>
                <button className="px-3 py-1 border border-gray-300 rounded-md text-sm">3</button>
                <button className="px-3 py-1 border border-gray-300 rounded-md text-sm">Next</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CampaignDashboard;