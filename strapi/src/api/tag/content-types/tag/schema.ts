export default {
  "kind": "collectionType",
  "collectionName": "tags",
  "info": {
    "singularName": "tag",
    "pluralName": "tags",
    "displayName": "Tag",
    "description": "Etiquetas reutilizables para proyectos"
  },
  "options": {
    "draftAndPublish": false
  },
  "pluginOptions": {},
  "attributes": {
    "name": {
      "type": "string",
      "required": true,
      "unique": true
    },
    "proyectos": {
      "type": "relation",
      "relation": "manyToMany",
      "target": "api::proyecto.proyecto",
      "mappedBy": "tags"
    }
  }
} as const;
