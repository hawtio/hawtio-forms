declare module Forms {
    class SubmitForm {
        restrict: string;
        scope: boolean;
        link: (scope, element, attrs) => any;
        constructor();
        private doLink(scope, element, attrs);
    }
}
