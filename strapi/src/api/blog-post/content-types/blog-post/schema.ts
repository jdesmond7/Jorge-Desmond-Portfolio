export default {
  "kind": "collectionType",
  "collectionName": "blog_posts",
  "info": {
    "singularName": "blog-post",
    "pluralName": "blog-posts",
    "displayName": "Blog Post",
    "description": "Artículos del blog personal"
  },
  "options": {
    "draftAndPublish": true
  },
  "pluginOptions": {},
  "attributes": {
    "title": {
      "type": "string",
      "required": true
    },
    "slug": {
      "type": "uid",
      "targetField": "title",
      "required": true
    },
    "excerpt": {
      "type": "text",
      "required": true
    },
    "publishedAt": {
      "type": "date"
    },
    "coverImage": {
      "type": "media",
      "multiple": false,
      "allowedTypes": [
        "images"
      ]
    },
    "body": {
      "type": "richtext"
    }
  }
} as const;
