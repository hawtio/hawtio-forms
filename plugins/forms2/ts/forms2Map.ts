/// <reference path="forms2Plugin.ts"/>
module HawtioForms {
  var directiveName = "hawtioForms2Map";

  _module.directive(directiveName, ['$compile', '$templateCache', '$interpolate', 'SchemaRegistry', 'ControlMappingRegistry', '$modal', ($compile:ng.ICompileService, $templateCache:ng.ITemplateCacheService, $interpolate:ng.IInterpolateService, schemas:SchemaRegistry, mappings:ControlMappingRegistry, $modal) => {

    function findSchema(name: string, type:string, control):any {
      var answer = <any> {
        properties: {},
        control: control
      };
      if ('items' in control) {
        answer.properties[name] = {
          noLabel: true,
          type: type,
          items: {
            type: control.items.type
          }
        };
      } else if (mappings.hasMapping(type)) {
        answer.properties[name] = {
          noLabel: true,
          type: mappings.getMapping(type)
        };
      } else {
        answer = schemas.getSchema(type);
      }
      answer.control = control;
      return answer;
    }


    function buildMap(context, entity, keySchema, valueSchema, body) {
      log.debug("keySchema: ", keySchema);
      log.debug("valueSchema: ", valueSchema);
      log.debug("context.config: ", context.config);
      var s = context.s;
      s.keys = {}
      s.values = {};
      _.forIn(entity, (value, key) => {
        s.keys[key] = {
          key: key
        };
        if (valueSchema.control.items || mappings.hasMapping(valueSchema.control.type)) {
          s.values[key] = {
            value: value
          };
        } else {
          s.values[key] = value;
        }
        var tr = angular.element(context.$templateCache.get('rowTemplate.html'));
        var keyEl = tr.find('.form-map-key');
        keyEl.attr({
          'hawtio-form-2': 'keySchema',
          'entity': "keys['" + key + "']"
        });
        var valueEl = tr.find('.form-map-value');
        valueEl.attr({
          'hawtio-form-2': 'valueSchema',
          'entity': "values['" + key + "']"
        });
        body.append(tr);
      });
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
            s: undefined,
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

          var keySchema = findSchema('key', config.items.key.type, config.items.key);
          var valueSchema = findSchema('value', config.items.value.type, config.items.value);

          var table = angular.element($templateCache.get('table.html'));
          var body = table.find('tbody');

          s.config = config;
          s.entity = entity;
          s.keySchema = _.cloneDeep(keySchema);
          s.valueSchema = _.cloneDeep(valueSchema);
          s.keySchema.mode = s.valueSchema.mode = FormMode.VIEW;
          s.keySchema.style = s.valueSchema.style = FormStyle.UNWRAPPED;
          s.keySchema.hideLegend = s.valueSchema.hideLegend = true;
          context.s = s;

          s.$watchCollection('entity', (entity, old) => {
            scope.entity = entity;
            body.empty();
            var tmp = angular.element('<div></div>');
            buildMap(context, entity, keySchema, valueSchema, tmp);
            body.append($compile(tmp.children())(s));
          }, true);
          element.append($compile(table)(s));
        });

      }
    };
  }]);
} 
