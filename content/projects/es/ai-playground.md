---
title: "AI Playground: Cuando el Design System aprende a diseñar"
slug: ai-playground
locale: es
order: 1
type: child
parentSlug: growrk
cardNumber: "GroWrk 1.1"
problem: "Convertí las reglas del sistema en contexto para que la IA generara UI fiel al DS"
description: "Un playground donde las reglas del Design System se inyectan como contexto para que la IA genere UI con 80–90% de fidelidad desde el primer prompt, y hasta 99–100% con auditoría automatizada."
year: "2024"
client: "GroWrk Remote"
roles: "Sr. Product Designer · AI Design Architect"
tags: ["AI-Assisted Design", "Design Systems", "Prompt-to-UI", "Design Ops", "B2B SaaS"]
learning: "La IA no reemplaza el criterio de diseño. Escala el criterio que ya documentaste. Sin un Design System sólido, el playground solo genera ruido bonito. Con uno, genera propuestas que el equipo puede usar."
metrics:
  - value: "80–90%"
    label: "Fidelidad al DS desde el primer prompt"
  - value: "99–100%"
    label: "Fidelidad tras auditoría automatizada con IA"
  - value: "~2 meses"
    label: "Construcción en paralelo a responsabilidades normales"
coverImage: /images/projects/growrk-design-system/ai_playground_fidelity.png
cardImage: /images/projects/growrk/growrk-card-project.png
---

## 01 · El problema

**El Design System documentaba cómo diseñar. Pero cada pantalla seguía empezando desde cero.**

Con la documentación del DS centralizada en Notion y Figma, surgió una pregunta natural: ¿podíamos convertir esas reglas en contexto para un modelo de IA que generara UI directamente desde ellas?

El cuello de botella ya no era la falta de componentes. Era el tiempo que tomaba ensamblarlos en pantallas coherentes, sin desviarse del sistema. Cada feature pedía el mismo trabajo de traducción: de intención de producto a layout fiel al DS.

---

## 02 · La apuesta

**¿Y si el Design System pudiera diseñar contigo?**

En conjunto con el PM, construimos un AI Playground: un proyecto en código que contiene todas las reglas del DS (`design.md`, `rules.md`, `skills.md`) como contexto inyectado. Cualquier miembro del equipo puede describir una pantalla en lenguaje natural y recibir una propuesta que sigue el sistema de diseño de GroWrk.

El proceso tomó cerca de dos meses, trabajando en paralelo a nuestras responsabilidades normales. Conforme salían al mercado modelos más capaces, la calidad de las propuestas mejoró de forma sostenida.

---

## 03 · Resultados

**Primer prompt:** 80–90% de fidelidad al DS desde el primer output

**Con auditoría IA:** 99–100% de fidelidad tras revisión automatizada

![ai_playground_fidelity.png](/images/projects/growrk-design-system/ai_playground_fidelity.png)

> "Creemos que es una herramienta que va a cambiar la forma en que diseñamos."
> — PM, GroWrk Remote

> "Ya quiero probarla, se ve que nos va a ahorrar mucho tiempo."
> — Sony, Diseñadora, GroWrk Remote

---

## 04 · Lo que aprendí

No es la IA reemplazando el juicio. Es el juicio, escalado. El playground solo funciona porque el Design System ya existía como fuente de verdad compartida entre diseño e ingeniería. Sin esa base, el prompt-to-UI es improvisación. Con ella, es infraestructura.
