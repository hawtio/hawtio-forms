
var HawtioFormsTests;
(function(HawtioFormsTests) {
  var pluginName = HawtioFormsTests.pluginName = 'hawtio-forms-tests';
  var tp = HawtioFormsTests.templatePath = 'test';
  var log = HawtioFormsTests.log = Logger.get(pluginName);
  var _module = HawtioFormsTests._module = angular.module(HawtioFormsTests.pluginName, []);
  var tab = null;
  var tab2 = null;

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

    tab2 = builder.create()
              .id(pluginName + '-form2')
              .rank(2)
              .title( function() { return "Forms2"; } )
              .href( function() { return "/forms2"; } )
              .subPath("Simple Form", "simple_form", builder.join(tp, "simpleForm2.html"), 1)
              .subPath("Schema Test", "from_schema", builder.join(tp, "fromSchema.html"), 2)
              .build();

    builder.configureRouting($routeProvider, tab);        
    builder.configureRouting($routeProvider, tab2);        
  }]);

  _module.run(["HawtioNav", "SchemaRegistry", function(nav, schemas) {
    nav.add(tab);
    nav.add(tab2);
    schemas.addSchema('kubernetes', Kubernetes.schema);
  }]);

  HawtioFormsTests.Forms2SchemaController = _module.controller("HawtioFormsTests.Forms2SchemaController", ["$scope", "$templateCache", "SchemaRegistry", function($scope, $templateCache, schemas) {

    $scope.config = schemas.cloneSchema("os_build_BuildConfig");
    $scope.config.style = HawtioForms.FormStyle.STANDARD;
    $scope.config.mode = HawtioForms.FormMode.EDIT;
    $scope.model = {};
    $scope.configStr = angular.toJson($scope.config, true);
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

  HawtioFormsTests.Forms2Controller = _module.controller("HawtioFormsTests.Forms2Controller", ["$scope", "$templateCache", "SchemaRegistry", function($scope, $templateCache, schemas) {
    schemas.addSchema('testObject', {
      "description": "Object from registry",
      properties: {
        "Attr1": {
          "type": "number",
          "label": "Attribute 1"
        }
      }
    });

    schemas.addSchema('ArrayObject', {
      description: 'Some object with a username and password',
      properties: {
        "Field1": {
          "type": "string",
          "label": "Username",
          "input-attributes": {
            placeholder: "Username..."
          }
        },
        "Field2": {
          "type": "password",
          "label": "Password",
          "input-attributes": {
            placeholder: "Password..."
          }
        },
        "Field3": {
          "type": "string",
          "label": "Type",
          "enum": {
            "label1": "value1",
            "label2": "value2",
            "label3": "value3"
          }
        }
      }
    });
    $scope.config = {
      "style": HawtioForms.FormStyle.HORIZONTAL,
      "mode": HawtioForms.FormMode.EDIT,
      "disableHumanizeLabel": false,
      hideLegend: true,
      "properties": {
        "fromSchemaRegistry": {
          "type": "testObject"
        },
        "key": {
          "label": "The Argument",
          "type": "java.lang.String",
          "description": "Enter the argument key",
          "label-attributes": {

          },
          "input-attributes": {
            "value": "This is an initial value",
            "placeholder": "Enter in some value"
          },
          "control-group-attributes": {
            "ng-show": "entity.booleanArg == true"
          }
        },
        array1: {
          items: {
            type: 'string'
          },
          type: 'array'
        },
        array2: {
          items: {
            type: 'number'
          },
          type: 'array'
        },
        array3: {
          items: {
            type: 'ArrayObject'
          },
          type: 'array'
        },
        scheme: {
          type: "java.lang.String",
          tooltip: "HTTP or HTTPS",
          enum: ["http", "https"],
          default: "http",
        },
        nestedObject: {
          style: HawtioForms.FormStyle.HORIZONTAL,
          label: "A Nested Object",
          type: 'object',
          properties: {
            'Attribute1': {
              type: 'text',
              'label-attributes': {
                'style': 'color: green'
              }
            },
            'Attribute2': {
              type: 'java.lang.Integer',
              label: 'A Number'
            } 
          }
        },
        "ObjectSelect": {
          type: "java.lang.String",
          enum: {
            "label1": "value1",
            "label2": "value2",
            "label3": "value3"
          },
          default: "value3"
        },
        "value": {
          "description": "Enter the argument value",
          "label": "The Value",
          "type": "java.lang.String",
          "tooltip": "This is the tooltip",
          "input-attributes": {
            "placeholder": "Hello World!",
            "value": "This is also an initial value"
          }
        },
        "staticText": {
          "type": "static",
          "description": "This is some static text, use this type to add a description in your form that's properly formatted"
        },
        "templatedThing": {
          "formTemplate": "<p class=\"alert alert-info\">Hi, I'm a custom template and I like warm hugs!</p>"
        },
        "passwordField": {
          "type": "password",
          "input-attributes": {
            placeholder: "Password..."
          }
        },
        "longArg": {
          "description": "Long argument",
          "type": "Long",
          "label-attributes": {
            "style": "color: red"
          },
          "input-attributes": {
            "min": "5",
            "max": "10"
          }
        },
        "intArg": {
          "description": "Int argument",
          "type": "Integer",
          "hidden": true,
          "input-attributes": {
            "value": 5
          }
        },
        "objectArg": {
          "description": "some object",
          "type": "object"
        },
        "booleanArg": {
          "description": "Toggles whether or not you want to enter the argument key",
          "type": "java.lang.Boolean"
        }
      },
      "description": "This is my awesome form",
      "type": "java.lang.String",
      "tabs": {
        "Tab One": ["key", "value"],
        "Tab Two": ["*"],
        "Tab Three": ["booleanArg"]
      }
    };
    $scope.model ={
      "scheme": "http",
      "array1": ["foo", "bar", "cheese"],
      "array2": [
        20,
        13
      ],
      "array3": [
        {
          "Field1": "test1",
          "Field2": "test1",
          "Field3": "value2"
        },
        {
          "Field1": "test2",
          "Field2": "test2",
          "Field3": "value3"
        }, 
        {
          "Field1": "test3",
          "Field2": "test3",
          "Field3": "value1"
        } 
      ]
    };

    $scope.configStr = angular.toJson($scope.config, true);
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

  HawtioFormsTests.WizardController = _module.controller("HawtioFormsTests.WizardController", ["$scope", "$templateCache", function($scope, $templateCache) {
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

  HawtioFormsTests.FormTestController = _module.controller("Forms.FormTestController", ["$scope", function ($scope) {
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

  hawtioPluginLoader.addModule(HawtioFormsTests.pluginName);
})(HawtioFormsTests || (HawtioFormsTests = {}));



