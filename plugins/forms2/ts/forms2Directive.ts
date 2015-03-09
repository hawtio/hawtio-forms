/// <reference path="forms2Plugin.ts"/>
module HawtioForms {
  var directiveName = 'hawtioForm2'
  _module.directive(directiveName, ['$compile', '$templateCache', '$interpolate', 'SchemaRegistry', 'ControlMappingRegistry', ($compile, $templateCache, $interpolate, schemas:SchemaRegistry, mappings) => {
    return {
      restrict: 'A',
      replace: true,
      templateUrl: UrlHelpers.join(templatePath, 'forms2Directive.html'),
      scope: {
        config: '=' + directiveName,
        entity: '=?'
      },
      link: (scope, element, attrs) => {
        scope.$watch('config', () => {
          element.empty();
          var context = {
            postInterpolateActions: {

            },
            maybeHumanize: undefined,
            config: undefined,
            element: element,
            attrs: attrs,
            mappings: mappings,
            schemas: schemas,
            $templateCache: $templateCache,
            $interpolate: $interpolate,
            $compile: $compile,
            directiveName: directiveName
          }
          var config = initConfig(context, _.cloneDeep(scope.config));
          context.config = config;
          context.maybeHumanize = createMaybeHumanize(context);
          if (!scope.entity) {
            scope.entity = {};
          }
          var entity = scope.entity;
          if ('properties' in config) {
            // create our child scope here
            var s = scope.$new();
            s.config = config;
            // s.entity = entity;
            s.maybeHumanize = context.maybeHumanize;

            // These are here to figure out what controls go on which page
            var pages = {}
            var controls = {};
            // log.debug("Config: ", config);
            // log.debug("Entity: ", entity);
            var form = angular.element(getFormMain(context, config));
            var parent = form.find('fieldset');
            if (parent.length === 0) {
              parent = form;
            }
            var singlePage = false;
            if (('wizard' in config) && config.wizard.pages) {
              var wizard = config.wizard;
              var wizardBody = $templateCache.get('wizardParent.html');
              parent.append(wizardBody);
              s.pageIds = [];
              parent = parent.find('.wizardParent');
              _.forIn(wizard, (attr, key) => {
                s[key] = attr;
              });
              if (!('onFinish' in s)) {
                s.onFinish = () => {
                  log.warn("No onFinish() function supplied to form wizard");
                };
              }
              _.forIn(wizard.pages, (pageConfig, id) => {
                if (!('title' in pageConfig)) {
                  pageConfig.title = id;
                }
                pageConfig.el = angular.element($templateCache.get('wizardPage.html'));
                pageConfig.el.attr({
                  'ng-switch-when': id
                });
                pageConfig.el.find('h3').text(id);
                if ('template' in pageConfig) {
                  pageConfig.el.append($compile(pageConfig.template)(scope));
                }
                pageConfig.parent = pageConfig.el.find('.wizardPageBody');
                pages[id] = pageConfig;
                s.pageIds.push(id);
              });
              s.currentPageIndex = 0
              s.gotoPage = (index) => {
                if (index < 0 || index > s.pageIds.length) {
                  return;
                }
                s.currentPageIndex = index;
              }
              s.getCurrentPageId = () => {
                return s.pageIds[s.currentPageIndex];
              };
              s.atFront = () => {
                return s.currentPageIndex === 0;
              }
              s.atBack = () => {
                return s.currentPageIndex === s.pageIds.length - 1;
              }
              s.next = () => {
                s.gotoPage(s.currentPageIndex + 1);
              };
              s.back = () => {
                s.gotoPage(s.currentPageIndex - 1);
              };
            } else if ('tabs' in config) {
              parent.append($templateCache.get('tabElement.html'));
              parent = parent.find('.tabbable');
              var tabs = config.tabs;
              _.forIn(tabs, (tabConfig, id) => {
                var tab = angular.element($templateCache.get('tabPage.html'));
                tab.attr({
                  'title': id
                });
                var tabPage = {
                  controls: tabConfig,
                  el: tab,
                  parent: tab
                }
                pages[id] = tabPage;
              });
            } else if ('controls' in config) {
              pages['$main'] = {
                'controls': config.controls,
                'el': form,
                'parent': parent
              }
              singlePage = true;
            } else {
              pages['$main'] = {
                'controls': ['*'],
                'el': form,
                'parent': parent
              }
              singlePage = true;
            }
            _.forIn(config.properties, (control:FormElement, name:string) => {
              var value = Core.pathGet(control, ['input-attributes', 'value']);
              if (value) {
                entity[name] = value;
              }
              var _default = Core.pathGet(control, ['default']);
              if (_default) {
                entity[name] = _default;
              }
              // log.debug("control: ", control);
              var template = getTemplate(context, config, name, control);
              if (template) {
                template = interpolateTemplate(context, config, name, control, template, 'entity.' + name);
                controls[name] = template;
              }
            });
            /*
            log.debug("pages: ", pages);
            log.debug("controls: ", controls);
            */
            var ids = _.keys(pages);
            var wildcardId:string = undefined;
            ids.forEach((pageId) => {
              var pageConfig = pages[pageId];
              if (pageConfig.controls) {
                pageConfig.controls.forEach((name:string) => {
                  if (name === '*') {
                    if (singlePage) {
                      _.forIn(controls, (control, controlId) => {
                        if (_.any(pageConfig.controls, (id) => id === controlId)) {
                          return;
                        } else {
                          pageConfig.parent.append(control);
                          delete controls[controlId];
                        } 
                      });
                    } else {
                      wildcardId = pageId;
                    }
                  } else {
                    if (name in controls) {
                      pageConfig.parent.append(controls[name]); 
                      delete controls[name];
                    } else {
                      log.debug("Control with name ", name, " not found");
                    }
                  }
                });
              }
            });
            // take care of leftover controls
            if (_.keys(controls).length > 0) {
              if (!wildcardId) {
                wildcardId = _.last(ids);
              }
              _.forIn(controls, (control, controlId) => {
                pages[wildcardId].parent.append(control);
                delete controls[controlId];
              });
            }
            /*
               form.append('<pre>{{entity}}</pre>');
               form.append('<pre>{{config}}</pre>');
             */
            _.forIn(pages, (pageConfig, id) => {
              if (id !== '$main') {
                parent.append(pageConfig.el);
              }
            });
            element.append($compile(form)(s));
          }
        }, true);
      }
    }
  }]);
} 
