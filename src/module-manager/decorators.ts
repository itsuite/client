import {ModuleConfig} from "./module-config";
import {BaseModule} from './base-module';
import {Container} from 'aurelia-dependency-injection';
import {ModuleManager} from "./module-manager";

const container: Container = Container.instance;
const moduleManager: ModuleManager = container.get(ModuleManager);

export function module(name: string, config: ModuleConfig): ClassDecorator {
    return <T extends BaseModule>(target: T) => {
        if (target) {
            Object.defineProperty(target, 'moduleConfig', {value: config});
            moduleManager.register(name, config);
        }
    }
}