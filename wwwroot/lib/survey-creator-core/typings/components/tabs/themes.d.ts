import { ItemValue, ITheme } from "survey-core";
export declare const Themes: {
    [index: string]: ITheme;
};
export declare const PredefinedThemes: string[];
export declare const PredefinedColors: {
    light: {
        teal: string;
        blue: string;
        purple: string;
        orchid: string;
        tulip: string;
        brown: string;
        green: string;
    };
    dark: {
        teal: string;
        blue: string;
        purple: string;
        orchid: string;
        tulip: string;
        brown: string;
        green: string;
    };
};
export declare const PredefinedBackgroundColors: {
    light: {
        teal: string;
        blue: string;
        purple: string;
        orchid: string;
        tulip: string;
        brown: string;
        green: string;
        gray: string;
    };
    dark: {};
};
export declare function getPredefinedColorsItemValues(colorPalette?: string): ItemValue[];
export declare function getPredefinedBackgoundColorsChoices(colorPalette?: string): {
    value: any;
    text: string;
}[];
