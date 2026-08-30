---
title: "AI Playground: When the Design System learns to design"
slug: ai-playground
locale: en
order: 1
type: child
parentSlug: growrk
cardNumber: "GroWrk 1.1"
problem: "I turned the system's rules into context so AI could generate UI faithful to the DS"
description: "A playground where Design System rules are injected as context so AI generates UI at 80–90% fidelity from the first prompt, and up to 99–100% with automated auditing."
year: "2024"
client: "GroWrk Remote"
roles: "Sr. Product Designer · AI Design Architect"
tags: ["AI-Assisted Design", "Design Systems", "Prompt-to-UI", "Design Ops", "B2B SaaS"]
learning: "AI doesn't replace design judgment. It scales the judgment you've already documented. Without a solid Design System, the playground only generates pretty noise. With one, it generates proposals the team can use."
metrics:
  - value: "80–90%"
    label: "DS fidelity from the first prompt"
  - value: "99–100%"
    label: "Fidelity after automated AI auditing"
  - value: "~2 months"
    label: "Built in parallel with day-to-day responsibilities"
coverImage: /images/projects/growrk-design-system/ai_playground_fidelity.png
cardImage: /images/projects/growrk/growrk-card-project.png
---

## 01 · The problem

**The Design System documented how to design. But every screen still started from scratch.**

With DS documentation centralized in Notion and Figma, a natural question emerged: could we turn those rules into context for an AI model that generated UI directly from them?

The bottleneck was no longer a lack of components. It was the time it took to assemble them into coherent screens without drifting from the system. Every feature asked for the same translation work: from product intent to a layout faithful to the DS.

---

## 02 · The bet

**What if the Design System could design with you?**

Together with the PM, we built an AI Playground: a code project that holds all the DS rules (`design.md`, `rules.md`, `skills.md`) as injected context. Any team member can describe a screen in natural language and get back a proposal that follows GroWrk's design system.

The process took about two months, working in parallel with our normal responsibilities. As more capable models came to market, the quality of the proposals improved steadily.

---

## 03 · Results

**First prompt:** 80–90% fidelity to the DS from the first output

**With AI auditing:** 99–100% fidelity after automated review

![ai_playground_fidelity.png](/images/projects/growrk-design-system/ai_playground_fidelity.png)

> "We believe this is a tool that will change the way we design."
> — PM, GroWrk Remote

> "I already want to try it — it looks like it will save us a lot of time."
> — Sony, Designer, GroWrk Remote

---

## 04 · What I learned

This isn't AI replacing judgment. It's judgment, scaled. The playground only works because the Design System already existed as a shared source of truth between design and engineering. Without that foundation, prompt-to-UI is improvisation. With it, it's infrastructure.
