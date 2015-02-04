declare module Forms {
    class ResetForm {
        restrict: string;
        scope: boolean;
        link: (scope, element, attrs) => any;
        constructor();
        private doLink(scope, element, attrs);
    }
}
