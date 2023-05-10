export default {
    schema: {
        title: "Define channel group settings",
        type: "object",
        properties: {
            channels: {
                type: "array",
                items: {
                    type: "object",
                    properties: {
                        name: {
                            type: "string",
                            title: "Channel name"
                        },
                        condition: {
                            type: "string",
                            title: "Condition"
                        }
                    }
                }
            }
        }
    },
    formData: {
        channels:
            [
                {
                    name: "Group A",
                    condition: "app_id = 'conversion'",
                }]
    }
}