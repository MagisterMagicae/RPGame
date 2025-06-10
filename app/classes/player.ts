
import { Entity } from "./entity";
import { Item } from "./item";

export class Player extends Entity {

    protected gold: number;
    
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

        gold: number = 0
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
            this.gold = gold;
    }

    getGold(): number { return this.gold; }

    spendGold(amount: number): boolean {
        if (this.gold >= amount) {
            this.gold -= amount;
            return true;
        }
        return false;
    }

    addGold(amount: number): void {
        this.gold += amount;
    }

    addItem(item: Item): void {
        const existing = this.inventory.find(i => i.getItemID() === item.getItemID());
        if (existing) {
            existing.mathAmount(item.getAmount());
        } else {
            this.inventory.push(item);
        }
    }
}