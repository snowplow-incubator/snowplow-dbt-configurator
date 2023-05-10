export default {
    schema: {
        "title": "Define channel group settings",
        "type": "object",
        "properties": {
            "type": "object",
            "channels": {
                "type": "array",
                "items": {
                    "type": "object",
                    "properties": {
                        "name": {
                            "type": "string",
                            "title": "Channel name"
                        },
                        "conditions": {
                            "type": "object"
                        }
                    }
                }
            }
        }
    }
}