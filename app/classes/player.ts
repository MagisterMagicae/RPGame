import { Entity } from "./entity";

export class Player extends Entity{
    constructor(entityID: number, name: string){
    // Rufe den Entity-Konstruktor mit spezifischen Startwerten auf
    super(entityID, name, 100, 20, 10); // MaxHP, Attack, Defense (das sind nur Beispiel Werte von mir. Die können wir noch ändern)
    }

}