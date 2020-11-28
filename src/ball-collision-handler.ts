import { Game } from "./game";
import { Brick } from "./brick";

export class BallCollisionHandler {

    handleCollision(game: Game) {
        return this.handleCollisionWithBricks(game)
            || this.handleCollisionWithPaddle(game)
            || this.handleCollisionWithWall(game)
            || this.handleCollisionWithCeiling(game)
            || this.handleCollisionWithFloor(game);
    }

    private handleCollisionWithBricks(game: Game) {
        return game.bricks.some(brick => this.handleCollisionWithBrick(game, brick));
    }

    private handleCollisionWithBrick(game: Game, brick: Brick) {
        let { ball, bricks, score } = game;
        if (ball.collidesWithBrick(brick)) {
            ball.bounceAgainstBrick(brick);
            brick.destroy();
            if (++score.value == bricks.length) {
                game.complete();
            }
            return true;
        }
    }

    private handleCollisionWithPaddle({ball, paddle}: Game) {
        if (ball.collidesWithPaddle(paddle)) {
            ball.bounceAgainstPaddle(paddle);
            return true;
        } 
    }

    private handleCollisionWithWall({ball, room}: Game) {
        if (ball.collidesWithWall(room)) {
            console.log('wall collision', ball, room.bounds);
            ball.bounceAgainstWall(room);
            return true;
        }
    }

    private handleCollisionWithCeiling({ball, room}: Game) {
        if (ball.collidesWithCeiling(room)) {
            ball.bounceAgainstCeiling(room);
            return true;
        }
    }

    private handleCollisionWithFloor(game: Game) {
        let { ball, room } = game;
        if (ball.collidesWithFloor(room)) {
            game.stop();
            return true;
        }
    }
}