import { Ball } from "./ball";
import { BallCollisionHandler } from "./ball-collision-handler";
import { BrickFactory } from "./brick-factory";
import { DragDetector } from "./drag-detector";
import { Game } from "./game";
import { GameKeyListener } from "./game-key-listener";
import { Paddle } from "./paddle";
import { Rect } from "./rect";
import { Room } from "./room";
import { Score } from "./score";

export class GameFactory {

    constructor(
        private canvasEl: HTMLCanvasElement
    ) {}

    newGame() {
        let room = this.newRoom();
        let bricks = this.newBricks();
        let ball = this.newBall(room);
        let paddle = this.newPaddle(room);
        let ctx = this.canvasEl.getContext('2d');
        let dragDetector = new DragDetector(this.canvasEl);
        return new Game(ctx, dragDetector, new GameKeyListener, new BallCollisionHandler, room, this.newScore(), bricks, ball, paddle);
    }

    private newRoom() {
        let { width, height } = this.canvasEl;
        let room = new Room(new Rect(0, 0, width, height));
        return room;
    }

    private newScore() {
        return new Score(8, 20);
    }

    private newBall(room: Room) {
        return new Ball(room.width / 2, room.height - 30, 10, 2, -2);
    }

    private newPaddle(room: Room) {
        let paddleWidth = 75;
        let paddleHeight = 10;
        let left = (room.width - paddleWidth) / 2;
        let top = room.height - paddleHeight;
        let rect = new Rect(left, top, paddleWidth, paddleHeight);
        let speed = 7;
        return new Paddle(rect, speed);
    }

    private newBricks() {
        return (new BrickFactory).newBricks(3, 5, {
            width: 75,
            height: 20,
            padding: 10,
            offsetTop: 30,
            offsetLeft: 30,
        });
    }
}