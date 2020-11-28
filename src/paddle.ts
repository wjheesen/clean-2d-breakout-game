import { Rect, Vec2 } from "@wjheesen/glib";
import { Game, GameObject } from "./game";

export class Paddle implements GameObject {

    constructor(
        public readonly bounds: Rect.RectLike,
        private speed: number,
    ) {}

    onGameTick(game: Game) {
        this.show(game);
        this.handleLeftKeyPress(game);
        this.handleRightKeyPress(game);
        this.handleDragging(game);
    } 

    private show({ctx}: Game) {
        ctx.beginPath();
        ctx.rect(this.bounds.left, this.bounds.bottom, Rect.width(this.bounds), Rect.height(this.bounds));
        ctx.fillStyle = "#0095DD";
        ctx.fill();
        ctx.closePath();
    }

    private handleLeftKeyPress({room, keyListener}: Game) {
        if (keyListener.leftKeyPressed) {
            this.move(Vec2.boundX(-this.speed, this.bounds.left, room.bounds));
        }
    }
        
    private handleRightKeyPress({room, keyListener}: Game) {
        if (keyListener.rightKeyPressed) {
            this.move(Vec2.boundX(this.speed, this.bounds.right, room.bounds));
        }
    }

    private move(dx: number) {
        Rect.offsetX(this.bounds, dx, this.bounds);
    }

    private handleDragging({room, dragDetector}: Game) {
        let drag = dragDetector.getDragPosition()
        if (drag && Rect.containsX(room.bounds, drag.x)) {
            Rect.offsetX(this.bounds, drag.x - Rect.centerX(this.bounds), this.bounds);
        }
    }
}