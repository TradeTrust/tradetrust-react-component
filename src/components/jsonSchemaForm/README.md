# Util separateUiSchema

Takes two params 

    - nestedObj: object of value schema combined with ui schema. it should contain one of the key `properties`, `items` or `ui`.
    - uiSchemaObj: ui schema object. this object will be constructed with the util. 

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


Example 4 - With array properties 

```
{
    $id: "abc"
    name: "abc",
    type: "object",
    required: [""],
    properties: { 
        id: {
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
                }]
        }
    }
}
```


Example 5 - Nested Array 

```
{
    $id: "abc"
    name: "abc",
    type: "object",
    required: [""],
    properties: { 
        id: {
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
    }
}
```
