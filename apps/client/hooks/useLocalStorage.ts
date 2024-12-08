import { useEffect, useState } from 'react';

export const useLocalStorage = (defaultValue: any, key: any) => {
  const [value, setValue] = useState(defaultValue);

  useEffect(() => {
    const stickyValue = localStorage.getItem(key);

    if (!stickyValue) {
      localStorage.setItem(key, defaultValue);
    }
  }, [defaultValue, key]);

  useEffect(() => {
    setValue(localStorage.getItem(key));
  }, [key]);

  return value;
};
