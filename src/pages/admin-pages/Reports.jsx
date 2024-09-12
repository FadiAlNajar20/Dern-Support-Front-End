import React, { useState } from 'react';
import { useReports } from '../../hooks/useReports';
import { FaDownload } from 'react-icons/fa';
import generatePDFReprots from "../../helpers/pdfGeneratorReports"
import Loading from '../../components/Loading';
import NotFound from '../NotFound';

const ReportsList = () => {
  const { data, error, isLoading } = useReports();
  const [selectedTechnician, setSelectedTechnician] = useState('');

  if (isLoading) return <Loading />;
  if (error) return <NotFound />;

  const technicianNames = data?.reportDetails
    ? Array.from(new Set(data?.reportDetails?.map(report => report?.technicianname)))
    : [];

  const filteredReports = data.reportDetails.filter(report =>
    selectedTechnician ? report.technicianname === selectedTechnician : true
  );

  const handleDownloadReport = async () => {
    const reportTable = document?.querySelector('.overflow-x-auto');
    await generatePDFReprots([reportTable]);
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="flex items-center justify-center mb-12">
        <div className="relative inline-block">
          <span className="text-2xl md:text-4xl font-bold">
            Technician Reports
          </span>
          <span className="absolute -bottom-1 left-0 w-full h-1 bg-blue-600 rounded-full" />
        </div>
      </div>

      <div className="">
        <select
          id="technician-filter"
          value={selectedTechnician}
          onChange={(e) => setSelectedTechnician(e.target.value)}
          className="border rounded-md p-2 max-w-xs bg-white shadow-sm bg-indigo-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="">All Technicians</option>
          {technicianNames?.map((name, index) => (
            <option key={index} value={name}>
              {name}
            </option>
          ))}
        </select>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white shadow-lg rounded-lg overflow-hidden ">
          <thead className="bg-indigo-700 text-white">
            <tr>
              <th className="table-header px-6 py-3 text-lg font-semibold leading-4 tracking-wider text-left border-b border-gray-300 uppercase border-r border-gray-300">ID</th>
              <th className="table-header px-6 py-3 text-lg font-semibold leading-4 tracking-wider text-left border-b border-gray-300 uppercase border-r border-gray-300">Comment</th>
              <th className="table-header px-6 py-3 text-lg font-semibold leading-4 tracking-wider text-left border-b border-gray-300 uppercase border-r border-gray-300">Customer</th>
              <th className="table-header px-6 py-3 text-lg font-semibold leading-4 tracking-wider text-left border-b border-gray-300 uppercase border-r border-gray-300">Technician</th>
              <th className="table-header px-6 py-3 text-lg font-semibold leading-4 tracking-wider text-left border-b border-gray-300 uppercase border-r border-gray-300">Spare Part</th>
              <th className="table-header px-6 py-3 text-lg font-semibold leading-4 tracking-wider text-left border-b border-gray-300 uppercase border-r border-gray-300">Quantity</th>
              <th className="table-header px-6 py-3 text-lg font-semibold leading-4 tracking-wider text-left border-b border-gray-300 uppercase border-r border-gray-300">Price</th>
            </tr>
          </thead>
          <tbody>
            {filteredReports?.length > 0 ? (
              filteredReports?.map((report, index) => (
                <tr key={index} className="hover:bg-gray-100 transition-colors">
                  <td className="py-2 px-2 border-b border-r text-sm text-center">{report.reportid}</td>
                  <td className="py-2 px-2 border-b border-r text-sm text-center">{report.reportcomment}</td>
                  <td className="py-2 px-2 border-b border-r text-sm text-center">{report.customername}</td>
                  <td className="py-2 px-2 border-b border-r text-sm text-center">{report.technicianname}</td>
                  <td className="py-2 px-2 border-b border-r text-sm text-center">{report.sparename}</td>
                  <td className="py-2 px-2 border-b border-r text-sm text-center">{report.sparequantity}</td>
                  <td className="py-2 px-2 border-b border-r text-sm text-center">{report.spareprice}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7" className="py-2 px-2 text-center text-gray-600 text-sm">No reports available</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ReportsList;
