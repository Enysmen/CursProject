import { Action, Question, SurveyModel } from "survey-core";
import { SearchManager } from "../components/search-manager";
export declare class SearchManagerPropertyGrid extends SearchManager {
    private highlightedEditorClass;
    private currentMatchIndex;
    private currentMatch;
    protected getFilterStringPlaceholder(): string;
    get propertyGridNoResultsFound(): string;
    survey: SurveyModel;
    isVisible: boolean;
    allMatches: Array<Question>;
    private lastCollapsedElement;
    private expandAllParents;
    private switchHighlightedEditor;
    private updatedMatchCounterText;
    private navigateToEditor;
    private getAllMatches;
    protected setFiterString(newValue: string, oldValue: string): void;
    private reset;
    getSearchActions(): Action[];
    constructor();
    setSurvey(newSurvey: SurveyModel): void;
}
