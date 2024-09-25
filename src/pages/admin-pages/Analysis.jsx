import React, { useEffect, useState } from 'react';
import {
  useServicesPerDay,
  useServicesUsageRate,
  useServicesRatings
} from '../../hooks/useAnalysisHooks';
import { Bar, Pie, Line } from 'react-chartjs-2';
import Chart from 'chart.js/auto';
import { FaDownload } from 'react-icons/fa';
import generatePDF from '../../helpers/pdfGenerator';
import Loading from '../../components/Loading';

const DashboardAnalysis = () => {
  const [requestData, setRequestData] = useState([]);
  const [serviceUsage, setServiceUsage] = useState([]);
  const [serviceFeedback, setServiceFeedback] = useState([]);
  const [newServices, setNewServices] = useState([]);
  const { data: servicesPerDayData, isLoading: isLoadingServicesPerDay } = useServicesPerDay();
  const { data: servicesUsageRateData, isLoading: isLoadingUsageRate } = useServicesUsageRate();
  const { data: servicesRatingsData, isLoading: isLoadingRatings } = useServicesRatings();

  useEffect(() => {
    if (!isLoadingServicesPerDay && servicesPerDayData) {
      setRequestData(servicesPerDayData || []);
      setNewServices(servicesPerDayData || []);
    }

    if (!isLoadingUsageRate && servicesUsageRateData) {
      setServiceUsage(servicesUsageRateData || []);
    }

    if (!isLoadingRatings && servicesRatingsData) {
      setServiceFeedback(servicesRatingsData || []);
    }
  }, [servicesPerDayData, servicesUsageRateData, servicesRatingsData, isLoadingServicesPerDay, isLoadingUsageRate, isLoadingRatings]);

  if (requestData && isLoadingServicesPerDay && isLoadingUsageRate && isLoadingRatings) {
    return <Loading />;
  }

  const chartOptions = {
    maintainAspectRatio: false,
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
        labels: {
          color: '#333',
        },
      },
      tooltip: {
        callbacks: {
          label: function (context) {
            return `${context.dataset.label}: ${context.raw}`;
          },
        },
      },
    },
    scales: {
      x: {
        grid: {
          color: 'rgba(200, 200, 200, 0.2)',
        },
        ticks: {
          color: '#333',
        },
      },
      y: {
        grid: {
          color: 'rgba(200, 200, 200, 0.2)',
        },
        ticks: {
          color: '#333',
        },
      },
    },
  };

  const getColorForValue = (value, type) => {
    if (type === 'usage') {
      return value > 20 ? 'rgba(75, 192, 192, 0.6)' :
        value > 10 ? 'rgba(255, 99, 132, 0.6)' :
          'rgba(255, 159, 64, 0.6)';
    } else if (type === 'feedback') {
      return value >= 10 ? 'rgba(75, 192, 192, 0.6)' :
        value >= 5 ? 'rgba(255, 159, 64, 0.6)' :
          'rgba(255, 99, 132, 0.6)';
    } else {
      return 'rgba(153, 102, 255, 0.6)';
    }
  };
  const requestChartData = {
    labels: requestData.length > 0 ? requestData.map((r) => r?.date) : ['No Data'],
    datasets: [
      {
        label: 'Request Rates',
        data: requestData.length > 0 ? requestData.map((r) => r?.count) : [0],
        backgroundColor: requestData.length > 0 ? requestData.map((r) => getColorForValue(r?.count)) : ['rgba(153, 102, 255, 0.6)'],
        borderColor: requestData.length > 0 ? requestData.map((r) => getColorForValue(r?.count, 'border')) : ['rgba(153, 102, 255, 1)'],
        borderWidth: 1,
      },
    ],
  };

  const serviceUsageData = {
    labels: serviceUsage.length > 0 ? serviceUsage.map((s) => s?.name) : ['No Data'],
    datasets: [
      {
        label: 'Service Usage Rate',
        data: serviceUsage.length > 0 ? serviceUsage.map((s) => Math.floor(s?.usagerate)) : [0],
        backgroundColor: serviceUsage.length > 0 ? serviceUsage.map((s) => getColorForValue(Math.floor(s?.usagerate), 'usage')) : ['rgba(153, 102, 255, 0.6)'],
        borderColor: serviceUsage.length > 0 ? serviceUsage.map((s) => getColorForValue(Math.floor(s?.usagerate), 'border')) : ['rgba(153, 102, 255, 1)'],
        borderWidth: 1,
      },
    ],
  };

  const serviceFeedbackData = {
    labels: serviceFeedback.length > 0 ? serviceFeedback.map((s) => s?.name) : ['No Data'],
    datasets: [
      {
        label: 'Service Ratings',
        data: serviceFeedback.length > 0 ? serviceFeedback.map((s) => Math.floor(s?.rating)) : [0],
        backgroundColor: serviceFeedback.length > 0 ? serviceFeedback.map((s) => getColorForValue(Math.floor(s?.rating), 'feedback')) : ['rgba(153, 102, 255, 0.6)'],
        borderColor: serviceFeedback.length > 0 ? serviceFeedback.map((s) => getColorForValue(Math.floor(s?.rating), 'border')) : ['rgba(153, 102, 255, 1)'],
        borderWidth: 1,
      },
    ],
  };

  const newServicesData = {
    labels: newServices.length > 0 ? newServices.map((s) => s?.date) : ['No Data'],
    datasets: [
      {
        label: 'New Services',
        data: newServices.length > 0 ? newServices.map((s) => s?.count) : [0],
        backgroundColor: 'rgba(153, 102, 255, 0.2)',
        borderColor: 'rgba(153, 102, 255, 1)',
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className='flex'>

      <div className="w-full min-h-screen p-6 mx-auto">
        <div className="flex items-center justify-center mb-20">
          <div className="relative inline-block">
            <span className="text-2xl md:text-4xl font-bold">
              Analysis
            </span>
            <span className="absolute -bottom-1 left-0 w-full h-1 bg-blue-600 rounded-full" />
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-2 gap-8">
          <div className="chart bg-white shadow-md rounded-lg p-6">
            <h2 className="text-xl font-semibold text-gray-700 mb-4">Request Rates</h2>
            <div style={{ height: '300px' }}>
              <Line data={requestChartData} options={chartOptions} />
            </div>
          </div>

          <div className="chart bg-white shadow-md rounded-lg p-6">
            <h2 className="text-xl font-semibold text-gray-700 mb-4">Service Usage</h2>
            <div style={{ height: '300px' }}>
              <Bar data={serviceUsageData} options={chartOptions} />
            </div>
          </div>

          <div className="chart bg-white shadow-md rounded-lg p-6">
            <h2 className="text-xl font-semibold text-gray-700 mb-4">Service Feedback</h2>
            <div style={{ height: '300px' }}>
              <Pie data={serviceFeedbackData} options={chartOptions} />
            </div>
          </div>

          <div className="chart bg-white shadow-md rounded-lg p-6">
            <h2 className="text-xl font-semibold text-gray-700 mb-4">New Registered Services</h2>
            <div style={{ height: '300px' }}>
              <Bar data={newServicesData} options={chartOptions} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardAnalysis;
