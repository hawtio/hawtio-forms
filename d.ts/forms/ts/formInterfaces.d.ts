/// <reference path="../../includes.d.ts" />
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
