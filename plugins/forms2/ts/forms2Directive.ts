/// <reference path="forms2Plugin.ts"/>
module HawtioForms {
  var directiveName = 'hawtioForm2'
  _module.directive(directiveName, ['$compile', '$templateCache', '$interpolate', 'SchemaRegistry', 'ControlMappingRegistry', ($compile, $templateCache, $interpolate, schemas:SchemaRegistry, mappings) => {

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
          attrs: attrs,
          mappings: mappings,
          schemas: schemas,
          $templateCache: $templateCache,
          $interpolate: $interpolate
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
        scope.$watch('config', (newValue, oldValue) => {
          /*
          if (newValue === oldValue) {
            return;
          }
          */
          if (!scope.entity) {
            scope.entity = {};
          }
          var entity = scope.entity;
          var config = scope.config;
          // log.debug("Config: ", config);
          // log.debug("Entity: ", entity);
          context.postInterpolateActions = {};

          element.empty();
          var form = angular.element(getFormMain(context, config));
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
          //Core.$apply(scope);
        }, true);
      }
    }
  }]);
} 
