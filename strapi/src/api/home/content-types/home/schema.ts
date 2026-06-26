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
  "pluginOptions": {
    "i18n": {
      "localized": true
    }
  },
  "attributes": {
    "heroGreeting": {
      "type": "string",
      "pluginOptions": {
        "i18n": {
          "localized": true
        }
      }
    },
    "heroName": {
      "type": "text",
      "pluginOptions": {
        "i18n": {
          "localized": true
        }
      }
    },
    "heroTitle": {
      "type": "text",
      "required": true,
      "pluginOptions": {
        "i18n": {
          "localized": true
        }
      }
    },
    "heroSubtitle": {
      "type": "text",
      "pluginOptions": {
        "i18n": {
          "localized": true
        }
      }
    },
    "heroImage": {
      "type": "media",
      "multiple": false,
      "allowedTypes": [
        "images"
      ],
      "pluginOptions": {
        "i18n": {
          "localized": false
        }
      }
    },
    "trustBadges": {
      "type": "json",
      "pluginOptions": {
        "i18n": {
          "localized": true
        }
      }
    },
    "stats": {
      "type": "component",
      "repeatable": true,
      "component": "shared.stat",
      "pluginOptions": {
        "i18n": {
          "localized": true
        }
      }
    },
    "stackItems": {
      "type": "component",
      "repeatable": true,
      "component": "shared.stack-item",
      "pluginOptions": {
        "i18n": {
          "localized": true
        }
      }
    },
    "aboutTitle": {
      "type": "text",
      "pluginOptions": {
        "i18n": {
          "localized": true
        }
      }
    },
    "aboutTeaser": {
      "type": "text",
      "pluginOptions": {
        "i18n": {
          "localized": true
        }
      }
    },
    "ctaTitle": {
      "type": "string",
      "pluginOptions": {
        "i18n": {
          "localized": true
        }
      }
    },
    "ctaSubtitle": {
      "type": "text",
      "pluginOptions": {
        "i18n": {
          "localized": true
        }
      }
    },
    "email": {
      "type": "email",
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
    }
  }
} as const;
