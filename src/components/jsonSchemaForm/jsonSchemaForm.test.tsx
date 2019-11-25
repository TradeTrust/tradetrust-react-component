import React from "react";
import { JsonSchemaForm } from "./";
import { render, fireEvent, queryByAttribute } from "@testing-library/react";
import { schema } from "./sample";

const getById = queryByAttribute.bind(null, "id");
const onSubmit = (formdata: any): any => formdata;

describe("jsonSchemaForm component", () => {
  /* eslint jest/no-hooks: ["error", { "allow": ["beforeEach"] }] */
  beforeEach(() => {
    jest.spyOn(console, "error").mockImplementation(() => {});
  });
  it("should render the form correctly", () => {
    const formSubmit = jest.fn();
    const { getByText } = render(<JsonSchemaForm formSchema={schema} onSubmit={formSubmit} />);
    expect(getByText("Template Renderer")).toBeDefined();
    expect(getByText("Packages")).toBeDefined();
  });

  it("should call the onsubmit function on issue button click", () => {
    const formSubmit = jest.fn();
    const { getByText, container } = render(<JsonSchemaForm formSchema={schema} onSubmit={formSubmit} />);
    expect(getByText("Template Renderer")).toBeDefined();
    expect(getByText("Packages")).toBeDefined();
    const idInput: any = getById(container, "root_id");
    const templateName: any = getById(container, "root_$template_name");
    const identityLocation: any = getById(container, "root_issuers_0_identityProof_location");
    fireEvent.change(idInput, { target: { value: "23" } });
    fireEvent.change(templateName, { target: { value: "Demo" } });
    fireEvent.change(identityLocation, { target: { value: "abc.com" } });
    fireEvent.click(getByText(/Issue Document/i));

    expect(formSubmit).toHaveBeenCalledTimes(1);
  });

  it("should throw error when submit form without required fields", () => {
    const { getByText } = render(<JsonSchemaForm formSchema={schema} onSubmit={formData => onSubmit(formData)} />);
    expect(getByText("Template Renderer")).toBeDefined();
    expect(getByText("Packages")).toBeDefined();
    fireEvent.click(getByText(/Issue Document/i));
    expect(getByText(".id is a required property")).toBeDefined();
    expect(getByText(".$template.name is a required property")).toBeDefined();
    expect(getByText(".issuers[0].identityProof.location is a required property")).toBeDefined();
  });
});
