/// <reference path="form2Plugin.ts"/>

module Forms2Tests {

  var log = Logger.get('forms2-simple-example');

  _module.controller("Forms2Tests.SimpleExample", ["$scope", "$templateCache", ($scope, $templateCache) => {

    var configStr = `
    var config = {
      // Standard bootstrap form with the label and control stacked
      style: HawtioForms.FormStyle.STANDARD,
      // Controls are editable, can also set to 'VIEW' to just show values
      mode: HawtioForms.FormMode.EDIT,
      properties: {
        "Name": {
          type: "string",
          // Most controls support setting arbitrary attributes via 'input-attributes'
          'input-attributes': {
            'placeholder': 'Enter some name'
          }
        },
        "Amount": {
          type: "string",
          'default': 2,
          // Add an object of name/value pairs to turn a field into a select box
          enum: {
            "One": 1,
            "Two": 2,
            "Three": 3,
            "Four": 4,
            "Five": 5,
            "Six": 6
          },
          description: 'Pick some amount'
        },
        "Number": {
          type: 'number',
          'default': 5,
          // it's also possible via 'input-attributes' to use html5 attributes like min/max
          'input-attributes': {
            'max': 10,
            'min': 5
          }

        },
        "Maybe": {
          type: 'boolean',
          // if you want to customize the label for a control, use 'label'
          label: "Maybe?",
          'default': true
        }
      }
    };
    `;

    var config = {
      // Standard bootstrap form with the label and control stacked
      style: HawtioForms.FormStyle.STANDARD,
      // Controls are editable, can also set to 'VIEW' to just show values
      mode: HawtioForms.FormMode.EDIT,
      properties: {
        "Name": {
          type: "string",
          // Most controls support setting arbitrary attributes via 'input-attributes'
          'input-attributes': {
            'placeholder': 'Enter some name'
          }
        },
        "Amount": {
          type: "string",
          'default': 2,
          // Add an object of name/value pairs to turn a field into a select box
          enum: {
            "One": 1,
            "Two": 2,
            "Three": 3,
            "Four": 4,
            "Five": 5,
            "Six": 6
          },
          description: 'Pick some amount'
        },
        "Number": {
          type: 'number',
          'default': 5,
          // it's also possible via 'input-attributes' to use html5 attributes like min/max
          'input-attributes': {
            'max': 10,
            'min': 5
          }

        },
        "Maybe": {
          type: 'boolean',
          // if you want to customize the label for a control, use 'label'
          label: "Maybe?",
          'default': true
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
