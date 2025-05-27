export abstract class Entity {
    protected entityID: number;
    protected name: string;

    protected currentHealthPoints: number;
    protected maxHealthPoints: number;

    protected currentAttack: number;
    protected maxAttack: number;

    protected currentDefense: number;
    protected maxDefense: number;

    constructor(entityID: number, name: string, maxHealthPoints: number, maxAttack: number, maxDefense: number) {
        this.entityID = entityID;
        this.name = name;

        this.maxHealthPoints = maxHealthPoints;
        this.maxAttack = maxAttack;
        this.maxDefense = maxDefense;
        //Beim Start sind die current-Werte = max-Werte
        this.currentHealthPoints = maxHealthPoints;
        this.currentAttack = maxAttack;
        this.currentDefense = maxDefense;
    }
    //Getter Methoden:
    getName(): string {
        return this.name;
    }

    getCurrentHealthPoints(): number {
        return this.currentHealthPoints;
    }

    getCurrentAttack(): number {
        return this.currentAttack;
    }

    getCurrentDefense(): number {
        return this.currentDefense;
    }

    getMaxHealthPoints(): number {
        return this.maxHealthPoints;
    }

    getMaxAttack(): number {
        return this.maxAttack;
    }

    getMaxDefense(): number {
        return this.maxDefense;
    }
    //math Methoden:
    //Erhöhe oder verringere aktuellen Wert um amount. Der Wert darf außerdem nicht unter 0 fallen und auch nicht über dem Maximum liegen
    mathCurrentHealthPoints(amount: number): void {
        this.currentHealthPoints += amount;
    }
    mathCurrentAttack(amount: number): void {
        this.currentAttack += amount;
    }
    mathCurrentDefense(amount: number): void {
        this.currentDefense += amount;
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