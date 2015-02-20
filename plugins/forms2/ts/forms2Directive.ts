/// <reference path="forms2Plugin.ts"/>
module HawtioForms {

  var directiveName = 'hawtioForm2'
  _module.directive(directiveName, ['$compile', '$templateCache', '$interpolate', 'SchemaRegistry', 'ControlMappingRegistry', ($compile, $templateCache, $interpolate, schemas:SchemaRegistry, mappings) => {

    function getStandardTemplate(type:string):string {
      var el = angular.element($templateCache.get('standard-input.html'));
      el.find('input').attr({type: type});
      return el.prop('outerHTML');
    }

    function lookupTemplate(control:FormElement):string {
      var controlType = mappings.getMapping(control.type);
      switch (controlType) {
        case 'number':
          return getStandardTemplate('number');
        case 'password':
          return getStandardTemplate('password');
        case 'text':
          return getStandardTemplate('text');
        case 'static':
          return $templateCache.get('static-text.html');
        case 'hidden':
          return '';
        case 'checkbox':
          return $templateCache.get('checkbox-input.html');
        default:
          return undefined;
      }
    }

    function getTemplate(control:FormElement):string {
      if ('formTemplate' in control) {
        return control.formTemplate;
      }
      return lookupTemplate(control);
    }

    return {
      restrict: 'A',
      replace: true,
      scope: {
        config: '=' + directiveName,
        entity: '='
      },
      templateUrl: UrlHelpers.join(templatePath, 'forms2Directive.html'),
      link: (scope, element, attrs) => {
        // set any missing defaults
        scope.config = createFormConfiguration(scope.config);
        scope.$watch('config', _.debounce(() => {
          element.empty();
          var form = angular.element($templateCache.get("form-main.html"));
          var parent = form.find('fieldset');
          log.debug("Config: ", scope.config);
          var config = scope.config;
          if ('properties' in config) {
            _.forIn(config.properties, (control:FormElement, name:string) => {
              log.debug("control: ", control);
              var template = getTemplate(control);
              if (template) {
                log.debug("template: ", template);
                var interpolateFunc = $interpolate(template);
                parent.append(interpolateFunc({
                  entity: control,
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
