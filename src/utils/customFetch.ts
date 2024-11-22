import { Dispatch, SetStateAction } from 'react';

export interface ResponseData {
  success: boolean;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data: any;
}

interface CustomFetchOptions extends Omit<RequestInit, 'method'> {
  method: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  body?: any;
}

// this custom fetch return same result as common fetch, but
// it returns Promise<ResponseData | Error>
// and it consoles helpful messages about the response.
const customFetch = async ({
  url,
  expectedStatusCode,
  options,
  authSensitiveSwitcher,
  unauthorizedAction,
}: {
  url: string;
  expectedStatusCode: number;
  options: CustomFetchOptions;
  // if recieved 401 - uses setState with false as argument.
  authSensitiveSwitcher?: Dispatch<SetStateAction<boolean>>;
  // action on 401.
  unauthorizedAction?: () => void;
}): Promise<ResponseData | Error> => {
  try {
    const response = await fetch(url, {
      ...options,
      body: JSON.stringify(options.body),
    });

    const result = await responseHandler({
      response,
      expectedStatusCode,
      authSensitiveSwitcher,
      unauthorizedAction,
    });

    return result;
  } catch (error) {
    throw error;
  }
};

const responseHandler = async ({
  response,
  expectedStatusCode,
  authSensitiveSwitcher,
  unauthorizedAction,
}: {
  response: Response;
  expectedStatusCode: number;
  authSensitiveSwitcher?: Dispatch<SetStateAction<boolean>>;
  unauthorizedAction?: () => void;
}): Promise<ResponseData | Error> => {
  const data = await response.json();

  if (response.status === expectedStatusCode) {
    return { success: true, data: data } as ResponseData;
  } else if (response.status >= 200 && response.status <= 299) {
    console.warn(
      `Got statusCode ${response.status}, but expected ${expectedStatusCode}.`
    );
    return { success: true, data: data } as ResponseData;
  } else {
    if (response.status === 401 && authSensitiveSwitcher) {
      authSensitiveSwitcher(false);
      if (unauthorizedAction) {
        unauthorizedAction();
      }
    }
    if (data.messages) {
      console.error(data.messages);
      return new Error(data.messages);
    } else if (data.message) {
      console.error(data.message);
      return new Error(data.message);
    } else {
      return new Error('Server returned error with no messages.');
    }
  }
};

export default customFetch;
