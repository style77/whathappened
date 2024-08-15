import type { UserInteraction } from "../loggers/interaction";
import type Observer from "./observer";
import type Subject from "./subject";

class InteractionTracker implements Subject<UserInteraction> {
    private observers: Observer<UserInteraction>[] = [];

    registerObserver(observer: Observer<UserInteraction>): void {
        this.observers.push(observer);
    }

    removeObserver(observer: Observer<UserInteraction>): void {
        this.observers = this.observers.filter(obs => obs !== observer);
    }

    notifyObservers(data: UserInteraction): void {
        for (const observer of this.observers) {
            observer.update(data);
        }
    }

    trackInteractions(): void {
        document.addEventListener('click', (event) => {
            const target = event.target as HTMLElement;
            this.notifyObservers({ eventType: 'click', eventData: { element: target.tagName, id: target.id }, timestamp: Date.now() });
        });

        document.addEventListener('input', (event) => {
            const target = event.target as HTMLInputElement;
            this.notifyObservers({ eventType: 'input', eventData: { element: target.tagName, value: target.value }, timestamp: Date.now() });
        });

        // document.addEventListener('scroll', (event) => {
        //     this.notifyObservers({ eventType: 'scroll', eventData: { currentX: window.scrollX, currentY: window.scrollY }, timestamp: Date.now() });
        // });

        // document.addEventListener('resize', (event) => {
        //     this.notifyObservers({ eventType: 'resize', eventData: { width: window.innerWidth, height: window.innerHeight }, timestamp: Date.now() });
        // });

        // document.addEventListener('keydown', (event) => {
        //     this.notifyObservers({ eventType: 'keydown', eventData: { key: event.key }, timestamp: Date.now() });
        // });
    }
}

export default InteractionTracker;