import { Rect } from "@wjheesen/glib";
import { GameObject, Game } from "./game";

export enum BrickStatus {
    INTACT,
    DESTROYED,
}

export class Brick implements GameObject {

    private status = BrickStatus.INTACT

    constructor(
        public readonly bounds: Rect.RectLike,
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
        ctx.beginPath();
        ctx.rect(this.bounds.left, this.bounds.bottom, Rect.width(this.bounds), Rect.height(this.bounds));
        ctx.fillStyle = "#0095DD";
        ctx.fill();
        ctx.closePath();
    }
}
