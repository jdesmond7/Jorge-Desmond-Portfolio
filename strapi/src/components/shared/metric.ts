export default {
  "collectionName": "components_shared_metrics",
  "info": {
    "displayName": "Métrica",
    "icon": "chartCircle",
    "description": "Métrica con valor, título y descripción breve"
  },
  "options": {},
  "attributes": {
    "value": {
      "type": "string",
      "required": true
    },
    "title": {
      "type": "string",
      "required": true
    },
    "description": {
      "type": "text"
    }
  }
} as const;
