---
title: "AI Playground: Cuando el Design System aprende a diseñar"
slug: ai-playground
locale: es
order: 1
type: child
parentSlug: growrk
cardNumber: "GroWrk 1.1"
problem: "El Design System estaba documentado, pero solo los diseñadores podían usarlo"
description: "Un espacio de trabajo donde cualquier empleado genera soluciones de producto desde un prompt. La IA lee las reglas del Design System, reutiliza componentes y tokens reales, y entrega un artefacto HTML listo para revisar. La siguiente capa del sistema."
year: "2026-presente"
client: "GroWrk Remote"
duration: "2026-presente (activo)"
roles: "Diseño lead · Desarrollo completo (Claude Code, Claude, Gemini, Cursor)"
tools: "Claude Code · Claude · Gemini · Cursor · NUXT UI · Tailwind · Markdown"
tags: ["AI Design Architecture", "Design Systems", "AI-Assisted Design", "Prompt Engineering", "Design Ops", "Front-End", "B2B SaaS", "0 to 1"]
learning: "Un Design System documentado para humanos es una biblioteca. Documentado para una IA, es un motor. La diferencia no fue la tecnología, fue haber construido antes las reglas con la disciplina suficiente para que una máquina pudiera seguirlas sin romperlas. La IA no reemplaza el criterio de diseño: lo escala. Pero solo escala lo que ya estaba bien definido. El Playground no es magia, es la consecuencia natural de un sistema hecho con rigor."
metrics:
  - value: "1 prompt"
    label: "De pocas líneas basta para generar un prototipo funcional fiel al DS"
  - value: "100% de fidelidad"
    label: "con nuestro design system tras las auditorías automatizadas de diseño y código"
  - value: "1:1 copia exacta"
    label: "con producción: lo aceptado pasa a ingeniería sin traducción"
  - value: "2 Skills"
    label: "para asegurar la consistencia y fidelidad en código y diseño"
  - value: "0 código hardcodeado"
    label: "La IA reutiliza lo que ya existe antes de crear"
coverImage: "/images/projects/growrk-playground/banner-growrk-ai-projects.png"
cardImage: /images/projects/growrk-playground/growrk-playground-card-project.png
---

## 01 · El contexto

**El Design System estaba documentado y maduro. Pero seguía siendo una herramienta solo para quien sabía diseñar.**

Este proyecto es la continuación directa del Design System V2. Con todas las reglas, tokens y componentes ya documentados, existía una oportunidad clara: si el sistema estaba tan bien definido que un humano podía seguirlo sin ambigüedad, una IA también podía.

La pregunta dejó de ser "¿cómo documentamos el sistema?" y pasó a ser "¿cómo hacemos que cualquier persona del equipo genere producto con él, sin saber diseñar ni programar?".

El AI Playground es la respuesta: un espacio de trabajo donde un empleado describe una idea en lenguaje natural y recibe una solución construida con los componentes, tokens y reglas reales de GroWrk.

> [Este proyecto nace del Design System →](/proyectos/design-system-motor-de-escala)

---

## 02 · Mi rol

**Lideré el diseño y construí todo el código.**

Dirigí la estrategia de diseño del Playground y me encargué por completo del desarrollo, usando Claude Code, Claude, Gemini y Cursor. Diseño y código en las mismas manos, que es justamente lo que un proyecto de esta naturaleza necesita: la frontera entre "cómo debe verse" y "cómo se construye" aquí no existe.

---

## 03 · La fuente de verdad

**Para que una IA respete el sistema, primero hay que hablarle en su idioma.**

Tomé toda la documentación del DS y la convertí en contexto legible por máquina. Un archivo `.md` por cada componente, más archivos separados para las reglas de diseño y las reglas de código. Una sola fuente de verdad que cualquier agente de IA puede leer y aplicar.

Para mantener esa fuente única sin duplicarla, usé symlinks, dejando a Claude como el archivo raíz de verdad. Cualquier cambio en la documentación se propaga a todos los agentes, sin copias desincronizadas. El mismo principio de token único del Design System, aplicado a las reglas que consume la IA.

<!-- IMG: /images/projects/growrk-playground/playground-code.png - Arquitectura de la fuente de verdad: archivos .md por componente y reglas, conectados por symlinks -->

---

## 04 · Cómo funciona

**Un espacio flexible, porque cada persona piensa distinto.**

El Playground es un espacio de prototipado, no un formulario rígido. La forma de trabajo varía según quién lo use: se puede subir un wireframe, pegar una captura de Figma, o promptear por completo la solución que se tiene en mente.

El agente sigue un proceso consistente sin importar la entrada:

<!-- process-cards -->

### Analiza el mejor approach.
Revisa las demás features del proyecto y busca reutilizar lo más posible, para no reinventar ni construir desde cero.

### Pregunta lo necesario, en lenguaje simple.
Si le falta contexto, hace preguntas básicas que cualquier empleado puede responder, sin jerga técnica.

### Construye solo con el sistema.
Selecciona únicamente los tokens, componentes y reglas del DS de GroWrk para armar la solución.

El resultado es una solución que nace dentro del sistema, no una que hay que corregir después para que encaje.

<!-- IMG: /images/projects/growrk-playground/playground-input-flexible.png - Flujo del Playground: input flexible, análisis del agente, construcción con el DS y entrega -->

---

## 05 · La entrega

**Un artefacto que cualquiera comparte, y una rama que ingeniería puede revisar.**

Al terminar, el Playground entrega dos cosas a la vez. Eso cambia la distancia entre prototipo y producción.

> La distancia entre la idea y el código en producción solía medirse en semanas. Aquí se mide en una revisión.

<!-- delivery-cards -->

### Artefacto HTML
Un archivo que cualquier persona puede compartir y usar de inmediato, sin instalar nada ni esperar a ingeniería.
<!-- img: /images/projects/growrk-playground/playground-html.png -->

### Rama 1:1 de producción
La solución se genera como una rama completa del Playground, copia exacta de producción. Cuando el equipo adopta la feature, el ingeniero ya tiene código construido con la tecnología real, no un mockup que hay que traducir.
<!-- img: /images/projects/growrk-playground/playground-entrega1-1.png -->

---

## 06 · Las auditorías

**La IA es buena, pero no infalible. Dos skills la mantienen dentro del sistema.**

El agente tiene todo para no salirse de las reglas, pero al hacer ajustes pequeños o avanzar rápido, a veces no cumple al 100% con los estándares. Para eso construí dos skills, pensadas para el equipo de diseño e ingeniería (este paso es más técnico). Cierran la brecha del último 5%, la que normalmente se cuela hasta producción.

### /design-audit
Audita el diseño generado contra los tokens y componentes del DS. Corrige cualquier desviación para que cumpla al 100% con las reglas de diseño.

### /code-review
Revisa el código contra nuestros estándares. Lo deja consistente, como si lo hubiera escrito una sola persona.

---

## 07 · En uso

**No es un experimento. El equipo de diseño ya lo usa.**

El Playground está en uso activo por el equipo de diseño. Con prompts muy sencillos, de pocas líneas, han generado prototipos que les dan la pauta para pensar mejoras, dedicar más tiempo a la lógica, y encontrar errores o edge cases que sin la herramienta habrían aparecido hasta producción.

Ese es el valor real: no es que la IA diseñe por ellos, es que les devuelve tiempo para pensar. El prototipo deja de ser el cuello de botella.

Hoy el Playground cubre el Dashboard. Ya estamos construyendo la versión de Staff, y el plan es liberarlo el próximo año para todos los empleados. La visión: que cualquier persona con una idea pueda compartirla ya prototipada con los demás equipos, y así agilizar la creación de features y mejoras del producto.
