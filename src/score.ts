import { GameObject, Game } from "./game";

export class Score implements GameObject {

    public value = 0;

    constructor(
        private x: number,
        private y: number,
    ) {}

    onGameTick({ctx}: Game) {
        ctx.font = '16px Arial';
        ctx.fillStyle = '#0095DD';
        ctx.fillText(`Score: ${this.value}`, this.x, this.y);
    }
}