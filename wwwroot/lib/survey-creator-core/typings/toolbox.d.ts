import { Action, AdaptiveActionContainer, Base, IAction, Question, AnimationBoolean } from "survey-core";
import { SurveyCreatorModel, toolboxLocationType } from "./creator-base";
import { SearchManagerToolbox } from "./components/toolbox/toolbox-search-manager";
export type overflowBehaviorType = "hideInMenu" | "scroll";
/**
 * A toolbox item configuration.
 *
 * `IQuestionToolboxItem` objects are used in such Toolbox API methods as [`addItem(item, index)`](https://surveyjs.io/survey-creator/documentation/api-reference/questiontoolbox#addItem), [`replaceItem(item)`](https://surveyjs.io/survey-creator/documentation/api-reference/questiontoolbox#replaceItem), [`addSubitem(subitem, index)`](https://surveyjs.io/survey-creator/documentation/api-reference/questiontoolboxitem#addSubitem), and others.
 *
 * [Toolbox Customization](https://surveyjs.io/survey-creator/documentation/toolbox-customization (linkStyle))
 */
export interface IQuestionToolboxItem extends IAction {
    /**
     * A toolbox item identifier.
     *
     * > Toolbox item names must be unique.
     */
    name: string;
    /**
     * An icon name.
     *
     * [UI Icons](https://surveyjs.io/form-library/documentation/icons (linkStyle))
     */
    iconName?: string;
    /**
     * A JSON object used to create a new question or panel when users click this toolbox item. It must contain the `type` property.
     *
     * [View Toolbox Customization Demo](https://surveyjs.io/survey-creator/examples/survey-toolbox-customization/ (linkStyle))
     */
    json: any;
    /**
     * A user-friendly toolbox item title.
     */
    title: string;
    className?: string;
    /**
     * A toolbox item tooltip.
     *
     * If `tooltip` is undefined, the [`title`](#title) property value is used instead.
     */
    tooltip?: string;
    isCopied?: boolean;
    /**
     * A category to which this toolbox item belongs.
     *
     * Out-of-the-box categories include `"general"`, `"choice"`, `"text"`, `"containers"`, `"matrix"`, and `"misc"`.
     *
     * Default value: `"general"`
     */
    category?: string;
    /**
     * Specifies whether users can interact with the toolbox item.
     *
     * Default value: `true`
     */
    enabled?: boolean;
    getArea?: (el: HTMLElement) => HTMLElement;
    clearSubitems?(): void;
    addSubitem?(subitem: IQuestionToolboxItem, index: number): void;
    removeSubitem?(subitem: IQuestionToolboxItem | string): void;
}
export interface IQuestionToolbox {
    toggleCategoryState(name: string): any;
}
export interface IToolboxCategoryDefinition {
    category: string;
    title?: string;
    items: Array<string | {
        name: string;
        title?: string;
    }>;
}
export declare class QuestionToolboxCategory extends Base {
    private toolbox;
    constructor(toolbox: IQuestionToolbox);
    name: string;
    title: string;
    items: Array<QuestionToolboxItem>;
    collapsedValue: boolean;
    forceExpand: boolean;
    get collapsed(): boolean;
    set collapsed(val: boolean);
    empty: boolean;
    toggleState(): void;
}
/**
 * A toolbox item instance.
 *
 * An object of this class is returned by the `QuestionToolbox`'s [`getItemByName(name)`](https://surveyjs.io/survey-creator/documentation/api-reference/questiontoolbox#getItemByName) method.
 */
export declare class QuestionToolboxItem extends Action implements IQuestionToolboxItem {
    private item;
    propName: string;
    propValue: string;
    static getItemClassNames(iconName?: string): string;
    constructor(item: IQuestionToolboxItem);
    /**
     * A user-friendly toolbox item title.
     */
    get title(): string;
    set title(val: string);
    /**
     * Specifies whether users can interact with the toolbox item.
     *
     * Default value: `true`
     */
    get enabled(): boolean;
    set enabled(val: boolean);
    className: string;
    get renderedCss(): string;
    /**
     * An icon name.
     *
     * [UI Icons](https://surveyjs.io/form-library/documentation/icons (linkStyle))
     */
    iconName: string;
    /**
     * A toolbox item identifier.
     *
     * > Toolbox item names must be unique.
     */
    name: string;
    /**
     * A JSON object used to create a new question or panel when users click this toolbox item. It must contain the `type` property.
     *
     * [View Toolbox Customization Demo](https://surveyjs.io/survey-creator/examples/survey-toolbox-customization/ (linkStyle))
     */
    json: any;
    /**
     * A toolbox item tooltip.
     *
     * If `tooltip` is undefined, the [`title`](#title) property value is used instead.
     */
    tooltip: string;
    isCopied: boolean;
    /**
     * A category to which this toolbox item belongs.
     *
     * Out-of-the-box categories include `"general"`, `"choice"`, `"text"`, `"containers"`, `"matrix"`, and `"misc"`.
     *
     * Default value: `"general"`
     */
    category: string;
    toJSON(): IQuestionToolboxItem;
    get typeName(): string;
    get isPanel(): boolean;
    getArea(target: HTMLElement): HTMLElement;
    hasText(text: string): boolean;
    /**
     * Finds a subitem with a specified name in the collection of subitems belonging to this toolbox item.
     *
     * [Manage Toolbox Subitems](https://surveyjs.io/survey-creator/documentation/toolbox-customization#manage-toolbox-subitems (linkStyle))
     * @param name A subitem [`name`](https://surveyjs.io/survey-creator/documentation/api-reference/iquestiontoolboxitem#name).
     * @returns A [`QuestionToolboxItem`](https://surveyjs.io/survey-creator/documentation/api-reference/questiontoolboxitem) object that represents the subitem instance.
     */
    getSubitem(name: string): QuestionToolboxItem;
    addSubitems(items: Array<QuestionToolboxItem>): void;
    /**
     * Removes all subitems from this toolbox item.
     *
     * [Manage Toolbox Subitems](https://surveyjs.io/survey-creator/documentation/toolbox-customization#manage-toolbox-subitems (linkStyle))
     * @see removeSubitem
     * @see addSubitem
     */
    clearSubitems(): void;
    /**
     * Adds a subitem to this toolbox item.
     *
     * [Manage Toolbox Subitems](https://surveyjs.io/survey-creator/documentation/toolbox-customization#manage-toolbox-subitems (linkStyle))
     * @param subitem An [`IQuestionToolboxItem`](https://surveyjs.io/survey-creator/documentation/api-reference/iquestiontoolboxitem) object that represents a subitem configuration.
     * @param index *(Optional)* A zero-based index at which to insert the subitem. If you do not specify this parameter, the subitem is added to the end.
     * @see removeSubitem
     * @see clearSubitems
     */
    addSubitem(subitem: IQuestionToolboxItem, index?: number): void;
    /**
     * Removes a specific subitem from this toolbox item.
     *
     * [Manage Toolbox Subitems](https://surveyjs.io/survey-creator/documentation/toolbox-customization#manage-toolbox-subitems (linkStyle))
     * @param subitem A subitem [`name`](https://surveyjs.io/survey-creator/documentation/api-reference/iquestiontoolboxitem#name) or an [`IQuestionToolboxItem`](https://surveyjs.io/survey-creator/documentation/api-reference/iquestiontoolboxitem) object that represents a subitem configuration.
     * @see clearSubitems
     * @see addSubitem
     */
    removeSubitem(subitem: IQuestionToolboxItem | string): void;
    get subitemsButtonIcon(): string;
}
/**
 * An object that enables you to modify Survey Creator's Toolbox. To access this object, use the [`toolbox`](https://surveyjs.io/survey-creator/documentation/api-reference/survey-creator#toolbox) property on a Survey Creator instance:
 *
 * ```js
 * const creatorOptions = { ... };
 * const creator = new SurveyCreator.SurveyCreator(creatorOptions);
 * creator.toolbox.settingName = "value";
 *
 * // In modular applications:
 * import { SurveyCreatorModel } from "survey-creator-core";
 *
 * const creatorOptions = { ... };
 * const creator = new SurveyCreatorModel(creatorOptions);
 * creator.toolbox.settingName = "value";
 * ```
 *
 * [Toolbox Customization](https://surveyjs.io/survey-creator/documentation/toolbox-customization (linkStyle))
 */
export declare class QuestionToolbox extends AdaptiveActionContainer<QuestionToolboxItem> implements IQuestionToolbox {
    private supportedQuestions;
    creator: SurveyCreatorModel;
    static MINELEMENTCOUNT: number;
    static defaultIconName: string;
    static defaultItemComponent: string;
    static defaultItemGroupComponent: string;
    static defaultCategories: {
        choice: string[];
        text: string[];
        containers: string[];
        matrix: string[];
        misc: string[];
    };
    private _orderedQuestions;
    private _containerElementValue;
    private _rootElementValue;
    private _scrollbarElement;
    private _containerBodyElement;
    private _scrollbarSizerElement;
    private _containerBodyResizeObserver;
    presetDefaultItems: Array<IQuestionToolboxItem>;
    get itemSelector(): string;
    get containerSelector(): string;
    static getQuestionDefaultSettings(questionType: string): any;
    static getSubTypePropertyName(questionType: string): string;
    get orderedQuestions(): string[];
    set orderedQuestions(questions: string[]);
    copiedItemMaxCount: number;
    private allowExpandMultipleCategoriesValue;
    private keepAllCategoriesExpandedValue;
    private showCategoryTitlesValue;
    private dragOrClickHelper;
    get toolboxNoResultsFound(): string;
    /**
     * Contains toolbox categories and allows you to modify them.
     *
     * [View Demo](https://surveyjs.io/Examples/Survey-Creator?id=toolboxcategories (linkStyle))
     * @see defineCategories
     * @see showCategoryTitles
     */
    categories: Array<QuestionToolboxCategory>;
    /**
     * Gets or sets the currently expanded category. Applies only if [`allowExpandMultipleCategories`](https://surveyjs.io/survey-creator/documentation/api-reference/questiontoolbox#allowExpandMultipleCategories) and [`keepAllCategoriesExpanded`](https://surveyjs.io/survey-creator/documentation/api-reference/questiontoolbox#keepAllCategoriesExpanded) are `false` and [`showCategoryTitles`](https://surveyjs.io/survey-creator/documentation/api-reference/questiontoolbox#showCategoryTitles) is `true`.
     *
     * Default value: `""`
     * @see expandCategory
     * @see collapseCategory
     */
    activeCategory: string;
    hasCategories: boolean;
    canCollapseCategories: boolean;
    updateResponsiveness(isCompact: boolean, overflowBehavior: overflowBehaviorType): void;
    /**
     * Indicates whether the Toolbox is currently in [compact mode](https://surveyjs.io/survey-creator/documentation/api-reference/questiontoolbox#forceCompact).
     */
    isCompact: boolean;
    isCompactRendered: boolean;
    isFlyoutToCompactRunning: boolean;
    private getAnimationOptions;
    compactAnimation: AnimationBoolean;
    isFocused: boolean;
    /**
     * Specifies how the Toolbox behaves when it contains more items than can fit on the screen.
     *
     * Possible values:
     *
     * - `"scroll"` (default) - Enables scrolling to help users reach the items that do not fit on the screen.
     * - `"hideInMenu"` - Hides the overflow items in a three-dot menu.
     */
    overflowBehavior: overflowBehaviorType;
    /**
     * Specifies whether the Toolbox should be in compact or full mode.
     *
     * Possible values:
     *
     * - `true` - Toolbox is always in compact mode.
     * - `false` - Toolbox is always in full mode.
     * - `undefined` (default) - Toolbox switches between the full and compact modes automatically based on available width.
     *
     * [View Toolbox Customization Demo](https://surveyjs.io/survey-creator/examples/survey-toolbox-customization/ (linkStyle))
     * @see isCompact
     */
    forceCompact: boolean;
    private categoriesTitles;
    /**
     * Specifies whether to display a search field that allows users to find question and panel types within the Toolbox.
     *
     * Default value: `true`
     */
    searchEnabled: boolean;
    /**
     * Specifies whether toolbox items support subitems.
     *
     * Default value: `true`
     *
     * [Manage Toolbox Subitems](https://surveyjs.io/survey-creator/documentation/toolbox-customization#manage-toolbox-subitems (linkStyle))
     */
    showSubitems: boolean;
    searchManager: SearchManagerToolbox;
    showPlaceholder: boolean;
    showSeparators: boolean;
    constructor(supportedQuestions?: Array<string>, creator?: SurveyCreatorModel, useDefaultCategories?: boolean);
    private initDotsItem;
    private getDefaultQuestionCategories;
    private getCategoryTitle;
    private onActiveCategoryChanged;
    get showSearch(): boolean;
    get showInSingleCategory(): boolean;
    setRootElement(element: HTMLElement): void;
    get containerElement(): HTMLElement;
    get rootElement(): HTMLElement;
    focusOut(e: any): void;
    searchItem: IAction;
    get classNames(): string;
    setLocation(toolboxLocation: toolboxLocationType): void;
    get jsonText(): string;
    set jsonText(value: string);
    get copiedJsonText(): string;
    set copiedJsonText(value: string);
    /**
     * An array of toolbox items.
     * @see getItemByName
     * @see addItem
     * @see removeItem
     */
    get items(): Array<QuestionToolboxItem>;
    get itemNames(): Array<string>;
    get copiedItems(): Array<QuestionToolboxItem>;
    addItems(items: Array<IQuestionToolboxItem>, clearAll?: boolean): void;
    addCopiedItem(question: Question, options?: any): void;
    private getOrCreateToolboxItem;
    private createSubTypes;
    /**
     * Adds a new item to the Toolbox.
     * @param item A [toolbox item configuration](https://surveyjs.io/survey-creator/documentation/api-reference/iquestiontoolboxitem).
     * @param index *(Optional)* A zero-based index at which to insert the item. If you do not specify this parameter, the item is added to the end.
     * @see removeItem
     * @see replaceItem
     * @see items
     */
    addItem(item: IQuestionToolboxItem, index?: number): void;
    private correctItem;
    private get dragDropHelper();
    /**
     * Adds a new toolbox item and deletes an existing item with the same name (if there is any).
     * @param item A [toolbox item configuration](https://surveyjs.io/survey-creator/documentation/api-reference/iquestiontoolboxitem).
     * @see addItem
     */
    replaceItem(item: IQuestionToolboxItem): boolean;
    /**
     * Removes a [toolbox item](https://surveyjs.io/survey-creator/documentation/api-reference/iquestiontoolboxitem) with a specified name.
     * @param name A toolbox item's [`name`](https://surveyjs.io/survey-creator/documentation/api-reference/iquestiontoolboxitem#name).
     * @returns `true` if the item is successfully deleted or `false` otherwise.
     * @see clearItems
     * @see addItem
     * @see items
     */
    removeItem(name: string): boolean;
    /**
     * Removes all items from the Toolbox.
     * @see removeItem
     * @see addItem
     * @see items
     */
    clearItems(): void;
    clearCopiedItems(): void;
    /**
     * Returns a [toolbox item](https://surveyjs.io/survey-creator/documentation/api-reference/questiontoolboxitem) with a specified name.
     * @param name A toolbox item's [`name`](https://surveyjs.io/survey-creator/documentation/api-reference/iquestiontoolboxitem#name).
     * @returns A toolbox item or `null` if a toolbox item with the specified name isn't found.
     */
    getItemByName(name: string): QuestionToolboxItem;
    /**
     * Specifies whether more than one category can be in the expanded state at a time. Applies only if [`showCategoryTitles`](https://surveyjs.io/survey-creator/documentation/api-reference/questiontoolbox#showCategoryTitles) is `true`.
     *
     * If this property is `false`, the currently expanded category collapses when a user expands another category.
     *
     * Default value: `false`
     * @see keepAllCategoriesExpanded
     */
    get allowExpandMultipleCategories(): boolean;
    set allowExpandMultipleCategories(val: boolean);
    /**
     * Specifies whether to expand all categories without the capability to collapse any of them. Applies only if [`showCategoryTitles`](https://surveyjs.io/survey-creator/documentation/api-reference/questiontoolbox#showCategoryTitles) is `true`.
     * @see allowExpandMultipleCategories
     */
    get keepAllCategoriesExpanded(): boolean;
    set keepAllCategoriesExpanded(val: boolean);
    /**
     * Specifies whether to display category titles in the Toolbox.
     *
     * Default value: `false`
     *
     * If this property is disabled, the Toolbox hides the titles but continues to display horizontal lines that divide categories. To remove these lines as well, call the [`removeCategories()`](https://surveyjs.io/survey-creator/documentation/api-reference/questiontoolbox#removeCategories) method.
     * @see allowExpandMultipleCategories
     * @see keepAllCategoriesExpanded
     */
    get showCategoryTitles(): boolean;
    set showCategoryTitles(val: boolean);
    updateTitles(): void;
    private updateToolboxItemTitle;
    private updateActionTitle;
    private updateCategoriesState;
    /**
     * Changes the category of a toolbox item.
     * @param itemName A toolbox item's [`name`](https://surveyjs.io/survey-creator/documentation/api-reference/iquestiontoolboxitem#name).
     * @param categoryName A new category name. Out-of-the-box category names include `"general"`, `"choice"`, `"text"`, `"containers"`, `"matrix"`, and `"misc"`.
     * @see defineCategories
     */
    changeCategory(itemName: string, categoryName: string): void;
    /**
     * Changes the categories of multiple toolbox items.
     * @param items An array of objects with the following structure: `{ name: "toolboxItemName", category: "newCategoryName" }`.
     * @see defineCategories
     */
    changeCategories(items: Array<any>): void;
    /**
     * Defines toolbox categories from scratch.
     *
     * This method accepts an array of objects as the `categories` parameter. Each object defines a single category and lists items included into it. Unlisted items can be collected in the Misc category if you pass `true` as the `displayMisc` parameter. Optionally, you can override display titles for individual items.
     *
     * The following code defines two toolbox categories: Dropdowns and Text Input. Items that do not fall into either category are collected in Misc. The `"comment"` item has a custom display title.
     *
     * ```
     * creator.toolbox.defineCategories([{
     *   category: "Dropdowns",
     *   items: [
     *     "dropdown",
     *     "tagbox"
     *   ]
     * }, {
     *   category: "Text Input",
     *   items: [
     *     "text",
     *     // Override the display title
     *     { name: "comment", title: "Multi-Line Input" }
     *   ]
     * }], true);
     * ```
     *
     * [View Demo](https://surveyjs.io/survey-creator/examples/survey-toolbox-categories/ (linkStyle))
     * @param categories An array of new categories.
     * @param displayMisc Pass `true` if you want to collect unlisted toolbox items in the Misc category. Default value: `false`.
     */
    defineCategories(categories: Array<IToolboxCategoryDefinition>, displayMisc?: boolean): void;
    /**
     * Removes all categories from the Toolbox.
     */
    removeCategories(): void;
    toggleCategoryState(categoryName: string): void;
    /**
     * Expands a category with a specified name. Applies only if [`showCategoryTitles`](https://surveyjs.io/survey-creator/documentation/api-reference/questiontoolbox#showCategoryTitles) is `true`.
     *
     * If [`allowExpandMultipleCategories`](https://surveyjs.io/survey-creator/documentation/api-reference/questiontoolbox#allowExpandMultipleCategories) is `false`, all other categories become collapsed.
     * @param categoryName A category name. Out-of-the-box category names include `"general"`, `"choice"`, `"text"`, `"containers"`, `"matrix"`, and `"misc"`.
     * @see collapseCategory
     */
    expandCategory(categoryName: string): void;
    /**
     * Collapses a category with a specified name. Applies only if [`showCategoryTitles`](https://surveyjs.io/survey-creator/documentation/api-reference/questiontoolbox#showCategoryTitles) and [`allowExpandMultipleCategories`](https://surveyjs.io/survey-creator/documentation/api-reference/questiontoolbox#allowExpandMultipleCategories) are `true`.
     * @param categoryName A category name. Out-of-the-box category names include `"general"`, `"choice"`, `"text"`, `"containers"`, `"matrix"`, and `"misc"`.
     * @see expandCategory
     */
    collapseCategory(categoryName: string): void;
    /**
     * Expands all categories. Applies only if [`showCategoryTitles`](https://surveyjs.io/survey-creator/documentation/api-reference/questiontoolbox#showCategoryTitles) and [`allowExpandMultipleCategories`](https://surveyjs.io/survey-creator/documentation/api-reference/questiontoolbox#allowExpandMultipleCategories) are `true`.
     * @see collapseAllCategories
     */
    expandAllCategories(): void;
    /**
     * Collapses all categories. Applies only if [`showCategoryTitles`](https://surveyjs.io/survey-creator/documentation/api-reference/questiontoolbox#showCategoryTitles) and [`allowExpandMultipleCategories`](https://surveyjs.io/survey-creator/documentation/api-reference/questiontoolbox#allowExpandMultipleCategories) are `true`.
     * @see expandAllCategories
     */
    collapseAllCategories(): void;
    private expandCollapseAllCategories;
    getCategoryByName(categoryName: string): QuestionToolboxCategory;
    protected onItemsChanged(changeActions?: boolean): void;
    protected createCategory(): QuestionToolboxCategory;
    private indexOf;
    private updateItemSeparators;
    private reorderItems;
    /**
     * Adds default items to the Toolbox. If the Toolbox contains any items before you call this method, they will be removed.
     * @param supportedQuestions Specifies which question and panel types to include in the Toolbox.
     * @param useDefaultCategories Pass `true` if you want to create default categories.
     */
    createDefaultItems(supportedQuestions: Array<string>, useDefaultCategories: boolean): void;
    getDefaultItems(supportedQuestions: Array<string>, useDefaultCategories: boolean, includeCustomWidgets: boolean, includeComponents: boolean): Array<QuestionToolboxItem>;
    private getDefaultQuestionItems;
    private getRegisterComponentQuestions;
    private getRegisterCustomWidgets;
    private addToolBoxItem;
    private getActionByIdFromArray;
    private createToolboxItemFromJSON;
    private getTitleFromJsonTitle;
    private getQuestionJSON;
    private isHiddenCustomWidget;
    private getQuestionTypes;
}
