import React from 'react';

export const Tab = ({ tabName, selectedTab, handleTabClick }) => (
  <h1
    onClick={() => handleTabClick(tabName)}
    className={`font-medium text-xs radius px-4 py-2 mr-2 hover:bg-slate-200 hover:cursor-pointer text-slate-600 rounded-xl ${
      selectedTab === tabName ? 'bg-slate-200' : ''
    }`}
  >
    {tabName}
  </h1>
);

export const Table = () =>(
  <table 
  className="table-auto flex-row w-full border shadow-sm rounded-lg">
  </table>
);

export const THead = () =>(
  <thead className='bg-gray-100 rounded-2xl text-slate-500'>
  </thead>
);

export const THDetails = ({tableHeading}) =>(
  <th className='font-medium p-2'>{tableHeading}</th>
);

export const TBRow = () =>(
  <tr className='border-b-2 round'>
  </tr>
);

export const TBDetails = ({data}) =>(
  <td className='text-xs p-2'>{data}</td>
);
