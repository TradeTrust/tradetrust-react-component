import { seperateUiSchema } from "./utils";
import { schema } from "./sample";
import { merge } from "lodash";

const outputWithLessKeys = {
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

describe("utility test to seperate ui schema", () => {
  it("should seperate ui schema and should not equal to output with less keys ", () => {
    const out = seperateUiSchema(schema[0].schema.properties);
    expect(out).not.toStrictEqual(outputWithLessKeys);
  });

  it("should seperate ui schema with expected output when array items are there", () => {
    const expectedOutput = merge(outputWithLessKeys, {
      issuers: {
        items: {
          documentStore: {
            "ui:placeholder": "Smart contract address of document store"
          },
          identityProof: {
            location: {
              "ui:placeholder": "Url of the website referencing to document store"
            },
            type: {}
          },
          name: {}
        }
      },
      packages: {
        items: {
          description: {},
          measurement: {},
          weight: { "ui:help": "in kg" }
        }
      }
    });
    const out = seperateUiSchema(schema[0].schema.properties);
    expect(out).toStrictEqual(expectedOutput);
  });
});
