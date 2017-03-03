export interface AppConfig {
    name: string;
    perex: string;
    thumbnail ?: string;
    logo ?: string;

    route: {
        name: string,
        params ?: object
    }
}