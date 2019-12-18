import React, { useState, ReactElement } from "react";
import JsonForm, { FormProps, UiSchema } from "react-jsonschema-form";
import { seperateUiSchema } from "./utils";
import "bootstrap/dist/css/bootstrap.min.css";
import "./index.css";

type JsonSchema = FormProps<any>["schema"];

export interface CustomJsonSchema extends JsonSchema {
  name: string;
  properties: {
    [k: string]: JsonSchema;
  };
}

interface JsonFormProps<T> {
  formData?: Array<T>;
  formSchema: Array<CustomJsonSchema>;
  onSelectTab?: (index: number) => void;
  onSubmit: (formData: T) => void;
}

export function JsonSchemaForm<T>(props: JsonFormProps<T>): ReactElement {
  const [activeTab, setActiveTab] = useState(0);
  const jsonFormRef: Array<JsonForm<T>> = [];
  const onFormSubmit = ({ formData }: { formData: T }): void => props.onSubmit(formData);

  const renderTabBar = ({ formSchema }: { formSchema: Array<CustomJsonSchema> }): ReactElement => (
    <nav>
      <div className="nav nav-tabs">
        {formSchema.map((form: CustomJsonSchema, idx: number) => (
          <a
            key={idx}
            className={`nav-item nav-link ${activeTab === idx ? "active" : ""}`}
            onClick={() => {
              props.onSelectTab?.(idx);
              setActiveTab(idx);
            }}
          >
            {form.name}
          </a>
        ))}
      </div>
    </nav>
  );

  const renderJsonForm = ({
    formSchema,
    formData = []
  }: {
    formSchema: Array<CustomJsonSchema>;
    formData?: Array<T>;
  }): ReactElement => (
    <>
      {formSchema.map((form: CustomJsonSchema, idx: number) => {
        const uiSchema: UiSchema = seperateUiSchema(form.properties);
        return (
          <div
            key={form.$id}
            id={form.$id}
            className={`tab-pane p-3 bg-white ${activeTab === idx ? "d-block active" : "d-none"}`}
          >
            <JsonForm
              schema={form}
              uiSchema={uiSchema}
              onSubmit={onFormSubmit}
              formData={formData[idx]}
              ref={(jfRef: JsonForm<T>) => (jsonFormRef[idx] = jfRef)}
            >
              <div className="text-center">
                <button type="button" className="btn btn-primary w-50" onClick={() => jsonFormRef[idx].submit()}>
                  Issue Document
                </button>
              </div>
            </JsonForm>
          </div>
        );
      })}
    </>
  );

  return (
    <>
      {renderTabBar(props)}
      {renderJsonForm(props)}
    </>
  );
}
