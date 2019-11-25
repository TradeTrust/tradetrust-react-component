import React, { useState, ReactElement } from "react";
import JsonForm from "react-jsonschema-form";
import { seperateUiSchema } from "./utils";
import "bootstrap/dist/css/bootstrap.min.css";
import "./index.css";

interface JsonFormProps {
  formData?: object[];
  formSchema: object[];
  onSubmit: ({ data }: any) => void;
}

export const JsonSchemaForm = (props: JsonFormProps): ReactElement => {
  const [activeTab, setActiveTab] = useState(0);
  const jsonFormRef: any = [];
  const onSubmit = ({ formData }: any): void => props.onSubmit(formData);

  const renderTabBar = ({ formSchema}: {formSchema: object[]} ): ReactElement => (
    <nav>
      <div className="nav nav-tabs">
        {formSchema.map((form: any, idx: number) => (
          <a
            key={idx}
            className={`nav-item nav-link ${activeTab === idx ? "active" : ""}`}
            onClick={() => setActiveTab(idx)}
          >
            {form.name}
          </a>
        ))}
      </div>
    </nav>
  );

  const renderJsonForm = ({ formSchema, formData = []}: {formSchema: object[], formData?: object[]}): ReactElement => (
    <>
      {formSchema.map((form: any, idx: number) => {
        const uiSchema = seperateUiSchema(form.schema.properties);
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
              formData={[{id: 123}]}
              ref={jf => {
                jsonFormRef[idx] = jf;
              }}
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
