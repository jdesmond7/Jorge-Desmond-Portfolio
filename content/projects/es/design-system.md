---
title: "Design System: El Motor de Escala"
slug: design-system-motor-de-escala
locale: es
order: 3
type: child
parentSlug: growrk
cardNumber: "GroWrk 1.3"
problem: "Los equipos de diseño e ingeniería hablaban idiomas distintos"
description: "Arquitectura de Design Tokens y componentes reutilizables integrados con Nuxt UI y Tailwind, el sistema que hizo posible todo lo demás."
year: "2022-2026"
client: "GroWrk Remote"
roles: "Sr. Product Designer · Design System Lead"
tags: ["Design Systems", "Design Tokens", "Component Library", "Figma", "NUXT UI", "AI-Assisted Design", "Design Ops", "B2B SaaS"]
learning: "Un Design System no es una librería de componentes. Es la decisión colectiva de cómo un equipo quiere trabajar. Sin adopción, no existe. Sin ingeniería, no escala. Un componente perfecto en Figma que nadie usa vale menos que uno imperfecto que todo el equipo adopta. El verdadero trabajo no fue dibujar componentes, fue lograr que un equipo entero hablara el mismo idioma."
metrics:
  - value: "~40%"
    label: "Reducción en tiempo de diseño (de 2-3 horas a 20 minutos en tablas complejas)"
  - value: "40"
    label: "Componentes en V2 con documentación en Figma y código"
  - value: "300+"
    label: "Tokens totales. Sistema bilingüe: diseño e ingeniería"
  - value: "234"
    label: "Iconos homologados. Librería limpia, sin redundancias"
  - value: "34"
    label: "Imágenes documentadas, usadas en producción y centralizadas"
  - value: "5"
    label: "Plataformas servidas: Client, Staff, Supplier, Employee y Website"
coverImage: /images/projects/growrk-design-system/design-system-growrk.png
cardImage: /images/projects/growrk-design-system/growrk-design-system-card.png
---

## 01 · El problema

**Sin un sistema compartido, diseño e ingeniería hablaban idiomas distintos. En producción, cada componente existía en tres versiones simultáneas.**

El producto de GroWrk funcionaba sobre una base frágil. Los diseños originales habían nacido en PowerPoint y Google Slides. Había una paleta de colores en Figma, pero no un sistema. Cada feature nueva obligaba a reinventar decisiones ya tomadas.

El problema se volvió crítico al tercer año, durante la actualización de identidad visual. En producción convivían decenas de versiones del mismo botón, cada developer lo había resuelto a su manera. El Design System de Figma existía, pero ingeniería no lo implementaba: eran dos mundos paralelos.

El objetivo quedó claro: una sola fuente de verdad, compartida por diseño e ingeniería, construida sin detener el producto.

---

## 02 · El proceso: 3 etapas, 3 aprendizajes

**Un Design System no se construye de una vez. Se cultiva.**

El sistema pasó por dos iteraciones sobre una misma base y, finalmente, un rearranque tecnológico. Cada etapa resolvió el límite de la anterior.

### V1 · 2022 · La primera versión
- Construida en paralelo al producto, sin congelar features
- 31 componentes base, 250 tokens en 6 categorías, 330 iconos
- Único usuario: yo

> El sistema existía pero nadie más lo usaba.

### V1.2 · 2023 · Un refinamiento sobre la misma base
- La actualización de identidad visual expuso las inconsistencias acumuladas en producción: cada developer había construido su propio botón
- Primera adopción real por parte de otros diseñadores
- La diseñadora Jr. comenzó a usarlo y sus preguntas retroalimentaron el sistema directo
- Primeras conversaciones con devs para migrar componentes a Storybook
- El DS de Figma y el código seguían siendo mundos paralelos

> No era un sistema nuevo: un refinamiento sobre la misma base.

### V2 · 2026 · El rearranque (NUXT UI)
- Archivo nuevo sobre tecnología nueva: NUXT UI + Tailwind, base compartida con ingeniería desde el inicio
- 40 componentes con comportamiento definido en código y Figma
- ~300 tokens sobre una nomenclatura común
- Por primera vez, diseño e ingeniería trabajaban sobre el mismo lenguaje

> Esta es la versión que sigo manteniendo y escalando hoy.

![design-system-growrk.png](/images/projects/growrk-design-system/design-system-growrk.png)

---

## 03 · Tokens

**La capa atómica del sistema.**

Definí más de 300 tokens de color, tipografía, espaciado, radios y sombras, organizados en una nomenclatura compartida por diseño e ingeniería. Un cambio en un token se propaga a todo el producto sin editar una sola pantalla a mano.

Los tokens de color se estructuraron en primitivos (valores base del brand) mapeados a tokens semánticos. Esto eliminó los overrides manuales entre temas y redujo el riesgo de error humano en diseños listos para producción. El espaciado y los radios se estandarizaron en escalas fijas, y los breakpoints se definieron como variables para automatizar el comportamiento responsivo.

<!-- ds-token-explorer -->

---

## 04 · Componentes

**Del token al componente compuesto.**

Sobre los tokens se construyó la librería: 40 componentes documentados en Figma y código, cada uno con sus variantes y estados. El objetivo del refactor fue reducir variantes duplicadas y componer en lugar de multiplicar.

<!-- ds-component-playground -->


---

## 05 · Documentación

**Un componente sin documentación es una sugerencia, no un estándar.**

Toda la fuente de verdad vive en Notion, conectada a Figma y al código. Cada componente tiene su propia entrada con la misma estructura, para que cualquier persona (diseño, ingeniería o alguien que acaba de entrar) sepa exactamente cómo y cuándo usarlo sin preguntar.

![components-documentation-notion.jpg](/images/projects/growrk-design-system/components-documentation-notion.png)

Cada entrada documenta:

- **Reglas de uso.** Las condiciones bajo las que el componente aplica, y las que no.
- **Tokens exactos.** Los valores precisos que viven en Figma (color, espaciado, tipografía, radios), enlazados a su token, no copiados a mano.
- **Contexto de uso.** En qué pantallas y flujos se usa, y con qué propósito.
- **Do's and Don'ts.** Ejemplos concretos de uso correcto e incorrecto, para cerrar la puerta a la interpretación.
- **Histórico de cambios.** Un registro de cada modificación que ha sufrido el componente, con fecha y motivo. Y un espacio para proponer cambios futuros que se discuten con el equipo antes de aplicarse.

El histórico es la pieza que mantiene vivo el sistema. Ningún componente cambia por decisión unilateral: cada ajuste queda documentado y se consulta con el equipo. Eso evita que el DS se fragmente con el tiempo, que es exactamente el problema del que partimos.

> [!info] La documentación no es el final del trabajo de diseño. Es lo que lo vuelve reutilizable.

---

## 06 · Decisiones clave

**Un Design System es una serie de decisiones sobre cómo quieres que un equipo trabaje.**

### Tratar el DS como producto, no como entregable.

Al inicio el sistema era mi proyecto: lo construía y lo mantenía solo. Cambié el proceso e introduje workshops por componente antes de publicarlo, con decisiones colectivas sobre funcionalidad, variantes y estados. La adopción dejó de ser una imposición: quien participa en definir, adopta. La diseñadora Jr. pasó de usar el sistema a proponer mejoras que retroalimentaron cada versión.

### ProductCard: custom sobre base NUXT.

NUXT UI resolvía los componentes estándar, pero las cards de producto de GroWrk requerían lógica que UTable o UCard no cubrían de forma nativa. Construí el ProductCard combinando múltiples componentes NUXT en uno reutilizable. Las necesidades nuevas se integran como variante, no como componente nuevo. Menos deuda de consistencia, más velocidad de implementación.

### Migrar a NUXT/Tailwind.

El DS custom de Figma estaba bien construido, pero el responsivo exigía mantenimiento en código que diseño no controlaba. La migración fue iniciativa de ingeniería y decidí abrazarla en lugar de defender el sistema propio. Adapté NUXT al lenguaje visual de GroWrk y documenté cada ajuste en Figma y código. El responsivo dejó de ser un conflicto y el sistema bilingüe cerró un gap de tres años.

### Auditoría de iconos: de 330 a 234.

La librería había acumulado 330 iconos en dos años, muchos redundantes o sin uso en producción. Una auditoría completa de uso real eliminó redundancias, homologó estilos y dejó 234 iconos activos con nomenclatura consistente. El equipo dejó de perder tiempo eligiendo entre tres versiones del mismo icono.

---

## 07 · La siguiente capa - Diseño con IA

**¿Y si el Design System pudiera diseñar contigo?**

Con el sistema maduro y la documentación centralizada, las reglas ya estaban escritas y ordenadas. El siguiente paso fue convertirlas en contexto para que una IA generara UI fiel al sistema desde el primer prompt.

Esa exploración se volvió un proyecto por derecho propio. El Design System fue la base que lo hizo posible: sin tokens, componentes y reglas bien definidas, no habría contexto que darle a la IA.

[Ver el caso completo: AI Playground →](/proyectos/ai-playground)
