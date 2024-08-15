import type Observer from "../trackers/observer";

export type MouseMovement = { x: number, y: number, timestamp: number };

class MouseMovementLogger implements Observer<MouseMovement> {
    private movements: { x: number, y: number }[] = [];

    update(data: MouseMovement): void {
        this.movements.push(data);
    }

    getMovements(): { x: number, y: number }[] {
        return this.movements;
    }

    clearMovements(): void {
        this.movements = [];
    }
}

export default MouseMovementLogger;