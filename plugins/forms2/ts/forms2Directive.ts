/// <reference path="forms2Plugin.ts"/>
module HawtioForms {

  var directiveName = 'hawtioForm2'
  _module.directive(directiveName, ['$compile', '$templateCache', '$interpolate', 'SchemaRegistry', 'ControlMappingRegistry', ($compile, $templateCache, $interpolate, schemas:SchemaRegistry, mappings) => {

    function getFormMain(config:FormConfiguration):string {
      switch(config.style) {
        case FormStyle.STANDARD:
          return $templateCache.get('form-standard.html');
        case FormStyle.INLINE:
          return $templateCache.get('form-inline.html');
        default:
          return $templateCache.get('form-horizontal.html');
      }
    }

    function getStandardTemplate(config:FormConfiguration, control:FormElement):string {
      var template = undefined;
      switch(config.style) {
        case FormStyle.HORIZONTAL:
          template = $templateCache.get('standard-horizontal-input.html');
          break;
        default:
          template = $templateCache.get('standard-input.html');
      }
      if (control.hidden) {
        template = $templateCache.get('hidden.html');
      }
      return applyElementConfig(config, control, template);
    }

    function applyElementConfig(config:FormConfiguration, control:FormElement, template:string):string {
      var el = angular.element(template);
      if ('control-group-attributes' in control) {
        el.attr(control['control-group-attributes']);
      } 
      if ('label-attributes' in control) {
        el.find('label').attr(control['label-attributes']);
      }
      var input = el.find('input');
      if (!control.hidden) {
        var controlType = mappings.getMapping(control.type);
        input.attr({type: controlType});
      }
      if ('input-attributes' in control) {
        input.attr(control['input-attributes']);
      }
      return el.prop('outerHTML');
    }

    function getStaticTextTemplate(config:FormConfiguration):string {
      switch(config.style) {
        case FormStyle.HORIZONTAL:
          return $templateCache.get('static-horizontal-text.html');
        default:
          return $templateCache.get('static-text.html');
      }
    }

    function lookupTemplate(config:FormConfiguration, control:FormElement):string {
      var controlType = mappings.getMapping(control.type);
      switch (controlType) {
        case 'number':
          return getStandardTemplate(config, control);
        case 'password':
          return getStandardTemplate(config, control);
        case 'text':
          return getStandardTemplate(config, control);
        case 'static':
          return getStaticTextTemplate(config);
        case 'hidden':
          control.hidden = true;
          return applyElementConfig(config, control, $templateCache.get('hidden.html'));
        case 'checkbox':
          return $templateCache.get('checkbox-input.html');
        default:
          return undefined;
      }
    }

    function getTemplate(config:FormConfiguration, control:FormElement):string {
      if ('formTemplate' in control) {
        return control.formTemplate;
      }
      return lookupTemplate(config, control);
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
        // set any missing defaults
        scope.config = createFormConfiguration(scope.config);
        scope.$watch('config', _.debounce(() => {
          if (!scope.entity) {
            scope.entity = {};
          }
          var entity = scope.entity;
          var config = scope.config;
          log.debug("Config: ", config);
          log.debug("Entity: ", entity);
          element.empty();
          var form = angular.element(getFormMain(config));
          var parent = form.find('fieldset');
          if ('properties' in config) {
            _.forIn(config.properties, (control:FormElement, name:string) => {
              var value = Core.pathGet(control, ['input-attributes', 'value']);
              if (value) {
                entity[name] = value;
              }
              // log.debug("control: ", control);
              var template = getTemplate(config, control);
              if (template) {
                // log.debug("template: ", template);
                var interpolateFunc = $interpolate(template);
                parent.append(interpolateFunc({
                  control: control,
                  name: name,
                  model: "entity." + name + ""
                }));
              }
            });
          }
          var s = scope.$new();
          s.entity = scope.entity;
          element.append($compile(form)(scope));
          Core.$apply(scope);
        }, 500), true);
      }
    }
  }]);
} 
