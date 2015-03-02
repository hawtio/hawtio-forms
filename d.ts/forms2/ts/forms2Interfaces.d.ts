/// <reference path="../../includes.d.ts" />
declare module HawtioForms {
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
        javaType?: string;
        enum?: any;
        items?: any;
        'input-attributes'?: AttributeMap;
        'control-group-attributes'?: AttributeMap;
        'label-attributes'?: AttributeMap;
        formTemplate?: string;
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
    }
    function createFormConfiguration(options?: FormConfiguration): FormConfiguration;
    interface ControlMappingRegistry {
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
    }
}
