import { UiSchema } from "react-jsonschema-form";

interface NestedObject {
  [key: string]: any; // Add index signature
}

export const seperateUiSchema = (nestedObj: NestedObject, uiSchemaObj: UiSchema = {}): UiSchema => {
  const uiSchema: UiSchema = uiSchemaObj;
  Object.keys(nestedObj).forEach((key: string) => {
    if (typeof nestedObj[key] === "object" && nestedObj[key] !== null) {
      uiSchema[key] = {};
      if (nestedObj[key].ui) {
        uiSchema[key] = nestedObj[key].ui;
      }
      if (nestedObj[key].items) {
        uiSchema[key].items = {};
        seperateUiSchema(nestedObj[key].items.properties, uiSchema[key].items);
      }
      if (nestedObj[key].properties) {
        seperateUiSchema(nestedObj[key].properties, uiSchema[key]);
      }
    }
  });
  return uiSchema;
};
