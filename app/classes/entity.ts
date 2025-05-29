import { EffectType } from "./effecttype";
import { item } from "./item";

export abstract class Entity {

    //This is NOT safe, but I think if we want to get items from the inventory we need it open

    inventory: Array<item> = [];

    //The constructor automatically creates and assigns the values to class properties

    constructor(
        protected entityID: number = 0,
        protected name: string = "Entity",

        protected currentHealthPoints: number = 100,
        protected maxHealthPoints: number = 100,

        protected currentAttack: number = 20,
        protected maxAttack: number = 20,

        protected currentDefense: number = 10,
        protected maxDefense: number = 10,

        protected startInventory: Array<number> = [1, 1, 1, 5, 5, 5],
        protected sprite: number = 0,
    ) {

        this.inventory[0] = new item(0, "Schwert", this.startInventory[0], EffectType.SCHWERT, true, false, true, require("../../assets/images/Schwert.png"))
        this.inventory[1] = new item(1, "Bogen", this.startInventory[1], EffectType.BOGEN, true, false, true, require("../../assets/images/Bogen.png"))
        this.inventory[2] = new item(2, "Stab", this.startInventory[2], EffectType.STAB, true, true, true, require("../../assets/images/Stab.png"))
        this.inventory[3] = new item(3, "Trank", this.startInventory[3], EffectType.HEILUNG, false, true, true, require("../../assets/images/Trank.png"))
        this.inventory[4] = new item(4, "Kugel", this.startInventory[4], EffectType.ATKBOOST, false, true, true, require("../../assets/images/Kugel.png"))
        this.inventory[5] = new item(5, "Umhang", this.startInventory[5], EffectType.DEFBOOST, false, true, true, require("../../assets/images/Umhang.png"))

    }

    getName(): string { return this.name; }
    getCurrentHealthPoints(): number { return this.currentHealthPoints; }
    getCurrentAttack(): number { return this.currentAttack; }
    getCurrentDefense(): number { return this.currentDefense; }
    getMaxHealthPoints(): number { return this.maxHealthPoints; }
    getMaxAttack(): number { return this.maxAttack; }
    getMaxDefense(): number { return this.maxDefense; }
    getSpriteDirectory(): number { return this.sprite; }

    //math Methoden:
    //Erhöhe oder verringere aktuellen Wert um amount. Der Wert darf außerdem nicht unter 0 fallen und auch nicht über dem Maximum liegen
    mathCurrentHealthPoints(amount: number): void { 
        this.currentHealthPoints = Math.min(this.maxHealthPoints, Math.max(0, this.currentHealthPoints + amount)); }
    
    mathCurrentAttack(amount: number): void { 
        this.currentAttack = Math.min(this.maxAttack, Math.max(0, this.currentAttack + amount)); }

    mathCurrentDefense(amount: number): void { 
        this.currentDefense = Math.min(this.maxDefense, Math.max(0, this.currentDefense + amount)); }

    //Weil Max Werte sich ändern können:
    mathMaxHealthPoints(amount: number): void {
        this.maxHealthPoints += amount;
        this.currentHealthPoints = Math.min(this.currentHealthPoints, this.maxHealthPoints);
    }

    mathMaxAttack(amount: number): void {
        this.maxAttack += amount;
        this.currentAttack = Math.min(this.currentAttack, this.maxAttack);
    }

    mathMaxDefense(amount: number): void {
        this.maxDefense += amount;
        this.currentDefense = Math.min(this.currentDefense, this.maxDefense);
    }
}