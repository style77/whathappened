import type { IConfig } from "./config";
import defaultConfig from "./config";
import InteractionLogger from "./loggers/interaction";
import MouseMovementLogger from "./loggers/mouse_movements";
import InteractionTracker from "./trackers/interaction";
import MouseMovementTracker from "./trackers/mouse_movement";

interface IWhatHappened {
    publicKey: string;
    config: IConfig;

    onErrorOccurred(): void;
    start(): void;
}

class WhatHappened implements IWhatHappened {
    publicKey: string;
    private mouseTracker: MouseMovementTracker;
    private interactionTracker: InteractionTracker;
    private mouseLogger: MouseMovementLogger;
    private interactionLogger: InteractionLogger;

    config: IConfig = defaultConfig;

    constructor(publicKey: string) {
        this.publicKey = publicKey;

        this.mouseTracker = new MouseMovementTracker();
        this.interactionTracker = new InteractionTracker();

        this.mouseLogger = new MouseMovementLogger();
        this.interactionLogger = new InteractionLogger();

        this.mouseTracker.registerObserver(this.mouseLogger);
        this.interactionTracker.registerObserver(this.interactionLogger);
    }

    private async verifyApiKey(): Promise<boolean> {
        const response = await fetch(`${this.config.API_URL}/keys/verify`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': this.publicKey,
            },
        });

        const data = await response.json() as { success: boolean };
        return data.success;
    }

    private async setup(): Promise<void> {
        const isKeyValid = await this.verifyApiKey();
        if (!isKeyValid) {
            throw new Error("Invalid API Key or current domain is not allowed to use the API Key.");
        }
    }

    private async setupAndStart(): Promise<void> {
        await this.setup();
        this.start();
    }

    async start(easySetup: boolean = true): Promise<void> {
        // await this.setupAndStart();  todo: uncomment this line

        this.mouseTracker.startTracking();
        this.interactionTracker.trackInteractions();

        if (easySetup) {
            window.addEventListener('error', this.onErrorOccurred.bind(this));
        }
    }

    onErrorOccurred(): void {
        const mouseMovements = this.mouseLogger.getMovements();
        const interactions = this.interactionLogger.getInteractions();

        if (mouseMovements.length > 0 || interactions.length > 0) {
            this.sendDataToServer({ mouseMovements, interactions });
            this.mouseLogger.clearMovements();
            this.interactionLogger.clearInteractions();
        }
    }

    private sendDataToServer(data: any): void {
        console.log(data);
    }
}

function setup() {
    const scriptElement = document.getElementById('whathappened-script') as HTMLScriptElement;
    const publicKey = scriptElement?.getAttribute('public-key');
    if (!publicKey) {
        console.warn("No Public key provided. You need to setup whathappened manually.")
        return
    }

    const whatHappened = new WhatHappened(publicKey);
    (window as any).whathappened = whatHappened;

    whatHappened.start();
}

document.addEventListener('DOMContentLoaded', setup)