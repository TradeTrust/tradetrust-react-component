import { seperateUiSchema } from "./utils";
import { schema } from "./sample";

describe("utility test to seperate ui schema", () => {
  it("test with sample json schema", () => {
    const expectedOutput = {
      id: { "ui:autofocus": true, "ui:placeholder": "enter id for the document" },
      name: { "ui:placeholder": "enter name of the document" },
      $template: {
        classNames: "item-pd-0",
        name: { "ui:placeholder": "Template name to be use by template renderer to determine the template to use" },
        type: {},
        url: { "ui:placeholder": "URL of a decentralised renderer to render this document" }
      },
      issuers: { "ui:options": { orderable: false }, classNames: "item-pd-0" },
      consignee: { classNames: "item-pd-0", name: {}, type: {} },
      notifyParty: { classNames: "item-pd-0", name: {} },
      shipper: { classNames: "item-pd-0", name: {}, address: { street: {}, country: {} } },
      vessel: {},
      voyageNo: {},
      portOfLoading: {},
      portOfDischarge: {},
      placeOfReceipt: {},
      placeOfDelivery: {},
      packages: { "ui:options": { orderable: false }, classNames: "item-pd-0" }
    };
    const out = seperateUiSchema(schema[0].schema.properties);
    expect(out).toStrictEqual(expectedOutput);
  });

  it("should seperate ui schema when nested objects are there", () => {
    const input = [
      {
        schema: {
          properties: {
            demo: {
              type: "object",
              properties: {
                type: {
                  type: "object",
                  properties: {
                    name: {
                      type: "object",
                      properties: {
                        shipment: {
                          type: "object",
                          ui: {
                            "ui:placeholder": "demo to test nested ui seperation"
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    ];
    const expectedOutput = {
      demo: {
        type: {
          name: {
            shipment: { "ui:placeholder": "demo to test nested ui seperation" }
          }
        }
      }
    };
    const out = seperateUiSchema(input[0].schema.properties);
    expect(out).toStrictEqual(expectedOutput);
  });
});
