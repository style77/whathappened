import type Observer from "../trackers/observer";

export type UserInteraction = { eventType: string, eventData: any, timestamp: number };

class InteractionLogger implements Observer<UserInteraction> {
    private interactions: UserInteraction[] = [];

    update(data: UserInteraction): void {
        this.interactions.push(data);
    }

    getInteractions(): UserInteraction[] {
        return this.interactions;
    }

    clearInteractions(): void {
        this.interactions = [];
    }
}

export default InteractionLogger;