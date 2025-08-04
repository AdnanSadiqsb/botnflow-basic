import React from 'react';
import {
  Assessment,
  Phone,
  History,
  Voicemail,
  People,
  Settings,
  Notifications,
  Timeline,
  Check,
  PhoneDisabled,
  AccessTime,
  Person
} from '@mui/icons-material';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';

const CallAnalytic = () => {
  const volumeChartOptions = {
    chart: {
      type: 'line',
      height: 250
    },
    title: {
      text: null
    },
    xAxis: {
      categories: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
    },
    yAxis: {
      title: {
        text: 'Calls'
      }
    },
    series: [{
      name: 'Calls',
      data: [820, 932, 901, 934, 1290, 1330, 1320],
      color: '#2563eb'
    }],
    legend: {
      enabled: false
    }
  };

  const agentChartOptions = {
    chart: {
      type: 'bar',
      height: 250
    },
    title: {
      text: null
    },
    xAxis: {
      categories: ['Sarah J.', 'Mike C.', 'Lisa W.', 'John D.', 'Emma S.']
    },
    yAxis: {
      title: {
        text: 'Calls'
      }
    },
    series: [{
      name: 'Calls',
      data: [156, 142, 138, 125, 118],
      color: '#2563eb'
    }],
    legend: {
      enabled: false
    }
  };

  return (
    <div className="flex h-screen mt-16 bg-gray-50 pb-3">
      <main className="flex-1 overflow-auto">
        <div className="p-3">
          {/* Overview Metrics */}
          <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-5">
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                  <Phone className="text-blue-600 text-xl" />
                </div>
                <span className="text-xs text-green-600 bg-green-100 px-2 py-1 rounded-full">+12%</span>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-1">1,247</h3>
              <p className="text-gray-600 text-sm">Total Calls Today</p>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                  <Check className="text-green-600 text-xl" />
                </div>
                <span className="text-xs text-green-600 bg-green-100 px-2 py-1 rounded-full">+8%</span>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-1">1,156</h3>
              <p className="text-gray-600 text-sm">Answered Calls</p>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
                  <PhoneDisabled className="text-red-600 text-xl" />
                </div>
                <span className="text-xs text-red-600 bg-red-100 px-2 py-1 rounded-full">-5%</span>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-1">91</h3>
              <p className="text-gray-600 text-sm">Missed Calls</p>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                  <AccessTime className="text-purple-600 text-xl" />
                </div>
                <span className="text-xs text-green-600 bg-green-100 px-2 py-1 rounded-full">+2%</span>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-1">4:32</h3>
              <p className="text-gray-600 text-sm">Avg Call Duration</p>
            </div>
          </section>

          {/* Charts Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-gray-900">Daily Call Volume</h3>
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 bg-blue-600 rounded-full"></span>
                  <span className="text-sm text-gray-600">Calls</span>
                </div>
              </div>
              <HighchartsReact
                highcharts={Highcharts}
                options={volumeChartOptions}
              />
            </div>

            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-gray-900">Agent Call Distribution</h3>
              </div>
              <HighchartsReact
                highcharts={Highcharts}
                options={agentChartOptions}
              />
            </div>
          </div>

          {/* Detailed Stats */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900 mb-6">Top Performers</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <img 
                      src="https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-1.jpg" 
                      alt="Agent" 
                      className="w-10 h-10 rounded-full"
                    />
                    <div>
                      <p className="font-medium text-gray-900">Sarah Johnson</p>
                      <p className="text-sm text-gray-500">Sales Team</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-gray-900">156</p>
                    <p className="text-sm text-gray-500">calls</p>
                  </div>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <img 
                      src="https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-2.jpg" 
                      alt="Agent" 
                      className="w-10 h-10 rounded-full"
                    />
                    <div>
                      <p className="font-medium text-gray-900">Mike Chen</p>
                      <p className="text-sm text-gray-500">Support Team</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-gray-900">142</p>
                    <p className="text-sm text-gray-500">calls</p>
                  </div>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <img 
                      src="https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-5.jpg" 
                      alt="Agent" 
                      className="w-10 h-10 rounded-full"
                    />
                    <div>
                      <p className="font-medium text-gray-900">Lisa Wang</p>
                      <p className="text-sm text-gray-500">Technical Team</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-gray-900">138</p>
                    <p className="text-sm text-gray-500">calls</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900 mb-6">Call Status</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-4 h-4 bg-green-500 rounded-full"></div>
                    <span className="text-gray-700">Answered</span>
                  </div>
                  <div className="text-right">
                    <span className="font-semibold text-gray-900">92.7%</span>
                    <div className="w-24 h-2 bg-gray-200 rounded-full mt-1">
                      <div className="w-[92.7%] h-2 bg-green-500 rounded-full"></div>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-4 h-4 bg-red-500 rounded-full"></div>
                    <span className="text-gray-700">Missed</span>
                  </div>
                  <div className="text-right">
                    <span className="font-semibold text-gray-900">7.3%</span>
                    <div className="w-24 h-2 bg-gray-200 rounded-full mt-1">
                      <div className="w-[7.3%] h-2 bg-red-500 rounded-full"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900 mb-6">Recent Activity</h3>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                  <div>
                    <p className="text-sm text-gray-900">Call completed by Sarah</p>
                    <p className="text-xs text-gray-500">2 minutes ago</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                  <div>
                    <p className="text-sm text-gray-900">New call started by Mike</p>
                    <p className="text-xs text-gray-500">5 minutes ago</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-red-500 rounded-full mt-2"></div>
                  <div>
                    <p className="text-sm text-gray-900">Missed call - Customer ID #1234</p>
                    <p className="text-xs text-gray-500">8 minutes ago</p>
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

export default CallAnalytic;