/// <reference path="editorGlobals.ts"/>
/// <reference path="CodeEditor.ts"/>
module HawtioEditor {

  export var _module = angular.module(pluginName, []);

  _module.run(() => {
    log.debug("loaded");
  });

  hawtioPluginLoader.addModule(pluginName);
}
