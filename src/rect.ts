export class Rect {
    constructor(
        public left: number,
        public top: number,
        public width: number,
        public height: number,
    ) {}

    get right() {
        return this.left + this.width;
    }

    set right(x: number) {
        this.left = x - this.width;
    }

    get bottom() {
        return this.top + this.height;
    }

    set bottom(y: number) {
        this.top = y - this.height;
    }

    get centerX() {
        return this.left + this.width / 2;
    }

    set centerX(x: number) {
        this.left = x - this.width / 2;
    }

    get centerY() {
        return this.top + this.height / 2;
    }

    set centerY(y: number) {
        this.top = y - this.height / 2; 
    }

    offset(dx: number, dy: number) {
        this.left += dx;
        this.top += dy;
    }

    contains(x: number, y: number) {
        return this.containsX(x) && this.containsY(y);
    }

    containsX(x: number) {
        return this.left <= x && x <= this.right;
    }

    containsY(y: number) {
        return this.top <= y && y <= this.bottom
    }

    containsRect(other: Rect) {
        return this.left <= other.left && other.right <= this.right 
            && this.bottom <= other.bottom && other.top <= this.top;
    }

    overlapsRect(other: Rect) {
        return this.left < other.right 
            && this.right > other.left 
            && this.top < other.bottom
            && this.bottom > other.top;
    }
}