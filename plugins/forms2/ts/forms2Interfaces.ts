/// <reference path="../../includes.ts"/>
module HawtioForms {
  /*
   * Map of name/value pairs that get mapped to element attributes
   */
  export interface AttributeMap {
    [key:string]: string;
  }

  /**
   * Element in a FormConfiguration's 'properties' attribute
   */
  export interface FormElement {
    type: string;
    tooltip?: string;
    label?: string;
    hidden?: boolean;
    'input-attributes'?: AttributeMap;
    'control-group-attributes'?: AttributeMap;
    formTemplate?: string;
  }

  /**
   * Type for the FormConfiguration's 'properties' attribute
   */
  export interface FormProperties {
    [name:string]: FormElement;
  }

  /**
   * Type for the FormConfiguration's 'tabs' attribute
   */
  export interface FormTabs {
    [name:string]: Array<string>;
  }

  /**
   * Enum for form mode attribute
   */
  export enum FormMode {
    VIEW,
    EDIT
  }

  /**
   * Interface that describes the configuration object for hawtio forms
   */
  export interface FormConfiguration {
    id?: string;
    type?: string;
    mode?: FormMode;
    disableHumanizeLabel?: boolean
    ignorePrefixInLabel?: boolean
    properties: FormProperties;
    tabs?: FormTabs;
  }

  export function createFormConfiguration(options?: FormConfiguration):FormConfiguration {
    var answer = options || { properties: {} };
    _.defaults(answer, {
      mode: FormMode.EDIT,
    });
    return answer;
  }

  export interface SchemaRegistry {
    addSchema(name: string, schema: FormConfiguration);
    getSchema(name:string):FormConfiguration;
    cloneSchema(name:string):FormConfiguration;
    removeSchema(name:string):FormConfiguration;
    iterate(iter:(FormConfiguration, string) => void);
  }
}
