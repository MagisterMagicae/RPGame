import { makeAutoObservable } from 'mobx';
import { Monster } from '../classes/monster';
import { Player } from '../classes/player';
import { RootStore } from './RootStore';

export class FightStore {
    isTurn: boolean = false;
    gameOver: boolean = false;
    playerVictory: boolean = false;
    currentMonster: Monster | null = null;
    player: Player | null = null;
    fightDescription: string = '';

    constructor(private rootStore: RootStore) {
        makeAutoObservable(this);
    }

    setDescription(text: string) {
        this.fightDescription = text;
    }

    clearDescription() {
        this.fightDescription = '';
    }

    initializePlayer(name: string) {
        // Only initialize if player doesn't exist yet
        if (!this.player) {
            this.player = new Player(1, name);
        }
    }

    hasActivePlayer(): boolean {
        return this.player !== null;
    }

    setCurrentMonster(id: number, name: string) {
        this.currentMonster = new Monster(id, name);
        this.setDescription(`Ein wildes ${name} erscheint!`);
    }

    setTurn(value: boolean) {
        this.isTurn = value;
        if (value) {
            this.setDescription("Du bist am Zug!");
        }
    }

    toggleTurn() {
        this.isTurn = !this.isTurn;
    }

    get isPlayerTurn() {
        return this.isTurn;
    }

    get isMonsterTurn() {
        return !this.isTurn;
    }

    setGameOver(value: boolean) {
        this.gameOver = value;
        if (value) {
            this.setDescription("Game Over!");
        }
    }

    setPlayerVictory(value: boolean) {
        this.playerVictory = value;
        if (value) {
            this.setDescription("Sieg! Du hast gewonnen!");
        }
    }

    resetFight() {
        this.isTurn = false;
        this.gameOver = false;
        this.playerVictory = false;
        this.currentMonster = null;
        this.clearDescription();
    }
} 