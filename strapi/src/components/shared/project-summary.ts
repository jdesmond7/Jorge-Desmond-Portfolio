export default {
  "collectionName": "components_shared_project_summaries",
  "info": {
    "displayName": "Project Summary",
    "icon": "layer",
    "description": "Duración, rol, equipo y herramientas del proyecto"
  },
  "options": {},
  "attributes": {
    "duration": {
      "type": "string"
    },
    "roles": {
      "type": "string"
    },
    "team": {
      "type": "string"
    },
    "tools": {
      "type": "string"
    }
  },
  "config": {
    "layouts": {
      "edit": [
        [
          { "name": "duration", "size": 6 },
          { "name": "roles", "size": 6 }
        ],
        [
          { "name": "team", "size": 6 },
          { "name": "tools", "size": 6 }
        ]
      ]
    },
    "metadatas": {
      "duration": {
        "edit": {
          "label": "Duration"
        }
      },
      "roles": {
        "edit": {
          "label": "Roles"
        }
      },
      "team": {
        "edit": {
          "label": "Team"
        }
      },
      "tools": {
        "edit": {
          "label": "Tools"
        }
      }
    }
  }
} as const;
