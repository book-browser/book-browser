/* eslint-disable no-throw-literal */
export const handleResponse = async <T>(response: Response) => {
  if (response.ok) {
    return (await response.json()) as T;
  } else {
    const text = await response.text();
    if (text.length > 0) {
      throw {
        name: 'ApiError',
        ...JSON.parse(text)
      };
    }
    throw {
      name: 'ApiError',
      timestamp: Date.now(),
      status: response.status,
      message: 'The server could not be reached',
      httpError: response.statusText,
      path: response.url,
      errors: []
    };
  }
};

export const handleEmptyResponse = async (response: Response) => {
  if (response.ok) {
    return;
  } else {
    const text = await response.text();
    if (text.length > 0) {
      throw {
        name: 'ApiError',
        ...JSON.parse(text)
      };
    }
    throw {
      name: 'ApiError',
      timestamp: Date.now(),
      status: response.status,
      message: 'The server could not be reached',
      httpError: response.statusText,
      path: response.url,
      errors: []
    };
  }
};

export const handleTextResponse = async <T>(response: Response) => {
  if (response.ok) {
    const text = await response.text();
    return text.length ? (JSON.parse(text) as T) : null;
  } else {
    const text = await response.text();
    if (text.length > 0) {
      throw {
        name: 'ApiError',
        ...JSON.parse(text)
      };
    }
    throw {
      name: 'ApiError',
      timestamp: Date.now(),
      status: response.status,
      message: 'The server could not be reached',
      httpError: response.statusText,
      path: response.url,
      errors: []
    };
  }
};
