import type { Schema, Struct } from '@strapi/strapi';

export interface SharedMetric extends Struct.ComponentSchema {
  collectionName: 'components_shared_metrics';
  info: {
    displayName: 'M\u00E9trica';
    icon: 'chartCircle';
  };
  attributes: {
    label: Schema.Attribute.String & Schema.Attribute.Required;
    value: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface SharedNavLink extends Struct.ComponentSchema {
  collectionName: 'components_shared_nav_links';
  info: {
    displayName: 'Nav Link';
    icon: 'link';
  };
  attributes: {
    href: Schema.Attribute.String & Schema.Attribute.Required;
    label: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface SharedStackItem extends Struct.ComponentSchema {
  collectionName: 'components_shared_stack_items';
  info: {
    displayName: 'Stack Item';
    icon: 'layer';
  };
  attributes: {
    isToday: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<false>;
    items: Schema.Attribute.String & Schema.Attribute.Required;
    name: Schema.Attribute.String & Schema.Attribute.Required;
    number: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface SharedStat extends Struct.ComponentSchema {
  collectionName: 'components_shared_stats';
  info: {
    displayName: 'Stat';
    icon: 'chartBubble';
  };
  attributes: {
    label: Schema.Attribute.String & Schema.Attribute.Required;
    value: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

declare module '@strapi/strapi' {
  export module Public {
    export interface ComponentSchemas {
      'shared.metric': SharedMetric;
      'shared.nav-link': SharedNavLink;
      'shared.stack-item': SharedStackItem;
      'shared.stat': SharedStat;
    }
  }
}
