import { Base, SurveyModel, Question, PanelModel, PageModel, IElement, JsonObjectProperty, ActionContainer, IAction, Action, IPanel, SurveyElement, ItemValue, QuestionSelectBase, LocalizableString, ILocalizableString, ILocalizableOwner, PopupBaseViewModel, EventBase, MatrixDropdownColumn, ISurveyElement, ITheme } from "survey-core";
import { ICreatorPlugin, ISurveyCreatorOptions, ICollectionItemAllowOperations } from "./creator-settings";
import { DragDropChoices } from "survey-core";
import { QuestionToolbox, QuestionToolboxItem } from "./toolbox";
import { PropertyGridModel } from "./property-grid";
import { ICreatorSelectionOwner } from "./selection-owner";
import { SelectionHistory } from "./selection-history";
import { SurveyLogic } from "./components/tabs/logic";
import { Notifier } from "survey-core";
import { UndoRedoManager } from "./plugins/undo-redo/undo-redo-manager";
import { UndoRedoController } from "./plugins/undo-redo/undo-redo-controller";
import { CreatorResponsivityManager } from "./creator-responsivity-manager";
import { SidebarModel } from "./components/side-bar/side-bar-model";
import { ICreatorOptions } from "./creator-options";
import { ThemeTabPlugin } from "./components/tabs/theme-plugin";
import { DragDropSurveyElements } from "./survey-elements";
import { PageAdorner } from "./components/page";
import { ElementDeletingEvent, PropertyGetReadOnlyEvent, ElementGetDisplayNameEvent, ElementAllowOperationsEvent, ElementGetActionsEvent, PropertyAddingEvent, PropertyGridSurveyCreatedEvent, PropertyEditorCreatedEvent, PropertyEditorUpdateTitleActionsEvent, PropertyGridShowPopupEvent, CollectionItemAllowOperationsEvent, CollectionItemAddedEvent, FastEntryItemsEvent as FastEntryFinishedEvent, MatrixColumnAddedEvent, ConfigureTablePropertyEditorEvent, PropertyDisplayCustomErrorEvent, PropertyValueChangingEvent, PropertyValueChangedEvent, ConditionGetQuestionListEvent, GetConditionOperatorEvent, LogicRuleGetDisplayTextEvent, ModifiedEvent, QuestionAddedEvent, PanelAddedEvent, PageAddedEvent, QuestionConvertingEvent, PageGetFooterActionsEvent, SurveyInstanceCreatedEvent, DesignerSurveyCreatedEvent, PreviewSurveyCreatedEvent, NotifyEvent, ElementFocusingEvent, ElementFocusedEvent, OpenFileChooserEvent, UploadFileEvent, TranslationStringVisibilityEvent, TranslationImportItemEvent, TranslationImportedEvent, TranslationExportItemEvent, MachineTranslateEvent, TranslationItemChangingEvent, DragDropAllowEvent, CreateCustomMessagePanelEvent, ActiveTabChangingEvent, ActiveTabChangedEvent, BeforeUndoEvent, BeforeRedoEvent, PageAddingEvent, DragStartEndEvent, ElementGetExpandCollapseStateEvent, ElementGetExpandCollapseStateEventReason } from "./creator-events-api";
import { ExpandCollapseManager } from "./expand-collapse-manager";
import { ICreatorTheme } from "./creator-theme/creator-themes";
import { TabbedMenuContainer, TabbedMenuItem } from "./tabbed-menu";
export interface IKeyboardShortcut {
    name?: string;
    affectedTab?: string;
    hotKey: {
        ctrlKey?: boolean;
        keyCode: number;
    };
    macOsHotkey?: {
        shiftKey?: boolean;
        keyCode: number;
    };
    execute: (context: any) => void;
}
export declare class CreatorAction extends Action {
}
export declare class ToolbarActionContainer extends ActionContainer {
    private creator;
    constructor(creator: SurveyCreatorModel);
    protected getRenderedActions(): Array<Action>;
}
export type toolboxLocationType = "left" | "right" | "sidebar";
export declare class CreatorEvent<T> extends EventBase<SurveyCreatorModel, T> {
}
/**
 * A class with properties, methods, and events that allow you to configure Survey Creator and manage its elements.
 *
 * [View Demo](https://surveyjs.io/survey-creator/examples/free-nps-survey-template/ (linkStyle))
 */
export declare class SurveyCreatorModel extends Base implements ISurveyCreatorOptions, ICreatorSelectionOwner, ILocalizableOwner {
    protected options: ICreatorOptions;
    getMarkdownHtml(text: string, name: string): string;
    getRenderer(name: string): string;
    getRendererContext(locStr: LocalizableString): any;
    getProcessedText(text: string): string;
    getLocale(): string;
    /**
     * Specifies whether to display the Designer tab.
     *
     * Default value: `true`
     * @see activeTab
     * @see onSurveyInstanceCreated
     */
    showDesignerTab: boolean;
    /**
     * Specifies whether to display the JSON Editor tab.
     *
     * Default value: `true`
     * @see activeTab
     */
    showJSONEditorTab: boolean;
    showTestSurveyTab: boolean;
    /**
     * Specifies whether to display the Preview tab.
     *
     * Default value: `true`
     * @see activeTab
     * @see onSurveyInstanceCreated
     */
    get showPreviewTab(): boolean;
    set showPreviewTab(val: boolean);
    /**
     * Specifies whether to display the Themes tab.
     *
     * Default value: `false`
     *
     * Use the [`themeEditor`](https://surveyjs.io/survey-creator/documentation/api-reference/survey-creator#themeEditor) object to manage UI themes available in the Themes tab.
     * @see activeTab
     * @see saveThemeFunc
     */
    showThemeTab: boolean;
    showCreatorThemeSettings: boolean;
    /**
     * Specifies whether to display the Translation tab.
     *
     * Default value: `false`
     * @see activeTab
     */
    showTranslationTab: boolean;
    /**
     * Specifies whether to display the Logic tab.
     *
     * Default value: `false`
     * @see activeTab
     */
    showLogicTab: boolean;
    useTableViewInLogicTab: boolean;
    pageHoverDelay: number;
    /**
     * Allows users to edit choice values instead of choice texts on the design surface.
     *
     * Default value: `false` (users edit choice texts)
     *
     * If you enable this property, users cannot edit choice texts because the Property Grid hides the Text column for choices, rate values, columns and rows in [Single-Select Matrix](https://surveyjs.io/form-library/documentation/api-reference/matrix-table-question-model), and rows in [Multi-Select Matrix](https://surveyjs.io/form-library/documentation/api-reference/matrix-table-with-dropdown-list) questions.
     * @see showObjectTitles
     */
    inplaceEditForValues: boolean;
    /**
     * Specifies whether to display a table with survey results after completing a survey in the Preview tab.
     *
     * Default value: `true`
     */
    previewShowResults: boolean;
    private _showOneCategoryInPropertyGrid;
    get showOneCategoryInPropertyGrid(): boolean;
    set showOneCategoryInPropertyGrid(newValue: boolean);
    /**
     * Specifies how users navigate categories in the Property Grid.
     *
     * Accepted values:
     *
     * - `"accordion"` (default)
     * The Property Grid displays a stacked list of categories that users can expand or collapse to reveal nested properties.
     *
     * - `"buttons"`
     * The Property Grid displays the properties of a currently selected category. Users can switch between categories using buttons on the right side of the Property Grid.
     */
    get propertyGridNavigationMode(): "buttons" | "accordion";
    set propertyGridNavigationMode(newValue: "buttons" | "accordion");
    get allowEditSurveyTitle(): boolean;
    set allowEditSurveyTitle(val: boolean);
    /**
     * Specifies whether users can see and edit the survey header and related survey properties.
     *
     * Default value: `true`
     */
    get showSurveyTitle(): boolean;
    set showSurveyTitle(val: boolean);
    get haveCommercialLicense(): boolean;
    set haveCommercialLicense(val: boolean);
    get licenseText(): string;
    slk(val: string): void;
    /**
     * Specifies whether to automatically save a survey or theme JSON schema each time survey or theme settings are changed.
     *
     * Default value: `false`
     *
     * If you enable this property, Survey Creator calls the [`saveSurveyFunc`](#saveSurveyFunc) or [`saveThemeFunc`](#saveThemeFunc) function to save the survey or theme JSON schema. The schemas are saved with a 500-millisecond delay after users change settings. You can specify the [`autoSaveDelay`](#autoSaveDelay) property to increase or decrease the delay.
     */
    isAutoSave: boolean;
    showOptions: boolean;
    showSearch: boolean;
    generateValidJSON: boolean;
    currentAddQuestionType: string;
    /**
     * Specifies a default device for survey preview in the Preview tab.
     *
     * Accepted values:
     *
     * - `"desktop"` (default)
     * - `"iPhoneSE"`
     * - `"iPhone15"`
     * - `"iPhone15Plus"`
     * - `"iPad"`
     * - `"iPadMini"`
     * - `"androidPhone"`
     * - `"androidTablet"`
     * - `"microsoftSurface"`
     */
    previewDevice: string;
    /**
     * Specifies the orientation of the selected device in the Preview tab.
     *
     * Accepted values:
     *
     * - `"landscape"` (default)
     * - `"portrait"`
     */
    previewOrientation: "landscape" | "portrait";
    set startEditTitleOnQuestionAdded(value: boolean);
    get startEditTitleOnQuestionAdded(): boolean;
    private startEditTitleOnQuestionAddedValue;
    private isRTLValue;
    private alwaySaveTextInPropertyEditorsValue;
    private toolbarValue;
    responsivityManager: CreatorResponsivityManager;
    footerToolbar: ActionContainer;
    private changePageModifications;
    private pageEditModeValue;
    /**
     * Specifies how Survey Creator users edit survey pages.
     *
     * Accepted values:
     *
     * - `"standard"` (default)
     * Questions and panels are divided between pages. Users can scroll the design surface to reach a required page.
     *
     * - `"single"`
     * All questions and panels belong to a single page. Users cannot add or remove pages.
     *
     * - `"bypage"`
     * Questions and panels are divided between pages. Users can use the page navigator to switch to a required page.
     * @see allowModifyPages
     */
    get pageEditMode(): "standard" | "single" | "bypage";
    set pageEditMode(val: "standard" | "single" | "bypage");
    surveyValue: SurveyModel;
    get toolbarItems(): Array<Action>;
    get toolbar(): ActionContainer;
    protected _findAction(id: string): Action;
    dragDropSurveyElements: DragDropSurveyElements;
    dragDropChoices: DragDropChoices;
    private selectedElementValue;
    private newQuestions;
    private newPanels;
    private newQuestionChangedNames;
    private selectionHistoryControllerValue;
    private saveSurveyFuncValue;
    private saveThemeFuncValue;
    viewType: string;
    get showingViewName(): string;
    get isDesignerShowing(): boolean;
    showDesigner(): void;
    get isTestSurveyShowing(): boolean;
    get isPreviewShowing(): boolean;
    showTestSurvey(): void;
    showPreview(): void;
    protected plugins: {
        [name: string]: ICreatorPlugin;
    };
    /**
     * Adds a custom tab to Survey Creator.
     *
     * [View Demo](https://surveyjs.io/survey-creator/examples/modify-tab-bar/ (linkStyle))
     * @param name A unique tab ID.
     * @param plugin An object that allows you to handle user interactions with the tab.
     * @param title A tab caption. If `title` is undefined, the `name` argument value is displayed instead. To localize the caption, add its translations to the `ed` object within [localization dictionaries](https://github.com/surveyjs/survey-creator/tree/90de47d2c9da49b06a7f97414026d70f7acf05c6/packages/survey-creator-core/src/localization) and pass `ed.propertyName` as the `title` argument.
     * @param componentName The name of the component that renders tab markup. Default value: `"svc-tab-" + name`.
     * @param index A zero-based index that specifies the tab's position relative to other tabs.
     */
    addPluginTab(name: string, plugin: ICreatorPlugin, title?: string, componentName?: string, index?: number): void;
    addPlugin(name: string, plugin: ICreatorPlugin): void;
    private removePlugin;
    private getTabIndex;
    getPlugin<P extends ICreatorPlugin = ICreatorPlugin>(name: string): P;
    /**
     * An event that is raised before a survey element (a question, panel, or page) is deleted.
     * @see deleteElement
     */
    onElementDeleting: EventBase<SurveyCreatorModel, ElementDeletingEvent>;
    /**
     * An event that is raised when Survey Creator sets the read-only status for a survey element property. Use this event to change the read-only status for individual properties.
     */
    onGetPropertyReadOnly: EventBase<SurveyCreatorModel, PropertyGetReadOnlyEvent>;
    /**
     * An event that is raised when Survey Creator [instantiates a survey to display a UI element](https://surveyjs.io/survey-creator/documentation/creator-v2-whats-new#survey-creator-ui-elements-are-surveys). Handle this event to customize the UI element by modifying the survey.
     *
     * For information on event handler parameters, refer to descriptions within the interface.
     *
     * [Design Mode Survey Instance](https://surveyjs.io/survey-creator/documentation/customize-survey-creation-process#design-mode-survey-instance (linkStyle))
     *
     * [Preview Mode Survey Instance](https://surveyjs.io/survey-creator/documentation/customize-survey-creation-process#preview-mode-survey-instance (linkStyle))
     *
     * > If you want this event raised at startup, assign a survey JSON schema to the [`JSON`](#JSON) property *after* you add a handler to the event. If the JSON schema should be empty, specify the `JSON` property with an empty object.
     */
    onSurveyInstanceCreated: EventBase<SurveyCreatorModel, SurveyInstanceCreatedEvent>;
    /**
     * An event that is raised when Survey Creator obtains a survey element name to display it in the UI.
     *
     * Handle this event to replace survey element names in the UI with custom display texts. If you only want to replace the names with survey element titles, enable the [`showObjectTitles`](https://surveyjs.io/survey-creator/documentation/api-reference/survey-creator#showObjectTitles) property instead of handling this event.
     */
    onGetObjectDisplayName: EventBase<SurveyCreatorModel, ElementGetDisplayNameEvent>;
    onHtmlToMarkdown: EventBase<SurveyCreatorModel, any>;
    /**
     * An event that is raised when Survey Creator obtains the expand/collapse state of a survey element on the design surface. Handle this event to set a required state.
     * @see [ICreatorOptions.collapseQuestions](https://surveyjs.io/survey-creator/documentation/api-reference/icreatoroptions#collapseQuestions)
     * @see [ICreatorOptions.collapsePanels](https://surveyjs.io/survey-creator/documentation/api-reference/icreatoroptions#collapsePanels)
     * @see [ICreatorOptions.collapsePages](https://surveyjs.io/survey-creator/documentation/api-reference/icreatoroptions#collapsePages)
     * @see expandCollapseButtonVisibility
     */
    onElementGetExpandCollapseState: EventBase<SurveyCreatorModel, ElementGetExpandCollapseStateEvent>;
    /**
     * An event that is raised when Survey Creator obtains permitted operations for a survey element. Use this event to disable user interactions with a question, panel, or page on the design surface.
     *
     * For information on event handler parameters, refer to descriptions within the interface.
     *
     * To disable a user interaction, set the correponding `allow...` property to `false`.
     *
     * [Specify Adorner Visibility](https://surveyjs.io/survey-creator/documentation/customize-survey-creation-process#specify-adorner-availability (linkStyle))
     * @see onCollectionItemAllowOperations
     */
    onElementAllowOperations: EventBase<SurveyCreatorModel, ElementAllowOperationsEvent>;
    /**
     * An event that is raised when Survey Creator obtains [adorners](https://surveyjs.io/survey-creator/documentation/customize-survey-creation-process#specify-adorner-availability) for a survey element. Use this event to hide and modify predefined adorners or add a custom adorner.
     *
     * For information on event handler parameters, refer to descriptions within the interface.
     *
     * [View Demo](https://surveyjs.io/survey-creator/examples/create-custom-adorners/ (linkStyle))
     * @see onElementAllowOperations
     * @see onGetPageActions
     */
    onDefineElementMenuItems: EventBase<SurveyCreatorModel, ElementGetActionsEvent>;
    /**
     * An event that is raised when Survey Creator adds properties to a survey element selected on the design surface. Handle this event if you cancel the addition of certain properties and thus [hide them from the Property Grid](https://surveyjs.io/survey-creator/documentation/property-grid-customization#hide-properties-from-the-property-grid).
     *
     * For information on event handler parameters, refer to descriptions within the interface.
     *
     * [View Demo](https://surveyjs.io/survey-creator/examples/hide-category-from-property-grid/ (linkStyle))
     */
    onShowingProperty: EventBase<SurveyCreatorModel, PropertyAddingEvent>;
    onCanShowProperty: EventBase<SurveyCreatorModel, any>;
    /**
     * This event is obsolete. Use the [`onSurveyInstanceCreated`](https://surveyjs.io/survey-creator/documentation/api-reference/survey-creator#onSurveyInstanceCreated) event instead.
     * @deprecated
     */
    onPropertyGridSurveyCreated: EventBase<SurveyCreatorModel, PropertyGridSurveyCreatedEvent>;
    /**
     * An event that is raised when a property editor is created in the Property Grid. Use this event to modify the property editor or add event handlers to it.
     * @see onConfigureTablePropertyEditor
     * @see onSurveyInstanceCreated
     */
    onPropertyEditorCreated: EventBase<SurveyCreatorModel, PropertyEditorCreatedEvent>;
    /**
     * An event that is raised when title actions are added to a property editor. Title actions are most often used to reveal hints for properties configured by users. Handle this event you want to add, remove, or modify the title actions.
     */
    onPropertyEditorUpdateTitleActions: EventBase<SurveyCreatorModel, PropertyEditorUpdateTitleActionsEvent>;
    /**
     * An event that is raised before Survey Creator displays a pop-up window called from the Property Grid. This window allows users to edit choices, conditions, etc. Use this event to customize the pop-up window, for example, add custom action buttons.
     */
    onPropertyGridShowModal: EventBase<SurveyCreatorModel, PropertyGridShowPopupEvent>;
    onCanDeleteItem: EventBase<SurveyCreatorModel, any>;
    onCollectionItemDeleting: EventBase<SurveyCreatorModel, any>;
    /**
     * An event that is raised when Survey Creator obtains permitted operations for a collection item (a choice option in Choices, a column or row in Columns, etc.). Use this event to prevent users from adding, deleting, or editing a particular collection item.
     * @see onElementAllowOperations
     */
    onCollectionItemAllowOperations: EventBase<SurveyCreatorModel, CollectionItemAllowOperationsEvent>;
    /**
     * An event that is raised when users add a new collection item (a choice option to Choices, a column or row to Columns, etc.). Use this event to modify this item.
     *
     * For information on event handler parameters, refer to descriptions within the interface.
     *
     * > This event is not raised when users add a new column to a [Multi-Select Matrix](https://surveyjs.io/form-library/documentation/api-reference/matrix-table-with-dropdown-list) or [Dynamic Matrix](https://surveyjs.io/form-library/documentation/api-reference/dynamic-matrix-table-question-model). For these cases, handle the [`onMatrixColumnAdded`](https://surveyjs.io/survey-creator/documentation/api-reference/survey-creator#onMatrixColumnAdded) event instead.
     * @see onFastEntryFinished
     * @see onCollectionItemAllowOperations
     */
    onItemValueAdded: EventBase<SurveyCreatorModel, CollectionItemAddedEvent>;
    /**
     * An event that is raised when users finish editing collection items (choices, rows, columns) in a pop-up window.
     *
     * Survey authors can specify collection items using a table UI in Property Grid (see the [`onItemValueAdded`](https://surveyjs.io/survey-creator/documentation/api-reference/survey-creator#onItemValueAdded) event) or a multi-line text editor in a pop-up window. Each line in the editor specifies the value and display text of one collection item in the following format: `value|text`. Use the `onFastEntryFinished` event to process the entered text lines as required.
     */
    onFastEntryFinished: EventBase<SurveyCreatorModel, FastEntryFinishedEvent>;
    /**
     * An event that is raised when users add a new column to a [Multi-Select Matrix](https://surveyjs.io/form-library/documentation/api-reference/matrix-table-with-dropdown-list) or [Dynamic Matrix](https://surveyjs.io/form-library/documentation/api-reference/dynamic-matrix-table-question-model). Use this event to modify this column.
     *
     * For information on event handler parameters, refer to descriptions within the interface.
     *
     * > This event is not raised when users add a new column to a [Single-Select Matrix](https://surveyjs.io/form-library/documentation/api-reference/matrix-table-question-model). For this case, handle the [`onItemValueAdded`](https://surveyjs.io/survey-creator/documentation/api-reference/survey-creator#onItemValueAdded) event instead.
     * @see onCollectionItemAllowOperations
     */
    onMatrixColumnAdded: EventBase<SurveyCreatorModel, MatrixColumnAddedEvent>;
    /**
     * This event is obsolete. Use the [`onConfigureTablePropertyEditor`](https://surveyjs.io/survey-creator/documentation/api-reference/survey-creator#onConfigureTablePropertyEditor) event instead.
     * @deprecated
     */
    onSetPropertyEditorOptions: EventBase<SurveyCreatorModel, ConfigureTablePropertyEditorEvent>;
    /**
     * An event that is raised when a table property editor is created in the Property Grid. Use this event to configure the table property editor.
     * @see onPropertyEditorCreated
     */
    onConfigureTablePropertyEditor: EventBase<SurveyCreatorModel, ConfigureTablePropertyEditorEvent>;
    onGenerateNewName: EventBase<SurveyCreatorModel, any>;
    /**
     * An event that is raised when Survey Creator validates a modified value of a survey element property. Use this event to display a custom error message when the value is incorrect.
     * @see onPropertyValueChanging
     * @see onSurveyPropertyValueChanged
     */
    onPropertyValidationCustomError: EventBase<SurveyCreatorModel, PropertyDisplayCustomErrorEvent>;
    /**
     * An event that is raised each time a user modifies a survey element property. Use this event to validate or correct a property value while the user changes it.
     * @see onPropertyValidationCustomError
     * @see onSurveyPropertyValueChanged
     */
    onPropertyValueChanging: EventBase<SurveyCreatorModel, PropertyValueChangingEvent>;
    /**
     * An event that is raised after a survey element property has changed.
     * @see onPropertyValidationCustomError
     * @see onPropertyValueChanging
     */
    onSurveyPropertyValueChanged: EventBase<SurveyCreatorModel, PropertyValueChangedEvent>;
    /**
     * An event that is raised when a condition editor renders a list of questions and variables available for selection. Use this event to modify this list.
     */
    onConditionQuestionsGetList: EventBase<SurveyCreatorModel, ConditionGetQuestionListEvent>;
    onConditionGetTitle: EventBase<SurveyCreatorModel, any>;
    /**
     * An event that is raised when Survey Creator populates a condition editor with operators. Use this event to hide individual condition operators.
     */
    onGetConditionOperator: EventBase<SurveyCreatorModel, GetConditionOperatorEvent>;
    /**
     * An event that is raised when the Logic tab constructs a user-friendly display text for a logic rule. Use this event to modify this display text.
     */
    onLogicItemDisplayText: EventBase<SurveyCreatorModel, LogicRuleGetDisplayTextEvent>;
    /**
      * An event that is raised when users modify survey or theme settings.
      * @see state
      */
    onModified: EventBase<SurveyCreatorModel, ModifiedEvent>;
    /**
     * An event that is raised when users add a question to the survey. Use this event to customize the question.
     *
     * For information on event handler parameters, refer to descriptions within the interface.
     *
     * [Customize Survey Elements on Creation](https://surveyjs.io/survey-creator/documentation/customize-survey-creation-process#customize-survey-elements-on-creation (linkStyle))
     */
    onQuestionAdded: EventBase<SurveyCreatorModel, QuestionAddedEvent>;
    /**
     * An event that is raised when users add a [Panel](https://surveyjs.io/form-library/documentation/api-reference/panel-model) element to the survey. Use this event to customize the panel.
     *
     * For information on event handler parameters, refer to descriptions within the interface.
     *
     * [Customize Survey Elements on Creation](https://surveyjs.io/survey-creator/documentation/customize-survey-creation-process#customize-survey-elements-on-creation (linkStyle))
     */
    onPanelAdded: EventBase<SurveyCreatorModel, PanelAddedEvent>;
    /**
     * An event that is raised when a new page is added to the survey. Use this event to customize the page.
     *
     * For information on event handler parameters, refer to descriptions within the interface.
     *
     * [Customize Survey Elements on Creation](https://surveyjs.io/survey-creator/documentation/customize-survey-creation-process#customize-survey-elements-on-creation (linkStyle))
     */
    onPageAdded: EventBase<SurveyCreatorModel, PageAddedEvent>;
    /**
     * An event that is raised when a [question's type is being changed](https://surveyjs.io/survey-creator/documentation/end-user-guide/user-interface#how-to-change-the-question-type).
     */
    onQuestionConverting: EventBase<SurveyCreatorModel, QuestionConvertingEvent>;
    /**
     * An event that is raised when Survey Creator renders action buttons under each page on the design surface. Use this event to add, remove, or modify the buttons.
     * @see onDefineElementMenuItems
     */
    onGetPageActions: EventBase<SurveyCreatorModel, PageGetFooterActionsEvent>;
    /**
     * This event is obsolete. Use the [`onSurveyInstanceCreated`](https://surveyjs.io/survey-creator/documentation/api-reference/survey-creator#onSurveyInstanceCreated) event instead.
     * @deprecated
     */
    onDesignerSurveyCreated: EventBase<SurveyCreatorModel, DesignerSurveyCreatedEvent>;
    /**
     * This event is obsolete. Use the [`onSurveyInstanceCreated`](https://surveyjs.io/survey-creator/documentation/api-reference/survey-creator#onSurveyInstanceCreated) event instead.
     * @deprecated
     */
    onPreviewSurveyCreated: EventBase<SurveyCreatorModel, PreviewSurveyCreatedEvent>;
    onTestSurveyCreated: EventBase<SurveyCreatorModel, any>;
    /**
     * An event that is raised when Survey Creator [displays a toast notification](https://surveyjs.io/survey-creator/documentation/api-reference/survey-creator#notify). Use this event to implement custom toast notification.
     * @see notify
     */
    onNotify: EventBase<SurveyCreatorModel, NotifyEvent>;
    /**
     * An event that is raised before a survey element (question, panel, page, or the survey itself) is focused. Use this event to move focus to a different survey element.
     * @see onSelectedElementChanged
     * @see selectedElement
     */
    onSelectedElementChanging: EventBase<SurveyCreatorModel, ElementFocusingEvent>;
    /**
     * An event that is raised after a survey element (a question, panel, page, or the survey itself) is focused.
     * @see onSelectedElementChanging
     */
    onSelectedElementChanged: EventBase<SurveyCreatorModel, ElementFocusedEvent>;
    /**
     * An event that is raised when Survey Creator opens a dialog window for users to select files.
     * @see onUploadFile
     * @see uploadFiles
     */
    onOpenFileChooser: EventBase<SurveyCreatorModel, OpenFileChooserEvent>;
    /**
     * An event that is raised when a user selects a file to upload. Use this event to upload the file to your server.
     *
     * For information on event handler parameters, refer to descriptions within the interface.
     *
     * [View Demo](https://surveyjs.io/survey-creator/examples/file-upload/ (linkStyle))
     * @see uploadFiles
     */
    onUploadFile: EventBase<SurveyCreatorModel, UploadFileEvent>;
    /**
     * An event that is raised when the Translation tab displays a property for translation. Use this event to control the property visibility.
     */
    onTranslationStringVisibility: EventBase<SurveyCreatorModel, TranslationStringVisibilityEvent>;
    onTranslationLocaleInitiallySelected: EventBase<SurveyCreatorModel, any>;
    /**
     * An event that is raised before a translated string is imported from a CSV file. Use this event to modify the string to be imported or cancel the import.
     * @see onTranslationExportItem
     * @see onTranslationImported
     */
    onTranslationImportItem: EventBase<SurveyCreatorModel, TranslationImportItemEvent>;
    /**
     * An event that is raised after all translated strings are imported from a CSV file.
     * @see onTranslationImportItem
     * @see onTranslationExportItem
     */
    onTranslationImported: EventBase<SurveyCreatorModel, TranslationImportedEvent>;
    /**
     * An event that is raised before a translated string is exported to a CSV file. Use this event to modify the string to be exported.
     * @see onTranslationImportItem
     */
    onTranslationExportItem: EventBase<SurveyCreatorModel, TranslationExportItemEvent>;
    /**
     * An event that allows you to integrate a machine translation service, such as Google Translate or Microsoft Translator, into Survey Creator.
     *
     * For information on event handler parameters, refer to descriptions within the interface.
     *
     *
     * Within the event handler, you need to pass translation strings and locale information to the translation service API. The service should return an array of translated strings that you need to pass to the `options.callback` function. The following code shows how to integrate the Microsoft Translator service into Survey Creator:
     *
     * ```js
     * import { SurveyCreatorModel } from "survey-creator-core";
     * const creatorOptions = { ... };
     * const creator = new SurveyCreatorModel(creatorOptions);
     *
     * const apiKey = "<your-microsoft-translator-api-key>";
     * const resourceRegion = "<your-azure-region>";
     * const endpoint = "https://api.cognitive.microsofttranslator.com/";
     * creator.onMachineTranslate.add((_, options) => {
     *   // Prepare strings for Microsoft Translator as an array of objects: [{ Text: "text to translate" }]
     *   const data = [];
     *   options.strings.forEach(str => { data.push({ Text: str }); });
     *   // Include required locales in the URL
     *   const params = "api-version=3.0&from=" + options.fromLocale + "&to=" + options.toLocale;
     *   const url = endpoint + "/translate?" + params;
     *   fetch(url, {
     *     method: "POST",
     *     headers: {
     *       "Content-Type": "application/json",
     *       "Ocp-Apim-Subscription-Key": apiKey,
     *       "Ocp-Apim-Subscription-Region": resourceRegion,
     *       "X-ClientTraceId": crypto.randomUUID()
     *     },
     *     body: JSON.stringify(data)
     *   }).then(response => response.json())
     *     .then(data => {
     *       // Convert data received from Microsoft Translator to a flat array
     *       const translatedStrings = [];
     *       for (let i = 0; i < data.length; i++) {
     *         translatedStrings.push(data[i].translations[0].text);
     *       }
     *       // Pass translated strings to Survey Creator
     *       options.callback(translatedStrings);
     *
     *     }).catch(error => {
     *       // If translation was unsuccessful:
     *       options.callback();
     *       alert("Could not translate strings to the " + options.toLocale + " locale");
     *     });
     * });
     * ```
     *
     * > Survey Creator does not include a machine translation service out of the box. Our component only provides a UI for calling the service API.
     */
    onMachineTranslate: EventBase<SurveyCreatorModel, MachineTranslateEvent>;
    /**
     * An event that is raised before a string translation is changed. Use this event to override a new translation value.
     *
     * For information on event handler parameters, refer to descriptions within the interface.
     *
     * Refer to the following help topics for more information on localization:
     *
     * - [Localization & Globalization in SurveyJS Form Library](https://surveyjs.io/form-library/documentation/survey-localization)
     * - [Localization & Globalization in Survey Creator](https://surveyjs.io/survey-creator/documentation/localization)
     */
    onTranslationItemChanging: EventBase<SurveyCreatorModel, TranslationItemChangingEvent>;
    /**
     * An event that is raised when users drag and drop survey elements within the design surface. Use this event to control drag and drop operations.
     * @see onDragStart
     * @see onDragEnd
     */
    onDragDropAllow: EventBase<SurveyCreatorModel, DragDropAllowEvent>;
    onDragOverLocationCalculating: EventBase<SurveyCreatorModel, any>;
    /**
     * An event that allows you to create a custom message panel.
     *
     * For information on event handler parameters, refer to descriptions within the interface.
     *
     * A message panel is displayed within a question box on the design surface. It contains a text message and an optional action link. The following image illustrates a built-in message panel that appears when a question sources its choice options from another question or from a web service:
     *
     * <img src="https://surveyjs.io/stay-updated/release-notes/articles/v1.9.126/creator-message-panel.png" alt="Survey Creator: A message panel" width="75%">
     *
     * To create a custom message panel, handle the `onCreateCustomMessagePanel` event. This event is raised for questions whose `isMessagePanelVisible` property set to `true`. The following code shows how to enable this property based on a condition. This code implements a custom data source selector for select-based questions (Dropdown, Checkboxes, Radio Button Group). When a survey author selects any data source other than "Custom", the `isMessagePanelVisible` property becomes enabled, indicating that the `onCreateCustomMessagePanel` event must be raised. A function that handles this event specifies custom message and action link texts and `onClick` event handler:
     *
     * ```js
     * import { Serializer } from "survey-core";
     * import { SurveyCreatorModel } from "survey-creator-core";
     *
     * Serializer.addProperty("selectbase", {
     *   name: "choicesDataSource",
     *   displayName: "Data source",
     *   category: "choices",
     *   choices: [
     *     { text: "Country", value: "country" },
     *     { text: "Region", value: "region" },
     *     { text: "City", value: "city" },
     *     { text: "Custom", value: "custom" }
     *   ],
     *   onSetValue: function (obj: any, value: any) {
     *     // Set the custom property value
     *     obj.setPropertyValue("choicesDataSource", value);
     *     // Display the message panel based on a condition
     *     obj.setPropertyValue("isMessagePanelVisible", value !== "custom");
     *   }
     * });
     *
     * const creator = new SurveyCreatorModel({});
     *
     * creator.onCreateCustomMessagePanel.add((_, options) => {
     *   options.messageText = "Choices for this question are loaded from a predefined data source. ";
     *   options.actionText = "Go to settings";
     *   // Focus the "Data source" editor within the Property Grid
     *   options.onClick = () => {
     *     creator.selectElement(options.question, "choicesDataSource");
     *   };
     * });
     * ```
     */
    onCreateCustomMessagePanel: EventBase<SurveyCreatorModel, CreateCustomMessagePanelEvent>;
    getSurveyJSONTextCallback: () => {
        text: string;
        isModified: boolean;
    };
    setSurveyJSONTextCallback: (text: string) => void;
    /**
     * Limits the number of items in a logical condition.
     *
     * Default value: -1 (unlimited)
     */
    maxLogicItemsInCondition: number;
    /**
     * Specifies whether drop-down menus and other UI elements display survey, page, and question titles instead of their names.
     *
     * Default value: `false`
     * @see onGetObjectDisplayName
     */
    showObjectTitles: boolean;
    /**
     * Limits the number of visible choices. Users can click "Show more" to view hidden choices.
     *
     * Set this property to -1 if you do not want to hide any choices.
     *
     * Default value: 10
     */
    maxVisibleChoices: number;
    /**
     * Specifies whether to display question titles instead of names when users edit logical expressions.
     *
     * Default value: `false`
     * @see showObjectTitles
     * @see onGetObjectDisplayName
     */
    showTitlesInExpressions: boolean;
    /**
     * Specifies whether users can edit expressions in the Logic tab as plain text.
     *
     * If you set this property to `false`, users can only use UI elements to edit logical expressions.
     *
     * Default value: `true`
     * @see showLogicTab
     */
    allowEditExpressionsInTextEditor: boolean;
    /**
     * Limits the number of columns that users can add to [Matrix](https://surveyjs.io/Documentation/Library?id=questionmatrixmodel), [Matrix Dynamic](https://surveyjs.io/Documentation/Library?id=questionmatrixdynamicmodel), and [Matrix Dropdown](https://surveyjs.io/Documentation/Library?id=questionmatrixdropdownmodel) questions.
     *
     * Default value: 0 (unlimited, taken from `settings.propertyGrid.maximumColumnsCount`)
     */
    maximumColumnsCount: number;
    /**
     * Limits the number of choices that users can add to [Checkbox](https://surveyjs.io/Documentation/Library?id=questioncheckboxmodel), [Dropdown](https://surveyjs.io/Documentation/Library?id=questiondropdownmodel), and [Radiogroup](https://surveyjs.io/Documentation/Library?id=questionradiogroupmodel) questions.
     *
     * Default value: 0 (unlimited, taken from `settings.propertyGrid.maximumChoicesCount`)
     */
    maximumChoicesCount: number;
    /**
     * Limits the minimum number of choices in [Checkbox](https://surveyjs.io/Documentation/Library?id=questioncheckboxmodel), [Dropdown](https://surveyjs.io/Documentation/Library?id=questiondropdownmodel), and [Radiogroup](https://surveyjs.io/Documentation/Library?id=questionradiogroupmodel) questions. Set this property if users should not delete choices below the specified limit.
     *
     * Default value: 0 (unlimited, taken from `settings.propertyGrid.minimumChoicesCount`)
     */
    minimumChoicesCount: number;
    /**
     * Limits the number of rows that users can add to [Matrix](https://surveyjs.io/Documentation/Library?id=questionmatrixmodel) and [Matrix Dropdown](https://surveyjs.io/Documentation/Library?id=questionmatrixdropdownmodel) questions.
     *
     * Default value: 0 (unlimited, taken from `settings.propertyGrid.maximumRowsCount`)
     */
    maximumRowsCount: number;
    /**
     * Limits the number of rate values that users can add to [Rating](https://surveyjs.io/Documentation/Library?id=questionratingmodel) questions.
     *
     * Default value: 0 (unlimited, taken from `settings.propertyGrid.maximumRateValues`)
     */
    maximumRateValues: number;
    /**
     * Limits the number of nested panels within a [Panel](https://surveyjs.io/form-library/documentation/api-reference/panel-model) element.
     *
     * Default value: -1 (unlimited)
     */
    maxNestedPanels: number;
    showPagesInTestSurveyTab: boolean;
    /**
     * Specifies whether to show a page selector at the bottom of the Preview tab.
     *
     * Default value: `true`
     */
    get showPagesInPreviewTab(): boolean;
    set showPagesInPreviewTab(val: boolean);
    showSimulatorInTestSurveyTab: boolean;
    /**
     * Specifies whether the Preview tab displays a Device button that allows users to preview the survey on different device types.
     *
     * Default value: `true`
     */
    get showSimulatorInPreviewTab(): boolean;
    set showSimulatorInPreviewTab(val: boolean);
    /**
     * A [UI theme](https://surveyjs.io/Documentation/Library?id=get-started-react#configure-styles) used to display the survey in the Preview tab.
     *
     * Accepted values: `"modern"`, `"default"`, `"defaultV2"`
     *
     * Default value: `"defaultV2"`
     * @see allowChangeThemeInPreview
     */
    themeForPreview: string;
    /**
     * An object that enables you to manage UI themes. Refer to the following API section for information on available properties, methods, and events: [`ThemeTabPlugin`](https://surveyjs.io/survey-creator/documentation/api-reference/themetabplugin).
     * @see showThemeTab
     * @see saveThemeFunc
     */
    get themeEditor(): ThemeTabPlugin;
    /**
     * A function that is called each time users click the [Save button](https://surveyjs.io/survey-creator/documentation/api-reference/survey-creator#showSaveButton) or [auto-save](https://surveyjs.io/survey-creator/documentation/api-reference/survey-creator#isAutoSave) is triggered to save a theme JSON object.
     *
     * For more information, refer to the [Save and Load Custom Themes](https://surveyjs.io/survey-creator/documentation/theme-editor#save-and-load-custom-themes) help topic.
     * @see showThemeTab
     * @see themeEditor
     * @see saveSurveyFunc
     */
    get saveThemeFunc(): any;
    set saveThemeFunc(value: any);
    hasPendingThemeChanges: boolean;
    private _theme;
    /**
     * Gets or sets a [theme](https://surveyjs.io/form-library/documentation/api-reference/itheme) for the survey being configured.
     *
     * [Theme Editor](https://surveyjs.io/survey-creator/documentation/theme-editor (linkStyle))
     * @see showThemeTab
     * @see themeEditor
     * @see saveThemeFunc
     */
    get theme(): ITheme;
    set theme(newTheme: ITheme);
    private _doSaveThemeCore;
    /**
     * Calls the [`saveThemeFunc`](https://surveyjs.io/survey-creator/documentation/api-reference/survey-creator#saveThemeFunc) function to save the theme JSON schema.
     * @see saveSurvey
     * @see save
     */
    saveTheme(): void;
    saveThemeActionHandler(): void;
    private _allowModifyPages;
    /**
     * Specifies whether users can add, edit, and delete survey pages.
     *
     * Default value: `true`
     * @see pageEditMode
     */
    get allowModifyPages(): boolean;
    set allowModifyPages(val: boolean);
    showDefaultLanguageInTestSurveyTab: boolean | string;
    /**
     * Specifies whether the Preview tab displays a language selector.
     *
     * Accepted values:
     *
     * - `"auto"` (default)
     * Display the language selector only if the survey is translated into more than one language.
     *
     * - `true`
     * Always display the language selector regardless of how many languages the survey uses.
     *
     * - `false`
     * Never display the language selector.
     *
     * - `"all"`
     * Always display the language selector with [all supported languages](https://github.com/surveyjs/survey-creator/tree/90de47d2c9da49b06a7f97414026d70f7acf05c6/packages/survey-creator-core/src/localization).
     *
     * [Localization & Globalization](https://surveyjs.io/survey-creator/documentation/survey-localization-translate-surveys-to-different-languages (linkStyle))
     */
    get showDefaultLanguageInPreviewTab(): boolean | string;
    set showDefaultLanguageInPreviewTab(val: boolean | string);
    showInvisibleElementsInTestSurveyTab: boolean;
    /**
     * Specifies whether the Preview tab displays a toggle that allows users to show or hide invisible survey elements.
     *
     * Default value: `true`
     */
    get showInvisibleElementsInPreviewTab(): boolean;
    set showInvisibleElementsInPreviewTab(val: boolean);
    /**
     * Specifies whether users can switch between UI themes in the Preview tab.
     *
     * Default value: `true`
     *
     * [View Demo](https://surveyjs.io/Examples/Creator?id=theme-switcher (linkStyle))
     * @see themeForPreview
     */
    allowChangeThemeInPreview: boolean;
    private _tabResponsivenessMode;
    get tabResponsivenessMode(): "menu" | "icons";
    set tabResponsivenessMode(val: "menu" | "icons");
    tabbedMenu: TabbedMenuContainer;
    get tabs(): Array<TabbedMenuItem>;
    set tabs(val: Array<TabbedMenuItem>);
    getLocString(str: string): string;
    /**
     * Specifies whether to show an error message if a survey is not saved in a database.
     *
     * Default value: `true`
     */
    showErrorOnFailedSave: boolean;
    protected onSetReadOnly(newVal: boolean): void;
    /**
     * Specifies the locale of the Survey Creator UI.
     *
     * Default value: `""` (inherited from `editorLocalization.currentLocale`)
     *
     * [Localization & Globalization](https://surveyjs.io/survey-creator/documentation/survey-localization-translate-surveys-to-different-languages (linkStyle))
     */
    get locale(): string;
    set locale(value: string);
    onLocaleChanded: EventBase<SurveyCreatorModel, any>;
    updateLocalizedStrings(): void;
    locStrsChanged(): void;
    private refreshPlugin;
    /**
     * Enables the read-only mode. If you set this property to `true`, users cannot change the initial survey configuration.
     *
     * Default value: `false`
     */
    get readOnly(): boolean;
    set readOnly(newVal: boolean);
    /**
     * Specifies whether to enable support for right-to-left languages.
     *
     * Default value: `false`
     */
    get isRTL(): boolean;
    set isRTL(value: boolean);
    /**
     * An event that is raised before the [active tab](#activeTab) is switched. Use this event to allow or cancel the switch.
     * @see makeNewViewActive
     */
    onActiveTabChanging: EventBase<SurveyCreatorModel, ActiveTabChangingEvent>;
    /**
     * An event that is raised after the [active tab](#activeTab) is switched.
     * @see makeNewViewActive
     */
    onActiveTabChanged: EventBase<SurveyCreatorModel, ActiveTabChangedEvent>;
    /**
     * Gets or sets the currently displayed tab.
     *
     * Accepted values:
     *
     * - [`"designer"`](#showDesignerTab)
     * - [`"test"`](#showPreviewTab)
     * - [`"theme"`](#showThemeTab)
     * - [`"editor"`](#showJSONEditorTab)
     * - [`"logic"`](#showLogicTab)
     * - [`"translation"`](#showLogicTab)
     * @see makeNewViewActive
     */
    get activeTab(): string;
    set activeTab(val: string);
    /**
     * Switches the [active tab](#activeTab). Returns `false` if the tab cannot be switched.
     * @param tabName A tab that you want to make active: `"designer"`, `"test"`, `"theme"`, `"editor"`, `"logic"`, or `"translation"`.
     * @returns `false` if the active tab cannot be switched, `true` otherwise.
     */
    makeNewViewActive(tabName: string): boolean;
    private switchViewType;
    private activatePlugin;
    private get currentPlugin();
    /**
     * Provides access to the [Toolbox API](https://surveyjs.io/survey-creator/documentation/api-reference/questiontoolbox).
     *
     * [Toolbox Customization](https://surveyjs.io/survey-creator/documentation/toolbox-customization (linkStyle))
     * @see showToolbox
     * @see toolboxLocation
     */
    toolbox: QuestionToolbox;
    get toolboxCategories(): Array<any>;
    sidebar: SidebarModel;
    constructor(options: ICreatorOptions, options2?: ICreatorOptions);
    addCreatorEvent<SurveyCreatorModel, T>(): EventBase<SurveyCreatorModel, T>;
    updateToolboxIsCompact(newVal?: boolean): void;
    allowShowToolbox: boolean;
    showToolboxValue: boolean;
    get showToolbox(): boolean;
    /**
     * Specifies whether to show the Toolbox.
     *
     * Default value: `true`
     *
     * [Toolbox Customization](https://surveyjs.io/survey-creator/documentation/toolbox-customization (linkStyle))
     * @see toolbox
     * @see toolboxLocation
     */
    set showToolbox(val: boolean);
    showSidebarValue: boolean;
    onShowSidebarVisibilityChanged: EventBase<SurveyCreatorModel, any>;
    /**
     * Specifies whether to show the sidebar that displays the Property Grid.
     *
     * Default value: `true`
     * @see sidebarLocation
     */
    get showSidebar(): boolean;
    set showSidebar(val: boolean);
    setShowSidebar(value: boolean, isManualMode?: boolean): void;
    onShowPropertyGridVisiblityChanged: EventBase<SurveyCreatorModel, any>;
    get showPropertyGrid(): boolean;
    set showPropertyGrid(val: boolean);
    rightContainerActiveItem(name: string): void;
    leftContainerActiveItem(name: string): void;
    /**
     * An event that is raised before an undo operation.
     * @see undo
     * @see redo
     * @see onBeforeRedo
     */
    onBeforeUndo: EventBase<SurveyCreatorModel, BeforeUndoEvent>;
    /**
     * An event that is raised before an redo operation.
     * @see redo
     * @see undo
     * @see onBeforeUndo
     */
    onBeforeRedo: EventBase<SurveyCreatorModel, BeforeRedoEvent>;
    get undoRedoManager(): UndoRedoManager;
    get undoRedoController(): UndoRedoController;
    startUndoRedoTransaction(name?: string): void;
    stopUndoRedoTransaction(): void;
    /**
     * Returns `true` if an undo or redo operation is in progress.
     * @see undo
     * @see redo
     */
    get isProcessingUndoRedo(): boolean;
    /**
     * Cancels the last change if possible.
     * @see redo
     * @see onBeforeUndo
     */
    undo(): void;
    /**
     * Repeats the last undone action if possible.
     * @see undo
     * @see onBeforeRedo
     */
    redo(): void;
    get selectionHistoryController(): SelectionHistory;
    get currentPage(): PageModel;
    set currentPage(value: PageModel);
    /**
     * An event that is raised before a new page is added to the survey. Handle this event if you do not want to add the page.
     */
    onPageAdding: EventBase<SurveyCreatorModel, PageAddingEvent>;
    canAddPage(pageToAdd?: PageModel): boolean;
    addPage(pageToAdd?: PageModel, changeSelection?: boolean, beforeAdd?: () => boolean): PageModel;
    private addNewPageIntoSurvey;
    protected initTabs(): void;
    private getTabsInfo;
    getAvailableTabNames(): Array<string>;
    getTabNames(): Array<string>;
    setTabs(tabNames: Array<string>): void;
    private initPlugins;
    private initFooterToolbar;
    getOptions(): ICreatorOptions;
    protected setOptions(options: ICreatorOptions): void;
    private setPropertyPlaceHolder;
    private setPropertyVisibility;
    private patchMetadata;
    isCanModifyProperty(obj: Base, propertyName: string): boolean;
    onIsPropertyReadOnlyCallback(obj: Base, property: JsonObjectProperty, readOnly: boolean, parentObj: Base, parentProperty: JsonObjectProperty, creatorReadOnly?: boolean): boolean;
    /**
     * A [survey](https://surveyjs.io/form-library/documentation/api-reference/survey-data-model) being configured in the Designer tab.
     * @see onSurveyInstanceCreated
     */
    get survey(): SurveyModel;
    /**
     * Adds new items to the [`pages`](https://surveyjs.io/form-library/documentation/api-reference/survey-data-model#pages), [`triggers`](https://surveyjs.io/form-library/documentation/api-reference/survey-data-model#triggers), [`calculatedValues`](https://surveyjs.io/form-library/documentation/api-reference/survey-data-model#calculatedValues), and [`completedHtmlOnCondition`](https://surveyjs.io/form-library/documentation/api-reference/survey-data-model#completedHtmlOnCondition) arrays in the existing survey JSON schema.
     *
     * Use this method to merge the collection properties of two survey JSON schemas:
     *
     * ```js
     * import { SurveyCreatorModel } from "survey-creator-core";
     * const creatorOptions = { ... };
     * const creator = new SurveyCreatorModel(creatorOptions);
     *
     * const surveyJson1 = { ... };
     * const surveyJson2 = { ... };
     *
     * creator.JSON = surveyJson1;
     * creator.addCollectionItemsJson(surveyJson2);
     * // `creator.JSON` contains the merged survey JSON schema
     * ```
     * @param json A JSON object that contains the `pages`, `triggers`, `calculatedValues`, and/or `completedHtmlOnCondition` array(s).
     * @param insertPageIndex A zero-based index at which to insert new pages.
     */
    addCollectionItemsJson(json: any, insertPageIndex?: number): void;
    private updateAddingSurvey;
    private updateAddingPages;
    private updateAddingExistingElements;
    private updateAddingPanels;
    private updateAddingQuestions;
    private updateAddingCalculatedValules;
    private updateAddingArrays;
    private updateAddingElements;
    private addSurveyPages;
    private existingPages;
    private getSurfaceCss;
    /**
     * Returns true if initial survey was empty. It was not set via JSON property and default new survey is empty as well.
     * @returns true if initial survey doesn't have any elements or properties
     */
    protected initSurveyWithJSON(json: any, clearState: boolean): void;
    private updatePlugin;
    protected initDragDrop(): void;
    /**
     * An event that is raised when users start to drag a survey element within the design surface.
     * @see onDragEnd
     * @see onDragDropAllow
     */
    onDragStart: EventBase<SurveyCreatorModel, DragStartEndEvent>;
    onBeforeDrop: EventBase<any, DragStartEndEvent>;
    /**
     * An event that is raised when users finish dragging a survey element within the design surface.
     * @see onDragStart
     * @see onDragDropAllow
     */
    onDragEnd: EventBase<SurveyCreatorModel, DragStartEndEvent>;
    onAfterDrop: EventBase<any, DragStartEndEvent>;
    private initDragDropSurveyElements;
    get designerStateManager(): import("./components/tabs/designer-state-manager").DesignerStateManager;
    collapseAllPagesOnDragStart(): void;
    getElementExpandCollapseState(element: Question | PageModel | PanelModel, reason: ElementGetExpandCollapseStateEventReason, defaultValue: boolean): boolean;
    private restoreState;
    restoreElementsState(): void;
    private initDragDropChoices;
    updateElementsOnLocaleChanged(obj: Base, propertyName: string): void;
    updateConditionsOnNameChanged(obj: Base, propertyName: string, oldValue: any): void;
    private surveyLogicForUpdate;
    private surveyLogicRenaming;
    private getSurveyLogicForUpdate;
    private clearSurveyLogicForUpdate;
    private needClearSurveyLogicForUpdate;
    private updateSurveyLogicValues;
    private updateSurveyLogicItemValue;
    protected createSurveyLogicForUpdate(): SurveyLogic;
    private updateLogicOnQuestionNameChanged;
    private updateLogicOnColumnNameChanged;
    private updateChoicesFromQuestionOnColumnNameChanged;
    isObjQuestion(obj: Base): boolean;
    isObjPage(obj: Base): boolean;
    private isObjThisType;
    private addNewElementReason;
    onDragDropItemStart(): void;
    private doOnQuestionAdded;
    private doOnPanelAdded;
    private doOnPageAdded;
    private getPageByElement;
    private getDefaultSurveyJson;
    protected setSurvey(survey: SurveyModel): void;
    private getSurveyTextFromDesigner;
    private moveElementsToTheEnd;
    protected setTextValue(value: string): void;
    changeText(value: string, clearState?: boolean, trustJSON?: boolean): void;
    private parseJSON;
    /**
     * A survey JSON schema as a string.
     *
     * This property allows you to get or set the JSON schema of a survey being configured. Alternatively, you can use the [`JSON`](#JSON) property.
     */
    get text(): string;
    set text(value: string);
    getSurveyJSON(): any;
    getObjectDisplayName(obj: Base, area: string, reason?: string, displayName?: string): string;
    private animationEnabled;
    createSurvey(json: any, reason: string, model?: any, callback?: (survey: SurveyModel) => void, area?: string): SurveyModel;
    private getSurveyInstanceCreatedArea;
    protected createSurveyCore(json: any, reason: string): SurveyModel;
    private _stateValue;
    /**
     * Indicates the state of Survey Creator.
     *
     * Accepted values:
     *
     * - `""` - Survey Creator doesn't have unsaved changes.
     * - `"modified"` - Survey Creator has unsaved changes.
     * - `"saving"` - Changes are being saved.
     * - `"saved"` - Changes are successfully saved.
     * @see onModified
     */
    get state(): string;
    protected setState(value: string): void;
    onStateChanged: EventBase<SurveyCreatorModel, any>;
    expandCollapseManager: ExpandCollapseManager;
    notifier: Notifier;
    setModified(options?: any): void;
    notifySurveyPropertyChanged(options: any): void;
    notifySurveyItemMoved(options: any): void;
    notifySurveyItemConverted(newElement: Base, oldElement: Base): void;
    /**
     * Displays a toast notification with a specified message.
     *
     * If you want to implement custom toast notification from scratch, handle the [`onNotify`](https://surveyjs.io/survey-creator/documentation/api-reference/survey-creator#onNotify) event.
     * @param message A message to display.
     * @param type A notification type: `"info"` (default) or `"error"`.
     */
    notify(message: string, type?: "info" | "error"): void;
    protected convertQuestion(obj: Question, className: string, defaultJSON?: any): Question;
    private getDefaultElementJSON;
    private singlePageJSON;
    /**
     * A survey JSON schema.
     *
     * This property allows you to get or set the JSON schema of a survey being configured. Alternatively, you can use the [`text`](#text) property.
     */
    get JSON(): any;
    set JSON(val: any);
    loadSurvey(surveyId: string): void;
    /**
     * Specifies where to add new questions when users click the "Add Question" button.
     *
     * Accepted values:
     *
     * - `true` (default)
     * New questions are added to the end of a survey page.
     *
     * - `false`
     * New questions are added after the currently selected question on the design surface.
     */
    addNewQuestionLast: boolean;
    protected doClickQuestionCore(element: IElement, modifiedType?: string, index?: number, panel?: IPanel): void;
    private isRowMultiline;
    private findRowByElement;
    private addElemenMultiline;
    setNewNames(element: ISurveyElement): void;
    private updateNewElementExpressions;
    protected getAllQuestions(includeNewItems?: boolean): Array<any>;
    protected getAllPanels(includeNewItems?: boolean): Array<any>;
    private getAllElements;
    protected getNewName(type: string, isPanel?: boolean): string;
    protected getNewQuestionName(): string;
    protected getNewPanelName(): string;
    protected setNewNamesCore(element: ISurveyElement): void;
    createNewElement(json: any): IElement;
    copyElement(element: Base): IElement;
    /**
     * Creates a copy of a specified question, inserts the copy next to this question, and (optionally) selects it on the design surface.
     * @param question A question to copy.
     * @param selectCopy *(Optional)* Pass `true` if you want to select the copy on the design surface. Default value: `false`.
     * @returns The instance of a new question.
     */
    fastCopyQuestion(question: Base, selectCopy?: boolean): IElement;
    /**
     * Gets or sets the focused survey element: a question, panel, page, or the survey itself.
     * @see onSelectedElementChanging
     * @see onSelectedElementChanged
     */
    get selectedElement(): Base;
    set selectedElement(val: Base);
    /**
     * Refreshes the Designer tab.
     *
     * `refreshDesigner()` is useful if the Designer tab UI depends on an external variable. Call this method each time this variable changes to update the UI.
     */
    refreshDesigner(): void;
    deleteCurrentObject(): void;
    deleteCurrentElement(): void;
    /**
     * Deletes a survey element: a question, panel, or page.
     *
     * If you want to delete the focused element, pass the [`selectedElement`](#selectedElement) property value to this method.
     * @param element A survey element to delete.
     * @see onElementDeleting
     */
    deleteElement(element: Base): void;
    /**
     * Creates a copy of a specified page and inserts the copy next to this page.
     * @param page A [page](https://surveyjs.io/form-library/documentation/api-reference/page-model) to copy.
     * @returns The [instance of a new page](https://surveyjs.io/form-library/documentation/api-reference/page-model).
     * @see onPageAdding
     * @see onPageAdded
     */
    copyPage(page: PageModel): PageModel;
    private isCopyingPage;
    protected deleteObjectCore(obj: any): void;
    private getNextPage;
    protected deleteObject(obj: any): void;
    protected updateConditionsOnRemove(obj: any): void;
    private checkOnElementDeleting;
    isElementSelected(element: Base): boolean;
    selectElement(element: any, propertyName?: string, focus?: boolean | string, startEdit?: boolean): void;
    private currentFocusInterval;
    private currentFocusTimeout;
    focusElement(element: any, focus: string | boolean, selEl?: any, propertyName?: string, startEdit?: boolean): void;
    private getSelectedSurveyElement;
    private onSelectingElement;
    protected get designerPropertyGrid(): PropertyGridModel;
    get propertyGrid(): SurveyModel;
    /**
     * Collapses a specified category in Property Grid.
     * @param name A [category name](https://surveyjs.io/form-library/documentation/customize-question-types/add-custom-properties-to-a-form#category).
     * @see expandPropertyGridCategory
     */
    collapsePropertyGridCategory(name: string): void;
    /**
     * Expands a specified category in Property Grid.
     * @param name A [category name](https://surveyjs.io/form-library/documentation/customize-question-types/add-custom-properties-to-a-form#category).
     * @see collapsePropertyGridCategory
     */
    expandPropertyGridCategory(name: string): void;
    /**
     * Collapses all categories in Property Grid.
     * @see expandAllPropertyGridCategories
     */
    collapseAllPropertyGridCategories(): void;
    /**
     * Expands all categories in Property Grid.
     * @see collapseAllPropertyGridCategories
     */
    expandAllPropertyGridCategories(): void;
    collapseAllPropertyTabs(): void;
    expandAllPropertyTabs(): void;
    expandPropertyTab(name: string): void;
    collapsePropertyTab(name: string): void;
    /**
     * Validates the property values of the [focused element](#selectedElement).
     * @returns `true` if all property values of the focused element are valid or if no element is focused, `false` otherwise.
     * @see onSelectedElementChanging
     * @see onSelectedElementChanged
     */
    validateSelectedElement(): boolean;
    /**
     * Deletes all custom translation strings for a specified locale from Survey Creator and from the generated survey JSON schema.
     * @param locale A locale code (for example, "en").
     * @see locale
     */
    deleteLocaleStrings(locale: string): void;
    private propertyGridDefinition;
    getPropertyGridDefinition(): any;
    setPropertyGridDefinition(val: any): void;
    expandCategoryIfNeeded(): void;
    private selectionChanged;
    private getCurrentPageByElement;
    clickToolboxItem(newElement: any, panel?: IPanel, modifiedType?: string): void;
    getJSONForNewElement(json: any): any;
    /**
     * Opens a dialog window for users to select files.
     * @param input A [file input HTML element](https://developer.mozilla.org/en-US/docs/Web/API/HTMLInputElement).
     * @param callback A callback function that you can use to process selected files. Accepts an array of JavaScript <a href="https://developer.mozilla.org/en-US/docs/Web/API/File" target="_blank">File</a> objects.
     * @see onOpenFileChooser
     * @see onUploadFile
     */
    chooseFiles(input: HTMLInputElement, callback: (files: File[]) => void, context?: {
        element: Base;
        item?: any;
        elementType?: string;
        propertyName?: string;
    }): void;
    /**
     * Uploads files to a server.
     * @param files An array of JavaScript <a href="https://developer.mozilla.org/en-US/docs/Web/API/File" target="_blank">File</a> objects that represent files to upload.
     * @param question A [question instance](https://surveyjs.io/form-library/documentation/api-reference/question) for which files are uploaded.
     * @param callback A callback function that indicates the upload status&mdash;"success" or "error"&mdash;as the first argument. If a file is uploaded successfully, the second argument contains the file's URL.
     * @see onUploadFile
     */
    uploadFiles(files: File[], question: Question, callback: (status: string, data: any) => any, context?: {
        element: Base;
        item?: any;
        elementType?: string;
        propertyName?: string;
    }): void;
    private _rootElementValue;
    get rootElement(): HTMLElement;
    setRootElement(element: HTMLElement): void;
    unsubscribeRootElement(): void;
    initKeyboardShortcuts(rootNode: HTMLElement): void;
    removeKeyboardShortcuts(rootNode: HTMLElement): void;
    findSuitableShortcuts(event: KeyboardEvent): IKeyboardShortcut[];
    protected onKeyDownHandler: (event: KeyboardEvent) => void;
    private shortcuts;
    registerShortcut(name: string, shortcut: IKeyboardShortcut): void;
    unRegisterShortcut(name: string): void;
    protected deletePanelOrQuestion(obj: Base): void;
    hiddenProperties: any;
    protected onCanShowObjectProperty(object: any, property: JsonObjectProperty, showMode: string, parentObj: any, parentProperty: JsonObjectProperty): boolean;
    protected canDeleteItem(object: any, item: Base, allowDelete: boolean): boolean;
    private getErrorOnPropertyChanging;
    protected generateUniqueName(el: Base, newName: string): string;
    protected generateUniqueNameCore(options: any): void;
    private checkForUniqueName;
    protected isNameUnique(el: Base, newName: string, includeNewItems?: boolean): boolean;
    private isNameUniqueInArray;
    protected doPropertyGridChanged(): void;
    get alwaySaveTextInPropertyEditors(): boolean;
    set alwaySaveTextInPropertyEditors(value: boolean);
    getElementAddornerCssCallback(obj: Base, className: string): string;
    onCanShowPropertyCallback(object: any, property: JsonObjectProperty, showMode: string, parentObj: any, parentProperty: JsonObjectProperty): boolean;
    onPropertyGridSurveyCreatedCallback(object: any, survey: SurveyModel): void;
    onPropertyEditorCreatedCallback(object: any, property: JsonObjectProperty, editor: Question): void;
    onPropertyEditorUpdateTitleActionsCallback(object: any, property: JsonObjectProperty, editor: Question, titleActions: IAction[]): void;
    onPropertyGridShowModalCallback(object: any, property: JsonObjectProperty, editor: Question, popupEditor: any, popupModel: PopupBaseViewModel): void;
    onCanDeleteItemCallback(object: any, item: Base, allowDelete: boolean): boolean;
    onCollectionItemDeletingCallback(obj: Base, property: JsonObjectProperty, collection: Array<Base>, item: Base): boolean;
    onCollectionItemAllowingCallback(obj: Base, property: JsonObjectProperty, collection: Array<Base>, item: Base, itemOptions: ICollectionItemAllowOperations): void;
    onItemValueAddedCallback(obj: Base, propertyName: string, itemValue: ItemValue, itemValues: Array<ItemValue>): void;
    onFastEntryCallback(items: Array<ItemValue>, lines: Array<string>): Array<ItemValue>;
    onMatrixDropdownColumnAddedCallback(matrix: Question, column: MatrixDropdownColumn, columns: Array<MatrixDropdownColumn>): void;
    onSetPropertyEditorOptionsCallback(propertyName: string, obj: Base, editorOptions: any): void;
    onGetErrorTextOnValidationCallback(propertyName: string, obj: Base, value: any): string;
    onValueChangingCallback(options: any): void;
    onGetElementEditorTitleCallback(obj: Base, title: string): string;
    onConditionQuestionsGetListCallback(propertyName: string, obj: Base, editor: any, list: any[], variables: string[]): string;
    isConditionOperatorEnabled(questionName: string, question: Question, operator: string, isEnabled: boolean): boolean;
    onLogicGetTitleCallback(expression: string, expressionText: string, text: string, logicItem: any): string;
    getProcessedTranslationItemText(locale: string, locString: ILocalizableString, newText: string, obj: any): string;
    getTranslationExportedText(obj: Base, name: string, locString: ILocalizableString, locale: string, text: string): string;
    getHasMachineTranslation(): boolean;
    doMachineTranslation(fromLocale: string, toLocale: string, strings: Array<string>, callback: (translated: Array<string>) => void): void;
    translationLocalesOrder: Array<string>;
    /**
     * A delay between changing survey settings and saving the survey JSON schema, measured in milliseconds. Applies only when the [`isAutoSave`](#isAutoSave) property is `true`.
     *
     * Default value: 500 (inherited from `settings.autoSave.delay`)
     *
     * If a user changes the settings once again during the delay, only the latest version will be saved.
     */
    autoSaveDelay: number;
    private autoSaveTimerId;
    protected doAutoSave(): void;
    saveNo: number;
    private _doSaveCore;
    /**
     * Calls the [`saveSurveyFunc`](https://surveyjs.io/survey-creator/documentation/api-reference/survey-creator#saveSurveyFunc) function to save the survey JSON schema.
     * @see saveTheme
     * @see save
     */
    saveSurvey(): void;
    doSave(): void;
    saveSurveyActionHandler(): void;
    private _updateSaveActions;
    /**
     * Calls the [`saveSurveyFunc`](https://surveyjs.io/survey-creator/documentation/api-reference/survey-creator#saveSurveyFunc) and [`saveThemeFunc`](https://surveyjs.io/survey-creator/documentation/api-reference/survey-creator#saveThemeFunc) functions to save the survey and theme JSON schemas.
     * @see saveSurvey
     * @see saveTheme
     */
    save(): void;
    protected _syncSaveActions: (sender: any, options: any) => void;
    /**
     * Specifies whether to synchronize [Save buttons](https://surveyjs.io/survey-creator/documentation/api-reference/survey-creator#showSaveButton) in the Designer and Themes tabs.
     *
     * Default value: `false`
     *
     * When this property is disabled, the Save button in the Designer tab saves only the survey JSON schema, while the Save button in the Themes tab saves only the theme JSON schema. If you enable this property, both buttons will save both JSON schemas.
     * @see saveSurveyFunc
     * @see saveThemeFunc
     * @see save
     */
    syncSaveButtons: boolean;
    /**
     * Specifies whether to display a button that saves the survey or theme (executes the [`saveSurveyFunc`](https://surveyjs.io/survey-creator/documentation/api-reference/survey-creator#saveSurveyFunc) or [`saveThemeFunc`](https://surveyjs.io/survey-creator/documentation/api-reference/survey-creator#saveThemeFunc) function).
     *
     * Default value: `false`
     * @see isAutoSave
     * @see syncSaveButtons
     */
    showSaveButton: boolean;
    /**
     * A function that is called each time users click the [Save button](https://surveyjs.io/survey-creator/documentation/api-reference/survey-creator#showSaveButton) or [auto-save](https://surveyjs.io/survey-creator/documentation/api-reference/survey-creator#isAutoSave) is triggered to save a survey JSON schema.
     *
     * For more information, refer to the Save and Load Survey Model Schemas help topic for your framework: [Angular](https://surveyjs.io/survey-creator/documentation/get-started-angular#save-and-load-survey-model-schemas) | [Vue](https://surveyjs.io/survey-creator/documentation/get-started-vue#save-and-load-survey-model-schemas) | [React](https://surveyjs.io/survey-creator/documentation/get-started-react#save-and-load-survey-model-schemas) | [HTML/CSS/JavaScript](https://surveyjs.io/survey-creator/documentation/get-started-html-css-javascript#save-and-load-survey-model-schemas).
     * @see saveThemeFunc
     */
    get saveSurveyFunc(): any;
    set saveSurveyFunc(value: any);
    convertCurrentQuestion(newType: string, defaultJSON?: any): void;
    getAddNewQuestionText(currentAddQuestionType?: string): any;
    get addNewQuestionText(): any;
    getAvailableToolboxItems(element?: SurveyElement, isAddNew?: boolean): Array<QuestionToolboxItem>;
    getQuestionTypeSelectorModel(beforeAdd: (type: string) => void, element?: SurveyElement): Action;
    getUpdatedPageAdornerFooterActions(pageAdorner: PageAdorner, actions: Array<IAction>): IAction[];
    addNewQuestionInPage(beforeAdd: (string: any) => void, panel?: IPanel, type?: string, initJson?: any): void;
    createIActionBarItemByClass(item: QuestionToolboxItem, needSeparator: boolean, onSelectQuestionType?: (questionType: string, json?: any) => void): Action;
    onElementMenuItemsChanged(element: any, items: Action[]): void;
    getElementAllowOperations(element: SurveyElement): any;
    getChoicesItemBaseTitle(): any;
    getNextItemValue(question: QuestionSelectBase): string | number;
    createNewItemValue(question: QuestionSelectBase, callEvent?: boolean, callback?: (res: ItemValue) => void): ItemValue;
    protected onPropertyValueChanged(name: string, oldValue: any, newValue: any): void;
    initResponsivityManager(container: HTMLDivElement): void;
    resetResponsivityManager(): void;
    showHeaderInEmptySurvey: any;
    allowShowPageNavigator: any;
    allowShowSurfaceToolbar: any;
    private showPageNavigatorValue;
    get showPageNavigator(): boolean;
    set showPageNavigator(val: boolean);
    showTabsDefault: boolean;
    showToolbarDefault: boolean;
    showTabs: any;
    showToolbar: any;
    allowCollapseSidebar: any;
    showAddQuestionButton: any;
    isMobileView: boolean;
    isTouch: any;
    /**
     * Specifies the Toolbox location.
     *
     * Accepted values:
     *
     * - `"left"` (default) - Displays the Toolbox on the left side of the design surface.
     * - `"right"` - Displays the Toolbox on the right side of the design surface.
     * - `"sidebar"` - Displays the Toolbox as an overlay on top of the Property Grid. Use the [`sidebarLocation`](https://surveyjs.io/survey-creator/documentation/api-reference/survey-creator#sidebarLocation) property to specify the Property Grid position.
     *
     * [Toolbox Customization](https://surveyjs.io/survey-creator/documentation/toolbox-customization (linkStyle))
     * @see showToolbox
     * @see toolbox
     */
    toolboxLocation: toolboxLocationType;
    /**
     * Specifies the position of the sidebar that displays the Property Grid. Applies only when [`showSidebar`](https://surveyjs.io/survey-creator/documentation/api-reference/survey-creator#showSidebar) is `true`.
     *
     * Accepted values:
     *
     * - `"right"` (default) - Displays the sidebar on the right side of the design surface.
     * - `"left"` - Displays the sidebar on the left side of the design surface.
     * @see toolboxLocation
     */
    sidebarLocation: "left" | "right";
    /**
     * Specifies the visibility of the buttons that expand and collapse survey elements on the design surface.
     *
     * Accepted values:
     *
     * - `"onhover"` (default) - Displays an expand/collapse button when a survey element is hovered over or selected.
     * - `"always"` - Displays the expand/collapse buttons permanently.
     * - `"never"` - Hides the expand/collapse buttons.
     * @see onElementGetExpandCollapseState
     */
    expandCollapseButtonVisibility?: "never" | "onhover" | "always";
    collapsePages: boolean;
    collapsePanels: boolean;
    collapseQuestions: boolean;
    expandOnDragTimeOut: number;
    selectFromStringEditor: boolean;
    isCreatorDisposed: boolean;
    dispose(): void;
    enableLinkFileEditor: boolean;
    getRootCss(): string;
    themeVariables: {
        [index: string]: string;
    };
    creatorTheme: ICreatorTheme;
    preferredColorPalette: string;
    applyCreatorTheme(theme: ICreatorTheme): void;
    syncTheme(theme: ICreatorTheme, isLight?: boolean): void;
    allowDragPages: boolean;
    collapsePagesOnDrag: boolean;
}
export declare class CreatorBase extends SurveyCreatorModel {
}
export declare class StylesManager {
    static get currentTheme(): string;
    static set currentTheme(val: string);
    static applyTheme(name?: string): void;
}
export declare function initializeDesignTimeSurveyModel(model: any, creator: SurveyCreatorModel): void;
export declare const editableStringRendererName = "svc-string-editor";
export declare function getElementWrapperComponentName(element: any, reason: string, isPopupEditorContent: boolean): string;
export declare function getQuestionContentWrapperComponentName(element: any): string;
export declare function getElementWrapperComponentData(element: any, reason: string, creator: SurveyCreatorModel): any;
export declare function getItemValueWrapperComponentName(item: ItemValue, question: QuestionSelectBase): string;
export declare function getItemValueWrapperComponentData(item: ItemValue, question: QuestionSelectBase, creator: SurveyCreatorModel): any;
export declare function isStringEditable(element: any, name: string): boolean;
export declare function isTextInput(target: any): boolean;
export declare function registerAdorner(name: any, adorner: any): void;
export declare function removeAdorners(names?: string[]): void;
