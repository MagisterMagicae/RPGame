import React from 'react';
import { RootStoreContext, rootStore } from './RootStore';

interface RootStoreProviderProps {
    children: React.ReactNode;
}

//Zur Integration des RootStore in die App, wird benutzt in _layout.tsx

export const RootStoreProvider: React.FC<RootStoreProviderProps> = ({ children }) => {
    return (
        <RootStoreContext.Provider value={rootStore}>
            {children}
        </RootStoreContext.Provider>
    );
}; 