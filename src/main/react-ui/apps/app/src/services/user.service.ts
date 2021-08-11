import { LoginRequest } from "types/login-request";
import { RegisterRequest } from "types/register-request";
import { User } from "types/user";
import { handleEmptyResponse, handleResponse, handleTextResponse } from "./response.service";

export const login = async (loginRequest: LoginRequest) => {
  const response = await fetch('/api/login?' + new URLSearchParams({
      rememberMe: `${loginRequest.rememberMe}`
    }), {
    method: 'POST',
    body: JSON.stringify({
      username: loginRequest.username,
      password: loginRequest.password
    }),
    headers: {
      'Content-Type': 'application/json'
    },
  });
  return await handleResponse<User>(response);
}

export const register = async (registerRequest: RegisterRequest) => {
  const response = await fetch('/api/register', {
    method: 'POST',
    body: JSON.stringify(registerRequest),
    headers: {
      'Content-Type': 'application/json'
    },
  });
  return await handleEmptyResponse(response);
}

export const logout = async () => {
  const response = await fetch('/api/logout', {
    method: 'POST',
  });
  return await handleEmptyResponse(response);
}

export const getCurrentUser = async () => {
  const response = await fetch('/api/user/self');
  return await handleTextResponse<User>(response);
}
