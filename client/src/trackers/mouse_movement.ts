import type { MouseMovement } from "../loggers/mouse_movements";
import type Observer from "./observer";
import type Subject from "./subject";

class MouseMovementTracker implements Subject<MouseMovement> {
    private observers: Observer<MouseMovement>[] = [];

    registerObserver(observer: Observer<MouseMovement>): void {
        this.observers.push(observer);
    }

    removeObserver(observer: Observer<MouseMovement>): void {
        this.observers = this.observers.filter(obs => obs !== observer);
    }

    notifyObservers(data: MouseMovement): void {
        for (const observer of this.observers) {
            observer.update(data);
        }
    }

    startTracking(): void {
        document.addEventListener('mousemove', (event) => {
            this.notifyObservers({ x: event.clientX, y: event.clientY, timestamp: Date.now() });
        });
    }
}

export default MouseMovementTracker;
