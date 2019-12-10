import { UiSchema } from "react-jsonschema-form";

export const seperateUiSchema = (nestedObj: object, uiSchemaObj: UiSchema = {}): UiSchema => {
  const uiSchema: UiSchema = uiSchemaObj;
  Object.keys(nestedObj).forEach(key => {
    if (typeof nestedObj[key] === "object" && nestedObj[key] !== null) {
      uiSchema[key] = {};
      if (nestedObj[key].ui) {
        uiSchema[key] = nestedObj[key].ui;
      }
      const nestedKeys =
        nestedObj[key].properties || (nestedObj[key].items ? nestedObj[key].items.properties : undefined);
      if (nestedKeys) {
        seperateUiSchema(nestedKeys, uiSchema[key]);
      }
    }
  });
  return uiSchema;
};
