---
title: "Design System: The Engine of Scale"
slug: design-system-engine-of-scale
locale: en
order: 2
type: child
parentSlug: growrk
problem: "Design and engineering teams spoke different languages"
description: "Design Token architecture and reusable components integrated with Nuxt UI and Tailwind. The system that made everything else possible."
year: "2022–2024"
client: "GroWrk Remote"
roles: "Sr. Product Designer · Design System Lead"
tags: ["Design Systems", "Design Tokens", "Component Library", "Figma", "NUXT UI", "AI-Assisted Design", "Design Ops", "B2B SaaS"]
learning: "A Design System isn't a component library. It's the collective decision of how a team wants to work. Without adoption, it doesn't exist. Without engineering, it doesn't scale. Without AI, it doesn't grow."
metrics:
  - value: "~40%"
    label: "Reduction in design time (2–3 hrs to 20 min on complex tables)"
  - value: "40"
    label: "Components in V3 documented in Figma and code"
  - value: "300+"
    label: "Total tokens. Bilingual system: design and engineering"
  - value: "234"
    label: "Standardized icons. Clean library, no redundancies"
  - value: "34"
    label: "Documented images, used in production and centralized"
  - value: "5"
    label: "Platforms served: Client, Staff, Supplier, Employee, Website"
coverImage: /images/projects/growrk-design-system/design-system-growrk.png
---

## 01 · The problem

**Without a shared system, design and engineering spoke different languages. In production, every component existed in three versions at once.**

When I joined GroWrk, the product worked, but it ran on a fragile foundation. The original designs had been born in PowerPoint and Google Slides. There was a color palette in Figma, but no system. Every new feature forced us to reinvent decisions that should have already been settled.

The real problem became visible in year three, when we tried to update the visual identity. Dozens of versions of the same button lived in production. Each developer had solved the same component their own way. The Figma Design System existed on paper, but for engineering, it didn't exist.

We needed a single source of truth. One that design and engineering could share, without stopping the product while we built it.

![design_eng_gap_before_after.png](/images/projects/growrk-design-system/design_eng_gap_before_after.png)

---

## 02 · The process — 3 versions, 3 lessons

**A Design System isn't built in one shot. It's cultivated.**

![ds_evolution_timeline.png](/images/projects/growrk-design-system/ds_evolution_timeline.png)

### V1 · 2022 · The system nobody asked for but everyone needed
- Built in parallel with product development, without freezing features
- 31 base components documented in Figma
- 6 token categories: colors, typography, shadows, radii, spacing
- 250 tokens total. Every component with at least 2 variables
- Buttons with up to 60 variables to cover every possible state
- A dedicated library of 330 icons
- The only real user: me

> The system existed. The problem was that I was the only one using it.

### V2 · 2023 · The moment the system revealed its own problem

- The visual identity update exposed the inconsistencies piled up in production
- Each developer had built their own button. Their own way
- The Figma DS and the code were still parallel worlds
- First real adoption by other designers on the team
- The Jr. designer started using it, and her questions fed straight back into the system
- First conversations with devs to migrate components to Storybook (not completed)

> A perfect DS in Figma doesn't exist if engineering doesn't implement it.

### V3 · 2024 · A single source of truth for design and engineering

- Strategic migration to NUXT UI + Tailwind. A shared base with engineering from the start
- 40 components documented with behavior defined in both code and Figma
- ~300 tokens. A bilingual system: design and engineering on the same naming
- Icon audit: from 330 down to 234 standardized and actively used
- Image library: 34 documented assets, used in production and centralized
- Per-component workshops to build custom components on top of NUXT
- ProductCard as the flagship case: composed from multiple NUXT components, reusable across every platform

> For the first time, design and engineering spoke the same language.

![design-system-growrk.png](/images/projects/growrk-design-system/design-system-growrk.png)

---

## 03 · Key decisions

**The decisions that don't show up on the screens.**

A Design System isn't a component library. It's a series of decisions about how you want a team to work. These are the ones that shaped the outcome most.

### 01 · Treating the DS as a product, not a deliverable

At first, the Design System was my project. I built it, I maintained it, and nobody else felt it was theirs.

I changed the process: before publishing any new component, I'd bring it to the team in a workshop. Collective decisions about functionality, variants, and states. If everyone took part in defining it, everyone adopted it.

The Jr. designer didn't just start using the system. She started proposing improvements. Her questions fed directly into every version of the DS. The debate over an input's outline wasn't wasted time: it was the process of making the system belong to everyone.

### 02 · The ProductCard: a custom component on a NUXT base

NUXT UI handled standard components well. The problem was that GroWrk's product cards had specific requirements that UTable or UCard didn't cover natively.

We developed a workshop process to build custom components on top of NUXT. The ProductCard combined multiple existing components into a new one, with properties reusable across every platform. When an extra capability was needed, it was added as a variant, not as a new component.

The result: a piece that scales. Less consistency debt, faster implementation.

### 03 · Migrating to NUXT/Tailwind: letting go of the custom DS

We had a well-built Figma Design System. But responsiveness was a constant pain for engineering: every custom component required code maintenance that the design team didn't control.

The migration was an engineering initiative. I chose to embrace it instead of defending my ground. My stance was clear: what's best for the product over the system I had built. I adapted NUXT to GroWrk's visual language and documented every adjustment in Figma and in code.

For the first time, design and engineering worked on the same base. Responsiveness stopped being a conflict. The bilingual system closed a three-year gap.

### 04 · Cleaning up the icons: from 330 to 234

The original library accumulated 330 icons over two years. Many were redundant, others were outdated, and several had never made it to production.

In V3 we ran a full audit of real usage. We removed redundancies, standardized styles, and documented the 234 icons in active use. Each one with naming consistent with the NUXT system.

Fewer icons, more clarity. The team no longer wastes time deciding which of the three versions of the user icon to use.

---

## 04 · The next layer — AI Design Architecture

**What if the Design System could design with you?**

With all the DS documentation centralized in Notion and Figma, a natural question came up: could we turn those rules into context for an AI model that generated UI directly from them?

Together with the PM, we built an AI Playground: a code project that holds all the DS rules (design.md, rules.md, skills.md) as injected context. Any team member can describe a screen in natural language and get back a proposal that follows GroWrk's design system.

The process took about two months, working in parallel with our normal responsibilities. As more capable models reached the market, the quality of the generated proposals improved steadily.

**First prompt:** 80–90% fidelity to the DS from the first output

**With AI audit:** 99–100% fidelity after automated review

![ai_playground_fidelity.png](/images/projects/growrk-design-system/ai_playground_fidelity.png)

> "We think this is a tool that's going to change the way we design."
> — PM, GroWrk Remote

> "I can't wait to try it, you can tell it's going to save us a lot of time."
> — Sony, Designer, GroWrk Remote

---

## 05 · Impact

**What changed, in numbers and in culture.**

![impact_dashboard.png](/images/projects/growrk-design-system/impact_dashboard.png)

| Metric | Description |
|---|---|
| ~40% | Reduction in design time. From 2–3 hours to 20 minutes on complex tables |
| 40 | Components in V3 documented in Figma and code |
| 300+ | Total tokens. A bilingual system: design and engineering |
| 234 | Standardized icons. A clean library, no redundancies |
| 34 | Documented images, used in production and centralized |
| 5 | Platforms served: Client, Staff, Supplier, Employee, and Website |
