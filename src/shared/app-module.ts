import {Router} from "aurelia-router";
import {AppConfig} from "src/shared/app-config";

export interface AppModule {
    config: AppConfig;
    router ?: Router;
}