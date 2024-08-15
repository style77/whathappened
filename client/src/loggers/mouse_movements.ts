import type Observer from "../trackers/observer";

export type MouseMovement = { x: number, y: number, timestamp: number };

class MouseMovementLogger implements Observer<MouseMovement> {
    private movements: MouseMovement[] = [];

    update(data: MouseMovement): void {
        this.movements.push(data);
    }

    getMovements(): MouseMovement[] {
        return this.movements;
    }

    clearMovements(): void {
        this.movements = [];
    }
}

export default MouseMovementLogger;