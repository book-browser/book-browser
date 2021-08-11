import { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCurrentUser, login, logout, register } from "services/user.service";
import { RootState } from "slices/store";
import { userSlice } from "slices/user.slice";
import { LoginRequest } from "types/login-request";
import { useEmptyPromise, usePromise } from "./promise.hook";

export const useUser = () => {
  return {
    ...useSelector((state: RootState) => state.userReducer),
  }
}

export const useLogin = () => {
  const dispatch = useDispatch();

  const loginHook = usePromise(login);
  const { executed, data } = loginHook;

  useEffect(() => {
    if (executed && data) {
      dispatch(userSlice.actions.setUser(data));
    }
  }, [executed, data])

  return loginHook;
}

export const useRegister = () => usePromise(register);

export const useLogout = () => {
  const dispatch = useDispatch();

  const logoutHook = useEmptyPromise(logout);
  const { executed, error } = logoutHook;

  useEffect(() => {
    if (executed && !error) {
      dispatch(userSlice.actions.setUser(null));
    }
  }, [executed, error])

  return logoutHook;
}

export const useGetCurrentUser = () => {
  const dispatch = useDispatch();

  const getCurrentUserHook = useEmptyPromise(getCurrentUser);
  const { executed, data } = getCurrentUserHook;

  useEffect(() => {
    if (executed && data) {
      dispatch(userSlice.actions.setUser(data));
    }
  }, [executed, data])

  return getCurrentUserHook;
}



