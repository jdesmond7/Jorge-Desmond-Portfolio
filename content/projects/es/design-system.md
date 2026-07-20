---
title: "Design System: El Motor de Escala"
slug: design-system-motor-de-escala
locale: es
order: 2
type: child
parentSlug: growrk
problem: "Los equipos de diseño e ingeniería hablaban idiomas distintos"
description: "Arquitectura de Design Tokens y componentes reutilizables integrados con Nuxt UI y Tailwind, el sistema que hizo posible todo lo demás."
year: "2022–2024"
client: "GroWrk Remote"
roles: "Sr. Product Designer · Design System Lead"
tags: ["Design Systems", "Design Tokens", "Component Library", "Figma", "NUXT UI", "AI-Assisted Design", "Design Ops", "B2B SaaS"]
learning: "Un Design System no es una librería de componentes. Es la decisión colectiva de cómo un equipo quiere trabajar. Sin adopción, no existe. Sin ingeniería, no escala. Sin IA, no crece."
metrics:
  - value: "~40%"
    label: "Reducción en tiempo de diseño (de 2–3 horas a 20 minutos en tablas complejas)"
  - value: "40"
    label: "Componentes en V3 con documentación en Figma y código"
  - value: "300+"
    label: "Tokens totales. Sistema bilingüe: diseño e ingeniería"
  - value: "234"
    label: "Iconos homologados. Librería limpia, sin redundancias"
  - value: "34"
    label: "Imágenes documentadas, usadas en producción y centralizadas"
  - value: "5"
    label: "Plataformas servidas: Client, Staff, Supplier, Employee y Website"
coverImage: /images/projects/growrk-design-system/design-system-growrk.png
---

## 01 · El problema

**Sin un sistema compartido, diseño e ingeniería hablaban idiomas distintos. En producción, cada componente existía en tres versiones simultáneas.**

Cuando llegué a GroWrk, el producto funcionaba, pero sobre una base frágil. Los diseños originales habían nacido en PowerPoint y Google Slides. Había una paleta de colores en Figma, pero no había sistema. Cada nueva feature obligaba a reinventar decisiones que ya deberían estar resueltas.

El problema real se volvió visible al tercer año, cuando intentamos actualizar la identidad visual. En producción existían decenas de versiones del mismo botón. Cada desarrollador había resuelto el mismo componente a su manera. El Design System de Figma existía en papel, pero para ingeniería, no existía.

Necesitábamos una sola fuente de verdad. Una que diseño e ingeniería pudieran compartir, sin detener el producto mientras lo construíamos.

![design_eng_gap_before_after.png](/images/projects/growrk-design-system/design_eng_gap_before_after.png)

---

## 02 · El proceso — 3 versiones, 3 aprendizajes

**Un Design System no se construye de una vez. Se cultiva.**

![ds_evolution_timeline.png](/images/projects/growrk-design-system/ds_evolution_timeline.png)

### V1 · 2022 · El sistema que nadie pidió pero todos necesitaban
- Construido en paralelo al desarrollo del producto, sin congelar features
- 31 componentes base documentados en Figma
- 6 categorías de tokens: colores, tipografía, shadows, radii, espaciados
- 250 tokens en total. Cada componente con mínimo 2 variables
- Botones con hasta 60 variables para cubrir todos los estados posibles
- Librería dedicada de 330 iconos
- Único usuario real: yo

> El sistema existía. El problema era que solo yo lo usaba.

### V2 · 2023 · El momento en que el sistema reveló su propio problema

- La actualización de identidad visual expuso las inconsistencias acumuladas en producción
- Cada desarrollador había construido su propio botón. A su manera
- El DS de Figma y el código seguían siendo mundos paralelos
- Primera adopción real por parte de otros diseñadores del equipo
- La diseñadora Jr. comenzó a usarlo, y sus preguntas retroalimentaron el sistema directamente
- Primeras conversaciones con devs para migrar componentes a Storybook (no completado)

> El DS perfecto en Figma no existe si ingeniería no lo implementa.

### V3 · 2024 · Una fuente de verdad para diseño e ingeniería

- Migración estratégica a NUXT UI + Tailwind. Base compartida con ingeniería desde el inicio
- 40 componentes documentados con comportamiento definido en código y en Figma
- ~300 tokens. Sistema bilingüe: diseño e ingeniería sobre la misma nomenclatura
- Auditoría de iconos: de 330 reducidos a 234 homologados y en uso activo
- Librería de imágenes: 34 assets documentados, usados en producción y centralizados
- Workshops por componente para construir custom components sobre la base de NUXT
- ProductCard como caso emblemático: compuesto desde múltiples componentes de NUXT, reutilizable en todas las plataformas

> Por primera vez, diseño e ingeniería hablaban el mismo idioma.

![design-system-growrk.png](/images/projects/growrk-design-system/design-system-growrk.png)

---

## 03 · Decisiones clave

**Las decisiones que no aparecen en las pantallas.**

Un Design System no es una librería de componentes. Es una serie de decisiones sobre cómo quieres que un equipo trabaje. Estas son las que más definieron el resultado.

### 01 · Tratar el DS como un producto, no como un entregable

Al inicio, el Design System era mi proyecto. Lo construía, lo mantenía, y nadie más lo sentía suyo.

Cambié el proceso: antes de publicar cualquier componente nuevo, lo exponía al equipo en un workshop. Decisiones colectivas sobre funcionalidad, variantes y estados. Si todos participaban en definirlo, todos lo adoptaban.

La diseñadora Jr. no solo empezó a usar el sistema. Empezó a proponer mejoras. Sus preguntas retroalimentaron directamente cada versión del DS. El debate sobre el outline de un input no era pérdida de tiempo: era el proceso de hacer que el sistema le perteneciera a todos.

### 02 · El ProductCard: componente custom sobre base NUXT

NUXT UI resolvía bien los componentes estándar. El problema era que las cards de producto de GroWrk tenían requerimientos específicos que UTable o UCard no cubrían de forma nativa.

Desarrollamos un proceso de workshops para construir componentes custom sobre la base de NUXT. El ProductCard combinó múltiples componentes existentes en uno nuevo, con propiedades reutilizables en todas las plataformas. Cuando se necesitaba una característica adicional, se integraba como variante, no como componente nuevo.

El resultado: una pieza que escala. Menos deuda de consistencia, más velocidad de implementación.

### 03 · Migrar a NUXT/Tailwind: soltar el DS custom

Teníamos un Design System de Figma bien construido. Pero el responsivo era un dolor constante para ingeniería: cada componente custom requería mantenimiento en código que el equipo de diseño no controlaba.

La migración fue una iniciativa de ingeniería. Decidí abrazarla en lugar de defenderme. Mi postura fue clara: lo mejor para el producto por encima del sistema que yo había construido. Adapté NUXT al lenguaje visual de GroWrk y documenté cada ajuste en Figma y en código.

Por primera vez, diseño e ingeniería trabajaban sobre la misma base. El responsivo dejó de ser un conflicto. El sistema bilingüe cerró un gap de tres años.

### 04 · Limpiar los iconos: de 330 a 234

La librería original acumuló 330 iconos a lo largo de dos años. Muchos eran redundantes, otros estaban desactualizados, y varios nunca habían llegado a producción.

En la V3 hicimos una auditoría completa de uso real. Eliminamos redundancias, homologamos estilos y documentamos los 234 iconos en uso activo. Cada uno con nomenclatura consistente con el sistema de NUXT.

Menos iconos, más claridad. El equipo ya no pierde tiempo decidiendo cuál de las tres versiones del icono de usuario usar.

---

## 04 · La siguiente capa — AI Design Architecture

**¿Y si el Design System pudiera diseñar contigo?**

Al tener toda la documentación del DS centralizada en Notion y Figma, surgió una pregunta natural: ¿podíamos convertir esas reglas en contexto para un modelo de IA que generara UI directamente desde ellas?

En conjunto con el PM, construimos un AI Playground: un proyecto en código que contiene todas las reglas del DS (design.md, rules.md, skills.md) como contexto inyectado. Cualquier miembro del equipo puede describir una pantalla en lenguaje natural y recibir una propuesta que sigue el sistema de diseño de GroWrk.

El proceso tomó cerca de dos meses, trabajando en paralelo a nuestras responsabilidades normales. Conforme salían al mercado modelos más capaces, la calidad de las propuestas mejoró de forma sostenida.

**Primer prompt:** 80–90% de fidelidad al DS desde el primer output

**Con auditoría IA:** 99–100% de fidelidad tras revisión automatizada

![ai_playground_fidelity.png](/images/projects/growrk-design-system/ai_playground_fidelity.png)

> "Creemos que es una herramienta que va a cambiar la forma en que diseñamos."
> — PM, GroWrk Remote

> "Ya quiero probarla, se ve que nos va a ahorrar mucho tiempo."
> — Sony, Diseñadora, GroWrk Remote

---

## 05 · Impacto

**Lo que cambió, en números y en cultura.**

![impact_dashboard.png](/images/projects/growrk-design-system/impact_dashboard.png)

| Métrica | Descripción |
|---|---|
| ~40% | Reducción en tiempo de diseño. De 2–3 horas a 20 minutos en tablas complejas |
| 40 | Componentes en V3 con documentación en Figma y código |
| 300+ | Tokens totales. Sistema bilingüe: diseño e ingeniería |
| 234 | Iconos homologados. Librería limpia, sin redundancias |
| 34 | Imágenes documentadas, usadas en producción y centralizadas |
| 5 | Plataformas servidas: Client, Staff, Supplier, Employee y Website |
