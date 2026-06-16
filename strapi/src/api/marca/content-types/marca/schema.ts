export default {
  "kind": "collectionType",
  "collectionName": "marcas",
  "info": {
    "singularName": "marca",
    "pluralName": "marcas",
    "displayName": "Marca",
    "description": "Marcas para el marquee del home"
  },
  "options": {
    "draftAndPublish": true
  },
  "pluginOptions": {},
  "attributes": {
    "name": {
      "type": "string",
      "required": true
    },
    "order": {
      "type": "integer",
      "default": 0
    },
    "logo": {
      "type": "media",
      "multiple": false,
      "allowedTypes": [
        "images"
      ]
    }
  }
} as const;
