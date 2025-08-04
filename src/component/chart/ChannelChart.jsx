import React, { useEffect } from 'react';
import Highcharts from 'highcharts';

const ChannelChart = () => {
  useEffect(() => {
    Highcharts.chart('channel-chart', {
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
            enabled: true,
            format: '<b>{point.name}</b>: {point.percentage:.1f} %'
          },
          showInLegend: true
        }
      },
      series: [{
        name: 'Leads',
        colorByPoint: true,
        data: [
          { name: 'WhatsApp', y: 32.5, color: '#25D366' },
          { name: 'Web Form', y: 24.8, color: '#3B82F6' },
          { name: 'Voice', y: 18.2, color: '#8B5CF6' },
          { name: 'Facebook', y: 14.6, color: '#1877F2' },
          { name: 'API', y: 6.4, color: '#F97316' },
          { name: 'Other', y: 3.5, color: '#9CA3AF' }
        ]
      }]
    });
  }, []);

  return <div id="channel-chart" style={{ height: '300px' }}></div>;
};

export default ChannelChart;