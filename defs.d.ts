/// <reference path="libs/hawtio-ui/defs.d.ts" />
declare var diffString: any;
/**
 * @module Forms
 */
declare module Forms {
    var log: Logging.Logger;
    /**
     * Default any values in the schema on the entity if they are not already present
     * @method defaultValues
     * @param {any} entity
     * @param {any} schema
     */
    function defaultValues(entity: any, schema: any): void;
    /**
     * If the type name refers to an alias in the schemas definitions then perform the lookup and return the real type name
     * @method resolveTypeNAmeAlias
     * @param {String} type
     * @param {any} schema
     *
     */
    function resolveTypeNameAlias(type: any, schema: any): any;
    /**
     * Walks the base class hierarchy checking if the given type is an instance of the given type name
     * @method isJsonType
     * @param {String} name
     * @param {any} schema
     * @param {String} typeName
     * @return {Boolean}
     */
    function isJsonType(name: any, schema: any, typeName: any): boolean;
    /**
     * Removes any dodgy characters for a valid identifier in angularjs such as for '-' characters
     * which are replaced with '_'
     * @method safeIdentifier
     * @param {String} id
     * @return {String}
     */
    function safeIdentifier(id: string): string;
    /**
     * Looks up the given type name in the schemas definitions
     * @method lookupDefinition
     * @param {String} name
     * @param {any} schema
     */
    function lookupDefinition(name: any, schema: any): any;
    /**
     * For an array property, find the schema of the items which is either nested inside this property
     * in the 'items' property; or the type name is used to lookup in the schemas definitions
     * @method findArrayItemsSchema
     * @param {String} property
     * @param {any} schema
     */
    function findArrayItemsSchema(property: any, schema: any): any;
    /**
     * Returns true if the given schema definition is an object
     * @method isObjectType
     * @param {any} definition
     */
    function isObjectType(definition: any): boolean;
    /**
     * Returns true if the given property represents a nested object or array of objects
     * @method isArrayOrNestedObject
     * @param {any} property
     * @param {any} schema
     */
    function isArrayOrNestedObject(property: any, schema: any): boolean;
    function configure(config: any, scopeConfig: any, attrs: any): any;
    function getControlGroup(config: any, arg: any, id: any): JQuery;
    function getLabel(config: any, arg: any, label: any, required?: boolean): JQuery;
    function getControlDiv(config: any): JQuery;
    function getHelpSpan(config: any, arg: any, id: any, property?: any): JQuery;
}
/**
 * @module Forms
 */
declare module Forms {
    /**
     * Create a DOM widget tree for the given set of form configuration data.
     *
     * This will include either the standard AngularJS widgets or custom widgets
     */
    function createWidget(propTypeName: any, property: any, schema: any, config: any, id: any, ignorePrefixInLabel: any, configScopeName: any, wrapInGroup?: boolean, disableHumanizeLabel?: boolean): JQuery;
    /**
     * Lets try create the standard angular JS widgets markup
     * @method createStandardWidgetMarkup
     * @param {String} propTypeName
     * @param {any} property
     * @param {any} schema
     * @param {any} config
     * @param {any} options
     * @param {String} id
     */
    function createStandardWidgetMarkup(propTypeName: any, property: any, schema: any, config: any, options: any, id: any): string;
    function mapType(type: String): String;
    function normalize(type: any, property: any, schema: any): "hawtio-form-text" | "hawtio-form-custom" | "hawtio-form-select" | "hawtio-form-number" | "hawtio-form-string-array" | "hawtio-form-array" | "hawtio-form-checkbox" | "hawtio-form-password" | "hawtio-form-hidden" | "hawtio-form-map";
}
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
        getInput(config: any, arg: any, id: any, modelName: any): JQuery;
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
declare module Forms {
    var pluginName: string;
    var templateUrl: string;
    var log: Logging.Logger;
}
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
declare module Forms {
    class SubmitForm {
        restrict: string;
        scope: boolean;
        link: (scope, element, attrs) => any;
        constructor();
        private doLink(scope, element, attrs);
    }
}
declare module Forms {
    class ResetForm {
        restrict: string;
        scope: boolean;
        link: (scope, element, attrs) => any;
        constructor();
        private doLink(scope, element, attrs);
    }
}
declare module Forms {
    var _module: ng.IModule;
}
declare module Forms {
    /**
     * Map of name/value pairs that get mapped to element attributes
     */
    interface AttributeMap {
        [key: string]: string;
    }
    /**
     * Element in a FormConfiguration's 'properties' attribute
     */
    interface FormElement {
        type: string;
        tooltip?: string;
        label?: string;
        hidden?: boolean;
        'input-attributes'?: AttributeMap;
        'control-group-attributes'?: AttributeMap;
        formTemplate?: string;
    }
    /**
     * Factory method to create a FormElement object
     * @returns {FormElement}
     */
    function createFormElement(): FormElement;
    /**
     * Type for the FormConfiguration's 'properties' attribute
     */
    interface FormProperties {
        [name: string]: FormElement;
    }
    /**
     * Type for the FormConfiguration's 'tabs' attribute
     */
    interface FormTabs {
        [name: string]: Array<string>;
    }
    /**
     * Factory method to create a FormTabs object
     * @returns {FormTabs}
     */
    function createFormTabs(): FormTabs;
    /**
     * Interface that describes the configuration object for hawtio forms
     */
    interface FormConfiguration {
        id?: string;
        type?: string;
        disableHumanizeLabel?: boolean;
        ignorePrefixInLabel?: boolean;
        properties: FormProperties;
        tabs?: FormTabs;
    }
    /**
     * Factory method to create a FormConfiguration object
     * @returns {FormConfiguration}
     */
    function createFormConfiguration(): FormConfiguration;
    interface FormGridElement extends FormElement {
        key?: string;
        headerTemplate: string;
        template: string;
    }
    interface FormGridProperties {
        [name: string]: FormGridElement;
    }
    interface FormGridRowConfiguration extends FormConfiguration {
        properties: FormGridProperties;
        columnOrder: Array<string>;
    }
    interface FormGridConfiguration {
        heading?: boolean;
        rowName?: string;
        rowSchema: FormGridRowConfiguration;
        rows: Array<any>;
        onAdd: () => any;
        noDataTemplate: string;
    }
    function createFormGridConfiguration(): FormGridConfiguration;
}
declare module Forms {
}
declare module Forms {
}
declare module HawtioForms {
    interface AttributeMap {
        [key: string]: string;
    }
    interface FormSelectors {
        [key: string]: (el: any) => void;
    }
    /**
     * Element in a FormConfiguration's 'properties' attribute
     */
    interface FormElement {
        type: string;
        tooltip?: string;
        label?: string;
        hidden?: boolean;
        javaType?: string;
        value?: any;
        default?: any;
        enum?: any;
        items?: any;
        'input-attributes'?: AttributeMap;
        'control-group-attributes'?: AttributeMap;
        'label-attributes'?: AttributeMap;
        formTemplate?: string;
        selectors?: FormSelectors;
        [key: string]: any;
    }
    /**
     * Type for the FormConfiguration's 'properties' attribute
     */
    interface FormProperties {
        [name: string]: FormElement;
    }
    /**
     * Type for the FormConfiguration's 'tabs' attribute
     */
    interface FormTabs {
        [name: string]: Array<string>;
    }
    /**
     * Enum for form mode attribute
     */
    enum FormMode {
        VIEW = 0,
        EDIT = 1,
    }
    /**
     * Enum for the overall form style
     */
    enum FormStyle {
        STANDARD = 0,
        INLINE = 1,
        HORIZONTAL = 2,
        UNWRAPPED = 3,
    }
    interface FormWizardPage {
        title?: string;
        controls: Array<string>;
    }
    interface FormWizardPages {
        pages: FormWizardPage;
    }
    /**
     * Interface that describes the configuration object for hawtio forms
     */
    interface FormConfiguration {
        id?: string;
        type?: string;
        mode?: FormMode;
        style?: FormStyle;
        disableHumanizeLabel?: boolean;
        ignorePrefixInLabel?: boolean;
        properties: FormProperties;
        tabs?: FormTabs;
        wizard?: FormWizardPages;
        controls?: Array<string>;
        label?: string;
        debug?: boolean;
        [key: string]: any;
    }
    function createFormConfiguration(options?: FormConfiguration): FormConfiguration;
    interface ControlMappingRegistry {
        hasMapping(name: string): boolean;
        addMapping(name: string, controlType: string): any;
        getMapping(name: string): string;
        removeMapping(name: string): string;
        iterate(iter: (controlType: string, name: string) => void): any;
    }
    interface SchemaRegistry {
        addSchema(name: string, schema: FormConfiguration): any;
        getSchema(name: string): FormConfiguration;
        cloneSchema(name: string): FormConfiguration;
        removeSchema(name: string): FormConfiguration;
        iterate(iter: (FormConfiguration, string) => void): any;
        addListener(name: string, callback: (nme: string, schema: any) => void): any;
        removeListener(name: string): any;
    }
}
declare module HawtioForms {
    var pluginName: string;
    var templatePath: string;
    var log: Logging.Logger;
    class Constants {
        static readonly FORM_STANDARD: string;
        static readonly FORM_INLINE: string;
        static readonly FORM_UNWRAPPED: string;
        static readonly FORM_HORIZONTAL: string;
        static readonly STANDARD_HORIZONTAL_INPUT: string;
        static readonly STANDARD_INPUT: string;
        static readonly STATIC_HORIZONTAL_TEXT: string;
        static readonly STATIC_TEXT: string;
        static readonly SELECT_HORIZONTAL: string;
        static readonly SELECT: string;
        static readonly OPTION_ARRAY: string;
        static readonly OPTION_OBJECT: string;
        static readonly OPTION_CONFIG_OBJECT: string;
        static readonly CHECKBOX_HORIZONTAL: string;
        static readonly CHECKBOX: string;
        static readonly OBJECT: string;
        static readonly ARRAY: string;
        static readonly MAP: string;
        static readonly HIDDEN: string;
    }
    function addPostInterpolateAction(context: any, name: any, func: (el: any) => any): void;
    function addPreCompileAction(context: any, name: any, func: () => void): void;
    function getFormMain(context: any, config: FormConfiguration): string;
    function getStandardTemplate(context: any, config: FormConfiguration, control: FormElement, type: string): string;
    function applyElementConfig(context: any, config: FormConfiguration, control: FormElement, template: string, type?: string): string;
    function getStaticTextTemplate(context: any, config: FormConfiguration): string;
    function setSelectOptions(isArray: boolean, propName: string, select: any): void;
    function getSelectTemplate(context: any, config: FormConfiguration, name: string, control: FormElement): string;
    function getCheckboxTemplate(context: any, config: FormConfiguration, control: FormElement): string;
    function getObjectTemplate(context: any, config: FormConfiguration, name: string, control: FormElement): string;
    function getMapTemplate(context: any, config: FormConfiguration, name: string, control: FormElement): string;
    function getArrayTemplate(context: any, config: FormConfiguration, name: string, control: FormElement): string;
    function lookupTemplate(context: any, config: FormConfiguration, name: string, control: FormElement): string;
    function getTemplate(context: any, config: FormConfiguration, name: any, control: FormElement): string;
    function interpolateTemplate(context: any, config: FormConfiguration, name: any, control: FormElement, template: string, model: string): string;
    function createMaybeHumanize(context: any): (value: any) => any;
    function initConfig(context: any, config: FormConfiguration, lookup?: boolean): FormConfiguration;
}
declare module HawtioForms {
    var _module: ng.IModule;
}
declare module HawtioForms {
}
declare module HawtioForms {
}
declare module HawtioForms {
}
declare module HawtioForms {
}
declare module HawtioForms {
}
declare module HawtioForms {
}
