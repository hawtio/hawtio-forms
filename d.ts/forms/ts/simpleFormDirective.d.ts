/// <reference path="../../includes.d.ts" />
/// <reference path="formHelpers.d.ts" />
/// <reference path="mappingRegistry.d.ts" />
declare module Forms {
    class SimpleFormConfig {
        name: string;
        method: string;
        entity: string;
        schemaName: string;
        mode: string;
        data: any;
        json: any;
        scope: any;
        scopeName: string;
        properties: any[];
        action: string;
        formclass: string;
        controlgroupclass: string;
        controlclass: string;
        labelclass: string;
        showtypes: string;
        showhelp: string;
        showempty: string;
        onsubmit: string;
        getMode(): string;
        getEntity(): string;
        isReadOnly(): boolean;
    }
    class SimpleForm {
        $compile: any;
        restrict: string;
        scope: boolean;
        replace: boolean;
        transclude: boolean;
        private attributeName;
        link: (scope, element, attrs) => any;
        constructor($compile: any);
        isReadOnly(): boolean;
        private doLink(scope, element, attrs);
        private createForm(config);
        private getLegend(config);
    }
}
