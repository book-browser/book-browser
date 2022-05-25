import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  confirmRegistration,
  getCurrentUser,
  login,
  logout,
  resendVerificationEmail,
  register,
  sendUsernameEmail
} from 'services/user.service';
import { RootState } from 'slices/store';
import { userSlice } from 'slices/user.slice';
import { useEmptyPromise, usePromise } from './promise.hook';

export const useUser = () => useSelector((state: RootState) => state.userReducer);

export const useRegister = () => usePromise(register);

export const useConfirmRegistration = () => usePromise(confirmRegistration);

export const useResendVerificationEmail = () => usePromise(resendVerificationEmail);

export const useSendUsernameEmail = () => usePromise(sendUsernameEmail);

export const useLogin = () => {
  const dispatch = useDispatch();

  const loginHook = usePromise(login);
  const { executed, data } = loginHook;

  useEffect(() => {
    if (executed && data) {
      dispatch(userSlice.actions.setUser(data));
    }
  }, [executed, data, dispatch]);

  return loginHook;
};

export const useLogout = () => {
  const dispatch = useDispatch();

  const logoutHook = useEmptyPromise(logout);
  const { executed, error } = logoutHook;

  useEffect(() => {
    if (executed && !error) {
      dispatch(userSlice.actions.setUser(null));
    }
  }, [executed, error, dispatch]);

  return logoutHook;
};

export const useGetCurrentUser = () => {
  const dispatch = useDispatch();

  const getCurrentUserHook = useEmptyPromise(getCurrentUser);
  const { executed, data } = getCurrentUserHook;

  useEffect(() => {
    if (executed && data) {
      dispatch(userSlice.actions.setUser(data));
    }
  }, [executed, data, dispatch]);

  return getCurrentUserHook;
};
