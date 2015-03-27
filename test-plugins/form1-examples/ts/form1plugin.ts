/// <reference path="../../includes.ts"/>

module Forms1Tests {
  var pluginName = 'hawtio-forms1-tests';
  var log:Logging.Logger = Logger.get(pluginName);
  var tp = 'test-plugins/form1-examples/html';
  var _module = angular.module(pluginName, []);

  var tab = null;

  _module.config(['$routeProvider', 'HawtioNavBuilderProvider', function($routeProvider, builder) {
    tab = builder.create()
            .id(pluginName)
            .rank(1)
            .title( function() { return "Forms"; } )
            .href( function () { return "/forms"; })
            .subPath("Simple Form", "simple_form", builder.join(tp, "test.html"), 1)
            .subPath("Form Table", "form_table", builder.join(tp, "testTable.html"), 2)
            .subPath("Wizard", "form_wizard", builder.join(tp, "wizard.html"), 3)
            .build();
    builder.configureRouting($routeProvider, tab);        
  }]);

  _module.run(["HawtioNav", "SchemaRegistry", function(nav, schemas) {
    nav.add(tab);
  }]);

  _module.controller("HawtioFormsTests.WizardController", ["$scope", "$templateCache", function($scope, $templateCache) {
    $scope.wizardConfig = {
      "properties": {
        "key": {
          "description": "Argument key",
          "type": "java.lang.String"
        },
        "value": {
          "description": "Argument Value",
          "type": "java.lang.String"
        },
        "longArg": {
          "description": "Long argument",
          "type": "Long",
          "minimum": "5",
          "maximum": "10"
        },
        "intArg": {
          "description": "Int argument",
          "type": "Integer"
        },
        "objectArg": {
          "description": "some object",
          "type": "object"
        },
        "booleanArg": {
          "description": "Some boolean value",
          "type": "java.lang.Boolean"
        }
      },
      "description": "My awesome wizard!",
      "type": "java.lang.String",
      "wizard": {
        "Page One": ["key", "value"],
        "Page Two": ["*"],
        "Page Three": ["booleanArg"]
      }
    };
    $scope.wizardConfigStr = angular.toJson($scope.wizardConfig, true);
    $scope.wizardMarkup = $templateCache.get("wizardMarkup.html");
    $scope.$watch('wizardConfigStr', _.debounce(function() {
      try {
        $scope.wizardConfig = angular.fromJson($scope.wizardConfigStr);
        log.debug("Updated config...");
        Core.$apply($scope);
      } catch (e) {
      }
    }, 1000));

  }]);

  _module.controller("Forms.FormTestController", ["$scope", function ($scope) {
    $scope.editing = false;
    $scope.html = "text/html";
    $scope.javascript = "javascript";
    $scope.basicFormEx1Entity = {
      'key': 'Some key',
      'value': 'Some value'
    };
    $scope.basicFormEx1EntityString = angular.toJson($scope.basicFormEx1Entity, true);
    $scope.basicFormEx1Result = '';
    $scope.toggleEdit = function () {
      $scope.editing = !$scope.editing;
    };
    $scope.view = function () {
      if (!$scope.editing) {
        return "view";
      }
      return "edit";
    };
    $scope.basicFormEx1 = '<div simple-form name="some-form" action="#/forms/test" method="post" data="basicFormEx1SchemaObject" entity="basicFormEx1Entity" onSubmit="callThis()"></div>';
    $scope.toObject = function (str) {
      return angular.fromJson(str.replace("'", "\""));
    };
    $scope.fromObject = function (str) {
      return angular.toJson($scope[str], true);
    };
    
    $scope.basicFormEx1Config ={
      "properties": {
        "key": {
          "description": "Argument key",
          "type": "java.lang.String"
        },
        "value": {
          "description": "Argument Value",
          "type": "java.lang.String"
        },
        "longArg": {
          "description": "Long argument",
          "type": "Long",
          "minimum": "5",
          "maximum": "10"
        },
        "intArg": {
          "description": "Int argument",
          "type": "Integer"
        },
        "objectArg": {
          "description": "some object",
          "type": "object"
        },
        "booleanArg": {
          "description": "Some boolean value",
          "type": "java.lang.Boolean"
        }
      },
      "description": "Show some stuff in a form",
      "type": "java.lang.String",
      "tabs": {
        "Tab One": ["key", "value"],
        "Tab Two": ["*"],
        "Tab Three": ["booleanArg"]
      }
    };

    $scope.basicFormEx1Schema = angular.toJson($scope.basicFormEx1Config, true);
    $scope.basicFormEx1SchemaObject = $scope.toObject($scope.basicFormEx1Schema);
    $scope.updateSchema = function () {
      $scope.basicFormEx1SchemaObject = $scope.toObject($scope.basicFormEx1Schema);
    };
    $scope.updateEntity = function () {
      $scope.basicFormEx1Entity = angular.fromJson($scope.basicFormEx1EntityString);
    };
    $scope.hawtioResetEx = '<a class="btn" href="" hawtio-reset="some-form"><i class="icon-refresh"></i> Clear</a>';
    $scope.hawtioSubmitEx = '      <a class="btn" href="" hawtio-submit="some-form"><i class="icon-save"></i> Save</a>';
    $scope.callThis = function (json, form) {
      $scope.basicFormEx1Result = angular.toJson(json, true);
      Core.notification('success', 'Form "' + form.get(0).name + '" submitted...');
      Core.$apply($scope);
    };
    $scope.config = {
      name: 'form-with-config-object',
      action: "/some/url",
      method: "post",
      data: 'setVMOption',
      showtypes: 'false'
    };
    $scope.cheese = {
      key: "keyABC",
      value: "valueDEF",
      intArg: 999
    };
    $scope.onCancel = function (form) {
      Core.notification('success', 'Cancel clicked on form "' + form.get(0).name + '"');
    };
    $scope.onSubmit = function (json, form) {
      Core.notification('success', 'Form "' + form.get(0).name + '" submitted... (well not really), data:' + JSON.stringify(json));
    };
    $scope.derp = function (json, form) {
      Core.notification('error', 'derp with json ' + JSON.stringify(json));
    };
    $scope.inputTableData = {
      rows: [
        { id: "object1", name: 'foo' },
        { id: "object2", name: 'bar' }
      ]
    };
    $scope.inputTableConfig = {
      data: 'inputTableData.rows',
      displayFooter: false,
      showFilter: false,
      showSelectionCheckbox: false,
      enableRowClickSelection: true,
      primaryKeyProperty: 'id',
      properties: {
        'rows': { items: { type: 'string', properties: {
          'id': {
            description: 'Object ID',
            type: 'java.lang.String'
          },
          'name': {
            description: 'Object Name',
            type: 'java.lang.String'
          }
        } } }
      },
      columnDefs: [
        {
        field: 'id',
        displayName: 'ID'
      },
      {
        field: 'name',
        displayName: 'Name'
      }
      ]
    };
  }]);



  hawtioPluginLoader.addModule(pluginName);

}
