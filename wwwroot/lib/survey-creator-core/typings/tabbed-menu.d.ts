import { Action, AdaptiveActionContainer, IAction } from "survey-core";
import { CreatorBase } from "./creator-base";
import { ICreatorPlugin } from "./creator-settings";
export interface ITabbedMenuItem extends IAction {
    componentContent: string;
    renderTab?: () => any;
}
export declare class TabbedMenuItem extends Action implements ITabbedMenuItem {
    constructor(item: ITabbedMenuItem);
    componentContent: string;
    renderTab?: () => any;
    getRootCss(): string;
    getTitleCss(): string;
    getIconCss(): string;
    get hasTitle(): boolean;
    get hasIcon(): boolean;
}
export declare class TabbedMenuContainer extends AdaptiveActionContainer<TabbedMenuItem> {
    private creator;
    constructor(creator: CreatorBase);
    addTab(name: string, plugin: ICreatorPlugin, title?: string, componentName?: string, index?: number): void;
    updateResponsivenessMode(): void;
}
