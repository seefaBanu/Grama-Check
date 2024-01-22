import { useEffect, useState } from 'react';
import axios from 'axios'
import { useParams } from 'react-router-dom';
import { Button } from 'mochi-ui';

import Spinner from '../components/Spinner';
import StatusIcon from '../components/StatusIcon';
import PopupModal from '../components/PopupModal';

import { useAuthContext } from '@asgardeo/auth-react';


export default function SingleRequest() {
  const { id } = useParams();
  const [nic,setNic]=useState("");
  const [addressVerified,setAddressVerified] = useState("pending");
  const [policeCheck,setPoliceCheck] = useState("pending");
  const [submitted,setSubmitted] = useState("pending");
  const [approved,setApproved] = useState("pending");
  const [isReady,setIsReady]=useState("pending")
  const [isLoading, setIsLoading] = useState(false);
  const { state, signOut, getAccessToken } = useAuthContext();

  const policeCase=[
    {case:"road rage",date:"2023-12-02"},
    {case:"attempted murder",date:"2023-12-02"},
  ]

  useEffect(()=>{
    setIsLoading(true);
    getAccessToken().then((token) => {
      return axios.get(
        `https://cf3a4176-54c9-4547-bcd6-c6fe400ad0d8-prod.e1-us-east-azure.choreoapis.dev/eyfq/gcgeneralservice/general-80d/v1.0/grama/certificate/${id}`,
        {
          headers: {
            Accept: 'application/json',
            Authorization: `Bearer ${token}`,
            
          },
        }
      )
      })
    .then((res)=>{
      console.log(res.data)
      setNic(res.data.nic);
      if(res.data.status.address_verified!=null){
        setAddressVerified("done")
      }
      if(res.data.status.submitted!=null){
        setSubmitted("done")
      }
      if(res.data.status.approved!=null){
        setApproved("done")
      }
      setIsLoading(false);
    })
  },[])

  const handleApprove = (id) =>{
    axios.put(`url/userApproved/certificate/${id}`).then((res)=>{
      console.log(res.data)
      setAddressVerified("done")
      setPoliceCheck("done")
      setApproved("done")
    })
  }

  const handleReady = (id) =>{
    axios.put(`url/grama/ready/${id}`).then((res)=>{
      console.log(res.data)
      setIsReady("done")
    })
  }
  
  return (
    <div className='flex flex-col'>
      {isLoading ? <Spinner isLoading={isLoading}/> : 
      <>
        <h1 className="header font-semibold   
        sm:text-md 
        md:text-lg 
        xl:text-xl 
        text-2xl my-14 mx-24"
      >Shamly Shanawaz - {nic} </h1>
      <div className='flex justify-evenly my-auto w-full'>
        <div className="content mb-6 flex flex-col gap-4 ">
          <StatusIcon text='Submitted' status={submitted}  />
          <StatusIcon text='Address Verified' status={addressVerified}  />
          <StatusIcon text='Police Check' status={addressVerified}  />
          <StatusIcon text='Approved' status={approved}  />
          <StatusIcon text='Ready' status={isReady}  />
        </div>
        <div className='flex flex-col gap-14  mx-12'>
          {!status?.address &&
            <div className='flex flex-col gap-4 text-lg'>
              <p className=' text-lg underline  text-red-400'>Address Mismatch</p>
              <div>
                <p>Inputted Address: 100/40,maligawatta road,colombo-10</p>
                <p>Valid Address: 115,katubedda,moratuwa</p>
              </div>
            </div>
          }
          {policeCase.length>0 &&
         <div className='flex flex-col gap-4'>
          <p className=' text-lg underline text-red-400'>Police Cases</p>
         {policeCase.map((caseInfo, index) => (
           <div key={index} className='text-lg'>
             <p>Police Case {index + 1}: {caseInfo.case}</p>
             <p>Date: {caseInfo.date}</p>
           </div>
         ))}
       </div>
        }
        </div>
      </div>
      {approved!="done" && <div className="actions flex justify-center mt-8">
        <PopupModal trigger={<Button title='Approve' />}>
          <>
            <p className='text-lg '>Do you want to confirm approval?</p>
            <div className="actions flex justify-center mt-8">
              <Button title='Confirm'/>
            </div>
          </>
        </PopupModal>
        <PopupModal trigger={ <Button title='Reject' color='danger' />}>
          <>
            <p className='text-lg mb-2'>State Reason For Rejection</p>
            <textarea rows="4" cols="50" className='border- border-4'>
              your application was rejected due to 
            </textarea>
            <div className="actions flex justify-center mt-2">
              <Button title='Reject' color='danger'/>
            </div>
          </>
        </PopupModal>
      </div>}
      </>
      }

      {
        approved==="done" && isReady==="pending" &&
        <div className="actions flex justify-center mt-8">
          <Button title='Ready'/>
        </div>  
      }
      
    </div>
  );
}

