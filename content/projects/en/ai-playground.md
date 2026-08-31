---
title: "AI Playground: When the Design System learns to design"
slug: ai-playground
locale: en
order: 1
type: child
parentSlug: growrk
cardNumber: "GroWrk 1.1"
problem: "The Design System was documented, but only designers could use it"
description: "A workspace where any employee generates product solutions from a prompt. AI reads the Design System rules, reuses real components and tokens, and delivers an HTML artifact ready to review. The next layer of the system."
year: "2026-present"
client: "GroWrk Remote"
duration: "2026-present (active)"
roles: "Design lead · Full development (Claude Code, Claude, Gemini, Cursor)"
tools: "Claude Code · Claude · Gemini · Cursor · NUXT UI · Tailwind · Markdown"
tags: ["AI Design Architecture", "Design Systems", "AI-Assisted Design", "Prompt Engineering", "Design Ops", "Front-End", "B2B SaaS", "0 to 1"]
learning: "A Design System documented for humans is a library. Documented for an AI, it's an engine. The difference wasn't the technology - it was having built the rules first, with enough discipline for a machine to follow them without breaking them. AI doesn't replace design judgment: it scales it. But it only scales what was already well defined. The Playground isn't magic. It's the natural consequence of a system built with rigor."
metrics:
  - value: "1 prompt"
    label: "A few lines are enough to generate a working prototype faithful to the DS"
  - value: "100% fidelity"
    label: "with our design system after automated design and code audits"
  - value: "1:1 exact copy"
    label: "with production: what gets accepted goes to engineering with no translation"
  - value: "2 Skills"
    label: "to ensure consistency and fidelity in code and design"
  - value: "0 hardcoded code"
    label: "AI reuses what already exists before creating"
coverImage: "/images/projects/growrk-playground/banner-growrk-ai-projects.png"
cardImage: /images/projects/growrk-playground/growrk-playground-card-project.png
---

## 01 · The context

**The Design System was documented and mature. But it was still a tool only for people who knew how to design.**

This project is the direct continuation of Design System V2. With every rule, token, and component already documented, there was a clear opening: if the system was defined well enough that a human could follow it without ambiguity, an AI could too.

The question stopped being "how do we document the system?" and became "how do we let anyone on the team generate product with it, without knowing how to design or code?"

The AI Playground is the answer: a workspace where an employee describes an idea in natural language and gets back a solution built with GroWrk's real components, tokens, and rules.

> [This project grows out of the Design System →](/proyectos/design-system-engine-of-scale)

---

## 02 · My role

**I led the design and built all of the code.**

I directed the Playground's design strategy and owned the development end to end, using Claude Code, Claude, Gemini, and Cursor. Design and code in the same hands - which is exactly what a project like this needs. The line between "how it should look" and "how it gets built" doesn't exist here.

---

## 03 · The source of truth

**For an AI to respect the system, you first have to speak its language.**

I took the entire DS documentation and turned it into machine-readable context. One `.md` file per component, plus separate files for design rules and code rules. A single source of truth that any AI agent can read and apply.

To keep that source unique without duplicating it, I used symlinks, with Claude as the root file of truth. Any change in the documentation propagates to every agent, with no drifting copies. The same single-token principle from the Design System, applied to the rules the AI consumes.

<!-- IMG: /images/projects/growrk-playground/playground-code.png - Source-of-truth architecture: .md files per component and rule set, connected by symlinks -->

---

## 04 · How it works

**A flexible space, because every person thinks differently.**

The Playground is a prototyping space, not a rigid form. The way of working changes with who uses it: you can upload a wireframe, paste a Figma screenshot, or prompt the whole solution from scratch.

The agent follows a consistent process no matter the input:

<!-- process-cards -->

### Finds the best approach.
It reviews the project's other features and reuses as much as possible, so nothing is reinvented or built from zero.

### Asks only what's needed, in plain language.
If it's missing context, it asks basic questions any employee can answer - no technical jargon.

### Builds only with the system.
It selects GroWrk DS tokens, components, and rules exclusively to assemble the solution.

The result is a solution that is born inside the system, not one that has to be corrected later to fit.

<!-- IMG: /images/projects/growrk-playground/playground-input-flexible.png - Playground flow: flexible input, agent analysis, DS construction, and delivery -->

---

## 05 · The delivery

**An artifact anyone can share, and a branch engineering can review.**

When it finishes, the Playground delivers two things at once. That changes the distance between prototype and production.

> The distance between idea and production code used to be measured in weeks. Here it's measured in a review.

<!-- delivery-cards -->

### HTML artifact
A file anyone can share and use immediately, with nothing to install and no waiting on engineering.
<!-- img: /images/projects/growrk-playground/playground-html.png -->

### 1:1 production branch
The solution is generated as a full Playground branch, an exact copy of production. When the team adopts the feature, the engineer already has code built with the real production stack - not a mockup that has to be translated.
<!-- img: /images/projects/growrk-playground/playground-entrega1-1.png -->

---

## 06 · The audits

**AI is good, but not infallible. Two skills keep it inside the system.**

The agent has everything it needs to stay within the rules, but small tweaks or moving fast can still drop it short of 100%. That's why I built two skills, aimed at the design and engineering teams (this step is more technical). They close the last 5% gap - the one that usually slips into production.

### /design-audit
Audits the generated design against DS tokens and components. Corrects any drift so it meets 100% of the design rules.

### /code-review
Reviews the code against our standards. Leaves it consistent, as if a single person had written it.

---

## 07 · In use

**This isn't an experiment. The design team already uses it.**

The Playground is in active use by the design team. With very simple prompts - a few lines - they've generated prototypes that give them a base to think through improvements, spend more time on the logic, and catch errors or edge cases that would have shown up in production without the tool.

That's the real value: it isn't that AI designs for them. It gives them time back to think. The prototype stops being the bottleneck.

Today the Playground covers the Dashboard. We're already building the Staff version, and the plan is to open it to every employee next year. The vision: anyone with an idea can share it already prototyped with the other teams, and speed up the creation of product features and improvements.
