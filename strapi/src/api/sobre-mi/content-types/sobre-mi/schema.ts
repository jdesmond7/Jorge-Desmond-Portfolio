export default {
  "kind": "singleType",
  "collectionName": "sobre_mis",
  "info": {
    "singularName": "sobre-mi",
    "pluralName": "sobre-mis",
    "displayName": "Sobre Mi",
    "description": "Página sobre mí"
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
    "body": {
      "type": "richtext",
      "required": true
    },
    "heroImage": {
      "type": "string"
    },
    "images": {
      "type": "json"
    }
  }
} as const;
