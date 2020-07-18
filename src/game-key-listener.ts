export class GameKeyListener {

    public leftKeyPressed = false;
    public rightKeyPressed = false;

    startListening() {
        document.addEventListener('keydown', this.onKeyDown, false);
        document.addEventListener('keyup', this.onKeyUp, false);
    }

    stopListening() {
        document.removeEventListener('keydown', this.onKeyDown, false);
        document.removeEventListener('keyup', this.onKeyUp, false);
    }

    private onKeyDown = (e: KeyboardEvent) => {
        switch (e.key) {
            case 'Left':
            case 'ArrowLeft':
                this.leftKeyPressed = true;
                break;
            case 'Right':
            case 'ArrowRight':
                this.rightKeyPressed = true;
                break;
        }
    }
    
    private onKeyUp = (e: KeyboardEvent) => {
        switch (e.key) {
            case 'Left':
            case 'ArrowLeft':
                this.leftKeyPressed = false;
                break;
            case 'Right':
            case 'ArrowRight':
                this.rightKeyPressed = false;
                break;
        }
    }
}