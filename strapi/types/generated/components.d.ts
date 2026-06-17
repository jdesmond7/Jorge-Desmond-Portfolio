import type { Schema, Struct } from '@strapi/strapi';

export interface SharedMetric extends Struct.ComponentSchema {
  collectionName: 'components_shared_metrics';
  info: {
    description: 'M\u00E9trica con valor, t\u00EDtulo y descripci\u00F3n breve';
    displayName: 'M\u00E9trica';
    icon: 'chartCircle';
  };
  attributes: {
    description: Schema.Attribute.Text;
    title: Schema.Attribute.String & Schema.Attribute.Required;
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

export interface SharedProjectSummary extends Struct.ComponentSchema {
  collectionName: 'components_shared_project_summaries';
  info: {
    description: 'Duraci\u00F3n, rol, equipo y herramientas del proyecto';
    displayName: 'Project Summary';
    icon: 'layer';
  };
  attributes: {
    duration: Schema.Attribute.String;
    roles: Schema.Attribute.String;
    team: Schema.Attribute.String;
    tools: Schema.Attribute.String;
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
      'shared.project-summary': SharedProjectSummary;
      'shared.stack-item': SharedStackItem;
      'shared.stat': SharedStat;
    }
  }
}
