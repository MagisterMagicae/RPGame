import { Entity } from "../classes/entity";
import { rootStore } from "../stores/RootStore";

export class GameFightController {

    constructor() {
        const { fightStore } = rootStore;
        fightStore.setCurrentMonster(2, "Werwolf");
    }

    startNewGame(playerName: string): boolean {
        const { fightStore } = rootStore;
        // Initialize player if not exists
        if (!fightStore.hasActivePlayer()) {
            fightStore.initializePlayer(playerName);
        }
        // Reset fight state but keep player stats
        fightStore.resetFight();
        fightStore.setCurrentMonster(2, "Werwolf");
        return true;
    }

    GameFightController(): void {
        const { fightStore } = rootStore;

        // Ensure we have a player
        if (!fightStore.player) {
            throw new Error("No active player found. Please start a new game first.");
        }

        while (!fightStore.gameOver || !fightStore.playerVictory) {
            this.enemyTurn();
            this.checkHealth(fightStore.player);
            fightStore.setTurn(true); // Player's turn
            this.useItem();
            this.outDamage();
            this.checkHealth(fightStore.currentMonster!);
        }
        if (fightStore.gameOver || fightStore.playerVictory) {
            this.endFight();
        }
    }

    enemyTurn(): void {
        const { fightStore } = rootStore;
        rootStore.fightStore.setTurn(false);
        this.inDamage();
    }

    inDamage(): void {
        const { fightStore } = rootStore;
        if (!fightStore.player || !fightStore.currentMonster) return; //Sicherheitscheck
        const damage = fightStore.currentMonster.getCurrentAttack();
        fightStore.setDescription(`${fightStore.currentMonster.getName()} greift an und verursacht ${damage} Schaden!`);
        fightStore.player.mathCurrentHealthPoints(-damage);
    }

    outDamage(): void {
        const { fightStore } = rootStore;
        if (!fightStore.player || !fightStore.currentMonster) return; //Sicherheitscheck
        const damage = fightStore.player.getCurrentAttack();
        fightStore.setDescription(`${fightStore.player.getName()} greift an und verursacht ${damage} Schaden!`);
        fightStore.currentMonster.mathCurrentHealthPoints(-damage);
    }

    checkHealth(entity: Entity): void {
        const { fightStore } = rootStore;

        if (!fightStore.player || !fightStore.currentMonster) return;

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

    useItem(): void {
        // hi alex wir müssten wahrscheinlich einen Inventory store anlegen und dann hier die items auslesen
    }

    endFight(): void {
        const { fightStore } = rootStore;
        fightStore.resetFight();
    }
}
