import React from 'react'
import RequestList from "./pages/RequestList"
import SingleRequest from "./pages/SingleRequest";
import { BrowserRouter, Router, Link, Route, Routes } from "react-router-dom";
import { useAuthContext } from "@asgardeo/auth-react";
import Login from "./pages/Login";
import { useEffect } from "react";
import Layout from "./Layout";


function App() {

  const { state , getBasicUserInfo } = useAuthContext();
  const [userDetails, setUserDetails] = React.useState([]);

  useEffect(() => {
    if(state.isAuthenticated){
      getBasicUserInfo().then((response) => {
        setUserDetails(response);
      });
    }
  }, [getBasicUserInfo,state.isAuthenticated]);

  return (
    <div className="">
         <BrowserRouter>

          <Routes>

            <Route element={<Layout/>} >
              <Route path="/Request" element={<RequestList />} />
              <Route path="/single-request/:id" element={<SingleRequest />} /> 
            </Route>
       
              <Route path="/" element={<Login state = {state} userDetails={userDetails} />} />
              </Routes>
        </BrowserRouter>  
      
      
    </div>
  )
}

export default App
