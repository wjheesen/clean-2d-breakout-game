import { Game, GameObject } from "./game";
import { Rect } from "./rect";

export class Paddle implements GameObject {

    constructor(
        public readonly bounds: Rect,
        private speed: number,
    ) {}

    onGameTick(game: Game) {
        this.show(game);
        this.handleLeftKeyPress(game);
        this.handleRightKeyPress(game);
        this.handleDragging(game);
    } 

    private show({ctx}: Game) {
        let {left, top, width, height } = this.bounds;
        ctx.beginPath();
        ctx.rect(left, top, width, height);
        ctx.fillStyle = "#0095DD";
        ctx.fill();
        ctx.closePath();
    }

    private handleLeftKeyPress({room, keyListener}: Game) {
        if (keyListener.leftKeyPressed) {
            this.bounds.left = Math.max(room.bounds.left, this.bounds.left - this.speed); 
        }
    }
        
    private handleRightKeyPress({room, keyListener}: Game) {
        if (keyListener.rightKeyPressed) {
            this.bounds.right = Math.min(room.bounds.right, this.bounds.right + this.speed);
        }
    }

    private handleDragging({room, dragDetector}: Game) {
        let drag = dragDetector.getDragPosition()
        if (drag && room.bounds.containsX(drag.x)) {
            this.bounds.centerX = drag.x;
        }
    }
}