import { useCallback } from 'react';
import { getCookie } from './cookies';

export const useAuthWrapper = (navigate: (path: string) => void) => {
  const wrapWithAuth = useCallback(
    <FunctionType extends (...args: any[]) => any>(fn: FunctionType): FunctionType => {
      return ((...args: any[]) => {
        const token = getCookie('token')

        if (!token) {
          navigate('');
          return Promise.resolve();
        }

        return fn(...args);
      }) as FunctionType;
    },
    [navigate]
  );

  return { wrapWithAuth };
};