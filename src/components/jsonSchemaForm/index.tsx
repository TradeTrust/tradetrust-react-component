import React, { useState, ReactElement } from "react";
import JsonForm, { FormProps, UiSchema } from "react-jsonschema-form";
import { seperateUiSchema } from "./utils";
import "bootstrap/dist/css/bootstrap.min.css";
import "./index.css";

type JsonDataType = FormProps<undefined>["formData"];
type JsonSchemaType = FormProps<JsonDataType>["schema"];

interface Form extends JsonSchemaType {
  [key: string]: any; // Add index signature
}

interface JsonFormProps {
  formData?: Array<JsonDataType>;
  formSchema: Array<JsonSchemaType>;
  onSelectTab?: (index: number) => void;
  onSubmit: (formData: JsonDataType) => void;
}

export const JsonSchemaForm = (props: JsonFormProps): ReactElement => {
  const [activeTab, setActiveTab] = useState(0);
  const jsonFormRef: Array<JsonForm<undefined>> = [];
  const onSubmit = ({ formData }: { formData: JsonDataType }): void => props.onSubmit(formData);

  const renderTabBar = ({ formSchema }: { formSchema: Array<JsonSchemaType> }): ReactElement => (
    <nav>
      <div className="nav nav-tabs">
        {formSchema.map((form: Form, idx: number) => (
          <a
            key={idx}
            className={`nav-item nav-link ${activeTab === idx ? "active" : ""}`}
            onClick={() => {
              if (props.onSelectTab) props.onSelectTab(idx);
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
    formSchema: Array<JsonSchemaType>;
    formData?: Array<JsonDataType>;
  }): ReactElement => (
    <>
      {formSchema.map((form: Form, idx: number) => {
        const uiSchema: UiSchema = seperateUiSchema(form["schema"].properties);
        return (
          <div
            key={form.id}
            id={form.id}
            className={`tab-pane p-3 bg-white ${activeTab === idx ? "d-block active" : "d-none"}`}
          >
            <JsonForm
              schema={form.schema}
              uiSchema={uiSchema}
              onSubmit={onSubmit}
              formData={formData[idx]}
              ref={(jfRef: JsonForm<undefined>) => (jsonFormRef[idx] = jfRef)}
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
};
