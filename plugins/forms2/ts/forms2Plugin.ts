/// <reference path="forms2Helpers.ts"/>
module HawtioForms {

  export var _module = angular.module(pluginName, []);

  _module.run(() => {
    log.debug("loaded");
  });

  hawtioPluginLoader.addModule(pluginName);
}
