export default {
    schema: {
        type: "object",
        required: ["name"],
        properties: {
            snowplow__conversion_events: {
                type: "array",
                title: "Conversions",
                items: {
                    type: "object",
                    properties: {
                        name: {
                            type: "string",
                            title: "Name*",
                            default: "checkout"
                        },
                        condition: {
                            title: "Conversion criteria",
                            oneOf: [
                                {
                                    type: "string",
                                    title: "Event name",
                                    description: "Name of the Snowplow self-describing event"
                                },
                                {
                                    type: "string",
                                    title: "Conditional expression",
                                    description: "Conditional expression for the conversion, e.g., app_id = 'conversion'"
                                }
                            ],
                            default: "app_id = 'conversion'"
                        },
                        value: {
                            type: "string",
                            title: "Value",
                            description: "The field name or sql to select the value associated with the conversion",
                            default: "SQL value e.g. tr_total_base"
                        },
                        default_value: {
                            type: "string",
                            title: "Default Value",
                            description: "The default value to use when a conversion is identified but the value returned is null",
                            default: "1"

                        },
                        list_events: {
                            title: "Whether to list events or not",
                            type: "boolean"
                        },
                        counting_mode: {
                            type: "string",
                            enum: [
                                "once per event",
                                "once per session"
                            ],
                            title: "Conversion counting mode"
                        },
                        enabled: {
                            "type": "boolean",
                            "title": "Enable conversion"
                        }
                    }
                }
            }
        }
    },
    formData: {
        snowplow__conversion_events:
            [
                {
                    name: "checkout",
                    condition: "app_id = 'conversion'",
                    value: "tr_total_base",
                    default_value: "1",
                }]
    }
}
