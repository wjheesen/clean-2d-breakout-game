import { Rect } from "@wjheesen/glib";
import { GameObject, Game } from "./game";

export class Room implements GameObject {

    constructor(
        public readonly bounds: Rect.RectLike,
    ) {}

    get width() {
        return Rect.width(this.bounds);
    }

    get height() {
        return Rect.height(this.bounds);
    }

    onGameTick({ctx}: Game) {
        ctx.clearRect(this.bounds.bottom, this.bounds.left, this.width, this.height);
    }
}