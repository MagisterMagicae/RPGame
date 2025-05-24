import { EffectType } from "./effecttype";

class item {
    itemID: number = 0;
    name: String = "itemName";
    amount: number = 0;
    effectType: EffectType = 0; //0 = Schwert, siehe effecttype.ts
    isWeapon: boolean = true;
    isConsumable: boolean = false;
    isVisible: boolean = false;
    //SpriteDirectory: String = "";
    constructor(
        pItemID: number, 
        pName: String, 
        pAmount: number, 
        pIsWeapon: boolean, 
        pIsConsumable: boolean, 
        pIsVisible: boolean){
            this.itemID = pItemID;
            this.name = pName;
            this.amount = pAmount;
            this.isWeapon = pIsWeapon;
            this.isConsumable = pIsConsumable;
            this.isVisible = pIsVisible;
        }
    getItemID():number{ return this.itemID;}
    getName():String{ return this.name;}
    getAmount():number{ return this.amount;}
    getIsWeapon():boolean{ return this.isWeapon;}
    getIsConsumable():boolean{ return this.isConsumable;}
    getIsVisible():boolean{ return this.isVisible;}

    mathAmount(a:number):void{this.amount = a;}
    changeIsVisible():void{this.isVisible = !(this.isVisible);}

}