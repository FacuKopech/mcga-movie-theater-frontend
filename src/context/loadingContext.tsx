import React, { ReactNode, createContext, useContext, useState } from 'react';
import '../interfaces/LoadingContextType'

const LoadingContext = createContext<LoadingContextType>({
    loading: false,
    setLoading: () => {},
  });

  export const useLoading = (): LoadingContextType => useContext(LoadingContext);

  export const LoadingProvider = ({ children }: { children: ReactNode }) => {
    const [loading, setLoading] = useState(false);
  
    return (
      <LoadingContext.Provider value={{ loading, setLoading }}>
        {children}
      </LoadingContext.Provider>
    );
  };
