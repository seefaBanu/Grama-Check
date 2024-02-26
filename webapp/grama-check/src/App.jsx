import React from "react";
import RequestList from "./pages/RequestList";
import SingleRequest from "./pages/SingleRequest";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { useAuthContext } from "@asgardeo/auth-react";
import Login from "./pages/Login";
import { useEffect } from "react";
import Layout from "./Layout";
import ErrorImg from "./assets/error_401.jpg";
import NotAuthorized from "./pages/NotAuthorized";

function App() {
  const { state, getBasicUserInfo } = useAuthContext();
  const [userDetails, setUserDetails] = React.useState([]);
  const [isGrama, setIsGrama] = React.useState(false);

  useEffect(() => {
    if (state.isAuthenticated) {
      getBasicUserInfo().then((response) => {
        setUserDetails(response);
        console.log("User details", response);
        if (response.allowedScopes.includes("urn:interns:gcgeneralservicegeneral:grama") ) {
          setIsGrama(true);
        }
      });
    }
  }, [getBasicUserInfo, state.isAuthenticated]);

  return (
    <div className="">
      <BrowserRouter>
        <Routes>
          {state.isAuthenticated ? (
            <>
            {isGrama ? (
            <Route element={<Layout />}>
              <Route path="/" element={<RequestList />} />
              <Route path="/request/:id" element={<SingleRequest />} />
            </Route>
            ):(
                  <Route path="/" element={<NotAuthorized/>} />
            )}
            </>
          ) : (
            <Route
              path="/"
              element={<Login state={state} userDetails={userDetails} />}
            />
          )}
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
