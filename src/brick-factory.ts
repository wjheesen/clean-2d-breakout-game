import { Brick } from "./brick";

export interface BrickSpecification {
    padding: number;
    width: number;
    height: number;
    offsetLeft: number;
    offsetTop: number;
}

export class BrickFactory {

    newBricks(cols: number, rows: number, specs: BrickSpecification) {
        return Array.from(this.newBrickGenerator(cols, rows, specs));
    }

    private *newBrickGenerator(cols: number, rows: number, specs: BrickSpecification) {
        for (let col = 0; col < cols; col++) 
        for (let row = 0; row < rows; row++) {
            yield this.newBrick(col, row, specs)
        }
    }

    newBrick(col: number, row: number, {padding, width, height, offsetLeft, offsetTop}: BrickSpecification ) {
        let left = col * (width + padding) + offsetLeft;
        let bottom = row * (height + padding) + offsetTop;
        return new Brick({left: left, top: bottom + height, right: left + width, bottom: bottom});
    }
}