import { separateUiSchema } from "./utils";
import { schema } from "./sample";

describe("utility test to separate ui schema", () => {
  it("should extract the json structure from the json schema and keep the ui keys", () => {
    const inputJsonSchema = schema[0].properties;
    const expectedResults = {
      id: { "ui:autofocus": true, "ui:placeholder": "Enter Bill of Lading Number for the document" },
      name: { "ui:placeholder": "Enter name of the document" },
      $template: {
        classNames: "item-pd-0",
        name: { "ui:placeholder": "Template name to be use by template renderer to determine the template to use" },
        type: {},
        url: { "ui:placeholder": "URL of a decentralized renderer to render this document" }
      },
      issuers: {
        "ui:options": { orderable: false },
        classNames: "item-pd-0",
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
      consignee: { classNames: "item-pd-0", name: {}, type: {} },
      notifyParty: { classNames: "item-pd-0", name: {} },
      shipper: { classNames: "item-pd-0", name: {}, address: { street: {}, country: {} } },
      vessel: {},
      voyageNo: {},
      portOfLoading: {},
      portOfDischarge: {},
      placeOfReceipt: {},
      placeOfDelivery: {},
      packages: {
        "ui:options": { orderable: false },
        classNames: "item-pd-0",
        items: {
          description: {},
          measurement: {},
          weight: { "ui:help": "In kilograms (kg)" }
        }
      }
    };
    const results = separateUiSchema(inputJsonSchema);
    expect(results).toStrictEqual(expectedResults);
  });

  it("should work correctly with empty objects", () => {
    const inputJsonSchema = {
      id: {}
    };

    const expectedResults = {
      id: {}
    };

    const results = separateUiSchema(inputJsonSchema);
    expect(results).toStrictEqual(expectedResults);
  });

  it("should work correctly with array of strings at root level", () => {
    const inputJsonSchema = {
      type: "array",
      minItems: 2,
      title: "A multiple-choice list",
      items: {
        type: "string",
        enum: ["foo", "bar", "fuzz", "qux"]
      },
      uniqueItems: true,
      ui: {
        "ui:widget": "checkboxes",
        "ui:options": {
          inline: true
        }
      }
    };

    const expectedResults = {
      items: {},
      ui: {}
    };

    const results = separateUiSchema(inputJsonSchema);
    expect(results).toStrictEqual(expectedResults);
  });

  it("should work with array of strings", () => {
    const inputJsonSchema = {
      bar: {
        type: "array",
        items: {
          type: "string",
          enum: ["foo", "bar"]
        },
        ui: {
          "ui:widget": "checkboxes"
        }
      }
    };

    const expectedResults = {
      bar: {
        items: {},
        "ui:widget": "checkboxes"
      }
    };

    const results = separateUiSchema(inputJsonSchema);
    expect(results).toStrictEqual(expectedResults);
  });

  it("should work correctly with array of objects", () => {
    const inputJsonSchema = {
      items: {
        type: "object",
        properties: {
          bar: "type: string",
          qux: {
            type: "string",
            ui: {
              classNames: "bananas"
            }
          }
        }
      }
    };

    const expectedResults = {
      items: {
        qux: {
          classNames: "bananas"
        }
      }
    };

    const results = separateUiSchema(inputJsonSchema);
    expect(results).toStrictEqual(expectedResults);
  });

  it("should work when there are no ui keys", () => {
    const inputJsonSchema = {
      id: {
        type: "string",
        title: "ID"
      }
    };

    const expectedResults = {
      id: {}
    };

    const results = separateUiSchema(inputJsonSchema);
    expect(results).toStrictEqual(expectedResults);
  });

  it("should work when there is a sibling with no ui key", () => {
    const inputJsonSchema = {
      id: {
        type: "string",
        title: "ID"
      },
      name: {
        type: "string",
        ui: {
          "ui:placeholder": "bar"
        }
      }
    };

    const expectedResults = {
      id: {},
      name: {
        "ui:placeholder": "bar"
      }
    };

    const results = separateUiSchema(inputJsonSchema);
    expect(results).toStrictEqual(expectedResults);
  });

  it("should work when there is a fixed item array", () => {
    const inputJsonSchema = {
      fixedItemsList: {
        type: "array",
        title: "A list of fixed items",
        items: [
          {
            title: "A string value",
            type: "string",
            default: "lorem ipsum",
            ui: {
              "ui:widget": "textarea"
            }
          },
          {
            title: "a boolean value",
            type: "boolean"
          },
          {
            title: "a boolean value",
            type: "boolean",
            ui: {
              "ui:widget": "select"
            }
          },
          {
            title: "a boolean value",
            type: "object",
            properties: {
              name: {
                type: "string",
                ui: {
                  "ui:placeholder": "demo to test"
                }
              }
            },
            ui: {
              "ui:placeholder": "select demo"
            }
          }
        ]
      }
    };

    const expectedResults = {
      fixedItemsList: {
        items: [
          {
            "ui:widget": "textarea"
          },
          {},
          {
            "ui:widget": "select"
          },
          {
            "ui:placeholder": "select demo",
            name: {
              "ui:placeholder": "demo to test"
            }
          }
        ]
      }
    };

    const results = separateUiSchema(inputJsonSchema);
    expect(results).toStrictEqual(expectedResults);
  });

  it("should work when there is a nested array", () => {
    const inputJsonSchema = {
      nestedArray: {
        type: "array",
        title: "A list of fixed items",
        items: {
          type: "array",
          title: "second array list",
          items: {
            type: "object",
            properties: {
              name: {
                type: "string",
                ui: {
                  "ui:placeholder": "dummy text"
                }
              }
            }
          }
        }
      }
    };

    const expectedResults = {
      nestedArray: {
        items: {
          items: {
            name: {
              "ui:placeholder": "dummy text"
            }
          }
        }
      }
    };

    const results = separateUiSchema(inputJsonSchema);
    expect(results).toStrictEqual(expectedResults);
  });
});
