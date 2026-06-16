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
    "overview": {
      "type": "text",
      "conditions": {
        "visible": {
          "==": [{ "var": "isParent" }, true]
        }
      }
    },
    "challenge": {
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
  }
} as const;
