import { makeAutoObservable } from 'mobx';
import { FightStore } from './FightStore';
import { InventoryStore } from './InventoryStore';

//zur Verwaltung von States über die ganze App

export class RootStore {
    fightStore: FightStore;
    inventoryStore: InventoryStore;

    constructor() {
        this.fightStore = new FightStore(this);
        this.inventoryStore = new InventoryStore(this);
        makeAutoObservable(this);
    }
}

// Create a single instance of the RootStore
export const rootStore = new RootStore();

// Create a React Context for the RootStore
import { createContext, useContext } from 'react';
export const RootStoreContext = createContext<RootStore>(rootStore);

// Hook to use the RootStore in components
export const useRootStore = () => {
    const context = useContext(RootStoreContext);
    if (context === undefined) {
        throw new Error('useRootStore must be used within RootStoreProvider');
    }
    return context;
}; 