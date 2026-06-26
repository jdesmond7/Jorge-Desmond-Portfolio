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
    "excerpt": {
      "type": "text",
      "required": true,
      "pluginOptions": {
        "i18n": {
          "localized": true
        }
      }
    },
    "publishedAt": {
      "type": "date",
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
    "body": {
      "type": "richtext",
      "pluginOptions": {
        "i18n": {
          "localized": true
        }
      }
    },
    "comments": {
      "type": "relation",
      "relation": "oneToMany",
      "target": "api::comment.comment",
      "mappedBy": "blogPost",
      "pluginOptions": {
        "i18n": {
          "localized": false
        }
      }
    }
  }
} as const;
