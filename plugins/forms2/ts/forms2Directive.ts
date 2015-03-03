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
      link: (scope, element, attrs) => {
        var maybeHumanize = createMaybeHumanize(scope);
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
          $interpolate: $interpolate,
          $compile: $compile,
          directiveName: directiveName
        }
        scope.config = initConfig(context, scope.config);
        scope.$watch('config', (config) => {
          context.postInterpolateActions = {};
          element.empty();
          if (!scope.entity) {
            scope.entity = {};
          }
          var entity = scope.entity;
          // log.debug("Config: ", config);
          // log.debug("Entity: ", entity);
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
                template = interpolateTemplate(context, config, name, control, template);
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
