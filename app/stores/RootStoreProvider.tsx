import React from 'react';
import { RootStoreContext, rootStore } from './RootStore';

interface RootStoreProviderProps {
    children: React.ReactNode;
}

export const RootStoreProvider: React.FC<RootStoreProviderProps> = ({ children }) => {
    return (
        <RootStoreContext.Provider value={rootStore}>
            {children}
        </RootStoreContext.Provider>
    );
}; 