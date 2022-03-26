import { Outlet, Navigate } from "react-router-dom";
import { useAuthStatus } from "../hooks/useAuthStatus";
import Spinner from "./Spinner";

function PrivetRoute() {
  const { loggedIn, checkingStatus } = useAuthStatus();

    if (checkingStatus) { return <Spinner /> };
    
    return loggedIn ? <Outlet/> : <Navigate to='/login'/>;
}

export default PrivetRoute;
