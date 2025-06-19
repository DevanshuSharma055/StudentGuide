import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setUserAuth } from "../Store/UserSlice";
import { userAuthFromBackend } from "../Services/UserApiCall";

export function useIsAuthenticated() {
  const dispatch = useDispatch();

  useEffect(() => {
    async function fetchAuth() {
      try {
        const res = await userAuthFromBackend();
        dispatch(setUserAuth(res.success));
      } catch (err) {
        dispatch(setUserAuth(false));
      }
    }
    fetchAuth();
  }, [dispatch]);
}
