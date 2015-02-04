/// <reference path="formHelpers.d.ts" />
declare module Forms {
    class InputTableConfig {
        name: string;
        method: string;
        entity: string;
        tableConfig: string;
        mode: string;
        data: any;
        json: any;
        properties: any[];
        action: string;
        tableclass: string;
        controlgroupclass: string;
        controlclass: string;
        labelclass: string;
        showtypes: string;
        removeicon: string;
        editicon: string;
        addicon: string;
        removetext: string;
        edittext: string;
        addtext: string;
        onadd: string;
        onedit: string;
        onremove: string;
        primaryKeyProperty: any;
        getTableConfig(): string;
    }
    class InputTable {
        $compile: any;
        restrict: string;
        scope: boolean;
        replace: boolean;
        transclude: boolean;
        private attributeName;
        link: (scope, element, attrs) => any;
        constructor($compile: any);
        private doLink(scope, element, attrs);
        private getAddButton(config);
        private getEditButton(config);
        private getRemoveButton(config);
        private createTable(config, tableConfig);
        private getLegend(config);
        private getControlGroup(config, arg, id);
        private getControlDiv(config);
        private getHelpSpan(config, arg, id);
    }
}
