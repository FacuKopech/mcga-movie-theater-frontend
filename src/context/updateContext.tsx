import React, { createContext, useState, useContext } from 'react';
import '../interfaces/UpdateContextType'

const UpdateContext = createContext<UpdateContextType | undefined>(undefined);

export const UpdateProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [update, setUpdate] = useState(false);

  const triggerUpdate = () => {
    setUpdate(prev => !prev);
  };

  return (
    <UpdateContext.Provider value={{ triggerUpdate, update }}>
      {children}
    </UpdateContext.Provider>
  );
};

export const useUpdate = (): UpdateContextType => {
  const context = useContext(UpdateContext);
  if (!context) {
    throw new Error('useUpdate must be used within an UpdateProvider');
  }
  return context;
};
