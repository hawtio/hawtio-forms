declare module Forms {
    class SubmitForm {
        restrict: string;
        scope: boolean;
        link: (scope: any, element: any, attrs: any) => any;
        constructor();
        private doLink(scope, element, attrs);
    }
}
