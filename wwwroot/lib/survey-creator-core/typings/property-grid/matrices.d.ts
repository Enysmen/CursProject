import { Base, JsonObjectProperty, Question, QuestionMatrixDynamicModel } from "survey-core";
import { ISurveyCreatorOptions } from "../creator-settings";
import { IPropertyEditorSetup, PropertyGridEditor } from "./index";
import { ISurveyPropertyGridDefinition } from "../question-editor/definition";
export declare abstract class PropertyGridEditorMatrix extends PropertyGridEditor {
    static getNewColumnName(objs: Array<any>, keyPropName: string, baseName: string): string | number;
    onCreated(obj: Base, question: Question, prop: JsonObjectProperty, options?: ISurveyCreatorOptions, propGridDefinition?: ISurveyPropertyGridDefinition): void;
    onSetup(obj: Base, question: Question, prop: JsonObjectProperty, options: ISurveyCreatorOptions): void;
    private initializePlaceholder;
    onMatrixCellCreated(obj: Base, options: any): void;
    onGetMatrixRowAction(obj: Base, options: any, setObjFunc: (obj: Base) => void): void;
    private getShowDetailActionIconName;
    protected addItem(creator: ISurveyCreatorOptions, obj: Base, question: QuestionMatrixDynamicModel): void;
    onGetQuestionTitleActions(obj: Base, options: any, creator: ISurveyCreatorOptions): void;
    protected createNewItem(matrix: QuestionMatrixDynamicModel, prop: JsonObjectProperty): Base;
    protected getDefaultClassName(obj: Base, prop: JsonObjectProperty): string;
    protected getBaseValue(prop: JsonObjectProperty): string;
    protected getKeyValue(): string;
    protected getColumnNames(obj: Base, prop: JsonObjectProperty, options: ISurveyCreatorOptions, propGridDefinition: ISurveyPropertyGridDefinition): Array<string>;
    protected getColumnClassName(obj: Base, prop: JsonObjectProperty): string;
    protected getPropertiesNames(obj: Base, prop: JsonObjectProperty, options: ISurveyCreatorOptions, propGridDefinition: ISurveyPropertyGridDefinition): Array<string>;
    protected getDefinedListProperties(obj: Base, prop: JsonObjectProperty, options: ISurveyCreatorOptions, propGridDefinition: ISurveyPropertyGridDefinition): Array<any>;
    protected getDefaultListProperties(prop: JsonObjectProperty): Array<string>;
    protected getDefaulColumnNames(): Array<string>;
    private isPropertyShownInList;
    protected getObjTypeName(): string;
    protected hasDetailPanel(): boolean;
    private hasPropertiesInDetail;
    protected setupMatrixQuestion(obj: Base, matrix: QuestionMatrixDynamicModel, prop: JsonObjectProperty, propGridDefinition: ISurveyPropertyGridDefinition): void;
    protected getAllowRowDragDrop(prop: JsonObjectProperty): boolean;
    private calcHasPropertiesInDetail;
    getJSON(obj: Base, prop: JsonObjectProperty, options: ISurveyCreatorOptions, propGridDefinition?: ISurveyPropertyGridDefinition): any;
    protected getMatrixJSON(obj: Base, prop: JsonObjectProperty, propNames: Array<string>, options: ISurveyCreatorOptions, propGridDefinition: ISurveyPropertyGridDefinition): any;
    protected getEmptyRowsText(prop: JsonObjectProperty): string;
    protected getMinimumRowCount(obj: Base, prop: JsonObjectProperty, options: ISurveyCreatorOptions): number;
    protected getMaximumRowCount(obj: Base, prop: JsonObjectProperty, options: ISurveyCreatorOptions): number;
    protected filterPropertyNames(propNames: Array<string>, options: ISurveyCreatorOptions): Array<string>;
    private getClassNameByProp;
    private getKeyName;
    protected getColumnsJSON(obj: Base, prop: JsonObjectProperty, propNames: Array<string>, options: ISurveyCreatorOptions, propGridDefinition: ISurveyPropertyGridDefinition): any;
    protected getEditItemAsStandAlone(): boolean;
    protected getShowDetailPanelOnAdding(): boolean;
    private getAddRowText;
    private setupUsingOptions;
}
export declare class PropertyGridEditorMatrixItemValues extends PropertyGridEditorMatrix {
    fit(prop: JsonObjectProperty): boolean;
    protected excludeTextPropertyName(propNames: Array<string>, options: ISurveyCreatorOptions): Array<string>;
    protected filterPropertyNames(propNames: Array<string>, options: ISurveyCreatorOptions): Array<string>;
    isPropertyEditorSetupEnabled(obj: Base, prop: JsonObjectProperty, question: Question, options: ISurveyCreatorOptions): boolean;
    protected getAllowRowDragDrop(prop: JsonObjectProperty): boolean;
    createPropertyEditorSetup(obj: Base, prop: JsonObjectProperty, question: Question, options: ISurveyCreatorOptions): IPropertyEditorSetup;
    canClearPropertyValue(obj: Base, prop: JsonObjectProperty, question: Question, options: ISurveyCreatorOptions): boolean;
    clearPropertyValue(obj: Base, prop: JsonObjectProperty, question: Question, options: ISurveyCreatorOptions): void;
    protected getColumnClassName(obj: Base, prop: JsonObjectProperty): string;
    protected getDefaulColumnNames(): Array<string>;
    protected getKeyValue(): string;
    protected getMatrixJSON(obj: Base, prop: JsonObjectProperty, propNames: Array<string>, options: ISurveyCreatorOptions, propGridDefinition: ISurveyPropertyGridDefinition): any;
    protected getMinimumRowCount(obj: Base, prop: JsonObjectProperty, options: ISurveyCreatorOptions): number;
    protected getMaximumRowCount(obj: Base, prop: JsonObjectProperty, options: ISurveyCreatorOptions): number;
    private hasMultipleLanguage;
    private hasVisibleIfOrEnableIf;
    onMatrixCellCreated(obj: Base, options: any): void;
    onMatrixCellValueChanged(obj: Base, options: any): void;
}
export declare class PropertyGridEditorMatrixRateValues extends PropertyGridEditorMatrixItemValues {
    fit(prop: JsonObjectProperty): boolean;
    private updateAllowAddRemove;
    onCreated(obj: Base, question: Question, prop: JsonObjectProperty, options?: ISurveyCreatorOptions, propGridDefinition?: ISurveyPropertyGridDefinition): void;
    onGetQuestionTitleActions(obj: Base, options: any, creator: ISurveyCreatorOptions): void;
    protected filterPropertyNames(propNames: Array<string>, options: ISurveyCreatorOptions): Array<string>;
}
export declare class PropertyGridEditorMatrixColumns extends PropertyGridEditorMatrix {
    fit(prop: JsonObjectProperty): boolean;
    protected getEditItemAsStandAlone(): boolean;
    protected getDefaulColumnNames(): Array<string>;
    protected getKeyValue(): string;
    protected getBaseValue(prop: JsonObjectProperty): string;
    protected getMaximumRowCount(obj: Base, prop: JsonObjectProperty, options: ISurveyCreatorOptions): number;
    protected getAllowRowDragDrop(prop: JsonObjectProperty): boolean;
}
export declare class PropertyGridEditorMatrixLayoutColumns extends PropertyGridEditorMatrix {
    fit(prop: JsonObjectProperty): boolean;
    protected getDefaulColumnNames(): Array<string>;
    onMatrixCellCreated(obj: Base, options: any): void;
    onCreated(obj: Base, question: Question, prop: JsonObjectProperty, options?: ISurveyCreatorOptions, propGridDefinition?: ISurveyPropertyGridDefinition): void;
}
export declare class PropertyGridEditorMatrixPages extends PropertyGridEditorMatrix {
    fit(prop: JsonObjectProperty): boolean;
    protected addItem(creator: ISurveyCreatorOptions, obj: Base, question: QuestionMatrixDynamicModel): void;
    protected getColumnClassName(obj: Base, prop: JsonObjectProperty): string;
    protected getDefaulColumnNames(): Array<string>;
    protected hasDetailPanel(): boolean;
    protected getKeyValue(): string;
    protected getBaseValue(prop: JsonObjectProperty): string;
    protected getAllowRowDragDrop(prop: JsonObjectProperty): boolean;
}
export declare class PropertyGridEditorMatrixCalculatedValues extends PropertyGridEditorMatrix {
    fit(prop: JsonObjectProperty): boolean;
    protected getColumnClassName(obj: Base, prop: JsonObjectProperty): string;
    protected getDefaulColumnNames(): Array<string>;
    protected getKeyValue(): string;
    protected getBaseValue(prop: JsonObjectProperty): string;
    protected getShowDetailPanelOnAdding(): boolean;
    protected setupMatrixQuestion(obj: Base, matrix: QuestionMatrixDynamicModel, prop: JsonObjectProperty, propGridDefinition: ISurveyPropertyGridDefinition): void;
}
export declare class PropertyGridEditorMatrixHtmlConditions extends PropertyGridEditorMatrix {
    fit(prop: JsonObjectProperty): boolean;
    protected getDefaulColumnNames(): Array<string>;
    protected getShowDetailPanelOnAdding(): boolean;
}
export declare class PropertyGridEditorMatrixUrlConditions extends PropertyGridEditorMatrix {
    fit(prop: JsonObjectProperty): boolean;
    protected getDefaulColumnNames(): Array<string>;
    protected getShowDetailPanelOnAdding(): boolean;
}
export declare class PropertyGridEditorMatrixMutlipleTextItems extends PropertyGridEditorMatrix {
    fit(prop: JsonObjectProperty): boolean;
    protected getEditItemAsStandAlone(): boolean;
    protected getColumnClassName(obj: Base, prop: JsonObjectProperty): string;
    protected getDefaulColumnNames(): Array<string>;
    protected getKeyValue(): string;
    protected getBaseValue(prop: JsonObjectProperty): string;
    protected getAllowRowDragDrop(): boolean;
    createPropertyEditorSetup(obj: Base, prop: JsonObjectProperty, question: Question, options: ISurveyCreatorOptions): IPropertyEditorSetup;
    onMatrixCellCreated(obj: Base, options: any): void;
    0: any;
}
export declare abstract class PropertyGridEditorMatrixMultipleTypes extends PropertyGridEditorMatrix {
    protected abstract getChoices(obj: Base): Array<any>;
    protected getColumnsJSON(obj: Base, prop: JsonObjectProperty, propNames: Array<string>, options: ISurveyCreatorOptions, propGridDefinition: ISurveyPropertyGridDefinition): any;
    onMatrixCellCreated(obj: Base, options: any): void;
    onMatrixCellValueChanged(obj: Base, options: any): void;
    protected getShowDetailPanelOnAdding(): boolean;
}
export declare class PropertyGridEditorMatrixValidators extends PropertyGridEditorMatrixMultipleTypes {
    fit(prop: JsonObjectProperty): boolean;
    protected getObjTypeName(): string;
    protected getDefaultClassName(obj: Base, prop: JsonObjectProperty): string;
    protected getChoices(obj: Base): Array<any>;
    private getSupportedValidators;
}
export declare class PropertyGridEditorMatrixTriggers extends PropertyGridEditorMatrixMultipleTypes {
    private getAvailableTriggers;
    private isTriggerVisible;
    fit(prop: JsonObjectProperty): boolean;
    protected getObjTypeName(): string;
    protected getDefaultClassName(obj: Base, prop: JsonObjectProperty): string;
    protected getAllowRowDragDrop(prop: JsonObjectProperty): boolean;
    protected getChoices(obj: Base): Array<any>;
}
