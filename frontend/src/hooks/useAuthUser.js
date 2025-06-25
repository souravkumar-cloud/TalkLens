// hooks/useAuthUser.js
import { useEffect, useState } from "react";
import { getAuthUser } from "../lib/api";

const useAuthUser = () => {
  const [authUser, setAuthUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      const res = await getAuthUser();
      if (res && res.user) {
        setAuthUser(res.user); // ✅ Unwrap the `user` field
      } else {
        setAuthUser(null);
      }
      setIsLoading(false);
    };

    fetchUser();
  }, []);

  return { authUser, isLoading };
};

export default useAuthUser;
