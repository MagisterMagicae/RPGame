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
            setTimeout(() => {
                this.enemyTurn();
                if (fightStore.player) {
                    this.checkHealth();
                }
            }, 1000); // Add a 1 second delay for better UX
        }
    }

    enemyTurn(): void {
        const { fightStore } = rootStore;
        const itemID = Math.floor(Math.random() * 6);
        this.enemyItem(itemID);
    }

    inDamage(itemID: number): void {
        const { fightStore } = rootStore;
        if (!fightStore.player || !fightStore.currentMonster) return; //Sicherheitscheck
        const damage = Math.max(0, fightStore.currentMonster.getCurrentAttack() * fightStore.currentMonster.inventory[itemID].getAmount() - fightStore.player.getCurrentDefense());
        fightStore.setDescription(`${fightStore.currentMonster.getName()} greift an und verursacht ${damage} Schaden!`);
        fightStore.player.mathCurrentHealthPoints(-damage);
    }

    outDamage(itemID: number): void {
        const { fightStore } = rootStore;
        if (!fightStore.player || !fightStore.currentMonster) return; //Sicherheitscheck
        const effectiveness = 
            itemID == fightStore.currentMonster.getWeakness()? 1.3: 
            itemID == fightStore.currentMonster.getResistance()? 0.7:
            1;
        const damage = Math.max(0, Math.floor((fightStore.player.getCurrentAttack() * fightStore.player.inventory[itemID].getAmount() - fightStore.currentMonster.getCurrentDefense())*effectiveness));
        fightStore.setDescription(`${fightStore.player.getName()} greift an und verursacht ${damage} Schaden!`);
        fightStore.currentMonster.mathCurrentHealthPoints(-damage);
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
        if (monsterDead) {
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
                        fightStore.player?.mathCurrentHealthPoints(20);
                        fightStore.setDescription(`Du benutzt einen Heiltrank. Du regenerierst 20 HP!`);
                        break;
                    case 4:
                        fightStore.player?.mathCurrentAttack(5);
                        fightStore.setDescription(`Du benutzt eine Zauberkugel. Dein Angriff steigt um 10!`);
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
                        fightStore.currentMonster?.mathCurrentHealthPoints(20);
                        fightStore.setDescription(`${fightStore.currentMonster.getName()} regeneriert 20 HP!`);
                        break;
                    case 4:
                        fightStore.currentMonster?.mathCurrentAttack(5);
                        fightStore.setDescription(`${fightStore.currentMonster.getName()}s Angriff steigt um 10!`);
                        break;
                    case 5:
                        fightStore.currentMonster?.mathCurrentDefense(2);
                        fightStore.setDescription(`${fightStore.currentMonster.getName()}s Verteidigung steigt um 2!`);
                        break;
                    default:
                }
            } else {
                switch (itemIndex) {
                    case 3:
                        fightStore.setDescription(`${fightStore.currentMonster.getName()} scheitere beim Versuch zu Heilen`);
                        break;
                    case 4:
                        fightStore.setDescription(`${fightStore.currentMonster.getName()} scheitere beim Versuch zu Attacke zu erhoehen`);
                        break;
                    case 5:
                        fightStore.setDescription(`${fightStore.currentMonster.getName()} scheitere beim Versuch zu Verteidigung zu erhoehen`);
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
