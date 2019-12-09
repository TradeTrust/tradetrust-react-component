export const seperateUiSchema = (nestedObj: any, uiSchemaObj = {}): object => {
  const uiSchema: any = uiSchemaObj;
  Object.keys(nestedObj).forEach(key => {
    if (typeof nestedObj[key] === "object" && nestedObj[key] !== null) {
      uiSchema[key] = {};
      if (nestedObj[key].ui) {
        uiSchema[key] = nestedObj[key].ui;
      }
      if (nestedObj[key].properties) {
        seperateUiSchema(nestedObj[key].properties, uiSchema[key]);
      }
    }
  });
  return uiSchema;
};
