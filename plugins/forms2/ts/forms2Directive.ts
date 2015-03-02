/// <reference path="forms2Plugin.ts"/>
module HawtioForms {
  var directiveName = 'hawtioForm2'
  _module.directive(directiveName, ['$compile', '$templateCache', '$interpolate', 'SchemaRegistry', 'ControlMappingRegistry', ($compile, $templateCache, $interpolate, schemas:SchemaRegistry, mappings) => {

    function addPostInterpolateAction(context, name, func:(el:any) => any) {
      if (!(name in context.postInterpolateActions)) {
        context.postInterpolateActions[name] = [];
      }
      context.postInterpolateActions[name].push(func);
    }

    function getFormMain(config:FormConfiguration):string {
      switch(config.style) {
        case FormStyle.STANDARD:
          return $templateCache.get('form-standard.html');
        case FormStyle.INLINE:
          return $templateCache.get('form-inline.html');
        case FormStyle.UNWRAPPED:
          return $templateCache.get('form-unwrapped.html');
        default:
          return $templateCache.get('form-horizontal.html');
      }
    }

    function getStandardTemplate(context, config:FormConfiguration, control:FormElement, type:string):string {
      var template = undefined;
      switch(config.style) {
        case FormStyle.HORIZONTAL:
          template = $templateCache.get('standard-horizontal-input.html');
          break;
        default:
          template = $templateCache.get('standard-input.html');
      }
      return applyElementConfig(context, config, control, template, type);
    }

    function applyElementConfig(context, config:FormConfiguration, control:FormElement, template:string, type?:string):string {
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

    function getStaticTextTemplate(context, config:FormConfiguration):string {
      switch(config.style) {
        case FormStyle.HORIZONTAL:
          return $templateCache.get('static-horizontal-text.html');
        default:
          return $templateCache.get('static-text.html');
      }
    }

    function getSelectTemplate(context, config:FormConfiguration, name:string, control:FormElement):string {
      var template = undefined;
      switch(config.style) {
        case FormStyle.HORIZONTAL:
          template = $templateCache.get('select-horizontal.html');
          break;
        default:
          template = $templateCache.get('select.html');

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

    function getCheckboxTemplate(context, config:FormConfiguration, control:FormElement):string {
      switch(config.style) {
        case FormStyle.HORIZONTAL:
          return $templateCache.get('checkbox-horizontal.html');
        default:
          return $templateCache.get('checkbox.html');
      }
    }

    function getObjectTemplate(context, config:FormConfiguration, name: string, control:FormElement):string {
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
      return $templateCache.get('object.html');
    }

    function getArrayTemplate(context, config:FormConfiguration, name:string, control:FormElement):string {
      if (control.items) {
        if (!('javaType' in control.items)) {
          log.debug("Array, name: ", name, " type: ", control.items.type, " control: ", control);
        } else {
          log.debug("Array, name: ", name, " type: ", control.items.javaType, " control: ", control);
        }
      }
      return $templateCache.get('array.html');
    };

    function lookupTemplate(context, config:FormConfiguration, name:string, control:FormElement):string {
      var controlType = mappings.getMapping(control.type);
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
            return applyElementConfig(context, config, control, $templateCache.get('hidden.html'));
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
      var schema = schemas.getSchema(type);
      // log.debug("Schema: ", schema);
      if (schema) {
        return getObjectTemplate(context, config, name, <FormElement>_.extend(control, schema));
      }
      return undefined;
    }

    function getTemplate(context, config:FormConfiguration, name, control:FormElement):string {
      if ('formTemplate' in control) {
        return control.formTemplate;
      }
      return lookupTemplate(context, config, name, control);
    }

    return {
      restrict: 'A',
      replace: true,
      scope: {
        config: '=' + directiveName,
        entity: '=?'
      },
      templateUrl: UrlHelpers.join(templatePath, 'forms2Directive.html'),
      link: (scope, element, attrs) => {
        var maybeHumanize = (value) => {
          var config = scope.config;
          if (config && !config.disableHumanizeLabel) {
            return Core.humanizeValue(value);
          } else {
            return value;
          }
        };
        var context = {
          postInterpolateActions: {

          },
          maybeHumanize: maybeHumanize,
          scope: scope,
          element: element,
          attrs: attrs
        }
        if (!scope.config) {
          // log.debug("Object not found in $scope, looking up schema");
          // look in schema registry
          var name = attrs[directiveName];
          if (name) {
            scope.config = schemas.cloneSchema(name);
          }
        }
        // set any missing defaults
        if ('noWrap' in attrs) {
          if (attrs['noWrap']) {
            scope.config.style = FormStyle.UNWRAPPED;
          }
        }
        if ('label' in attrs) {
          scope.config.label = attrs['label'];
        }
        scope.config = createFormConfiguration(scope.config);
        scope.$watch('config', _.debounce(() => {
          if (!scope.entity) {
            scope.entity = {};
          }
          var entity = scope.entity;
          var config = scope.config;
          // log.debug("Config: ", config);
          // log.debug("Entity: ", entity);
          context.postInterpolateActions = {};

          element.empty();
          var form = angular.element(getFormMain(config));
          var parent = form.find('fieldset');
          if (parent.length === 0) {
            parent = form;
          }
          if ('properties' in config) {
            _.forIn(config.properties, (control:FormElement, name:string) => {
              var value = Core.pathGet(control, ['input-attributes', 'value']);
              if (value) {
                entity[name] = value;
              }
              var _default = Core.pathGet(control, ['default']);
              if (_default) {
                entity[name] = _default;
              }
              // log.debug("control: ", control);
              var template = getTemplate(context, config, name, control);
              if (template) {
                // log.debug("template: ", template);
                var interpolateFunc = $interpolate(template);
                // log.debug("name: ", name, " control: ", control);
                template = interpolateFunc({
                  maybeHumanize: maybeHumanize,
                  control: control,
                  name: name,
                  model: "entity." + name + ""
                });
                // log.debug("postInterpolateActions: ", postInterpolateActions);
                if (context.postInterpolateActions[name]) {
                  var el = angular.element(template);
                  context.postInterpolateActions[name].forEach((func) => {
                    func(el);
                  });
                  template = el.prop('outerHTML');
                }
                // log.debug("template: ", template);
                parent.append(template);
              }
            });
          }
          var s = scope.$new();
          s.entity = scope.entity;
          s.config = scope.config;
          s.maybeHumanize = maybeHumanize;
          /*
          form.append('<pre>{{entity}}</pre>');
          form.append('<pre>{{config}}</pre>');
          */
          element.append($compile(form)(scope));
          Core.$apply(scope);
        }, 1), true);
      }
    }
  }]);
} 
