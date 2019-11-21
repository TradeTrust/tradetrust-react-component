import React from "react";
import JsonSchemaForm from "./jsonSchemaForm";
import { render, fireEvent } from "@testing-library/react";
import {data} from "./sample";

describe("counter component", () => {
  it("should increment counter by 1 when clicking on increment button", () => {
    const { getByText } = render(<JsonSchemaForm formData={data} />);
    expect(getByText("JsonSchemaForm: 0")).toBeDefined();
    fireEvent.click(getByText(/increment/i));
    expect(getByText("JsonSchemaForm: 1")).toBeDefined();
  });
});
