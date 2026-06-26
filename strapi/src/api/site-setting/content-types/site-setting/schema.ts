export default {
  "kind": "singleType",
  "collectionName": "site_settings",
  "info": {
    "singularName": "site-setting",
    "pluralName": "site-settings",
    "displayName": "Site Settings",
    "description": "Configuración global del sitio"
  },
  "options": {
    "draftAndPublish": false
  },
  "pluginOptions": {
    "i18n": {
      "localized": true
    }
  },
  "attributes": {
    "siteName": {
      "type": "string",
      "required": true,
      "pluginOptions": {
        "i18n": {
          "localized": false
        }
      }
    },
    "email": {
      "type": "email",
      "required": true,
      "pluginOptions": {
        "i18n": {
          "localized": false
        }
      }
    },
    "linkedin": {
      "type": "string",
      "pluginOptions": {
        "i18n": {
          "localized": false
        }
      }
    },
    "instagram": {
      "type": "string",
      "pluginOptions": {
        "i18n": {
          "localized": false
        }
      }
    },
    "navLinks": {
      "type": "component",
      "repeatable": true,
      "component": "shared.nav-link",
      "pluginOptions": {
        "i18n": {
          "localized": true
        }
      }
    },
    "footerText": {
      "type": "string",
      "pluginOptions": {
        "i18n": {
          "localized": true
        }
      }
    },
    "footerHeadline": {
      "type": "string",
      "pluginOptions": {
        "i18n": {
          "localized": true
        }
      }
    }
  }
} as const;
