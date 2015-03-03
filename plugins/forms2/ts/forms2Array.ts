/// <reference path="forms2Plugin.ts"/>
module HawtioForms {
  var directiveName = "hawtioForms2Array";
  _module.directive(directiveName, ['$compile', '$templateCache', '$interpolate', 'SchemaRegistry', 'ControlMappingRegistry', ($compile, $templateCache, $interpolate, schemas:SchemaRegistry, mappings:ControlMappingRegistry) => {

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
        };
        scope.$watch('config', (config) => {
          context.postInterpolateActions = {};
          element.empty();
          if (!scope.entity) {
            scope.entity = [];
          }
          if (!config) {
            return;
          }
          var entity = scope.entity;
          log.debug("Config: ", config);
          log.debug("Entity: ", entity);

        }, true);

      }
    }

  }]);

}
