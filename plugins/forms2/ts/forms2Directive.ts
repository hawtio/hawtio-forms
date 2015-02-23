/// <reference path="forms2Plugin.ts"/>
module HawtioForms {

  var directiveName = 'hawtioForm2'
  _module.directive(directiveName, ['$compile', '$templateCache', '$interpolate', 'SchemaRegistry', 'ControlMappingRegistry', ($compile, $templateCache, $interpolate, schemas:SchemaRegistry, mappings) => {

    var postInterpolateActions = {};
    function addPostInterpolateAction(name, func:(el:any) => any) {
      if (!(name in postInterpolateActions)) {
        postInterpolateActions[name] = [];
      }
      postInterpolateActions[name].push(func);
    }


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

    function getStandardTemplate(config:FormConfiguration, control:FormElement, type:string):string {
      var template = undefined;
      switch(config.style) {
        case FormStyle.HORIZONTAL:
          template = $templateCache.get('standard-horizontal-input.html');
          break;
        default:
          template = $templateCache.get('standard-input.html');
      }
      return applyElementConfig(config, control, template, type);
    }

    function applyElementConfig(config:FormConfiguration, control:FormElement, template:string, type?:string):string {
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

    function getStaticTextTemplate(config:FormConfiguration):string {
      switch(config.style) {
        case FormStyle.HORIZONTAL:
          return $templateCache.get('static-horizontal-text.html');
        default:
          return $templateCache.get('static-text.html');
      }
    }

    function getSelectTemplate(config:FormConfiguration, name:string, control:FormElement):string {
      var template = undefined;
      switch(config.style) {
        case FormStyle.HORIZONTAL:
          template = $templateCache.get('select-horizontal.html');
          break;
        default:
          template = $templateCache.get('select.html');

      }
      addPostInterpolateAction(name, (el) => {
        var select = el.find('select');
        var propName = 'config.properties[\'' + name + '\'].enum';
        if (_.isArray(control.enum)) {
          select.attr({'ng-options': 'label for label in ' + propName });
        } else {
          select.attr({'ng-options': 'label for (label, value) in ' + propName });
        }
      });
      return applyElementConfig(config, control, template);
    }

    function getCheckboxTemplate(config:FormConfiguration, control:FormElement):string {
      switch(config.style) {
        case FormStyle.HORIZONTAL:
          return $templateCache.get('checkbox-horizontal.html');
        default:
          return $templateCache.get('checkbox.html');
      }
    }

    function lookupTemplate(config:FormConfiguration, name:string, control:FormElement):string {
      var controlType = mappings.getMapping(control.type);
      if ('enum' in control) {
        controlType = 'select';
      }
      if (control.hidden) {
        controlType = 'hidden';
      }
      switch (controlType) {
        case 'number':
          return getStandardTemplate(config, control, 'number');
        case 'password':
          return getStandardTemplate(config, control, 'password');
        case 'text':
          return getStandardTemplate(config, control, 'text');
        case 'static':
          return getStaticTextTemplate(config);
        case 'hidden':
          control.hidden = true;
          return applyElementConfig(config, control, $templateCache.get('hidden.html'));
        case 'select':
          return getSelectTemplate(config, name, control);
        case 'checkbox':
          return getCheckboxTemplate(config, control);
        default:
          return undefined;
      }
    }

    function getTemplate(config:FormConfiguration, name, control:FormElement):string {
      if ('formTemplate' in control) {
        return control.formTemplate;
      }
      return lookupTemplate(config, name, control);
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

        function maybeHumanize(value) {
          var config = scope.config;
          if (config && !config.disableHumanizeLabel) {
            return Core.humanizeValue(value);
          } else {
            return value;
          }
        };

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
          postInterpolateActions = {};
          element.empty();
          var form = angular.element(getFormMain(config));
          var parent = form.find('fieldset');
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
              var template = getTemplate(config, name, control);
              if (template) {
                // log.debug("template: ", template);
                var interpolateFunc = $interpolate(template);
                template = interpolateFunc({
                  maybeHumanize: maybeHumanize,
                  control: control,
                  name: name,
                  model: "entity." + name + ""
                });
                // log.debug("postInterpolateActions: ", postInterpolateActions);
                if (postInterpolateActions[name]) {
                  var el = angular.element(template);
                  postInterpolateActions[name].forEach((func) => {
                    func(el);
                  });
                  template = el.prop('outerHTML');
                }
                log.debug("template: ", template);
                parent.append(template);
              }
            });
          }
          var s = scope.$new();
          s.entity = scope.entity;
          s.config = scope.config;
          /*
          form.append('<pre>{{entity}}</pre>');
          form.append('<pre>{{config}}</pre>');
          */
          element.append($compile(form)(scope));
          Core.$apply(scope);
        }, 500), true);
      }
    }
  }]);
} 
