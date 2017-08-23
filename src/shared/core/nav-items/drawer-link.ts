import {RouteLink} from 'src/shared/core/route-link';

export interface DrawerLink {
    title: string;
    route: RouteLink;
    icon ?: string;
    children ?: RouteLink[];
}