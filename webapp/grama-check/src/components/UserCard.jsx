import React, { useEffect, useState } from 'react';
import { IoCloseCircle } from "react-icons/io5";
import { IoLogOut } from "react-icons/io5";
import { useAuthContext } from '@asgardeo/auth-react';
import axios from 'axios';



export default function UserCard() {
    const [gnData,setGnData]=useState({});
  const [isPopupVisible, setIsPopupVisible] = useState(false);
  const { state ,getAccessToken , signOut} = useAuthContext();

  const togglePopup = () => {
    setIsPopupVisible(!isPopupVisible);
  };

    
  useEffect(() => {
    getAccessToken().then((token) => {
      return axios.get(
        'https://cf3a4176-54c9-4547-bcd6-c6fe400ad0d8-prod.e1-us-east-azure.choreoapis.dev/eyfq/gcgeneralservice/general-80d/v1.0/gramadivisions',
        {
          headers: {
            Accept: 'application/json',
            Authorization: `Bearer ${token}`,
          },
        }
      );
    }).then((res) => {
      if (res.status === 401 || res.status === 403) {
        return signOut();
      }
  
      const userGnDivision = res.data.find((item) => item.gramiEmail === state.email);
      console.log(userGnDivision);
      if (userGnDivision) {
        setGnData(userGnDivision);
        console.log(state);
      }
      
      console.log(res.data);
    }).catch((error) => {
      console.error('Error fetching data:', error);
    });
  }, [state.email]);
  

  


  return (
    <>
      <div onClick={togglePopup} className=" flex items-center cursor-pointer">
        <img
          src={
            'https://img.freepik.com/free-vector/businessman-character-avatar-isolated_24877-60111.jpg?w=740&t=st=1705914539~exp=1705915139~hmac=b9e18e762d5c180cd385b96f298964da14a8c6130bb1ef0067677aa4d166497c'
          }
          className="w-10 h-10 mr-4 my-auto rounded-full hover:scale-110 transition duration-300 hover:shadow-lg"
          alt="Profile picture"
        />
        {isPopupVisible && (
          <div className="absolute bg-white shadow-md rounded-lg mt-2 right-7 top-14 w-80 border-t-4">
            {/* Add your popup content here */}
           <div className=" p-4 flex cursor-pointer flex-row">
            <img
          src={
            'https://img.freepik.com/free-vector/businessman-character-avatar-isolated_24877-60111.jpg?w=740&t=st=1705914539~exp=1705915139~hmac=b9e18e762d5c180cd385b96f298964da14a8c6130bb1ef0067677aa4d166497c'
          }
          className="w-10 h-10 mr-4 my-auto rounded-full "
          alt="Profile picture"
        />
        <div className="flex flex-col ">
            <h3>{state.displayName}</h3>
            <h6 className='text-sm text-gray-400'>{gnData.gramiEmail}</h6>
        </div>
           
        </div>
        
        <div className=' bg-slate-100 p-4 bg-slate-100'>
        <div className='flex justify-between align-middle border-b t-1'>
        <p className='text-xs'> GN-Division</p>
        <p className='text-xs text-gray-400 mb-1'>{gnData.gnDivision}</p>
        </div>
        <div className='flex justify-between align-middle border-b mt-1'>
        <p className='text-xs'>Divisional Secreteriat </p>
        <p className='text-xs text-gray-400 mb-1'>{gnData.divisionalSecretariat} </p>
        </div>
        <div className='flex justify-between align-middle border-b mt-1'>
        <p className='text-xs'>District</p>
        <p className='text-xs text-gray-400 mb-1'> {gnData.district}</p>
        </div>
        <div className='flex justify-between align-middle border-b mt-1 '>
        <p className='text-xs'> Province</p>
        <p className='text-xs  text-gray-400 mb-1'>{gnData.province}</p>
        </div>
        </div>


          <div className='border-t mt-6 p-4 flex justify-between'>
          
            <button
              onClick={() => {
                togglePopup(); 
              }}
              className="text-gray-400 flex my-auto cursor-pointer hover:text-gray-500 hover:scale-110 transition duration-300"
            >
              <IoLogOut className='mt-[2px]'/>
              <p className='text-sm mx-2' onClick={()=> signOut()}>Logout</p>
            </button>

            {/* Close button */}
            <button onClick={togglePopup} className="text-red-500 text-xl cursor-pointer hover:text-red-600 hover:scale-105 transition duration-300">
            {/* <IoCloseCircle /> */}
            </button>
         </div>
        

        
          </div>
        )}
      </div>
    </>
  );
}
