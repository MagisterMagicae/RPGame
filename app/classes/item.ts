import { EffectType } from "./effecttype";

export class Item {

    //The constructor automatically creates and assigns the values to class properties

    constructor(
        protected itemID: number = 0,
        protected name: String = "itemName",

        protected amount: number = 0,
        protected effectType: number = EffectType.SCHWERT,

        protected isWeapon: boolean = true,
        protected isConsumable: boolean = false,
        protected isVisible: boolean = false,

        protected cost: number = 0,
        
        protected sprite: number = 0,
    ) { }

    getItemID(): number { return this.itemID; }
    getName(): String { return this.name; }
    getAmount(): number { return this.amount; }
    getEffectType(): EffectType { return this.effectType; }
    getIsWeapon(): boolean { return this.isWeapon; }
    getIsConsumable(): boolean { return this.isConsumable; }
    getIsVisible(): boolean { return this.isVisible; }
    getCost(): number { return this.cost; }
    getSpriteDirectory(): number { return this.sprite; }

    toggleIsVisible(): void { this.isVisible = !(this.isVisible); }
    mathAmount(a: number): void { 
        this.amount = Math.min(this.amount, Math.max(0, this.amount + a)); }
}