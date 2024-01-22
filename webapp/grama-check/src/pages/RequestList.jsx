import React, { useEffect, useState } from 'react';
import SearchBar from '../components/SearchBar';
import { useNavigate } from 'react-router-dom';
import SingleRequest from '../components/SingleRequest';
import NavBar from '../components/NavBar';
import {Tab, THDetails, Table,THead,TBRow } from '../components/Elements';
import axios from 'axios';
import { useAuthContext } from '@asgardeo/auth-react';

function RequestList({token}) {
  const [selectedTab, setSelectedTab] = useState('All Requests');
  const { state, signIn, signOut } = useAuthContext();
  console.log(state);
  const [searchKeyword, setSearchKeyword] = useState('');
  const naivgate = useNavigate();
  const [requestList, setRequestList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [at,setAt] = useState("");  

  // const getToken = async () => {
  //   const orgName = 'interns';
  //    const clientID = 'OoXOfHIW8C8fcft8ouqJtVCgaVwa';
  //   // const clientID = 'OoXOfHIW8C8fcft8ouqJtVCgaVwa';
  //   const scope = 'profile openid email';
  
  //   const tokenEndpoint = `https://api.asgardeo.io/t/${orgName}/oauth2/token`;
  
  //   const headers = new Headers({
  //     'Content-Type': 'application/x-www-form-urlencoded',
  //     'Authorization': `Basic ${btoa(`${clientID}:${clientSecret}`)}`,
  //   });
  
  //   const body = new URLSearchParams({
  //     'grant_type': 'code',
  //     'scope': scope,
  //   });
  
  //   try {
  //     const response = await fetch(tokenEndpoint, {
  //       method: 'POST',
  //       headers: headers,
  //       body: body,
  //     });
  
  //     if (!response.ok) {
  //       throw new Error(`Failed to retrieve access token: ${response.statusText}`);
  //     }
  
  //     const data = await response.json();
  //     const accessToken = data.access_token;
  
  //     console.log('Access Token:', accessToken);
  //     setAt(accessToken);
  //     return accessToken;
  //   } catch (error) {
  //     console.error('Error:', error.message);
  //   }
  // };
  
  

  
  

  useEffect(() => {
    setIsLoading(true);
    // axios.get(`https://cf3a4176-54c9-4547-bcd6-c6fe400ad0d8-dev.e1-us-east-azure.choreoapis.dev/eyfq/generalservice/general-80d/v1.0/grama/certificate
    // `)
    // .then((res)=>{
    //   setRequestList(res.data)
    // })
    console.log("getting token")
    getToken();
    setIsLoading(false);
  }, []);


    useEffect(() => {
      
      if(at !== ""){
      axios.get(
        'https://cf3a4176-54c9-4547-bcd6-c6fe400ad0d8-prod.e1-us-east-azure.choreoapis.dev/eyfq/gcgeneralservice/general-80d/v1.0',
        {
          headers: {
            Accept: 'application/scim+json',
            Authorization: `Bearer ${at}`,
            
          },
        }
      )
      .then((res) => {
        setRequestList(res.data);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
    }
    },[at])

  const data = [
    { id: "01ddf599-8991-4f5d-8b97-4c1122f567a3" , name: 'jhon', email: 'jhon@gmail.com', nic: '190006667V', date: "10-01-2023", status: 'Pending' ,isReady:true},
    { id: 9872, name: 'mary', email: 'mary@gmail.com', nic: '990006667V', date: "10-01-2023", status: 'Rejected' },
    { id: 10893, name: 'malliban', email: 'malliban@gmail.com', nic: '990006667V', date: "10-01-2023", status: 'Approved' },
    // Add more data as needed
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'Submitted':
        return 'blue';
      case 'Approved':
        return 'green';
      case 'Rejected':
        return 'red';
      case 'Address Verified':
        return 'yellow';
      case 'Completed':
        return 'purple';

      default:
        return 'gray'; // Default color for unknown status
    }
  };

  const handleTabClick = (tab) => {
    setSelectedTab(tab);
  };

  const dateFormatter = (date) => {
  const submittedDate = date
    ? new Date(
      date.year,
      date.month - 1, // Months are zero-based
      date.day,
      date.hour,
      date.minute,
      date.second
      )
    : null;

  const dateFormatter = new Intl.DateTimeFormat('en', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    second: 'numeric',
    hour12: true, // Enable 12-hour format
  });

  const formattedSubmittedDate = submittedDate ? dateFormatter.format(submittedDate) : '';
  
  return formattedSubmittedDate;}

  const filteredData = requestList.filter((item) => {
    if (selectedTab === 'All Requests') {
      return true; // Show all requests
    }else if (selectedTab === 'Rejected') {
      return item.status.rejected != null;
    }else if (selectedTab === 'Completed') {
      return item.status.completed != null; 
    } else if (selectedTab === 'Approved') {
      return item.status.approved != null && item.status.completed == null;
    }else if (selectedTab === 'Address Verified') {
      return item.status.address_verified != null && item.status.approved == null && item.status.rejected == null && item.status.completed == null;
    }else if (selectedTab === 'Pending') {
      return item.status.submitted != null && item.status.approved == null && item.status.rejected == null && item.status.completed == null && item.status.address_verified == null;
    }
    
    return item.status === selectedTab;
  });
  

  const handleSearch = (keyword) => {
    setSearchKeyword(keyword);
  };

  const filteredDataWithSearch = filteredData.filter((item) =>
    item.nic.toLowerCase().includes(searchKeyword.toLowerCase())
  );


  const getLatestStatus = (status) => {
    if (status.rejected != null) {
      return 'Rejected';
    }else if(status.completed != null){
      return 'Completed';
    } else if (status.approved != null) {
      return 'Approved';
    } else if (status.address_verified != null) {
      return 'Address Verified';
    } else if (status.submitted != null) {
      return 'Submitted';
    }
    return 'Unknown';
  }

  return (
    <>
    <div className='font-heading m-4'>
      <div className='flex mb-10'>
        <h1 className='font-medium text-2xl p-2 w-full radius text-slate-600'>Requests</h1>
        <div className='mt-3'> <SearchBar onChange={handleSearch} /></div>
      </div>

      {/* Selection Tab */}
      <div className='flex flex-start mb-2 '>
      ` <Tab tabName="All Requests" selectedTab={selectedTab} handleTabClick={handleTabClick} />
        <Tab tabName="Pending" selectedTab={selectedTab} handleTabClick={handleTabClick} />
        <Tab tabName="Address Verified" selectedTab={selectedTab} handleTabClick={handleTabClick} />
        <Tab tabName="Approved" selectedTab={selectedTab} handleTabClick={handleTabClick} />
        <Tab tabName="Completed" selectedTab={selectedTab} handleTabClick={handleTabClick} />
        <Tab tabName="Rejected" selectedTab={selectedTab} handleTabClick={handleTabClick} />
      </div>
      
      <table   className="table-auto flex-row w-full border shadow-sm rounded-lg">
        <thead className='bg-gray-100 rounded-2xl text-slate-500' >
          <tr className='text-left h-10 '>
            <th className='font-medium p-2'> Name</th>
            <th className='font-medium p-2'> Email</th>
            <th className='font-medium p-2'> Nic</th>
            <th className='font-medium p-2'> Requested Date</th>
            <th className='font-medium p-2'> Status</th>
           
          </tr>
        </thead>

        {!isLoading && (
        <tbody>
          {filteredDataWithSearch.map((item) => (
            <tr 
            key={item.id} 
            className='border-b-2 round'
	          onClick={() => naivgate(`/single-request/${item.id}`)}
            >
              <td className='text-xs p-2'>{item.userName}</td>
              <td className='text-xs p-2'>
                <h1 className='text-xs font-light'>{item.userEmail}</h1>
              </td>
              <td className='text-xs p-2'>{item.nic}</td>
              <td className='text-xs p-2'>{dateFormatter(item.status.submitted)}</td>
              <td className='flex text-xs p-2'>
                <div
                  className="w-2 my-auto h-2 rounded-full "
                  style={{ backgroundColor: getStatusColor(getLatestStatus(item.status)) }}
                >
                </div>
                <h1 className="flex mx-2 ">
                  {getLatestStatus(item.status)}
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
