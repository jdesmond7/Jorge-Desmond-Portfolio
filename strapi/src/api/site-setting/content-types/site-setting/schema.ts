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
  "pluginOptions": {},
  "attributes": {
    "siteName": {
      "type": "string",
      "required": true
    },
    "email": {
      "type": "email",
      "required": true
    },
    "linkedin": {
      "type": "string"
    },
    "instagram": {
      "type": "string"
    },
    "navLinks": {
      "type": "component",
      "repeatable": true,
      "component": "shared.nav-link"
    },
    "footerText": {
      "type": "string"
    },
    "footerHeadline": {
      "type": "string"
    }
  }
} as const;
