/// <reference path="forms2Plugin.ts"/>
module HawtioForms {
  _module.factory("SchemaRegistry", () => {
    var schemaMap = {};
    var listeners = {};
    function addSchemaInternal(name: string, schema: any):void {
      schemaMap[name] = schema;
      _.forIn(listeners, (listener, id) => {
        listener(name, schema);
      });
    }
    var registry = <SchemaRegistry> {
      addListener: (name: string, callback: (name: string, schema: any) => void) => {
        if (!name || !callback) {
          return;
        }
        _.forIn(schemaMap, (schema, name) => {
          callback(name, schema);
        });
        listeners[name] = callback;
      },
      removeListener: (name: string) => {
        if (name in listeners) {
          delete listeners[name];
        }
      },
      addSchema: (name: string, schema: any):void => {
        // log.debug("Adding schema: ", name, " schema: ", schema);
        addSchemaInternal(name, schema);
        if (schema.javaType) {
          // log.debug("Adding schema by Java type: ", schema.javaType, " value: ", schema);
          addSchemaInternal(schema.javaType, schema);
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
    /*
    registry.addListener('logging', (name: string, schema: any) => {
      log.debug("Added schema name: ", name, " schema: ", schema);
    });
    */
    return registry;
  });
}
