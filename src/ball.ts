import { Brick } from "./brick";
import { GameObject, Game } from "./game";
import { Rect } from "./rect";
import { Room } from "./room";
import { Paddle } from "./paddle";

export class Ball implements GameObject {

    private target = new Rect(
        this.x + this.dx - this.radius, 
        this.y + this.dy - this.radius, 
        this.radius * 2, this.radius * 2
    );

    constructor(
        private x: number, 
        private y: number,
        private radius: number,
        private dx: number,
        private dy: number,
    ) {}

    onGameTick(game: Game) {
        this.show(game);
        this.move();
    }

    private show({ctx}: Game) {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI*2);
        ctx.fillStyle = "#0095DD";
        ctx.fill();
        ctx.closePath();
    }

    private move() {
        this.x += this.dx;
        this.y += this.dy;
        this.target.offset(this.dx, this.dy);
    }

    collidesWithWall({bounds}: Room) {
        return !bounds.containsX(this.target.left) || !bounds.containsX(this.target.right);
    }

    collidesWithCeiling({bounds}: Room) {
        return !bounds.containsY(this.target.top);
    }
    
    collidesWithFloor({bounds}: Room) {
        return !bounds.containsY(this.target.bottom);
    }

    collidesWithPaddle({bounds}: Paddle) {
        return bounds.overlapsRect(this.target);
    }
 
    collidesWithBrick(brick: Brick) {
        return brick.isIntact && brick.bounds.overlapsRect(this.target);
    }

    bounceAgainstWall(room: Room) {
        this.dx = -this.dx;
    }

    bounceAgainstCeiling(room: Room) {
        this.dy = -this.dy;
    }

    bounceAgainstPaddle(paddle: Paddle) {
        this.dy = -this.dy;
    }

    bounceAgainstBrick(brick: Brick) {
        this.dy =- this.dy;
    }
}
