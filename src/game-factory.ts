import { Rect } from "@wjheesen/glib";
import { Ball } from "./ball";
import { BallCollisionHandler } from "./ball-collision-handler";
import { BrickFactory } from "./brick-factory";
import { DragDetector } from "./drag-detector";
import { Game } from "./game";
import { GameKeyListener } from "./game-key-listener";
import { Paddle } from "./paddle";
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
        return new Room({left: 0, top: height, right: width, bottom: 0});
    }

    private newScore() {
        return new Score(8, 20);
    }

    private newBall(room: Room) {
        return new Ball({x : room.width / 2, y: room.height - 30}, 10, {x: 2, y: -2});
    }

    private newPaddle(room: Room) {
        let paddleWidth = 75;
        let paddleHeight = 10;
        let left = (room.width - paddleWidth) / 2;
        let top = room.height;
        let rect = Rect.dimensions(left, top, paddleWidth, paddleHeight);
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