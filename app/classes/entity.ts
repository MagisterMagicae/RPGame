import { EffectType } from "./effecttype";
import { Item } from "./item";

export abstract class Entity {

    //This is NOT safe, but I think if we want to get items from the inventory we need it open

    inventory: Array<Item> = [];

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

        this.inventory[0] = new Item(0, "Schwert", this.startInventory[0], EffectType.SCHWERT, true, false, true, 10, require("../../assets/images/Schwert.png"),
        "   Bereits etwas verbogen. Trotzdem noch wirksam gegen selbst gut ausgestattete Gegner.\n\nVerschiedene Waffen sind unterschiedlich effektiv, je nachdem, wer dir entgegensteht!")
        this.inventory[1] = new Item(1, "Bogen", this.startInventory[1], EffectType.BOGEN, true, false, true, 10, require("../../assets/images/Bogen.png"),
            "Aus einem robustem Holz. Eignet sich gut, um fliegende Ziele zu treffen\n\nVerschiedene Waffen sind unterschiedlich effektiv, je nachdem, wer dir entgegensteht!")
        this.inventory[2] = new Item(2, "Stab", this.startInventory[2], EffectType.STAB, true, false, true, 10, require("../../assets/images/Stab.png"),
            "Ein alter Zauberstab, der feurige Lichtkugeln entsendet. Mit ihm lassen sich Kreaturen der Nacht verschrecken.\n\nVerschiedene Waffen sind unterschiedlich effektiv, je nachdem, wer dir entgegensteht!")
        this.inventory[3] = new Item(3, "Trank", this.startInventory[3], EffectType.HEILUNG, false, true, true, 10, require("../../assets/images/Trank.png"),
            "Verbessert deine Lebenspunkte!\nSchmeckt pink.")
        this.inventory[4] = new Item(4, "Kugel", this.startInventory[4], EffectType.ATKBOOST, false, true, true, 10, require("../../assets/images/Kugel.png"),
            "Verbessert deinen Angriff!\nDiese Zauberkugel verschafft dir einen Blick in die Zukunft. Mit ihr kannst du deinen Gegnern einen Schritt voraus sein.")
        this.inventory[5] = new Item(5, "Umhang", this.startInventory[5], EffectType.DEFBOOST, false, true, true, 10, require("../../assets/images/Umhang.png"),
            "Verbessert deine Verteidigung!\nEr mag aussehen, als sei er aus normalen Stoffen, jedoch verbirgt sich zwischen den Falten ein magisches Material.")
    }

    getName(): string { return this.name; }
    getCurrentHealthPoints(): number { return this.currentHealthPoints; }
    getCurrentAttack(): number { return this.currentAttack; }
    getCurrentDefense(): number { return this.currentDefense; }
    getMaxHealthPoints(): number { return this.maxHealthPoints; }
    getMaxAttack(): number { return this.maxAttack; }
    getMaxDefense(): number { return this.maxDefense; }
    getSpriteDirectory(): number {return this.sprite; }
    setCurrentHealthPoints(amount: number){  
        this.currentHealthPoints = amount;
    }
    setMaxHealthPoints(amount: number){this.maxHealthPoints = amount;}
    setCurrentAttack(amount: number){this.currentAttack = amount;}
    setCurrentDefense(amount: number){this.currentDefense = amount;}

    //math Methoden:
    //Erhöhe oder verringere aktuellen Wert um amount. Der Wert darf außerdem nicht unter 0 fallen und auch nicht über dem Maximum liegen
    mathCurrentHealthPoints(amount: number, afterChange?: () => void): void {
        this.currentHealthPoints = Math.min(this.maxHealthPoints, Math.max(0, this.currentHealthPoints + amount));
        if (afterChange) afterChange();
    }

    mathCurrentAttack(amount: number): void {
        this.currentAttack = Math.min(this.maxAttack, Math.max(0, this.currentAttack + amount));
    }

    mathCurrentDefense(amount: number): void {
        this.currentDefense = Math.min(this.maxDefense, Math.max(0, this.currentDefense + amount));
    }

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
export default Entity;