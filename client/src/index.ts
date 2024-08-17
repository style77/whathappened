import pako from "pako";
import type { IConfig } from "./config";
import defaultConfig from "./config";
import InteractionLogger, { UserInteraction } from "./loggers/interaction";
import MouseMovementLogger, { MouseMovement } from "./loggers/mouse_movements";
import InteractionTracker from "./trackers/interaction";
import MouseMovementTracker from "./trackers/mouse_movement";

type ErrorEvent = {
    isTrusted: boolean;
    message: string;
    filename: string;
    lineno: number;
    colno: number;
    errorStack: string;
    timestamp: number;
}

type Session = {
    id: string;
    user: string;
    ua: string;
    url: string;
    referrer: string;
    screen: {
        width: number;
        height: number;
    };
    viewport: {
        width: number;
        height: number;
    };
    time: {
        startedAt: number;
        endedAt: number;
        duration: number;
    };
}

interface IWhatHappened {
    publicKey: string;
    config: IConfig;

    onErrorOccurred(errorEvent: ErrorEvent): void;
    start(): void;
}

class WhatHappened implements IWhatHappened {
    publicKey: string;
    private sessionID: string = this.generateSessionID();
    private sessionStartedAt: number = Date.now();
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
        const response = await fetch(`${this.config.API_URL}/keys/verify/`, {
            method: 'GET',
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
        // await this.setupAndStart(); //  todo: uncomment this line

        this.mouseTracker.startTracking();
        this.interactionTracker.trackInteractions();

        if (easySetup) {
            window.addEventListener('error', (errorEvent) => this.onErrorOccurred({
                isTrusted: errorEvent.isTrusted,
                message: errorEvent.message,
                filename: errorEvent.filename,
                lineno: errorEvent.lineno,
                colno: errorEvent.colno,
                errorStack: errorEvent.error.stack,
                timestamp: Date.now(),
            }));
        }
    }

    onErrorOccurred(errorEvent: ErrorEvent): void {
        const mouseMovements = this.mouseLogger.getMovements();
        const interactions = this.interactionLogger.getInteractions();

        if (mouseMovements.length > 0 || interactions.length > 0) {
            this.sendDataToServer({ mouseMovements, interactions, error: errorEvent });
            this.mouseLogger.clearMovements();
            this.interactionLogger.clearInteractions();
        }
    }

    private generateSessionID(): string {
        return Math.random().toString(36).substr(2, 9);
    }

    private getUserID(): string {
        let userID = localStorage.getItem('whathappened-user-id');
        if (!userID) {
            userID = Math.random().toString(36).substr(2, 9);
            localStorage.setItem('whathappened-user-id', userID);
        }

        return userID;
    }

    private generateErrorId(errorEvent: ErrorEvent): string {
        const errorString = `${errorEvent.message}-${errorEvent.filename}-${errorEvent.lineno}-${errorEvent.colno}-${errorEvent.timestamp}`;
        return btoa(errorString);
    }

    private compressData(data: any): Uint8Array {
        const jsonString = JSON.stringify(data);
        return pako.deflate(jsonString, { level: 9 });
    };

    private getSessionData(): Session {
        const userID = this.getUserID();
        const sessionID = this.sessionID;

        return {
            id: sessionID,
            user: userID,
            ua: navigator.userAgent,
            url: window.location.href,
            referrer: document.referrer,
            screen: {
                width: window.screen.width,
                height: window.screen.height,
            },
            viewport: {
                width: window.innerWidth,
                height: window.innerHeight,
            },
            time: {
                startedAt: this.sessionStartedAt,
                endedAt: Date.now(),
                duration: Date.now() - this.sessionStartedAt,
            }
        };
    }

    private sendDataToServer(data: {
        mouseMovements: MouseMovement[],
        interactions: UserInteraction[],
        error: ErrorEvent,
    }): void {
        const errorID = this.generateErrorId(data.error);

        const headers = {
            'Content-Type': 'application/json',
            'Authorization': this.publicKey
        };

        const compressedMovements = this.compressData(data.mouseMovements);
        const compressedInteractions = this.compressData(data.interactions);

        const body = {
            error: {
                id: errorID,
                message: data.error.message,
                filename: data.error.filename,
                lineno: data.error.lineno,
                colno: data.error.colno,
                errorStack: data.error.errorStack,
                timestamp: data.error.timestamp,
            },
            session: this.getSessionData(),
            mouseMovements: Array.from(compressedMovements),
            interactions: Array.from(compressedInteractions),
        };

        console.log(body)
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