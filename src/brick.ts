import { GameObject, Game } from "./game";
import { Rect } from "./rect";

export enum BrickStatus {
    INTACT,
    DESTROYED,
}

export class Brick implements GameObject {

    private status = BrickStatus.INTACT

    constructor(
        public readonly bounds: Rect,
    ) {}

    get isIntact() {
        return this.status == BrickStatus.INTACT;
    }

    destroy() {
        this.status = BrickStatus.DESTROYED;
    }

    onGameTick(game: Game) {
        if (this.status == BrickStatus.INTACT) {
            this.show(game);
        }
    }

    private show({ctx}: Game) {
        let { left, top, width, height } = this.bounds;
        ctx.beginPath();
        ctx.rect(left, top, width, height);
        ctx.fillStyle = "#0095DD";
        ctx.fill();
        ctx.closePath();
    }
}
