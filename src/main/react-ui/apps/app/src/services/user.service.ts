import { LoginRequest } from 'types/login-request';
import { RegisterRequest } from 'types/register-request';
import { User } from 'types/user';
import { handleEmptyResponse, handleResponse, handleTextResponse } from './response.service';

export const login = async (loginRequest: LoginRequest) => {
  const response = await fetch(
    '/api/login?' +
      new URLSearchParams({
        rememberMe: `${loginRequest.rememberMe}`
      }),
    {
      method: 'POST',
      body: JSON.stringify({
        username: loginRequest.username,
        password: loginRequest.password
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    }
  );
  return handleResponse<User>(response);
};

export const register = async (registerRequest: RegisterRequest) => {
  const response = await fetch('/api/register', {
    method: 'POST',
    body: JSON.stringify(registerRequest),
    headers: {
      'Content-Type': 'application/json'
    }
  });
  return handleEmptyResponse(response);
};

export const confirmRegistration = async (token: string) => {
  const response = await fetch('/api/user/confirm', {
    method: 'POST',
    body: JSON.stringify({ token }),
    headers: {
      'Content-Type': 'application/json'
    }
  });
  return handleEmptyResponse(response);
};

export const resendVerificationEmail = async (email: string) => {
  const response = await fetch('/api/verify/email', {
    method: 'POST',
    body: JSON.stringify({ email }),
    headers: {
      'Content-Type': 'application/json'
    }
  });
  return handleEmptyResponse(response);
};

export const sendUsernameEmail = async (email: string) => {
  const response = await fetch('/api/username/email', {
    method: 'POST',
    body: JSON.stringify({ email }),
    headers: {
      'Content-Type': 'application/json'
    }
  });
  return handleEmptyResponse(response);
};

export const logout = async () => {
  const response = await fetch('/api/logout', {
    method: 'POST'
  });
  return handleEmptyResponse(response);
};

export const getCurrentUser = async () => {
  const response = await fetch('/api/user/self');
  return handleTextResponse<User>(response);
};
