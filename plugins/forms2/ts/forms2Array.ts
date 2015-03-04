/// <reference path="forms2Plugin.ts"/>
module HawtioForms {
  var directiveName = "hawtioForms2Array";

  function clearBody(context) {
    var body = context.element.find('tbody');
    body.empty();
    return body;
  }

  function newBodyRow(context) {
    return angular.element(context.$templateCache.get('rowTemplate.html'));
  }

  function newHeaderRow(context) {
    var header = context.element.find('thead');
    header.empty();
    return header.append(context.$templateCache.get('rowTemplate.html')).find('tr');
  }

  function buildTableHeader(context, columnSchema) {
    var headerRow = newHeaderRow(context);
    _.forIn(columnSchema.properties, (control, name) => {
      var interpolateFunc = context.$interpolate(control.headerTemplate || context.$templateCache.get('header.html'));
      headerRow.append(interpolateFunc({
        control: control,
        name: context.maybeHumanize(name)
      }));
    });
    headerRow.append(context.$templateCache.get("newItemHeader.html"));
    return headerRow;
  }

  _module.directive(directiveName, ['$compile', '$templateCache', '$interpolate', 'SchemaRegistry', 'ControlMappingRegistry', ($compile, $templateCache, $interpolate, schemas:SchemaRegistry, mappings:ControlMappingRegistry) => {
    return {
      restrict: 'A',
      replace: true,
      templateUrl: UrlHelpers.join(templatePath, 'forms2Array.html'),
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
        scope.template = '';
        scope.$watch('config', (config) => {
          scope.template = '';
          context.postInterpolateActions = {};

          if (!scope.entity) {
            scope.entity = [];
          }
          if (!config || !config.items) {
            return;
          }
          var type = config.items.type || config.items.javaType;
          var entity = scope.entity;
          log.debug("Config: ", config);
          log.debug("Entity: ", entity);
          log.debug("Type: ", type);
          var columnSchema = <any> {
            properties: {

            }
          }
          if (mappings.hasMapping(type)) {
            var items = {}
            _.merge(items, config, {
              type: mappings.getMapping(type)
            });
            if ('items' in items) {
              delete items['items'];
            }
            columnSchema.properties.items = items;
          } else {
            columnSchema = schemas.getSchema(type);
          }
          log.debug("columnSchema: ", columnSchema);
          buildTableHeader(context, columnSchema);

        }, true);

      }
    }

  }]);

}
