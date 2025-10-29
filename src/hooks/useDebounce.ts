import { useEffect, useState } from 'react';

export const useDebounce = <T>(value: T, wait = 500) => {
  const [debounced, setDebounced] = useState<T>(value);
  useEffect(()=>{
    const id = setTimeout(()=>setDebounced(value), wait);
    return ()=>clearTimeout(id);
  }, [value, wait]);
  return debounced;
};
