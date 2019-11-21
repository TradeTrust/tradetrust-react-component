import React, { useState } from "react";
import JsonForm from "react-jsonschema-form";
import "./index.css";
import "bootstrap/dist/css/bootstrap.min.css";

export const seperateUiSchema = (obj: any, schemaObj = {}) => {
  let uiSchema: any = schemaObj;
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

const JsonSchemaForm = (props:any) => {
  const [activeTab, setActiveTab] = useState(0);
  const jsonFormRef:any = [];
  const onSubmit = ({ formData }: any) => console.log("Data submitted: ", formData);

  const renderTabBar = (jsonForms: any) => (
    <nav>
      <div className="nav nav-tabs">
        {jsonForms.map((form: any, idx: number) => (
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

  const renderJsonForm = (jsonForms: any) => (
    <>
      {jsonForms.map((form: any, idx: number) => {
        const uiSchema = seperateUiSchema(form.schema.properties);
        return (
          <div
            key={form.id}
            id={form.id}
            className={`tab-pane p-3 bg-white ${
              activeTab === idx ? "d-block active" : "d-none"
            }`}
          >
            <JsonForm
              schema={form.schema}
              uiSchema={uiSchema}
              onSubmit={onSubmit}
              ref={jf => {
                jsonFormRef[idx] = jf;
              }}
            >
              <div className="text-center">
                <button
                  type="button"
                  className="btn btn-primary w-50"
                  onClick={() => jsonFormRef[idx].submit()}
                >
                  Issue
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
      {renderTabBar(props.formData)}
      {renderJsonForm(props.formData)}
    </>
  );
};

export default JsonSchemaForm;
