/// <reference path="../../includes.d.ts" />
/// <reference path="forms2Interfaces.d.ts" />
declare module HawtioForms {
    var pluginName: string;
    var templatePath: string;
    var log: Logging.Logger;
    function addPostInterpolateAction(context: any, name: any, func: (el: any) => any): void;
    function getFormMain(context: any, config: FormConfiguration): string;
    function getStandardTemplate(context: any, config: FormConfiguration, control: FormElement, type: string): string;
    function applyElementConfig(context: any, config: FormConfiguration, control: FormElement, template: string, type?: string): string;
    function getStaticTextTemplate(context: any, config: FormConfiguration): string;
    function getSelectTemplate(context: any, config: FormConfiguration, name: string, control: FormElement): string;
    function getCheckboxTemplate(context: any, config: FormConfiguration, control: FormElement): string;
    function getObjectTemplate(context: any, config: FormConfiguration, name: string, control: FormElement): string;
    function getArrayTemplate(context: any, config: FormConfiguration, name: string, control: FormElement): string;
    function lookupTemplate(context: any, config: FormConfiguration, name: string, control: FormElement): string;
    function getTemplate(context: any, config: FormConfiguration, name: any, control: FormElement): string;
}
