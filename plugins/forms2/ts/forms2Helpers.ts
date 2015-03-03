/// <reference path="../../includes.ts"/>
/// <reference path="forms2Interfaces.ts"/>
module HawtioForms {
  export var pluginName = 'hawtio-forms2';
  export var templatePath = 'plugins/forms2/html';
  export var log:Logging.Logger = Logger.get(pluginName);

  export function addPostInterpolateAction(context, name, func:(el:any) => any) {
    if (!(name in context.postInterpolateActions)) {
      context.postInterpolateActions[name] = [];
    }
    context.postInterpolateActions[name].push(func);
  }

  export function getFormMain(context, config:FormConfiguration):string {
    switch(config.style) {
      case FormStyle.STANDARD:
        return context.$templateCache.get('form-standard.html');
      case FormStyle.INLINE:
        return context.$templateCache.get('form-inline.html');
      case FormStyle.UNWRAPPED:
        return context.$templateCache.get('form-unwrapped.html');
      default:
        return context.$templateCache.get('form-horizontal.html');
    }
  }

  export function getStandardTemplate(context, config:FormConfiguration, control:FormElement, type:string):string {
    var template = undefined;
    switch(config.style) {
      case FormStyle.HORIZONTAL:
        template = context.$templateCache.get('standard-horizontal-input.html');
        break;
      default:
        template = context.$templateCache.get('standard-input.html');
    }
    return applyElementConfig(context, config, control, template, type);
  }

  export function applyElementConfig(context, config:FormConfiguration, control:FormElement, template:string, type?:string):string {
    var el = angular.element(template);
    if ('tooltip' in control) {
      el.attr({title: control.tooltip});
    }
    if ('control-group-attributes' in control) {
      el.attr(control['control-group-attributes']);
    } 
    if ('label-attributes' in control) {
      el.find('label').attr(control['label-attributes']);
    }
    var input = el.find('input');
    if (type) {
      input.attr({type: type});
    }
    if ('input-attributes' in control) {
      input.attr(control['input-attributes']);
    }
    return el.prop('outerHTML');
  }

  export function getStaticTextTemplate(context, config:FormConfiguration):string {
    switch(config.style) {
      case FormStyle.HORIZONTAL:
        return context.$templateCache.get('static-horizontal-text.html');
      default:
        return context.$templateCache.get('static-text.html');
    }
  }

  export function getSelectTemplate(context, config:FormConfiguration, name:string, control:FormElement):string {
    var template = undefined;
    switch(config.style) {
      case FormStyle.HORIZONTAL:
        template = context.$templateCache.get('select-horizontal.html');
        break;
      default:
        template = context.$templateCache.get('select.html');

    }
    addPostInterpolateAction(context, name, (el) => {
      var select = el.find('select');
      var propName = 'config.properties[\'' + name + '\'].enum';
      if (_.isArray(control.enum)) {
        select.attr({'ng-options': 'label for label in ' + propName });
      } else {
        select.attr({'ng-options': 'label for (label, value) in ' + propName });
      }
    });
    return applyElementConfig(context, config, control, template);
  }

  export function getCheckboxTemplate(context, config:FormConfiguration, control:FormElement):string {
    switch(config.style) {
      case FormStyle.HORIZONTAL:
        return context.$templateCache.get('checkbox-horizontal.html');
      default:
        return context.$templateCache.get('checkbox.html');
    }
  }

  export function getObjectTemplate(context, config:FormConfiguration, name: string, control:FormElement):string {
    var configName = 'config.properties.' + name;
    if ('javaType' in control) {
      configName = control.javaType;
    }
    addPostInterpolateAction(context, name, (el) => {
      el.find('.inline-object').attr({
        'hawtio-form-2': configName,
        'entity': 'entity.' + name,
        'no-wrap': 'true',
        'label': control.label || context.maybeHumanize(name)
      });
    });
    return context.$templateCache.get('object.html');
  }

  export function getArrayTemplate(context, config:FormConfiguration, name:string, control:FormElement):string {
    if (control.items) {
      if (!('javaType' in control.items)) {
        log.debug("Array, name: ", name, " type: ", control.items.type, " control: ", control);
      } else {
        log.debug("Array, name: ", name, " type: ", control.items.javaType, " control: ", control);
      }
    }
    return context.$templateCache.get('array.html');
  };

  export function lookupTemplate(context, config:FormConfiguration, name:string, control:FormElement):string {
    var controlType = context.mappings.getMapping(control.type);
    if ('enum' in control) {
      controlType = 'select';
    }
    if ('properties' in control) {
      controlType = 'object';
    }
    if (control.hidden) {
      controlType = 'hidden';
    }
    // coerce this for now...
    if (control.type === 'object' && control.javaType && _.startsWith(control.javaType, 'java.util.Map')) {
      controlType = 'map';
    }
    if (controlType) {
      switch (controlType) {
        case 'array':
          return getArrayTemplate(context, config, name, control);
        case 'number':
          return getStandardTemplate(context, config, control, 'number');
        case 'password':
          return getStandardTemplate(context, config, control, 'password');
        case 'text':
          return getStandardTemplate(context, config, control, 'text');
        case 'static':
          return getStaticTextTemplate(context, config);
        case 'object':
          return getObjectTemplate(context, config, name, control);
        case 'hidden':
          control.hidden = true;
          return applyElementConfig(context, config, control, context.$templateCache.get('hidden.html'));
        case 'select':
          return getSelectTemplate(context, config, name, control);
        case 'checkbox':
          return getCheckboxTemplate(context, config, control);
      }
    }
    // log.debug("No mapping found for control: ", control);
    var type = control.javaType || control.type;
    // log.debug("controlType: ", type);
    // look in the schema registry
    var schema = context.schemas.getSchema(type);
    // log.debug("Schema: ", schema);
    if (schema) {
      return getObjectTemplate(context, config, name, <FormElement>_.extend(control, schema));
    }
    return undefined;
  }

  export function getTemplate(context, config:FormConfiguration, name, control:FormElement):string {
    if ('formTemplate' in control) {
      return control.formTemplate;
    }
    return lookupTemplate(context, config, name, control);
  }



}

