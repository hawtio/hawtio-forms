/// <reference path="../../includes.d.ts" />
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
    function getControlGroup(config: any, arg: any, id: any): ng.IAugmentedJQuery;
    function getLabel(config: any, arg: any, label: any, required?: boolean): ng.IAugmentedJQuery;
    function getControlDiv(config: any): ng.IAugmentedJQuery;
    function getHelpSpan(config: any, arg: any, id: any, property?: any): ng.IAugmentedJQuery;
}
