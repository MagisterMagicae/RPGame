import { rootStore } from "../stores/RootStore";

export class GameFightController {

    FightController(ItemID: number): void {
        const { fightStore } = rootStore;

        if (fightStore.gameOver || fightStore.playerVictory) {
            this.endFight();
            return;
        }

        // Player's turn
        this.useItem(ItemID);
        this.checkHealth();

        // If the fight isn't over after player's turn, do enemy turn
        if (!fightStore.gameOver && !fightStore.playerVictory) {
            fightStore.monsterTurn = true;
            setTimeout(() => {
                this.enemyTurn();
                if (fightStore.player) {
                    this.checkHealth();
                }
                setTimeout(() => {
                    fightStore.monsterTurn = false;
                }, 1000);
            }, 1000); // 2 Verzögerungen sodass genug Zeit ist um Spieler & Monster Aktion zu lesen
        }
    }

    enemyTurn(): void {
        const { fightStore } = rootStore;
        let moveOptions:Array<number> = [];
        if (fightStore.currentMonster?.fightValue.length == undefined) return;
        for(let i = 0; i < fightStore.currentMonster?.fightValue.length; i++){
            for(let j = 0; j < fightStore.currentMonster.getFightValue(i); j++){
                moveOptions[moveOptions.length] = i;
            }

        }
        const choice = Math.floor(Math.random() * (moveOptions.length));
        this.enemyItem(moveOptions[choice]);
    }

    inDamage(itemID: number): void {
        const { fightStore } = rootStore;
        setTimeout(() => {
        if (!fightStore.player || !fightStore.currentMonster) return; //Sicherheitscheck
        const damage = Math.max(0, Math.floor((fightStore.currentMonster.getCurrentAttack() + ( 5* fightStore.currentMonster.inventory[itemID].getAmount()) - fightStore.player.getCurrentDefense())));
        fightStore.setDescription(`${fightStore.currentMonster?.getName()} greift an und verursacht ${damage} Schaden!`);
        fightStore.player?.mathCurrentHealthPoints(-damage, () => this.checkHealth());
        }, 1000); //1 Sekunde Delay damit vorheriger Zug länger gezeigt wird	
    }

    outDamage(itemID: number): void {
        const { fightStore } = rootStore;
        if (!fightStore.player || !fightStore.currentMonster) return; //Sicherheitscheck
        const effectiveness = 
            itemID == fightStore.currentMonster.getWeakness()? 1.3: 
            itemID == fightStore.currentMonster.getResistance()? 0.7:
            1;
        const damage = Math.max(0, Math.floor((fightStore.player.getCurrentAttack() + ( 5* fightStore.player.inventory[itemID].getAmount()) - fightStore.currentMonster.getCurrentDefense())*effectiveness));
        fightStore.setDescription(`${fightStore.player.getName()} greift an und verursacht ${damage} Schaden!`);
        fightStore.currentMonster.mathCurrentHealthPoints(-damage, () => this.checkHealth());
    }
    
    checkHealth(): void {
        const { fightStore } = rootStore;

        if (!fightStore.player || !fightStore.currentMonster) return; //Sicherheitscheck

        const playerDead = fightStore.player.getCurrentHealthPoints() <= 0;
        const monsterDead = fightStore.currentMonster.getCurrentHealthPoints() <= 0;

        // Beide sind tot → Game Over
        if (playerDead && monsterDead) {
            fightStore.setGameOver(true);
            fightStore.setDescription("Du wurdest besiegt!");
            return;
        }

        // Nur Spieler tot → Game Over
        if (playerDead) {
            fightStore.setGameOver(true);
            fightStore.setDescription("Du wurdest besiegt!");
            return;
        }

        // Nur Gegner tot → Victory
        if (monsterDead && fightStore.playerVictory == false) {
            fightStore.setPlayerVictory(true);
            fightStore.setDescription(`Du hast ${fightStore.currentMonster.getName()} besiegt!`);
            return;
        }
    }

    useItem(itemIndex: number): void {
        const { fightStore } = rootStore;

        if (!fightStore.player || !fightStore.currentMonster) return; //Sicherheitscheck

        if (fightStore.player.inventory[itemIndex].getIsWeapon()) {
            this.outDamage(itemIndex);
        } else {
            if (fightStore.player.inventory[itemIndex].getAmount() > 0) {
                switch (itemIndex) {
                    case 3:
                        fightStore.player?.mathCurrentHealthPoints(20, () => this.checkHealth());
                        fightStore.setDescription(`Du benutzt einen Heiltrank. Du regenerierst 20 HP!`);
                        break;
                    case 4:
                        fightStore.player?.mathCurrentAttack(5);
                        fightStore.setDescription(`Du benutzt eine Zauberkugel. Dein Angriff steigt um 5!`);
                        break;
                    case 5:
                        fightStore.player?.mathCurrentDefense(2);
                        fightStore.setDescription(`Du benutzt einen Umhang. Deine Verteidigung steigt um 2!`);
                        break;
                    default:
                }
            } else {
                switch (itemIndex) {
                    case 3:
                        fightStore.setDescription(`Du hast keine Heiltränke mehr...`);
                        break;
                    case 4:
                        fightStore.setDescription(`Du hast keine Zauberkugeln mehr...`);
                        break;
                    case 5:
                        fightStore.setDescription(`Du hast keine Umhänge mehr...`);
                        break;
                    default:
                }

                

            }
        }
        if (fightStore.player.inventory[itemIndex].getIsConsumable()) {
                    fightStore.player.inventory[itemIndex].mathAmount(-1);
                }
    }

    enemyItem(itemIndex: number): void {
        const { fightStore } = rootStore;

        if (!fightStore.player || !fightStore.currentMonster) return; //Sicherheitscheck
        
        if (fightStore.currentMonster.inventory[itemIndex].getIsWeapon()) {
            this.inDamage(itemIndex);
        } else {
            if (fightStore.currentMonster.inventory[itemIndex].getAmount() > 0) {
                switch (itemIndex) {
                    case 3:
                        setTimeout(() => {
                            fightStore.currentMonster?.mathCurrentHealthPoints(20, () => this.checkHealth());
                            fightStore.setDescription(`${fightStore.currentMonster?.getName()} regeneriert 20 HP!`);
                        }, 1000); //1 Sekunde Delay damit vorheriger Zug länger gezeigt wird
                        break;
                    case 4:
                        setTimeout(() => {
                            fightStore.currentMonster?.mathCurrentAttack(5);
                            fightStore.setDescription(`${fightStore.currentMonster?.getName()}s Angriff steigt um 10!`);
                        }, 1000); //1 Sekunde Delay damit vorheriger Zug länger gezeigt wird
                        break;
                    case 5:
                        setTimeout(() => {
                            fightStore.currentMonster?.mathCurrentDefense(2);
                            fightStore.setDescription(`${fightStore.currentMonster?.getName()}s Verteidigung steigt um 2!`);
                        }, 1000); //1 Sekunde Delay damit vorheriger Zug länger gezeigt wird
                        break;
                    default:
                }
            } else {
                switch (itemIndex) {
                    case 3:
                        setTimeout(() => {
                            fightStore.setDescription(`${fightStore.currentMonster?.getName()} scheiterte beim Versuch zu Heilen`);
                        }, 1000); //1 Sekunde Delay damit vorheriger Zug länger gezeigt wird
                        break;
                    case 4:
                        setTimeout(() => {
                            fightStore.setDescription(`${fightStore.currentMonster?.getName()} scheiterte beim Versuch Attacke zu verbessern`);
                        }, 1000); //1 Sekunde Delay damit vorheriger Zug länger gezeigt wird
                        break;
                    case 5:
                        setTimeout(() => {
                            fightStore.setDescription(`${fightStore.currentMonster?.getName()} scheiterte beim Versuch Verteidigung zu verbessern`);
                        }, 1000); //1 Sekunde Delay damit vorheriger Zug länger gezeigt wird
                        break;
                    default:
                }
            }
        }
        if (fightStore.currentMonster.inventory[itemIndex].getIsConsumable()) {
            fightStore.currentMonster.inventory[itemIndex].mathAmount(-1);
        }
    }

    endFight(): void {
        const { fightStore } = rootStore;
        fightStore.resetFight();
    }
}
export default GameFightController;