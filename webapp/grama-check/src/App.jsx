import RequestList from "./pages/RequestList"
import SingleRequest from "./pages/SingleRequest";
import { BrowserRouter, Router, Link, Route, Routes } from "react-router-dom";





function App() {

  return (
    <div className="m-4 ">
         <BrowserRouter>
          <Routes>
            <Route path="/" element={<RequestList />} />
            <Route path="/single-request/:id" element={<SingleRequest />} />
          </Routes>
        </BrowserRouter>        
    </div>
  )
}

export default App
