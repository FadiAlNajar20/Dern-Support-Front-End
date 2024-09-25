import React from "react";

const CustomTable = ({ headers, data, renderRow, isWhite = true }) => {
  return (
    <div className="overflow-x-auto">
      <table className={`w-full bg-white shadow-lg rounded-lg`}>
        <thead className="bg-indigo-700 text-white">
          <tr>
            {headers.map((header, index) => (
              <th key={index} className="table-header px-6 py-3 text-lg font-semibold leading-4 tracking-wider
             text-left border-b border-gray-300 uppercase border-r border-gray-300">
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {data.map((item) => (
            <tr key={item.id} className="hover:bg-gray-50 transition-all duration-200">
              {renderRow(item)}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CustomTable;
