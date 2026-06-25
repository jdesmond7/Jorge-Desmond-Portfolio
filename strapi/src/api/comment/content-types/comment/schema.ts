export default {
  "kind": "collectionType",
  "collectionName": "comments",
  "info": {
    "singularName": "comment",
    "pluralName": "comments",
    "displayName": "Comment",
    "description": "Comentarios en entradas del blog"
  },
  "options": {
    "draftAndPublish": true
  },
  "pluginOptions": {},
  "attributes": {
    "body": {
      "type": "text",
      "required": true
    },
    "authorName": {
      "type": "string"
    },
    "authorEmail": {
      "type": "email",
      "private": true
    },
    "blogPost": {
      "type": "relation",
      "relation": "manyToOne",
      "target": "api::blog-post.blog-post",
      "inversedBy": "comments"
    },
    "parent": {
      "type": "relation",
      "relation": "manyToOne",
      "target": "api::comment.comment",
      "inversedBy": "replies"
    },
    "replies": {
      "type": "relation",
      "relation": "oneToMany",
      "target": "api::comment.comment",
      "mappedBy": "parent"
    },
    "upvotes": {
      "type": "integer",
      "default": 0
    },
    "downvotes": {
      "type": "integer",
      "default": 0
    },
    "reportCount": {
      "type": "integer",
      "default": 0
    },
    "lastActivityAt": {
      "type": "datetime"
    }
  }
} as const;
