import { Ball } from './ball';
import { Brick } from './brick';
import { Paddle } from './paddle';
import { Room } from './room';
import { Score } from './score';
import { DragDetector } from './drag-detector';
import { GameKeyListener } from './game-key-listener';
import { BallCollisionHandler } from './ball-collision-handler';

export interface GameObject {
    onGameTick(game: Game);
}

export class Game {

    public tick = 0;
    private running = false;

    constructor(
        public readonly ctx: CanvasRenderingContext2D,
        public readonly dragDetector: DragDetector,
        public readonly keyListener: GameKeyListener,
        public readonly ballCollisionHandler: BallCollisionHandler,
        public readonly room: Room,
        public readonly score: Score,
        public readonly bricks: Brick[],
        public readonly ball: Ball,
        public readonly paddle: Paddle,
    ) {}

    start() {
        this.running = true;
        this.dragDetector.startListening();
        this.keyListener.startListening();
        this.requestNextFrame();
    }

    stop() {
        this.running = false;
        this.dragDetector.stopListening();
        this.keyListener.stopListening();
        alert("GAME OVER");
        document.location.reload();
    }

    complete() {
        this.running = false;
        this.dragDetector.stopListening();
        this.keyListener.stopListening();
        alert("YOU WIN, CONGRATULATIONS!");
        document.location.reload();
    }

    private requestNextFrame() {
        if (this.running) requestAnimationFrame(this.onFrameRequest);
    }

    private onFrameRequest = () => {
        this.tick++; 
        this.ballCollisionHandler.handleCollision(this);
        this.room.onGameTick(this);
        this.score.onGameTick(this);
        this.bricks.forEach(brick => brick.onGameTick(this));
        this.ball.onGameTick(this);
        this.paddle.onGameTick(this);
        this.requestNextFrame();
    }
}
