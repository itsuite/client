import {RouteConfig} from "aurelia-router";

export interface ModuleConfig {
    id: string;
    name: string;
    routes: RouteConfig[];
    perex?: string;
    logo?: string;
    thumbnail?: string;
}