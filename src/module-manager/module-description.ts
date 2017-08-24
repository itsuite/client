import {RouteConfig} from "aurelia-router";

export interface ModuleDescription {
    routeConfig: RouteConfig,
    title: string;
    perex: string;
    logo?: string;
    thumbnail: string;
}