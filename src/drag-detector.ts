import { Point } from './point';

export class DragDetector {

    private dragging = false;
    private dragPosition= <Point> null;

    constructor(
        private canvasEl: HTMLCanvasElement
    ) {}

    getDragPosition(): Point|null {
        return this.dragPosition;
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
            this.dragPosition = this.measureDragPosition(e);
        }
    }
  
    private onPointerUp = (e: PointerEvent) => {
        this.dragging = false;
        this.dragPosition = null;
    }

    private measureDragPosition(e: PointerEvent) {
        return new Point(
            e.clientX - this.canvasEl.offsetLeft,
            e.clientY - this.canvasEl.offsetTop,
        ); 
    }
}