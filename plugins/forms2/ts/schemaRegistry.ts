/// <reference path="forms2Plugin.ts"/>
module HawtioForms {
  _module.factory("SchemaRegistry", () => {
    var schemaMap = {};
    var registry = <SchemaRegistry> {
      addSchema: (name: string, schema: any):void => {
        // log.debug("Adding schema: ", name, " schema: ", schema);
        schemaMap[name] = schema;
        if (schema.javaType) {
          // log.debug("Adding schema by Java type: ", schema.javaType, " value: ", schema);
          schemaMap[schema.javaType] = schema;
        }
        if (schema.definitions) {
          // log.debug("Found definitions in schema: ", name);
          _.forIn(schema.definitions, (value, key) => {
            registry.addSchema(key, value);
          });
        }
      },
      getSchema: (name: string):any => {
        return schemaMap[name];
      },
      cloneSchema: (name: string):FormConfiguration => {
        return _.clone(schemaMap[name], true);
      },
      removeSchema: (name:string):any => {
        var answer = <any> undefined;
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
    return registry;
  });
}
