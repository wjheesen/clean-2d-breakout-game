import { Point, Vec2 } from "@wjheesen/glib";

export class DragDetector {

    private dragging = false;
    private dragPosition= <Point.PointLike> {};

    constructor(
        private canvasEl: HTMLCanvasElement
    ) {}

    getDragPosition(): Point.PointLike|null {
        return this.dragging ? this.dragPosition : null;
    }

    startListening() {
        this.canvasEl.addEventListener('pointerdown', this.onPointerDown);
        this.canvasEl.addEventListener('pointermove', this.onPointerMove);
        this.canvasEl.addEventListener('pointerup', this.onPointerUp);
        this.canvasEl.addEventListener('pointercancel', this.onPointerUp);
    }

    stopListening() {
        this.canvasEl.removeEventListener('pointerdown', this.onPointerDown);
        this.canvasEl.removeEventListener('pointermove', this.onPointerMove);
        this.canvasEl.removeEventListener('pointerup', this.onPointerUp);
        this.canvasEl.removeEventListener('pointercancel', this.onPointerUp);
    }

    private onPointerDown = (e: PointerEvent) => {
        this.dragging = e.target == this.canvasEl;
    }

    private onPointerMove = (e: PointerEvent) => {
        if (this.dragging) {
            e.preventDefault();
            this.dragPosition.x = e.clientX - this.canvasEl.offsetLeft;
            this.dragPosition.y = e.clientY - this.canvasEl.offsetTop;
        }
    }
  
    private onPointerUp = (e: PointerEvent) => {
        this.dragging = false;
    }
}