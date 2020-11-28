import { Brick } from "./brick";
import { GameObject, Game } from "./game";
import { Room } from "./room";
import { Paddle } from "./paddle";
import { Point, Rect, Vec2 } from "@wjheesen/glib";

export class Ball implements GameObject {

    private target = Rect.dimensions(
        this.center.x + this.velocity.x - this.radius,
        this.center.y + this.velocity.y + this.radius,
        this.radius * 2,
        this.radius * 2
    );

    constructor(
        private center: Point.PointLike,
        private radius: number,
        private velocity: Vec2.Vec2Like,
    ) {}

    onGameTick(game: Game) {
        this.show(game);
        this.move();
    }

    private show({ctx}: Game) {
        ctx.beginPath();
        ctx.arc(this.center.x, this.center.y, this.radius, 0, Math.PI*2);
        ctx.fillStyle = "#0095DD";
        ctx.fill();
        ctx.closePath();
    }

    private move() {
        Vec2.add(this.velocity, this.center, this.center);
        Rect.offset(this.target, this.velocity, this.target);
        console.log(this.velocity, this.center);
    }

    collidesWithWall({bounds}: Room) {
        return !Rect.containsX(bounds, this.target.left) || !Rect.containsX(bounds, this.target.right);
    }

    collidesWithCeiling({bounds}: Room) {
        return !Rect.containsY(bounds, this.target.bottom);
    }
    
    collidesWithFloor({bounds}: Room) {
        return !Rect.containsY(bounds, this.target.top);
    }

    collidesWithPaddle({bounds}: Paddle) {
        return Rect.intersects(bounds, this.target);
    }
 
    collidesWithBrick(brick: Brick) {
        return brick.isIntact && Rect.intersects(brick.bounds, this.target);
    }

    bounceAgainstWall(room: Room) {
        this.velocity.x = -this.velocity.x;
    }

    bounceAgainstCeiling(room: Room) {
        this.velocity.y = -this.velocity.y;
    }

    bounceAgainstPaddle(paddle: Paddle) {
        this.velocity.y = -this.velocity.y;
    }

    bounceAgainstBrick(brick: Brick) {
        this.velocity.y =- this.velocity.y;
    }
}
