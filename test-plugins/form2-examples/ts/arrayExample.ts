/// <reference path="form2Plugin.ts"/>

module Forms2Tests {

  var log = Logger.get('forms2-array-example');

  _module.controller("Forms2Tests.ArrayExample", ["$scope", "$templateCache", 'SchemaRegistry', ($scope, $templateCache, SchemaRegistry) => {

    var configStr = `
    var config = {
      properties: {
        // A simple array of string values
        "Strings": {
          type: "array",
          items: {
            type: 'string'
          }
        },
        // An array of object values of type "MyThing", defined below
        "Objects": {
          type: "array",
          items: {
            type: 'MyThing'
          }
        }
      }
    };

    // We use a separate FormConfig for complex array items
    var elementConfig = {
      properties: {
        "FirstValue": {
          type: 'string',
        },
        "SecondValue": {
          type: 'number',
          default: 1,
          'input-attributes': {
            'max': 10,
            'min': 1
          }
        }
      }
    };
    // add this to the schema registry, SchemaRegistry is an angular service, so can be injected anywhere, in your module's 'run' function, another service etc.
    SchemaRegistry.addSchema("MyThing", elementConfig);

    // let's fill in the model so the form looks more interesting
    var model = {
      'Strings': ['foo', 'bar'],
      'Objects': [{ FirstValue: 'one', SecondValue: 7 }]
    }

    `;
    var config = {
      properties: {
        // A simple array of string values
        "Strings": {
          type: "array",
          items: {
            type: 'string'
          }
        },
        // An array of object values of type "MyThing", defined below
        "Objects": {
          type: "array",
          items: {
            type: 'MyThing'
          }
        }
      }
    };

    // We use a separate FormConfig for complex array items
    var elementConfig = {
      properties: {
        "FirstValue": {
          type: 'string',
        },
        "SecondValue": {
          type: 'number',
          default: 1,
          'input-attributes': {
            'max': 10,
            'min': 1
          }
        }
      }
    };
    // add this to the schema registry, SchemaRegistry is an angular service, so can be injected anywhere, in your module's 'run' function, another service etc.
    SchemaRegistry.addSchema("MyThing", elementConfig);

    // let's fill in the model so the form looks more interesting
    var model = {
      'Strings': ['foo', 'bar'],
      'Objects': [{ FirstValue: 'one', SecondValue: 7 }]
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
