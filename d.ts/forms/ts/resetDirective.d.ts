declare module Forms {
    class ResetForm {
        restrict: string;
        scope: boolean;
        link: (scope: any, element: any, attrs: any) => any;
        constructor();
        private doLink(scope, element, attrs);
    }
}
