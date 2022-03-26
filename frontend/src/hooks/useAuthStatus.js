import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

export const useAuthStatus = () => {
  const [loggedIn, setLoggetIn] = useState(false);
  const [checkingStatus, setCheckingStatus] = useState(true);

  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    user ? setLoggetIn(true) : setLoggetIn(false);
    setCheckingStatus(false);
  }, [user]);

  return {
    loggedIn,
    checkingStatus,
  };
};
