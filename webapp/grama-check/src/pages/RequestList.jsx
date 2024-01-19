import React, { useEffect, useState } from 'react';
import SearchBar from '../components/SearchBar';
import { useNavigate } from 'react-router-dom';
import SingleRequest from '../components/SingleRequest';
import NavBar from '../components/NavBar';
import {Tab, THDetails, Table,THead,TBRow } from '../components/Elements';
import axios from 'axios';

function RequestList() {
  const [selectedTab, setSelectedTab] = useState('All Requests');
  const [searchKeyword, setSearchKeyword] = useState('');
  const naivgate = useNavigate();
  const [requestList, setRequestList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  

  useEffect(() => {
    setIsLoading(true);
    axios.get(`https://cf3a4176-54c9-4547-bcd6-c6fe400ad0d8-dev.e1-us-east-azure.choreoapis.dev/eyfq/generalservice/general-80d/v1.0/grama/certificate
    `)
    .then((res)=>{
      setRequestList(res.data)
      console.log(res.data) 
    })
    setIsLoading(false);
  }, []);

  const data = [
    { id: "01ddf599-8991-4f5d-8b97-4c1122f567a3" , name: 'jhon', email: 'jhon@gmail.com', nic: '190006667V', date: "10-01-2023", status: 'Pending' ,isReady:true},
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
      return item.status === 'submitted';
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


  return (
    <>
    <NavBar/>
    <div className='font-heading m-4 '>
      <div className='flex mb-10'>
        <h1 className='font-medium text-2xl p-2 w-full radius text-slate-600'>Requests</h1>
        <div className='mt-3'> <SearchBar onChange={handleSearch} /></div>
      </div>

      {/* Selection Tab */}
      <div className='flex flex-start mb-2 '>
      ` <Tab tabName="All Requests" selectedTab={selectedTab} handleTabClick={handleTabClick} />
        <Tab tabName="Pending" selectedTab={selectedTab} handleTabClick={handleTabClick} />
        <Tab tabName="Approved" selectedTab={selectedTab} handleTabClick={handleTabClick} />
        <Tab tabName="Rejected" selectedTab={selectedTab} handleTabClick={handleTabClick} />
      </div>
      
      <table   className="table-auto flex-row w-full border shadow-sm rounded-lg">
        <THead >
          <tr className='text-left h-10 '>
            <THDetails tableHeading='Request ID'/>
            <THDetails tableHeading='Basic Info'/>
            <THDetails tableHeading='Nic'/>
            <THDetails tableHeading='Requested Date'/>
            <THDetails tableHeading='Status' />
          </tr>
        </THead>

        {!isLoading && (
        <tbody>
          {requestList  .map((item) => (
            <tr 
            key={item.id} 
            className='border-b-2 round'
	          onClick={() => naivgate(`/single-request/${item.id}`)}
            >
              <td className='text-xs p-2'>{item.id}</td>
              <td className='text-xs p-2'>
                <h1 className='text-xs'>{item.name}</h1>
                <h1 className='text-xs font-light'>{item.userEmail}</h1>
              </td>
              <td className='text-xs p-2'>{item.nic}</td>
              <td className='text-xs p-2'>{item.nic}</td>
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
        )}
      </table>
    </div>
    </>

  );
}

export default RequestList;
