import type Observer from "../trackers/observer";

export type MouseMovement = { x: number, y: number, timestamp: number };

class MouseMovementLogger implements Observer<MouseMovement> {
    private movements: MouseMovement[] = [];
    private interval: number = 15000; // 15 seconds

    update(data: MouseMovement): void {
        this.movements.push(data);
        this.trimOldRecords();
    }

    private trimOldRecords(): void {
        const now = Date.now();
        this.movements = this.movements.filter(movement => (now - movement.timestamp) <= this.interval);
    }

    getMovements(): MouseMovement[] {
        this.trimOldRecords();
        return this.movements;
    }

    clearMovements(): void {
        this.movements = [];
    }
}

export default MouseMovementLogger;
