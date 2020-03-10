# Util separateUiSchema

Takes two params 
    - nestedObj: object of value schema combined with ui schema 
    - uiSchemaObj: ui schema object

the structure of the nestedObj should be like this 

Example 1 - when only objects type properties are there 

```
{
    $id: "abc"
    name: "abc",
    type: "object",
    required: [""],
    properties: { 
        id: {
            type: "string", 
            title: "Bill of Lading Number",
            ui: {
                "ui:autofocus": true,
                "ui:placeholder": "Enter Bill of Lading Number for the document"
            }
        },
    }
}
```


Example 2 - Nested object

```
{
    $id: "abc"
    name: "abc",
    type: "object",
    required: [""],
    properties: { 
        id: {
            type: "object", 
            title: "Bill of Lading Number",
            ui: {
                "ui:autofocus": true,
                "ui:placeholder": "Enter Bill of Lading Number for the document"
            },
            properties: {
                name: {
                    type: "string",
                    title: "Name",
                    ui: {
                        "ui:placeholder": "Name of the field"
                    }
                }
            }
        },
    }
}
```


Example 3 - With array of objects. it will add the ui with Add button.
put type as an array and instead of key `properties` use key `items`.

```
{
    $id: "abc"
    name: "abc",
    type: "object",
    required: [""],
    properties: { 
        id: {
            type: "array", //type is array here 
            title: "Bill of Lading Number",
            ui: {
            "ui:options": {
                orderable: false
            },
            "ui:placeholder": "Enter Bill of Lading Number for the document"
            },
            items: { // for array 
                type: "object",
                properties: {
                    name: {
                        type: "string",
                        title: "Name",
                        ui: {
                            "ui:placeholder": "Name of the field"
                        }
                    }
                } 
            }
        },
    }
}
```