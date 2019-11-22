export const data = [
  {
    id: "xyz",
    name: "DEMO CNM",
    schema: {
      type: "object",
      required: ["id"],
      properties: {
        id: {
          type: "string",
          title: "ID",
          ui: {
            "ui:autofocus": true,
            "ui:placeholder": "enter id for the document"
          }
        },
        name: {
          type: "string",
          title: "Name",
          ui: {
            "ui:placeholder": "enter name of the document"
          }
        },
        $template: {
          type: "object",
          title: "Template Renderer",
          ui: {
            classNames: "item-pd-0"
          },
          properties: {
            name: {
              type: "string",
              ui: {
                "ui:placeholder": "Template name to be use by template renderer to determine the template to use"
              }
            },
            type: {
              type: "string",
              default: "EMBEDDED_RENDERER",
              enum: ["EMBEDDED_RENDERER"]
            },
            url: {
              type: "string",
              ui: {
                "ui:placeholder": "URL of a decentralised renderer to render this document"
              }
            }
          },
          required: ["name", "type"]
        },
        issuers: {
          type: "array",
          title: "Issuers of the document",
          minItems: 1,
          ui: {
            "ui:options": {
              orderable: false
            },
            classNames: "item-pd-0"
          },
          items: {
            type: "object",
            properties: {
              name: {
                type: "string"
              },
              documentStore: {
                type: "string",
                pattern: "^0x[a-fA-F0-9]{40}$",
                ui: {
                  "ui:placeholder": "Smart contract address of document store"
                }
              },
              identityProof: {
                type: "object",
                properties: {
                  type: {
                    type: "string",
                    default: "DNS-TXT",
                    enum: ["DNS-TXT"]
                  },
                  location: {
                    type: "string",
                    ui: {
                      "ui:placeholder": "Url of the website referencing to document store"
                    }
                  }
                },
                required: ["type", "location"]
              }
            }
          }
        },
        consignee: {
          type: "object",
          title: "Consignee",
          ui: {
            classNames: "item-pd-0"
          },
          properties: {
            name: {
              type: "string"
            },
            type: {
              type: "string"
            }
          }
        },
        notifyParty: {
          type: "object",
          title: "Notify Party",
          ui: {
            classNames: "item-pd-0"
          },
          properties: {
            name: {
              type: "string"
            }
          }
        },
        shipper: {
          type: "object",
          title: "Shipper",
          ui: {
            classNames: "item-pd-0"
          },
          properties: {
            name: {
              type: "string"
            },
            address: {
              type: "object",
              properties: {
                street: { type: "string" },
                country: { type: "string" }
              }
            }
          }
        },
        vessel: {
          type: "string",
          title: "Vessel"
        },
        voyageNo: {
          type: "number",
          title: "Voyage No"
        },
        portOfLoading: {
          type: "string",
          title: "Port of Loading"
        },
        portOfDischarge: {
          type: "string",
          title: "Port of Discharge"
        },
        placeOfReceipt: {
          type: "string",
          title: "Place of receipt"
        },
        placeOfDelivery: {
          type: "string",
          title: "Place of delivery"
        },
        packages: {
          type: "array",
          title: "Packages",
          ui: {
            "ui:options": {
              orderable: false
            },
            classNames: "item-pd-0"
          },
          items: {
            type: "object",
            properties: {
              description: {
                type: "string"
              },
              weight: {
                type: "number",
                ui: {
                  "ui:help": "in kg"
                }
              },
              measurement: {
                type: "string"
              }
            }
          }
        }
      }
    }
  }
];
