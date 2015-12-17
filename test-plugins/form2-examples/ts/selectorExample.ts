/// <reference path="form2Plugin.ts"/>

module Forms2Tests {

  var log = Logger.get('forms2-selector-example');

  _module.controller("Forms2Tests.SelectorExample", ["$scope", "$templateCache", ($scope, $templateCache) => {

    var configStr = `
    var config = {
      properties: {
        "Amount": {
          type: "string",
          default: 2,
          enum: {
            "One": 1,
            "Two": 2,
            "Three": 3,
            "Four": 4,
            "Five": 5,
            "Six": 6
          },
          selectors: {
            select: (select) => {
              select.css({ background: 'lightblue' });
            }
          }
        },
        "Name": {
          type: "string",
          selectors: {
            '.control-label': (label) => {
              label.css({ 'font-weight': 'bold' });
            },
            'el': (group) => {
              group.attr({'ng-show': 'entity.Amount == 2'});
            }
          }
        }
      }
    };

    `;

    var config = {
      properties: {
        "Amount": {
          type: "string",
          default: 2,
          enum: {
            "One": 1,
            "Two": 2,
            "Three": 3,
            "Four": 4,
            "Five": 5,
            "Six": 6
          },
          selectors: {
            select: (select) => {
              select.css({ background: 'lightblue' });
            }
          }
        },
        "Name": {
          type: "string",
          selectors: {
            '.control-label': (label) => {
              label.css({ 'font-weight': 'bold' });
            },
            'el': (group) => {
              group.attr({'ng-show': 'entity.Amount == 2'});
            }
          }
        }
      }
    };

    var model = {

    }

    $scope.config = config;
    $scope.model = model;
    $scope.configStr = configStr;
    $scope.markup = $templateCache.get("markup.html");

    $scope.$watch('model', _.debounce(function() {
      $scope.modelStr = angular.toJson($scope.model, true);
      Core.$apply($scope);
    }, 500), true);
    $scope.$watch('configStr', _.debounce(function() {
      try {
        $scope.config = angular.fromJson($scope.configStr);
        log.debug("Updated config...");
        Core.$apply($scope);
      } catch (e) {
      }
    }, 1000));


  }]);

}
