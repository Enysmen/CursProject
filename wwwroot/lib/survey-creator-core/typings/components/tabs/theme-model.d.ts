import { Base, ITheme, ILoadFromJSONOptions, ISaveToJSONOptions, EventBase, SurveyModel } from "survey-core";
import { HeaderModel } from "./header-model";
import { UndoRedoManager } from "../../plugins/undo-redo/undo-redo-manager";
import { SurveyCreatorModel } from "../../creator-base";
export * from "./header-model";
export declare function getThemeFullName(theme: ITheme): string;
export declare function isThemeEmpty(theme: ITheme): boolean;
export declare function findSuitableTheme(themeName: string, colorPalette: string, isPanelless: boolean, probeThemeFullName: string): ITheme;
export declare function getObjectDiffs(obj1: any, obj2?: any): any;
export declare function getThemeChanges(fullTheme: ITheme, baseTheme?: ITheme): ITheme;
export declare class ThemeModel extends Base implements ITheme {
    static DefaultTheme: ITheme;
    undoRedoManager: UndoRedoManager;
    private themeCssVariablesChanges;
    private colorCalculator;
    backgroundImage: string;
    backgroundImageFit: "auto" | "contain" | "cover";
    backgroundImageAttachment: "fixed" | "scroll";
    backgroundOpacity: number;
    themeName: string;
    colorPalette: "light" | "dark" | string;
    isPanelless: boolean;
    groupAppearanceAdvancedMode: boolean;
    panelBackgroundTransparency: number;
    questionBackgroundTransparency: number;
    scale: number;
    cornerRadius: number;
    fontSize: number;
    getFullThemeName(_themeName?: string): string;
    private _defaultSessionTheme;
    get defaultSessionTheme(): ITheme;
    set defaultSessionTheme(theme: ITheme);
    get cssVariables(): {
        [index: string]: string;
    };
    get themeCssCustomizations(): {
        [index: string]: string;
    };
    getType(): string;
    private setNewHeaderProperty;
    hasVariations(palette: boolean): boolean;
    private initializeColorCalculator;
    private updatePropertiesDependentOnPrimaryColor;
    private cssVariablePropertiesChanged;
    private setThemeCssVariablesChanges;
    constructor();
    initialize(surveyTheme?: ITheme, survey?: SurveyModel, creator?: SurveyCreatorModel): void;
    get header(): HeaderModel;
    set header(val: HeaderModel);
    questionPanel: any;
    editorPanel: any;
    onThemeSelected: EventBase<ThemeModel, {
        theme: ITheme;
    }>;
    onThemePropertyChanged: EventBase<ThemeModel, {
        name: string;
        value: any;
    }>;
    onAllowModifyTheme: EventBase<ThemeModel, {
        theme: ITheme;
        allow: boolean;
    }>;
    private blockThemeChangedNotifications;
    loadTheme(theme: ITheme, preferredColorPalette?: string): void;
    resetTheme(): void;
    setTheme(theme: ITheme): void;
    selectTheme(themeName: string, colorPalette?: string, themeMode?: string): void;
    private generalPropertiesChanged;
    private onThemePropertyValueChangedCallback;
    findSuitableTheme(themeName: string): ITheme;
    fromJSON(json: ITheme, options?: ILoadFromJSONOptions): void;
    toJSON(options?: ISaveToJSONOptions): ITheme;
}
