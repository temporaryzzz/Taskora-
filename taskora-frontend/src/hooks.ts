import { useEffect, type Dispatch, type RefObject, type SetStateAction } from 'react';
import {type NavigateFunction } from 'react-router';
import { deleteCookie } from './cookies';
import { CustomError } from './api';


export function useOnClickOutside<T extends HTMLElement | null>(
  ref: RefObject<T>,
  handler: (event: MouseEvent | TouchEvent) => void
) {
  useEffect(() => {
    const listener = (event: MouseEvent | TouchEvent) => {
      if (!ref.current || ref.current.contains(event.target as Node)) {
        return;
      }
      handler(event);
    };

    document.addEventListener('mousedown', listener);
    document.addEventListener('touchstart', listener);

    return () => {
      document.removeEventListener('mousedown', listener);
      document.removeEventListener('touchstart', listener);
    };
  }, [ref, handler]);
}

type ApiCallOptions = {
  navigate: NavigateFunction;
  setError: Dispatch<SetStateAction<boolean>>;
  setLogIn: Dispatch<SetStateAction<boolean>>;
};

export const withAuthHandling = async <T>(apiFn: () => Promise<T>, onSuccess: (data: T) => void, { navigate, setError, setLogIn }: ApiCallOptions) => {
  try {
    const data = await apiFn();
    onSuccess(data);
  } catch (error) {
    if (error instanceof CustomError) {
      console.log(error.message);

      if (error.statusCode === 401) {
        deleteCookie('logIn');
        setLogIn(false);
        navigate('', { replace: true });
      } else {
        console.error(error.message);
        setError(true);
      }
    }
  }
};