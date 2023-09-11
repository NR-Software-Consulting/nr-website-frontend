import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { getCookie } from "cookies-next";
import { userLoggedIn } from "@/redux/features/auth/authSlice";

export default function useAuthCheck() {
  const dispatch = useDispatch();
  const [authChecked, setAuthChecked] = useState(false);
  useEffect(() => {
    const localAuth = getCookie("userInfo");
    const token = getCookie("token");
    if (localAuth) {
      const auth = JSON.parse(localAuth);
      if (token && auth) {
        dispatch(
          userLoggedIn({
            accessToken: token,
            user: auth,
          })
        );
      }
      setAuthChecked(true);
    }
  }, []);

  return authChecked;
}
