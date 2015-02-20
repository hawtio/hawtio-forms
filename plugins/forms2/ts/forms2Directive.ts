/// <reference path="forms2Plugin.ts"/>
module HawtioForms {
  var directiveName = 'hawtioForm'
  _module.directive(directiveName, [() => {
    return {
      restrict: 'A',
      scope: {
        config: '=' + directiveName,
        entity: '='
      },
      link: (scope, element, attrs) => {
        scope.config = createFormConfiguration(scope.config);
        log.debug("form configuration: ", scope.config);

      }
    }
  }]);
} 
