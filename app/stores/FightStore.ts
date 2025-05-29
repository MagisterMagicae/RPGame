import { makeAutoObservable } from 'mobx';
import { Monster } from '../classes/monster';
import { Player } from '../classes/player';
import { RootStore } from './RootStore';

export class FightStore {
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

    initializePlayer(name: string) {
        // Only initialize if player doesn't exist yet
        if (!this.player) {
            this.player = new Player(1, name);
        }
    }

    setCurrentMonster() {
        //Rand here
        const name = "Werwolf";
        this.currentMonster = new Monster(2,name);
        this.setDescription(`Ein wildes ${name} erscheint!`);
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
        this.gameOver = false;
        this.playerVictory = false;
        this.currentMonster = null;
        this.setDescription('');
    }
} 