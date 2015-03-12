/// <reference path="forms2Plugin.ts"/>
module HawtioForms {
  var directiveName = "hawtioForms2Map";

  _module.directive(directiveName, ['$compile', '$templateCache', '$interpolate', 'SchemaRegistry', 'ControlMappingRegistry', '$modal', ($compile:ng.ICompileService, $templateCache:ng.ITemplateCacheService, $interpolate:ng.IInterpolateService, schemas:SchemaRegistry, mappings:ControlMappingRegistry, $modal) => {

    function findSchema(name: string, type:string):any {
      if (mappings.hasMapping(type)) {
        var answer = {
          properties: {

          }
        };
        answer.properties[name] = {
          type: mappings.getMapping(type)
        };
        return answer;
      } else {
        return schemas.getSchema(type);
      }
    }

    return {
      restrict: 'A',
      replace: true,
      templateUrl: UrlHelpers.join(templatePath, 'forms2Map.html'),
      scope: {
        config: '=' + directiveName,
        entity: '=?'
      },
      link: (scope, element, attrs) => {
        log.debug("in map, attrs: ", attrs);
        scope.$watch('config', (newConfig) => {
          var context = {
            postInterpolateActions: {

            },
            maybeHumanize: undefined,
            config: undefined,
            element: element,
            attrs: attrs,
            mappings: mappings,
            schemas: schemas,
              $templateCache: $templateCache,
              $interpolate: $interpolate,
                $compile: $compile,
            directiveName: directiveName        
          };
          var config = <any> initConfig(context, _.cloneDeep(newConfig), false);
          context.config = config;
          context.maybeHumanize = createMaybeHumanize(context);
          if (!scope.entity) {
            scope.entity = {};
          }
          if (!config || !config.items) {
            log.debug("Invalid map config, no 'items' configured");
            return;
          }
          if (!config.items.key) {
            log.debug("Invalid map config, no 'key' attribute configured in 'items'");
            return;
          }
          if (!config.items.value) {
            log.debug("Invalid map config, no 'value' attribute configured in 'items'");
            return;
          }
          var entity = scope.entity;
          log.debug("In map, config: ", config, " entity: ", entity);
          var s = scope.$new();

          var keySchema = findSchema('key', config.items.key.type);
          var valueSchema = findSchema('value', config.items.value.type);

          var table = angular.element($templateCache.get('table.html'));
          var body = table.find('tbody');

          s.config = config;
          s.entity = entity;

          s.$watchCollection('entity', (entity, old) => {
            scope.entity = entity;
            body.empty();
            _.forIn(entity, (value, key) => {
              var tr = angular.element($templateCache.get('rowTemplate.html'));
              tr.append('<td>' + key + '</td><td>' + value + '</td><td></td>');
              body.append(tr);
            });
          }, true);

          log.debug("keySchema: ", keySchema);
          log.debug("valueSchema: ", valueSchema);

          element.append($compile(table)(s));
        });

      }
    };
  }]);
} 
