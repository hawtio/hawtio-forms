/// <reference path="form2Plugin.ts"/>

module Forms2Tests {

  var log = Logger.get('forms2-typeahead-example');

  _module.controller("Forms2Tests.TypeaheadExample", ["$scope", "$templateCache", 'SchemaRegistry', '$q', '$timeout', ($scope, $templateCache, SchemaRegistry, $q, $timeout) => {

    var configStr = `
    var config = {
      properties: {
        "InputWithTypeahead": {
          type: "string",
          getWords: () => {
            return $q((resolve, reject) => {
              setTimeout(() => {
                resolve(['one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine', 'ten']);
              }, 10)
            })
          } ,
          "input-attributes": {
            "typeahead": "word for word in config.properties.InputWithTypeahead.getWords()"
          }
        },
        "InputWithInlineTypeahead": {
          "type": "text",
          "typeaheadData": [
            "one",
            "two",
            "three",
            "four",
            "five",
            "six",
            "seven",
            "eight",
            "nine",
            "ten"
          ],
          "input-attributes": {
            "typeahead": "number for number in config.properties.InputWithInlineTypeahead.typeaheadData"
          }
        },
      }
    };
    `;

    var config = {
      properties: {
        "InputWithTypeahead": {
          type: "string",
          getWords: () => {
            return $q((resolve, reject) => {
              setTimeout(() => {
                resolve(['one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine', 'ten']);
              }, 10)
            })
          } ,
          "input-attributes": {
            "typeahead": "word for word in config.properties.InputWithTypeahead.getWords()"
          }
        },
        "InputWithInlineTypeahead": {
          "type": "text",
          "typeaheadData": [
            "one",
            "two",
            "three",
            "four",
            "five",
            "six",
            "seven",
            "eight",
            "nine",
            "ten"
          ],
          "input-attributes": {
            "typeahead": "number for number in config.properties.InputWithInlineTypeahead.typeaheadData"
          }
        },
      }
    };

    var model = {
    };

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
