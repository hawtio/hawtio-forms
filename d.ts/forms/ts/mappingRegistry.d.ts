/// <reference path="formHelpers.d.ts" />
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
    function normalize(type: any, property: any, schema: any): string;
}
