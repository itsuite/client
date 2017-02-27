export interface AppDefinition {
    name: string,
    perex: string,
    thumbnail?: string,
    route: {
        name: string,
        params ?: object
    }
}