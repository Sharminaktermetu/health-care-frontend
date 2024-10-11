import { configureStore } from '@reduxjs/toolkit'
// ...
import {reducer} from './rootReducer'
import { baseApi } from './api/baseApi'
import { useEffect, useState } from 'react'
export const store = configureStore({
    reducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(baseApi.middleware),
})


export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch


// debounce function that is not clear


type TDebouncedProps = {
    searchQuery: string;
    delay: number;
  };
  
  export const useDebounced = ({ searchQuery, delay }: TDebouncedProps) => {
    const [debouncedValue, setDebouncedValue] = useState<string>(searchQuery);
  
    useEffect(() => {
      const handler = setTimeout(() => {
        setDebouncedValue(searchQuery);
      }, delay);
  
      return () => {
        clearTimeout(handler);
      };
    }, [searchQuery, delay]);
  
    return debouncedValue;
  };