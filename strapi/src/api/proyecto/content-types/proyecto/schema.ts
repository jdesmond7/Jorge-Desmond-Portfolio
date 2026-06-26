export default {
  "kind": "collectionType",
  "collectionName": "proyectos",
  "info": {
    "singularName": "proyecto",
    "pluralName": "proyectos",
    "displayName": "Proyecto",
    "description": "Casos de estudio del portafolio"
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
    "isParent": {
      "type": "boolean",
      "default": false,
      "pluginOptions": {
        "i18n": {
          "localized": false
        }
      }
    },
    "coverImage": {
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
    "title": {
      "type": "string",
      "required": true,
      "pluginOptions": {
        "i18n": {
          "localized": true
        }
      }
    },
    "slug": {
      "type": "uid",
      "targetField": "title",
      "required": true,
      "pluginOptions": {
        "i18n": {
          "localized": false
        }
      }
    },
    "company": {
      "type": "string",
      "required": true,
      "pluginOptions": {
        "i18n": {
          "localized": false
        }
      }
    },
    "year": {
      "type": "string",
      "required": true,
      "pluginOptions": {
        "i18n": {
          "localized": false
        }
      }
    },
    "description": {
      "type": "text",
      "required": true,
      "pluginOptions": {
        "i18n": {
          "localized": true
        }
      }
    },
    "problem": {
      "type": "string",
      "required": true,
      "pluginOptions": {
        "i18n": {
          "localized": true
        }
      }
    },
    "projectSummary": {
      "type": "component",
      "repeatable": false,
      "component": "shared.project-summary",
      "pluginOptions": {
        "i18n": {
          "localized": true
        }
      }
    },
    "metrics": {
      "type": "component",
      "repeatable": true,
      "component": "shared.metric",
      "pluginOptions": {
        "i18n": {
          "localized": true
        }
      }
    },
    "tags": {
      "type": "relation",
      "relation": "manyToMany",
      "target": "api::tag.tag",
      "inversedBy": "proyectos",
      "pluginOptions": {
        "i18n": {
          "localized": false
        }
      }
    },
    "overviewTitle": {
      "type": "string",
      "pluginOptions": {
        "i18n": {
          "localized": true
        }
      },
      "conditions": {
        "visible": {
          "==": [{ "var": "isParent" }, true]
        }
      }
    },
    "overviewBodyText": {
      "type": "text",
      "pluginOptions": {
        "i18n": {
          "localized": true
        }
      },
      "conditions": {
        "visible": {
          "==": [{ "var": "isParent" }, true]
        }
      }
    },
    "challengeTitle": {
      "type": "string",
      "pluginOptions": {
        "i18n": {
          "localized": true
        }
      },
      "conditions": {
        "visible": {
          "==": [{ "var": "isParent" }, true]
        }
      }
    },
    "challengeBodyText": {
      "type": "text",
      "pluginOptions": {
        "i18n": {
          "localized": true
        }
      },
      "conditions": {
        "visible": {
          "==": [{ "var": "isParent" }, true]
        }
      }
    },
    "children": {
      "type": "relation",
      "relation": "oneToMany",
      "target": "api::proyecto.proyecto",
      "mappedBy": "parent",
      "pluginOptions": {
        "i18n": {
          "localized": false
        }
      }
    },
    "parent": {
      "type": "relation",
      "relation": "manyToOne",
      "target": "api::proyecto.proyecto",
      "inversedBy": "children",
      "pluginOptions": {
        "i18n": {
          "localized": false
        }
      },
      "conditions": {
        "visible": {
          "==": [{ "var": "isParent" }, false]
        }
      }
    },
    "gallery": {
      "type": "media",
      "multiple": true,
      "allowedTypes": [
        "images"
      ],
      "pluginOptions": {
        "i18n": {
          "localized": false
        }
      },
      "conditions": {
        "visible": {
          "==": [{ "var": "isParent" }, false]
        }
      }
    },
    "body": {
      "type": "richtext",
      "pluginOptions": {
        "i18n": {
          "localized": true
        }
      },
      "conditions": {
        "visible": {
          "==": [{ "var": "isParent" }, false]
        }
      }
    },
    "learning": {
      "type": "text",
      "pluginOptions": {
        "i18n": {
          "localized": true
        }
      }
    },
    "featured": {
      "type": "boolean",
      "default": false,
      "pluginOptions": {
        "i18n": {
          "localized": false
        }
      }
    },
    "order": {
      "type": "integer",
      "default": 0,
      "pluginOptions": {
        "i18n": {
          "localized": false
        }
      }
    },
    "showInHome": {
      "type": "boolean",
      "default": false,
      "pluginOptions": {
        "i18n": {
          "localized": false
        }
      }
    }
  },
  "config": {
    "layouts": {
      "edit": [
        [
          { "name": "order", "size": 6 },
          { "name": "slug", "size": 6 }
        ],
        [
          { "name": "isParent", "size": 6 },
          { "name": "showInHome", "size": 6 }
        ],
        [
          { "name": "children", "size": 12 }
        ],
        [
          { "name": "year", "size": 4 },
          { "name": "company", "size": 4 },
          { "name": "problem", "size": 4 }
        ],
        [
          { "name": "tags", "size": 12 }
        ],
        [
          { "name": "title", "size": 6 },
          { "name": "description", "size": 6 }
        ],
        [
          { "name": "coverImage", "size": 12 }
        ],
        [
          { "name": "projectSummary", "size": 12 }
        ],
        [
          { "name": "overviewTitle", "size": 4 },
          { "name": "overviewBodyText", "size": 8 }
        ],
        [
          { "name": "challengeTitle", "size": 4 },
          { "name": "challengeBodyText", "size": 8 }
        ],
        [
          { "name": "body", "size": 12 }
        ],
        [
          { "name": "learning", "size": 12 }
        ]
      ]
    },
    "metadatas": {
      "children": {
        "edit": {
          "label": "Linked Proyects"
        }
      },
      "problem": {
        "edit": {
          "label": "ProjectCard Problem Label"
        }
      },
      "title": {
        "edit": {
          "label": "Project Title"
        }
      },
      "description": {
        "edit": {
          "label": "Project Description"
        }
      },
      "coverImage": {
        "edit": {
          "label": "Cover Image"
        }
      },
      "overviewTitle": {
        "edit": {
          "label": "Title Overview"
        }
      },
      "overviewBodyText": {
        "edit": {
          "label": "Body Text Overview"
        }
      },
      "challengeTitle": {
        "edit": {
          "label": "Title Challenge"
        }
      },
      "challengeBodyText": {
        "edit": {
          "label": "Body Text Challenge"
        }
      },
      "learning": {
        "edit": {
          "label": "Aprendizaje"
        }
      },
      "projectSummary": {
        "edit": {
          "label": "Project Summary"
        }
      }
    }
  }
} as const;
