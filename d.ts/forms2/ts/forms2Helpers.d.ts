/// <reference path="../../includes.d.ts" />
/// <reference path="forms2Interfaces.d.ts" />
declare module HawtioForms {
    var pluginName: string;
    var templatePath: string;
    var log: Logging.Logger;
    class Constants {
        static FORM_STANDARD: string;
        static FORM_INLINE: string;
        static FORM_UNWRAPPED: string;
        static FORM_HORIZONTAL: string;
        static STANDARD_HORIZONTAL_INPUT: string;
        static STANDARD_INPUT: string;
        static STATIC_HORIZONTAL_TEXT: string;
        static STATIC_TEXT: string;
        static SELECT_HORIZONTAL: string;
        static SELECT: string;
        static OPTION_ARRAY: string;
        static OPTION_OBJECT: string;
        static OPTION_CONFIG_OBJECT: string;
        static CHECKBOX_HORIZONTAL: string;
        static CHECKBOX: string;
        static OBJECT: string;
        static ARRAY: string;
        static MAP: string;
        static HIDDEN: string;
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
