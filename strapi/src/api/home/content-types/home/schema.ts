export default {
  "kind": "singleType",
  "collectionName": "homes",
  "info": {
    "singularName": "home",
    "pluralName": "homes",
    "displayName": "Home",
    "description": "Contenido de la página principal"
  },
  "options": {
    "draftAndPublish": true
  },
  "pluginOptions": {},
  "attributes": {
    "heroGreeting": {
      "type": "string"
    },
    "heroName": {
      "type": "text"
    },
    "heroTitle": {
      "type": "text",
      "required": true
    },
    "heroSubtitle": {
      "type": "text"
    },
    "heroImage": {
      "type": "media",
      "multiple": false,
      "allowedTypes": [
        "images"
      ]
    },
    "trustBadges": {
      "type": "json"
    },
    "stats": {
      "type": "component",
      "repeatable": true,
      "component": "shared.stat"
    },
    "stackItems": {
      "type": "component",
      "repeatable": true,
      "component": "shared.stack-item"
    },
    "aboutTitle": {
      "type": "text"
    },
    "aboutTeaser": {
      "type": "text"
    },
    "ctaTitle": {
      "type": "string"
    },
    "ctaSubtitle": {
      "type": "text"
    },
    "email": {
      "type": "email"
    },
    "linkedin": {
      "type": "string"
    }
  }
} as const;
