export interface IConfig {
    API_URL: any;
}

class DefaultConfig implements IConfig {
    API_URL: string = 'http://localhost:3000';

    constructor() {
        const environment = process.env.NODE_ENV || 'development';
        switch (environment) {
            case "production":
                this.API_URL = 'https://whathappened.dev';
                break;
            case "development":
                this.API_URL = 'http://localhost:3000';
                break;
        }
    }
}

const defaultConfig = new DefaultConfig();

export default defaultConfig;