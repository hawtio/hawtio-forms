/// <reference path="forms2Plugin.ts"/>
module HawtioForms {

    _module.directive('hawtioCombobox', [() => {
      return {
        restrict: 'A',
        link: (scope, element, attrs) => {
          scope.$watch(_.debounce(() => {
            if (element.prop('disabled')) {
              return;
            }
            if (element.children().length > 5) {
              (<any>element).combobox();
            }
          }, 100, { trailing: true }));
        }
      }
    }]);
  }
