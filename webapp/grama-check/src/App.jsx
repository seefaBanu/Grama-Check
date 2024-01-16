import RequestList from "./pages/RequestList"
import SingleRequest from "./components/SingleRequest";
import { BrowserRouter, Router, Link, Route, Routes } from "react-router-dom";


function App() {
  return (
    <div className="m-4 ">
      <BrowserRouter>
          <Routes>
            <Route path="/" element={<RequestList />} />
            <Route path="/test" element={<SingleRequest />} />
          </Routes>
        </BrowserRouter>
    </div>
  )
}

export default App
