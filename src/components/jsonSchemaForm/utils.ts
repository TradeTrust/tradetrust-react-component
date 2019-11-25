export const seperateUiSchema = (obj: any, schemaObj = {}): object => {
  const uiSchema: any = schemaObj;
  Object.keys(obj).forEach(key => {
    if (typeof obj[key] === "object" && obj[key] !== null) {
      uiSchema[key] = {};
      if (obj[key].ui) {
        uiSchema[key] = obj[key].ui;
      }
      if (obj[key].properties) {
        seperateUiSchema(obj[key].properties, uiSchema[key]);
      }
    }
  });
  return uiSchema;
};
