import { Toaster } from "react-hot-toast";
import { Outlet } from "react-router-dom";
import NavBar from "./components/NavBar";

export default function Layout() {
  return (
    <div className="font-general">
      <NavBar />
      <Outlet />
    </div>
  );
}