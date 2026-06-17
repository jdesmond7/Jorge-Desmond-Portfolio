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
  "pluginOptions": {},
  "attributes": {
    "isParent": {
      "type": "boolean",
      "default": false
    },
    "coverImage": {
      "type": "media",
      "multiple": false,
      "allowedTypes": [
        "images"
      ]
    },
    "title": {
      "type": "string",
      "required": true
    },
    "slug": {
      "type": "uid",
      "targetField": "title",
      "required": true
    },
    "company": {
      "type": "string",
      "required": true
    },
    "year": {
      "type": "string",
      "required": true
    },
    "description": {
      "type": "text",
      "required": true
    },
    "problem": {
      "type": "string",
      "required": true
    },
    "metrics": {
      "type": "component",
      "repeatable": true,
      "component": "shared.metric"
    },
    "tags": {
      "type": "relation",
      "relation": "manyToMany",
      "target": "api::tag.tag",
      "inversedBy": "proyectos"
    },
    "overviewTitle": {
      "type": "string",
      "conditions": {
        "visible": {
          "==": [{ "var": "isParent" }, true]
        }
      }
    },
    "overviewBodyText": {
      "type": "text",
      "conditions": {
        "visible": {
          "==": [{ "var": "isParent" }, true]
        }
      }
    },
    "challengeTitle": {
      "type": "string",
      "conditions": {
        "visible": {
          "==": [{ "var": "isParent" }, true]
        }
      }
    },
    "challengeBodyText": {
      "type": "text",
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
      "conditions": {
        "visible": {
          "==": [{ "var": "isParent" }, true]
        }
      }
    },
    "parent": {
      "type": "relation",
      "relation": "manyToOne",
      "target": "api::proyecto.proyecto",
      "inversedBy": "children",
      "conditions": {
        "visible": {
          "==": [{ "var": "isParent" }, false]
        }
      }
    },
    "roles": {
      "type": "json",
      "conditions": {
        "visible": {
          "==": [{ "var": "isParent" }, false]
        }
      }
    },
    "team": {
      "type": "json",
      "conditions": {
        "visible": {
          "==": [{ "var": "isParent" }, false]
        }
      }
    },
    "tools": {
      "type": "json",
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
      "conditions": {
        "visible": {
          "==": [{ "var": "isParent" }, false]
        }
      }
    },
    "body": {
      "type": "richtext",
      "conditions": {
        "visible": {
          "==": [{ "var": "isParent" }, false]
        }
      }
    },
    "learning": {
      "type": "text"
    },
    "featured": {
      "type": "boolean",
      "default": false
    },
    "order": {
      "type": "integer",
      "default": 0
    },
    "showInHome": {
      "type": "boolean",
      "default": false
    }
  },
  "config": {
    "layouts": {
      "edit": [
        [
          { "name": "overviewTitle", "size": 4 },
          { "name": "overviewBodyText", "size": 8 }
        ],
        [
          { "name": "challengeTitle", "size": 4 },
          { "name": "challengeBodyText", "size": 8 }
        ]
      ]
    },
    "metadatas": {
      "overviewTitle": {
        "edit": {
          "label": "Title"
        }
      },
      "overviewBodyText": {
        "edit": {
          "label": "Body Text"
        }
      },
      "challengeTitle": {
        "edit": {
          "label": "Title"
        }
      },
      "challengeBodyText": {
        "edit": {
          "label": "Body Text"
        }
      },
      "learning": {
        "edit": {
          "label": "Aprendizaje"
        }
      }
    }
  }
} as const;
