import { makeAutoObservable } from 'mobx';
import { RootStore } from './RootStore';

export class InventoryStore{
    itemAmount: number[] = [1,1,1,5,5,5]; //Schwert: index 0, Bogen: index 1,...DefBoost: index 5, Waffenlevel und Itemanzahl

    constructor(private rootStore: RootStore) {
            makeAutoObservable(this);
        }

    mathAmount(itemIndex: number, value: number){ //Itemanzahl um Wert ändern, z.B. beim Kauf +1, bei Verwendung -1
        this.itemAmount[itemIndex] = Math.max(0,this.itemAmount[itemIndex]+value);
    }

    hasItem(itemIndex: number): boolean{ //Hat der Spieler mind. ein Stück eines Items?, z.B. Verwendung verbieten in useItem() falls nicht
        return this.itemAmount[itemIndex] > 0;
    }

//--------------------------------------Getter--------------------------------------------
    getSchwertLevel():number{ 
        return this.itemAmount[0];
    }

    getBogenLevel():number{ 
        return this.itemAmount[1];
    
    }
    getStabLevel():number{ 
        return this.itemAmount[2];
    }

    getHeilungAnzahl():number{ 
        return this.itemAmount[3];
    }

    getAtkBoostAnzahl():number{ 
        return this.itemAmount[4];
    }

    getDefBoostAnzahl():number{ 
        return this.itemAmount[5];
    }
//----------------------------------------------------------------------------------------

}