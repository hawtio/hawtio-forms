/// <reference path="forms2Plugin.ts"/>
module HawtioForms {
  _module.factory("SchemaRegistry", () => {
    var schemaMap = {};
    return <SchemaRegistry> {
      addSchema: (name: string, schema: FormConfiguration):void => {
        schemaMap[name] = schema;
      },
      getSchema: (name: string):FormConfiguration => {
        return schemaMap[name];
      },
      cloneSchema: (name: string):FormConfiguration => {
        return _.clone(schemaMap[name], true);
      },
      removeSchema: (name:string):FormConfiguration => {
        var answer = <FormConfiguration> undefined;
        if (name in schemaMap) {
          answer = schemaMap[name];
          delete schemaMap[name];
        }
        return answer;
      },
      iterate: (iter:(FormConfiguration, string) => void) => {
        _.forIn(schemaMap, iter);
      }
    };
  });
}
