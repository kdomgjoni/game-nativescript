import { Component, EventEmitter, OnInit, Output, ViewContainerRef } from "@angular/core";
import { ModalDialogService, ModalDialogOptions } from "nativescript-angular/modal-dialog";
import { ModalComponent } from "../modal/modal.component";
import { GameService } from "../service/game.service";

var sound = require("nativescript-sound");

@Component({
    selector: "Home",
    providers: [ModalDialogService],
    templateUrl: "./home.component.html"
})
export class HomeComponent implements OnInit {

    @Output() change: EventEmitter<number> = new EventEmitter<number>();

    // sound variables
    diceSound;
    saveSound;
    gameSound
    one
    sounds

    activePlayer = 0;
    gameOver: boolean = false;
    scores = [0, 0];
    dice;
    player1: number = 0;
    player2: number = 0;
    btn1 = true;
    btn2 = false;
    finalScore = 50;


    constructor(private modalService: ModalDialogService,
        private viewContainerRef: ViewContainerRef,
        private gameService: GameService) {
        this.finalScore = this.gameService.serviceValue;
        // Use the component constructor to inject providers.

    }

    showModal() {
        const options: ModalDialogOptions = {
            viewContainerRef: this.viewContainerRef,
            fullscreen: false,
            context: this.activePlayer
        };
        this.modalService.showModal(ModalComponent, options);
    }

    ngOnInit(): void {

        this.sounds = {
            "one": sound.create("~/app/audio/one.mp3"),
            "gameSound": sound.create("~/app/audio/game.mp3"),
            "saveSound": sound.create("~/app/audio/save.mp3"),
            "diceSound": sound.create("~/app/audio/dice.mp3")
        }
        // Init your component properties here.

    }



    nextPlayer() {
        this.activePlayer = this.activePlayer == 0 ? 1 : 0;
        if (this.activePlayer == 0) {
            this.btn1 = true;
            this.btn2 = false;
        } else if (this.activePlayer == 1) {
            this.btn1 = false;
            this.btn2 = true;
        }
    }

    roll() {

        this.sounds.diceSound.play();
        this.dice = Math.floor(Math.random() * 6) + 1;

        if (this.activePlayer == 0) {
            this.player1 += this.dice;
            this.btn1 = true;
            this.btn2 = false;
        } else if (this.activePlayer == 1) {
            this.player2 += this.dice;
            this.btn1 = false;
            this.btn2 = true;
        }

        if (this.dice == 1) {
            this.sounds.one.play();
            this.nextPlayer();
            this.player1 = 0;
            this.player2 = 0;
        }
    }


    hold() {
        this.sounds.saveSound.play();
        this.scores[this.activePlayer] += this.activePlayer == 0 ? this.player1 : this.player2;
        this.player1 = 0;
        this.player2 = 0;

        if (this.scores[this.activePlayer] >= this.finalScore) {
            this.showModal();
            this.sounds.gameSound.play();
            this.change.emit(this.activePlayer);
            this.gameOver = true;
            this.resetGame();
            return false;

        }
        this.nextPlayer();
    }

    resetGame() {
        this.activePlayer = 0;
        this.player1 = 0;
        this.player2 = 0;
        this.btn1 = true;
        this.btn2 = false;
        this.scores = [0, 0];
    }

}
