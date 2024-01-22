import { useAuthContext } from '@asgardeo/auth-react';
import React, { useEffect } from 'react'
import Bg from '../assets/homescreen.png'
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
           <img src={Bg} alt='login' className=' mx-[10%] w-[60%] h-[60%]'/>
            <div className='flex flex-col items-center '>
              <img src='https://firebasestorage.googleapis.com/v0/b/angle-361.appspot.com/o/default-monochrome.png?alt=media&token=e22d82b1-24e4-4643-a034-7e83cd4a716e' alt='logo' className='w-60 mb-8'/>
              <h1 className='text-m font-medium w-[80%] mb-6 text-slate-800  text-center '>Welcome to Grama Connect, your trusted platform where citizens can effortlessly log in and request certificates from Grama Niladari. </h1>
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
