import { useEffect, useState } from 'react';
import axios from 'axios'
import { useParams } from 'react-router-dom';
import { Button } from 'mochi-ui';
import Spinner from '../components/Spinner';
import StatusIcon from '../components/StatusIcon';
import PopupModal from '../components/PopupModal';


export default function SingleRequest() {
  const { id } = useParams();
  const [userData,setUserData]=useState();
  const [addressVerified,setAddressVerified] = useState("pending");
  const [policeCheck,setPoliceCheck] = useState("pending");
  const [submitted,setSubmitted] = useState("pending");
  const [approved,setApproved] = useState("pending");
  const [rejectionReason, setRejectionReason] = useState("");
  const [isReady,setIsReady]=useState("pending")
  const [isLoading, setIsLoading] = useState(false);
  const [isSent, setIsSent] = useState(false);

 const accessToken="eyJ4NXQiOiJZell6WTJNNVpXWTNZbVF4TTJZME16UTNOMk16WXpka05EWXlORE14TWpnd016RTNOamM1T1RSbE9UWTVaR1JsWkRJd01qVTBZakUzTURNeE9UQTBZZyIsImtpZCI6Ill6WXpZMk01WldZM1ltUXhNMlkwTXpRM04yTXpZemRrTkRZeU5ETXhNamd3TXpFM05qYzVPVFJsT1RZNVpHUmxaREl3TWpVMFlqRTNNRE14T1RBMFlnX1JTMjU2IiwidHlwIjoiYXQrand0IiwiYWxnIjoiUlMyNTYifQ.eyJzdWIiOiI0YTM2MWI4Yi1lM2JiLTQ0ZDEtYmVhNC1kZmFjNDk0NGZmYzMiLCJhdXQiOiJBUFBMSUNBVElPTiIsImF1ZCI6WyJYNGY1ZnNqWGJra3YyR01ERGVpS0lWUlFpMGNhIiwiY2hvcmVvOmRlcGxveW1lbnQ6c2FuZGJveCJdLCJuYmYiOjE3MDU2NjQ4OTMsImF6cCI6Ilg0ZjVmc2pYYmtrdjJHTUREZWlLSVZSUWkwY2EiLCJvcmdfaWQiOiJjZjNhNDE3Ni01NGM5LTQ1NDctYmNkNi1jNmZlNDAwYWQwZDgiLCJpc3MiOiJodHRwczpcL1wvYXBpLmFzZ2FyZGVvLmlvXC90XC9pbnRlcm5zXC9vYXV0aDJcL3Rva2VuIiwiZXhwIjoxNzA1NjY1NzkzLCJvcmdfbmFtZSI6ImludGVybnMiLCJpYXQiOjE3MDU2NjQ4OTMsImp0aSI6IjM0MzVlOTlkLTE5OWYtNDBjZC1iNGNkLTdkMDQyNzI4ZWIxYSIsImNsaWVudF9pZCI6Ilg0ZjVmc2pYYmtrdjJHTUREZWlLSVZSUWkwY2EifQ.rf1LrZEI9JtucAL30xLk8d3FDNfePxTHm9x0sBxJy-vLjCMm_P24cCb225qTzsc23XVDgaOVv_l3VWK4m8OWJRok3eYRq9ZcyA_q5H9JEzw7SvUJ9-CKboKJ-Q7e1AWrIZY9PXVE4LwISwSJVdxx7FVXNnxzkHMQP_ebhYBOckGdGDh1ByLQ5MYjpCrbYw2ofFc1qDoGnPuJbrwQRFoEm0-y9hfHot758JZMJekOwpssqdNIwg36P2UCz-Q8a_yPI7-LK5NsGBMxNcUfxktn16AzAoa8w6X0OUhLWHHDyIjbfuzdwbeFQvefxph8JJL4PF1_PmfzYko4C7UnUo3Kyw"

  useEffect(()=>{
    setIsLoading(true);
    axios.get(`https://cf3a4176-54c9-4547-bcd6-c6fe400ad0d8-dev.e1-us-east-azure.choreoapis.dev/eyfq/generalservice/general-80d/v1.0/grama/certificate/${id}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })
    .then((res)=>{
      console.log(res.data)
      setUserData(res.data)
      checkStatus(res.data.status.address_verified,setAddressVerified)
      checkStatus(res.data.status.submitted,setSubmitted)
      res.data.status.approved && checkStatus(res.data.status.approved,setApproved)
      res.data.status.completed && checkStatus(res.data.status.completed,setIsReady)
      setIsLoading(false);
    })
  },[])
  

  useEffect(() => {
    if (userData?.policeCases.length > 0) {
      setPoliceCheck("rejected");
    }
  }, [userData?.policeCases]);
  

  const checkStatus = (data,setter) =>{
      if(data != null){
        setter("done")
      } else {
        setter("rejected")
      }
  }

  const sendMessage = (receiver,message) =>{
    axios.post(`https://cf3a4176-54c9-4547-bcd6-c6fe400ad0d8-dev.e1-us-east-azure.choreoapis.dev/eyfq/gcmessagingservice-gtv/message-client-3d3/v1.0`,
    {"message": message,"receiver": receiver})
    .then((res)=>{
      console.log(res.data)
    })
  }


  const handleApprove = () => {
    setIsSent(true)
    axios.put(`https://cf3a4176-54c9-4547-bcd6-c6fe400ad0d8-dev.e1-us-east-azure.choreoapis.dev/eyfq/generalservice/general-80d/v1.0/grama/approved/${id}`, null, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }).then((res) => {
      console.log(res.data);
      setAddressVerified("done");
      setPoliceCheck("done");
      setApproved("done");
      // sendMessage(
      //   "+94714607445",
      //   `The certificate requested by ${userData?.userName} - ${userData?.nic} has been approved. You will be informed once the certificate is ready for collection`
      // );
    })
    .finally(()=>{
      setIsSent(false)
    })
  };

  const handleReject = () => {
    setIsSent(true)
    axios.put(`https://cf3a4176-54c9-4547-bcd6-c6fe400ad0d8-dev.e1-us-east-azure.choreoapis.dev/eyfq/generalservice/general-80d/v1.0/grama/rejected/${id}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
       reason: rejectionReason 
      })
      .then((res) => {
        console.log(res.data);
        setApproved("rejected");
        setIsReady("rejected");
        sendMessage(
          "+94714607445",
          `The certificate requested by ${userData?.userName} - ${userData?.nic} has been rejected due to ${rejectionReason}. You will be informed once the certificate is ready for collection`
        );
      })
      .finally(()=>{
        setIsSent(false)
      })
  };

  const handleReady = () => {
    setIsSent(true)
    axios.put(`https://cf3a4176-54c9-4547-bcd6-c6fe400ad0d8-dev.e1-us-east-azure.choreoapis.dev/eyfq/generalservice/general-80d/v1.0/grama/ready/${id}`, null, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }).then((res) => {
        console.log(res.data);
        setIsReady("done");
        // sendMessage(
        //   "+94714607445",
        //   `The certificate requested by ${userData?.userName} - ${userData?.nic} is ready for collection`
        // );
      })
    .finally(()=>{
      setIsSent(false)
    })
  };
  
  return (
    <div className='flex flex-col'>
      {isLoading ? <Spinner isLoading={isLoading}/> : 
      <>
        <h1 className="header font-semibold   
        sm:text-md 
        md:text-lg 
        xl:text-xl 
        text-2xl my-14 mx-24"
      >{userData?.userName} - {userData?.nic} </h1>
      <div className='flex justify-evenly my-auto w-full'>
        <div className="content mb-6 flex flex-col gap-4 ">
          <StatusIcon text='Submitted' status={submitted}  />
          <StatusIcon text='Address Verified' status={addressVerified}  />
          <StatusIcon text='Police Check' status={policeCheck }  />
          <StatusIcon text='Approved' status={approved}  />
          <StatusIcon text='Ready' status={isReady}  />
        </div>
        <div className='flex flex-col gap-14  mx-12'>
          { addressVerified==="rejected" &&
            <div className='flex flex-col gap-4 text-lg'>
              <p className=' text-lg underline  text-red-400'>Address Mismatch</p>
              <div>
                <p>Inputted Address: {userData?.address}</p>
                <p>Valid Address: {userData?.checkedAddress}</p>
              </div>
            </div>
          }
          {userData?.policeCases.length>0 &&
         <div className='flex flex-col gap-4'>
          <p className=' text-lg underline text-red-400'>Police Cases</p>
         {userData?.policeCases.map((caseInfo, index) => (
           <div key={index} className='text-lg'>
             <p>Case : {caseInfo.issue}</p>
             <p>Date : {caseInfo.date.year}-{caseInfo.date.month}-{caseInfo.date.day}</p>
           </div>
         ))}
       </div>
        }
        </div>
      </div>
      {approved!="done" && <div className="actions flex justify-center mt-2">
        <PopupModal trigger={<Button title='Approve' />}>
          <>
            <p className='text-lg '>Do you want to confirm approval?</p>
            <div className="actions flex justify-center mt-8">
              <Button title='Confirm' onClick={()=>{handleApprove()}} disabled={isSent}/>
            </div>
          </>
        </PopupModal>
        <PopupModal trigger={ <Button title='Reject' color='danger' />}>
          <>
            <p className='text-lg mb-2'>State Reason For Rejection</p>
            <textarea 
            rows="4" 
            cols="50" 
            value={rejectionReason}
            onChange={(e) => setRejectionReason(e.target.value)}
            className='border- border-4'>
              your application was rejected due to 
            </textarea>
            <div className="actions flex justify-center mt-2">
              <Button title='Reject' color='danger' onClick={()=>handleReject()} disabled={isSent}/>
            </div>
          </>
        </PopupModal>
      </div>}
      </>
      }

      {
        approved==="done" && isReady==="pending" &&
        <div className="actions flex justify-center mt-12">
          <Button title='Ready' onClick={()=>{handleReady()}} disabled={isSent}/>
        </div>  
      }
    </div>
  );
}

