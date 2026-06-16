export default {
  "kind": "collectionType",
  "collectionName": "ilustraciones",
  "info": {
    "singularName": "ilustracion",
    "pluralName": "ilustraciones",
    "displayName": "Ilustracion",
    "description": "Galería de ilustraciones"
  },
  "options": {
    "draftAndPublish": true
  },
  "pluginOptions": {},
  "attributes": {
    "title": {
      "type": "string",
      "required": true
    },
    "slug": {
      "type": "uid",
      "targetField": "title",
      "required": true
    },
    "description": {
      "type": "text"
    },
    "image": {
      "type": "media",
      "multiple": false,
      "allowedTypes": [
        "images"
      ],
      "required": true
    },
    "year": {
      "type": "string"
    },
    "tags": {
      "type": "json"
    },
    "order": {
      "type": "integer",
      "default": 0
    }
  }
} as const;
