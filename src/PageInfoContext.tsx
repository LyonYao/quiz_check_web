import React, { createContext, useState, useContext } from 'react';

interface PageInfoContextType {
  pageInfo: string;
  setPageInfo: (info: string) => void;
  
  userStatus: string;
  setUserStatus: (status: string) => void;

  themeMode: 'light' | 'dark';
  setThemeMode: (mode: 'light' | 'dark') => void;
}

export const PageInfoContext = createContext<PageInfoContextType | undefined>(undefined);

export const PageInfoProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [pageInfo, setPageInfo] = useState<string>('');
  const [userStatus, setUserStatus] = useState<string>('guest');
  const [themeMode, setThemeMode] = useState<'light' | 'dark'>('light');

  const contextValue = {
    pageInfo,
    setPageInfo,
    userStatus,
    setUserStatus,
    themeMode,
    setThemeMode,
  };

  return (
    <PageInfoContext.Provider value={contextValue}>
      {children}
    </PageInfoContext.Provider>
  );
};