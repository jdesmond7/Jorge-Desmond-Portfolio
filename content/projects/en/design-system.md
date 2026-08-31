---
title: "Design System: The Engine of Scale"
slug: design-system-engine-of-scale
locale: en
order: 3
type: child
parentSlug: growrk
cardNumber: "GroWrk 1.3"
problem: "Design and engineering teams spoke different languages"
description: "Design Token architecture and reusable components integrated with Nuxt UI and Tailwind. The system that made everything else possible."
year: "2022-2026"
client: "GroWrk Remote"
roles: "Sr. Product Designer · Design System Lead"
tags: ["Design Systems", "Design Tokens", "Component Library", "Figma", "NUXT UI", "AI-Assisted Design", "Design Ops", "B2B SaaS"]
learning: "A Design System isn't a component library. It's the collective decision of how a team wants to work. Without adoption, it doesn't exist. Without engineering, it doesn't scale. A perfect component in Figma that nobody uses is worth less than an imperfect one the whole team adopts. The real work wasn't drawing components - it was getting an entire team to speak the same language."
metrics:
  - value: "~40%"
    label: "Reduction in design time (2-3 hrs to 20 min on complex tables)"
  - value: "40"
    label: "Components in V2 documented in Figma and code"
  - value: "300+"
    label: "Total tokens. Bilingual system: design and engineering"
  - value: "234"
    label: "Standardized icons. Clean library, no redundancies"
  - value: "34"
    label: "Documented images, used in production and centralized"
  - value: "5"
    label: "Platforms served: Client, Staff, Supplier, Employee, Website"
coverImage: /images/projects/growrk-design-system/design-system-growrk.png
cardImage: /images/projects/growrk-design-system/growrk-design-system-card.png
---

## 01 · The problem

**Without a shared system, design and engineering spoke different languages. In production, every component existed in three versions at once.**

When I joined GroWrk, the product worked, but it ran on a fragile foundation. The original designs had been born in PowerPoint and Google Slides. There was a color palette in Figma, but no system. Every new feature forced us to reinvent decisions that should have already been settled.

The real problem became visible in year three, when we tried to update the visual identity. Dozens of versions of the same button lived in production. Each developer had solved the same component their own way. The Figma Design System existed on paper, but for engineering, it didn't exist.

We needed a single source of truth. One that design and engineering could share, without stopping the product while we built it.

---

## 02 · The process - 3 stages, 3 lessons

**A Design System isn't built in one shot. It's cultivated.**

The system went through two iterations on the same foundation, then a full technological restart. Each stage solved the limit of the one before it.

### V1 · 2022 · The first version
- Built in parallel with the product, without freezing features
- 31 base components, 250 tokens across 6 categories, 330 icons
- The only user: me

> The system existed, but nobody else was using it.

### V1.2 · 2023 · A refinement on the same base
- The visual identity update exposed inconsistencies piled up in production: every developer had built their own button
- First real adoption by other designers on the team
- The Jr. designer started using it and her questions fed straight back into the system
- First conversations with devs to migrate components to Storybook
- The Figma DS and the code were still parallel worlds

> It wasn't a new system: a refinement on the same base.

### V2 · 2026 · The restart
- A new file on new technology: NUXT UI + Tailwind, a shared base with engineering from the start
- 40 components with behavior defined in both code and Figma
- ~300 tokens on a shared naming system
- For the first time, design and engineering worked in the same language

> This is the version I still maintain and scale today.

![design-system-growrk.png](/images/projects/growrk-design-system/design-system-growrk.png)

---

## 03 · Tokens

**The atomic layer of the system.**

I defined more than 300 tokens for color, typography, spacing, radii, and shadows, organized in a naming system shared by design and engineering. A change in one token propagates across the entire product without manually editing a single screen.

Color tokens were structured as primitives (base brand values) mapped to semantic tokens. This removed manual overrides between themes and reduced the risk of human error in production-ready designs. Spacing and radii were standardized on fixed scales, and breakpoints were defined as variables to automate responsive behavior.

<!-- ds-token-explorer -->

---

## 04 · Components

**From token to composed component.**

On top of the tokens we built the library: 40 components documented in Figma and code, each with its variants and states. The goal of the refactor was to reduce duplicated variants and compose instead of multiply.

<!-- ds-component-playground -->


---

## 05 · Documentation

**A component without documentation is a suggestion, not a standard.**

The single source of truth lives in Notion, connected to Figma and to code. Every component has its own entry with the same structure, so anyone - design, engineering, or someone who just joined - knows exactly how and when to use it without asking.

![components-documentation-notion.png](/images/projects/growrk-design-system/components-documentation-notion.png)

Each entry documents:

- **Usage rules.** The conditions under which the component applies, and those under which it doesn't.
- **Exact tokens.** The precise values that live in Figma (color, spacing, typography, radii), linked to their token - not copied by hand.
- **Usage context.** Which screens and flows use it, and for what purpose.
- **Do's and Don'ts.** Concrete examples of correct and incorrect use, to close the door on interpretation.
- **Change history.** A log of every modification the component has gone through, with date and reason. Plus space to propose future changes that get discussed with the team before they ship.

The history is what keeps the system alive. No component changes by unilateral decision: every adjustment is documented and reviewed with the team. That stops the DS from fragmenting over time - which is exactly the problem we started with.

> [!info] Documentation isn't the end of the design work. It's what makes it reusable.

---

## 06 · Key decisions

**A Design System is a series of decisions about how you want a team to work.**

### Treat the DS as a product, not a deliverable.

At the start the system was my project: I built and maintained it alone. I changed the process and introduced workshops per component before publishing, with collective decisions on functionality, variants, and states. Adoption stopped being an imposition: whoever helps define it, adopts it. The Jr. designer went from using the system to proposing improvements that fed back into every version.

### ProductCard: custom on a NUXT base.

NUXT UI covered the standard components, but GroWrk's product cards required logic that UTable or UCard didn't cover natively. I built ProductCard by combining multiple NUXT components into one reusable piece. New needs land as a variant, not as a new component. Less consistency debt, faster implementation.

### Migrate to NUXT/Tailwind.

The custom Figma DS was well built, but responsive behavior demanded code maintenance that design didn't control. The migration was an engineering initiative, and I chose to embrace it rather than defend the in-house system. I adapted NUXT to GroWrk's visual language and documented every adjustment in Figma and code. Responsive stopped being a conflict, and the bilingual system closed a three-year gap.

### Icon audit: from 330 to 234.

The library had accumulated 330 icons over two years, many redundant or unused in production. A full audit of real usage removed redundancies, standardized styles, and left 234 active icons with consistent naming. The team stopped wasting time choosing between three versions of the same icon.

---

## 07 · The next layer - Designing with AI

**What if the Design System could design with you?**

With the system mature and documentation centralized, the rules were already written and in order. The next step was to turn them into context so AI could generate UI faithful to the system from the first prompt.

That exploration became a project in its own right. The Design System was the foundation that made it possible: without well-defined tokens, components, and rules, there would be no context to give the AI.

[Read the full case: AI Playground →](/proyectos/ai-playground)
