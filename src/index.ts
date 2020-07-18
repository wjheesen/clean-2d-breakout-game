import { GameFactory } from './game-factory';

let canvasEl = <HTMLCanvasElement> document.querySelector('#gameboard');
let gameFt = new GameFactory(canvasEl);
let game = gameFt.newGame();
game.start(); 