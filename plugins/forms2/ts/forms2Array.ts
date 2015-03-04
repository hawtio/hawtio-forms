/// <reference path="forms2Plugin.ts"/>
module HawtioForms {
  var directiveName = "hawtioForms2Array";

  function clearBody(context, table) {
    var body = table.find('tbody');
    body.empty();
    return body;
  }

  function buildTableBody(context, columnSchema, entity, body) {
    _.forEach(entity, (row, index) => {
      var tr = newBodyRow(context);
      if (columnSchema.properties.$items) {
        tr.append('<td>' + row + '</td>');
      } else {
        _.forIn(columnSchema.properties, (control, name) => {
          /*
          var template = getTemplate(context, context.scope.config, name, control);
          if (template) {
            template = interpolateTemplate(context, context.scope.config, name, control, template, 'entity[' + index + '].' + name);
            log.debug("template: ", template);
            var td = angular.element('<td></td>');
            td.append(template);
            tr.append(td); 
          } else {
          */
            tr.append('<td>' + row[name] + '</td>');
          //}
        });
      }
      var deleteRow = angular.element(context.$templateCache.get('deleteRow.html'));
      deleteRow.find('.deleteRow').attr({
        'ng-click': 'deleteRow(' + index + ')'
      });
      deleteRow.find('.editRow').attr({
        'ng-click': 'editRow(' + index + ')'
      });
      tr.append(deleteRow);
      body.append(tr);
    });
  }

  function newBodyRow(context) {
    return angular.element(context.$templateCache.get('rowTemplate.html'));
  }

  function newHeaderRow(context, table) {
    var header = table.find('thead');
    header.empty();
    return header.append(context.$templateCache.get('rowTemplate.html')).find('tr');
  }

  function buildTableHeader(context, table, columnSchema) {
    var headerRow = newHeaderRow(context, table);
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

  _module.directive(directiveName, ['$compile', '$templateCache', '$interpolate', 'SchemaRegistry', 'ControlMappingRegistry', '$modal', ($compile, $templateCache, $interpolate, schemas:SchemaRegistry, mappings:ControlMappingRegistry, $modal) => {
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
        scope.config = initConfig(context, scope.config);
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
          /*
          log.debug("Config: ", config);
          log.debug("Entity: ", entity);
          log.debug("Type: ", type);
          */
          var columnSchema = <any> {
            properties: {

            }
          }
          if (mappings.hasMapping(type)) {
            var items = <any>{}
            _.merge(items, config, {
              type: mappings.getMapping(type)
            });
            if ('items' in items) {
              delete items['items'];
            }
            if (!items.label) {
              items.label = 'Entries';
            }
            columnSchema.properties.$items = items;
          } else {
            columnSchema = schemas.getSchema(type);
          }
          var table = angular.element($templateCache.get("table.html"));
          // log.debug("columnSchema: ", columnSchema);
          var header = buildTableHeader(context, table, columnSchema);
          var s = scope.$new();
          s.config = config;

          s.deleteRow = (index) => {
            var modal = $modal.open({
              templateUrl: UrlHelpers.join(templatePath, 'arrayItemModal.html'),
              controller: ['$scope', '$modalInstance', ($scope, $modalInstance) => {
                $scope.schema = _.clone(columnSchema, true);
                $scope.schema.style = FormStyle.STANDARD;
                $scope.schema.mode = FormMode.VIEW;
                $scope.header = "Delete Entry?";
                if (columnSchema.properties.$items) {
                  $scope.newEntity = {
                    $items: entity[index]
                  };
                } else {
                  $scope.newEntity = _.clone(entity[index]);
                }
                $scope.ok = () => {
                  modal.close();
                  entity.splice(index, 1);
                }
                $scope.cancel = () => {
                  modal.dismiss();
                }
              }]
            });
          }

          s.editRow = (index) => {
            var modal = $modal.open({
              templateUrl: UrlHelpers.join(templatePath, 'arrayItemModal.html'),
              controller: ['$scope', '$modalInstance', ($scope, $modalInstance) => {
                $scope.schema = _.clone(columnSchema, true);
                $scope.schema.style = FormStyle.STANDARD;
                $scope.header = "Edit Entry";
                if (columnSchema.properties.$items) {
                  $scope.newEntity = {
                    $items: entity[index]
                  };
                } else {
                  $scope.newEntity = _.clone(entity[index]);
                }
                $scope.ok = () => {
                  modal.close();
                  log.debug("New entity: ", $scope.newEntity);
                  if ('$items' in $scope.newEntity) {
                    entity[index] = $scope.newEntity.$items;
                  } else {
                    entity[index] = $scope.newEntity;
                  }
                }
                $scope.cancel = () => {
                  modal.dismiss();
                }
              }]
            });
          }

          s.createNewRow = () => {
            var modal = $modal.open({
              templateUrl: UrlHelpers.join(templatePath, 'arrayItemModal.html'),
              controller: ['$scope', '$modalInstance', ($scope, $modalInstance) => {
                $scope.schema = _.clone(columnSchema, true);
                $scope.schema.style = FormStyle.STANDARD;
                $scope.newEntity = undefined;
                $scope.header = "Add New Entry";
                $scope.ok = () => {
                  modal.close();
                  // log.debug("New entity: ", $scope.newEntity);
                  if ('$items' in $scope.newEntity) {
                    entity.push($scope.newEntity.$items);
                  } else {
                    entity.push($scope.newEntity);
                  }
                }
                $scope.cancel = () => {
                  modal.dismiss();
                }
              }]
            });
          }
          element.append($compile(table)(s));
          if (scope.watch) {
            scope.watch();
          }
          scope.watch = scope.$watchCollection('entity', (entity, old) => {
            if (entity !== old) {
              // log.debug("Entity: ", entity);
              var body = clearBody(context, table);
              var tmp = angular.element('<div></div>');
              buildTableBody(context, columnSchema, entity, tmp);
              body.append($compile(tmp.children())(s));
            }
          });
        }, true);

      }
    }

  }]);

}
