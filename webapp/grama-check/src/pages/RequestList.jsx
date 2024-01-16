import React, { useState } from 'react';
import SearchBar from '../components/SearchBar';
import { useNavigate } from 'react-router-dom';

function RequestList() {
  const [selectedTab, setSelectedTab] = useState('All Requests');
  const [searchKeyword, setSearchKeyword] = useState('');
  const naivgate = useNavigate();

  const data = [
    { id: 9001, name: 'jhon', email: 'jhon@gmail.com', nic: '990006667V', date: "10-01-2023", status: 'Pending' ,isReady:true},
    { id: 9872, name: 'mary', email: 'mary@gmail.com', nic: '990006667V', date: "10-01-2023", status: 'Rejected' },
    { id: 10893, name: 'malliban', email: 'malliban@gmail.com', nic: '990006667V', date: "10-01-2023", status: 'Approved' },
    // Add more data as needed
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'Pending':
        return 'blue';
      case 'Approved':
        return 'green';
      case 'Rejected':
        return 'red';

      default:
        return 'gray'; // Default color for unknown status
    }
  };

  const handleTabClick = (tab) => {
    setSelectedTab(tab);
  };

  const filteredData = data.filter((item) => {
    if (selectedTab === 'All Requests') {
      return true; // Show all requests
    }else if(selectedTab === 'Pending Requests'){
      return item.status === 'Pending';
    }else if(selectedTab === 'Approved Requests'){
      return item.status === 'Approved';
    }else if(selectedTab === 'Rejected Requests'){
      return item.status === 'Rejected';
    }
    return item.status === selectedTab;
  });

  const handleSearch = (keyword) => {
    setSearchKeyword(keyword);
  };

  const filteredDataWithSearch = filteredData.filter((item) =>
    item.nic.toLowerCase().includes(searchKeyword.toLowerCase())
  );

  const handleRowClick = (request) => {
    setSelectedRequest(request);
  };

  return (
    <div className='font-heading '>
      <div className='flex mb-10'>
        <h1 className='font-medium text-2xl p-2 w-full radius text-slate-600'>Requests</h1>
        <div className='mt-3'> <SearchBar onSearch={handleSearch} /></div>
      </div>
      <div className='flex flex-start mb-2 '>
        <h1
          onClick={() => handleTabClick('All Requests')}
          className={`font-medium text-xs radius px-4 py-2 mr-2 hover:bg-slate-200 hover:cursor-pointer text-slate-600 rounded-xl ${
            selectedTab === 'All Requests' ? 'bg-slate-200' : ''
          }`}
        >
          All Requests
        </h1>
        <h1
          onClick={() => handleTabClick('Pending')}
          className={`font-medium text-xs radius px-4 py-2 mr-2 hover:bg-slate-200 hover:cursor-pointer text-slate-600 rounded-xl ${
            selectedTab === 'Pending' ? 'bg-slate-200' : ''
          }`}
        >
          Pending 
        </h1>
        <h1
          onClick={() => handleTabClick('Approved')}
          className={`font-medium text-xs radius px-4 py-2 mr-2 hover:bg-slate-200 hover:cursor-pointer text-slate-600 rounded-xl ${
            selectedTab === 'Approved' ? 'bg-slate-200' : ''
          }`}
        >
          Approved 
        </h1>
        <h1
          onClick={() => handleTabClick('Rejected')}
          className={`font-medium text-xs radius px-4 py-2 mr-2 hover:bg-slate-200 hover:cursor-pointer text-slate-600 rounded-xl ${
            selectedTab === 'Rejected' ? 'bg-slate-200' : ''
          }`}
        >
          Rejected 
        </h1>
        
      </div>
      <table className="table-auto flex-row w-full border shadow-sm rounded-lg">
        <thead className='bg-gray-100 rounded-2xl text-slate-500'>
          <tr className='text-left h-10 '>
            <th className='font-medium p-2'>Request ID</th>
            <th className='font-medium p-2'>Basic Info</th>
            <th className='font-medium p-2'>Nic</th>
            <th className='font-medium p-2'>Requested Date</th>
            <th className='font-medium w-1/6 p-2 '>Status</th>
          </tr>
        </thead>
        <tbody className=' '>
          {filteredDataWithSearch.map((item) => (
            <tr 
            key={item.id} 
            className='border-b-2 round  '
            onClick={() => naivgate("/test")}
            >
              <td className='text-xs p-2'>{item.id}</td>
              <td className='text-xs p-2'>
                <h1 className='text-xs'>{item.name}</h1>
                <h1 className='text-xs font-light'>{item.email}</h1>
              </td>
              <td className='text-xs p-2'>{item.nic}</td>
              <td className='text-xs p-2'>{item.date}</td>
              <td className='flex text-xs p-2'>
                <div
                  className="w-2 my-auto h-2 rounded-full "
                  style={{ backgroundColor: getStatusColor(item.status) }}
                >
                </div>
                <h1 className="flex mx-2 ">
                  {item.status}
                </h1>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      
    </div>
  );
}

export default RequestList;