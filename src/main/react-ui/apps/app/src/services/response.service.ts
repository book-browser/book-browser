import { ApiError } from "types/api-error";

export const handleResponse = async <T>(response: Response) => {
  if (response.ok) {
    return await response.json() as T;
  }
  throw new ApiError(await response.json());
}