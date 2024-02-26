import { Button } from 'mochi-ui'
import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuthContext } from '@asgardeo/auth-react'

const NotAuthorized = () => {
    const navigate = useNavigate();
    const { signOut } = useAuthContext();


    return (
        <div className=''>
            <img
                src='https://firebasestorage.googleapis.com/v0/b/angle-361.appspot.com/o/error_401.jpg?alt=media&token=bf58eb99-3183-4da5-8c19-66a0f17eb336' 
                alt='error' 
                className='w-1/3 mt-40 mx-auto mb-8' 
            />
            <div className='w-full mx-auto flex justify-center'>
            <Button title='Back to Home' color='secondary' text='black' 
            onClick={()=>signOut()} />
            </div>

        </div>
    )
}

export default NotAuthorized