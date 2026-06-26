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
  "pluginOptions": {
    "i18n": {
      "localized": true
    }
  },
  "attributes": {
    "title": {
      "type": "string",
      "required": true,
      "pluginOptions": {
        "i18n": {
          "localized": true
        }
      }
    },
    "body": {
      "type": "richtext",
      "required": true,
      "pluginOptions": {
        "i18n": {
          "localized": true
        }
      }
    },
    "heroImage": {
      "type": "string",
      "pluginOptions": {
        "i18n": {
          "localized": false
        }
      }
    },
    "images": {
      "type": "json",
      "pluginOptions": {
        "i18n": {
          "localized": false
        }
      }
    }
  }
} as const;
