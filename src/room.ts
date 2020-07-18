import { GameObject, Game } from "./game";
import { Rect } from "./rect";

export class Room implements GameObject {

    constructor(
        public readonly bounds: Rect,
    ) {}

    get width() {
        return this.bounds.width;
    }

    get height() {
        return this.bounds.height;
    }

    onGameTick({ctx}: Game) {
        let { left, top, width, height } = this.bounds;
        ctx.clearRect(left, top, width, height);
    }
}