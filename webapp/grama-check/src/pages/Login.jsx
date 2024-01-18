import { useAuthContext } from '@asgardeo/auth-react';
import React, { useEffect } from 'react'
import Bg from '../assets/bg.jpg'
import { useNavigate } from 'react-router-dom';


export default function Login(props) {
  const Navigate = useNavigate();
  const {state , userDetails} = props;
  const {signIn} = useAuthContext();


  return (
    <div>
      {state ?. isAuthenticated ? (
        Navigate('/Request')
      ):
      (
        <div> 
          <div className='flex justify-between items-center h-screen'>
           <img src={Bg} alt='login' className='w-[80%] h-[80%]'/>
            <div className='flex flex-col items-center'>
              <h1 className='text-xl font-bold w-[60%] mb-4 text-slate-800'>Empowering Communities, Connecting Lives</h1>
              <h1 className='text-m font-medium w-[60%] text-slate-800'>Welcome to Grama Connect, your trusted platform where citizens can effortlessly log in and request certificates from Grama Niladari. </h1>
              <button  
                className='flex items-center justify-center my-4 text-white text-m font-medium h-10 w-20 bg-blue-500 rounded-xl hover:bg-blue-600'
                onClick={() => signIn()}>Sign-in</button>
            </div>
            </div>
            
        </div>
      )
      }
    </div>
  )
}
