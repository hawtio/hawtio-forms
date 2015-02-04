/// <reference path="../../includes.d.ts" />
/// <reference path="mappingRegistry.d.ts" />
/**
 * @module Forms
 */
declare module Forms {
    /**
     * @class InputBaseConfig
      */
    class InputBaseConfig {
        name: string;
        type: string;
        description: string;
        _default: string;
        scope: any;
        mode: string;
        schemaName: string;
        controlgroupclass: string;
        controlclass: string;
        labelclass: string;
        showtypes: string;
        /**
         * Custom template for custom form controls
         * @property
         * @type String
         */
        formtemplate: any;
        /**
         * the name of the attribute in the scope which is the data to be edited
         * @property
         * @type String
         */
        entity: string;
        /**
         * the model expression to bind to. If omitted this defaults to entity + "." + name
         * @property
         * @type String
         */
        model: any;
        getEntity(): string;
        getMode(): string;
        isReadOnly(): boolean;
    }
    class InputBase {
        $compile: any;
        restrict: string;
        scope: boolean;
        replace: boolean;
        transclude: boolean;
        private attributeName;
        link: (scope, element, attrs) => any;
        constructor($compile: any);
        doLink(scope: any, element: any, attrs: any): void;
        getControlGroup(config1: any, config2: any, id: any): any;
        getInput(config: any, arg: any, id: any, modelName: any): JQuery;
    }
    class TextInput extends InputBase {
        $compile: any;
        type: string;
        constructor($compile: any);
        getInput(config: any, arg: any, id: any, modelName: any): JQuery;
    }
    class HiddenText extends TextInput {
        $compile: any;
        type: string;
        constructor($compile: any);
        getControlGroup(config1: any, config2: any, id: any): any;
        getInput(config: any, arg: any, id: any, modelName: any): JQuery;
    }
    class PasswordInput extends TextInput {
        $compile: any;
        type: string;
        constructor($compile: any);
    }
    class CustomInput extends InputBase {
        $compile: any;
        constructor($compile: any);
        getInput(config: any, arg: any, id: any, modelName: any): JQuery;
    }
    class SelectInput extends InputBase {
        $compile: any;
        constructor($compile: any);
        getInput(config: any, arg: any, id: any, modelName: any): JQuery;
    }
    class NumberInput extends InputBase {
        $compile: any;
        constructor($compile: any);
        getInput(config: any, arg: any, id: any, modelName: any): JQuery;
    }
    /**
     * Generates a list of strings which can be added / edited / removed
     * @class StringArrayInput
     */
    class StringArrayInput extends InputBase {
        $compile: any;
        constructor($compile: any);
        getInput(config: any, arg: any, id: any, modelName: any): ng.IAugmentedJQuery;
    }
    class ArrayInput extends InputBase {
        $compile: any;
        constructor($compile: any);
        doLink(scope: any, element: any, attrs: any): void;
    }
    class BooleanInput extends InputBase {
        $compile: any;
        constructor($compile: any);
        getInput(config: any, arg: any, id: any, modelName: any): JQuery;
    }
}
