import { Entity } from "./entity";

export class Player extends Entity {

    //The constructor automatically creates and assigns the values to class properties

    constructor(
        entityID: number = 1,
        name: string = "Player",

        currentHealthPoints: number = 100,
        maxHealthPoints: number = 100,

        currentAttack: number = 20,
        maxAttack: number = 999,

        currentDefense: number = 10,
        maxDefense: number = 999,

        startInventory: Array<number> = [1, 1, 3, 5, 5, 2],

        protected gold: number = 0
    ) {

        // Rufe den Entity-Konstruktor mit spezifischen Startwerten auf

        super(
            entityID,
            name,
            currentHealthPoints,
            maxHealthPoints,
            currentAttack,
            maxAttack,
            currentDefense,
            maxDefense,
            startInventory);
    }

    getGold(): number { return this.gold; }
}