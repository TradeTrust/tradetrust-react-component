export const schema = [
  {
    id: "xyz",
    name: "DEMO CNM",
    schema: {
      type: "object",
      required: ["id"],
      properties: {
        id: {
          type: "string",
          title: "Bill of Lading Number",
          ui: {
            "ui:autofocus": true,
            "ui:placeholder": "Enter Bill of Lading Number for the document"
          }
        },
        name: {
          type: "string",
          title: "Name",
          ui: {
            "ui:placeholder": "Enter name of the document"
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
              title: "Name",
              ui: {
                "ui:placeholder": "Template name to be use by template renderer to determine the template to use"
              }
            },
            type: {
              type: "string",
              title: "Type",
              default: "EMBEDDED_RENDERER",
              enum: ["EMBEDDED_RENDERER"]
            },
            url: {
              type: "string",
              title: "URL",
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
              type: "string",
              title: "Name"
            },
            type: {
              type: "string",
              title: "Type"
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
              type: "string",
              title: "Name"
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
              type: "string",
              title: "Name"
            },
            address: {
              type: "object",
              title: "Address",
              properties: {
                street: {
                  type: "string",
                  title: "Street"
                },
                country: {
                  type: "string",
                  title: "Country"
                }
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

export const data = [
  {
    id: "123",
    name: "Demo Document",
    $template: {
      name: "Demo Template",
      url: "https://demo.com"
    },
    issuers: [
      {
        name: "Govtech",
        documentStore: "0x48399Fb88bcD031C556F53e93F690EEC07963Af3",
        identityProof: {
          type: "DNS-TXT",
          location: "demo-renderer.govtech.com"
        }
      }
    ],
    consignee: {
      name: "Demo Consignee",
      type: "To the owner of"
    },
    notifyParty: {
      name: "Demo Notify"
    },
    shipper: {
      name: "Demo Shipper",
      address: {
        street: "One North",
        country: "Singapore"
      }
    },
    vessel: "1",
    voyageNo: "001",
    portOfLoading: "Singapore Port",
    portOfDischarge: "China Port",
    placeOfReceipt: "Beijing",
    placeOfDelivery: "Singapore",
    packages: [
      {
        description: "Green Apples",
        weight: 20,
        measurement: "100"
      }
    ]
  }
];
