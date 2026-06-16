export default {
  "collectionName": "components_shared_stack_items",
  "info": {
    "displayName": "Stack Item",
    "icon": "layer"
  },
  "options": {},
  "attributes": {
    "number": {
      "type": "string",
      "required": true
    },
    "name": {
      "type": "string",
      "required": true
    },
    "items": {
      "type": "string",
      "required": true
    },
    "isToday": {
      "type": "boolean",
      "default": false
    }
  }
} as const;
