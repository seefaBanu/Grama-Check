import RequestList from "./pages/RequestList"
import SingleRequest from "./components/SingleRequest";
import ContextApiTest from "./pages/ContextApiTest";
import { BrowserRouter, Router, Link, Route, Routes } from "react-router-dom";
import {AppContext} from "./context-api/AppContext"




function App() {

  var nic=7;

  return (
    <div className="m-4 ">
      <AppContext.Provider value={{nic}}>
         <BrowserRouter>
          <Routes>
            <Route path="/" element={<RequestList />} />
            <Route path="/test/:nic" element={<SingleRequest />} />
            <Route path="/testcon" element={<ContextApiTest />} />
          </Routes>
        </BrowserRouter>  
      </AppContext.Provider>
      
    </div>
  )
}

export default App
