---
title: "GroWrk · Suppliers Platform"
slug: suppliers-platform
locale: es
order: 4
type: child
parentSlug: growrk
problem: "La información de proveedores vivía dispersa en hojas de cálculo y correos manuales"
description: "Lideré la iniciativa de UX para centralizar la gestión de proveedores de GroWrk, mentoreando a un diseñador Junior y alineando al CEO. Propuse una herramienta de facturación automática que bajó las cotizaciones de 30 a 10 minutos. El proyecto reveló una oportunidad de producto externa que construí de cero, y que enseñó tanto al funcionar como al apagarse."
year: "2023–2024"
client: "GroWrk Remote · Los Angeles, California, United States"
duration: "1 año (2023–2024)"
roles: "UX Lead · Product Designer"
team: "Diseñador UI Junior, Product Owner, CEO, Ingeniería"
tools: "Figma · FigJam · Notion"
tags: ["Product Design", "UX Research", "Design Systems", "B2B", "Enterprise UX", "Workflow Automation", "Team Leadership", "Web App"]
learning: "El buen diseño de producto no termina en la interfaz. Diseñar para un ecosistema B2B es entender por qué alguien haría, o no haría, el trabajo que tu producto le pide. La plataforma interna funcionó porque el equipo sintió el ahorro en su propio día. El app externo se apagó porque los proveedores no tenían incentivo para usarlo. Misma calidad de diseño, resultado opuesto. La diferencia no estuvo en las pantallas, estuvo en los incentivos."
metrics:
  - value: "60–75%"
    label: "Reducción en tiempo de preparación de cotizaciones"
  - value: "2–3 hrs"
    label: "Ahorradas al día a nivel equipo"
  - value: "100%"
    label: "Gestión de datos de proveedores centralizada"
  - value: "1 mes"
    label: "Adopción completa de la plataforma interna"
  - value: "Nueva"
    label: "Herramienta de facturación automática (iniciativa propia)"
  - value: "0"
    label: "Spreadsheets manuales tras la transición"
coverImage: /images/projects/growrk-suppliers-platform/banner-growrk-suppliers.png
---

## 01 · El problema

**La información de proveedores vivía dispersa en hojas de cálculo y cadenas de correo. Cada cotización era un trabajo manual, lento y propenso a errores.**

GroWrk gestiona relaciones con proveedores en múltiples regiones, manejando datos en constante cambio: precios, catálogos de producto, disponibilidad regional, contactos y datos de transferencia. Antes de esta iniciativa, todo eso estaba fragmentado entre spreadsheets y flujos de correo manuales.

El costo era operativo y real. Visibilidad limitada, tiempos de respuesta lentos al cliente, y riesgo creciente entre los equipos de Logística, Finanzas y Operaciones. La falta de datos centralizados no solo frenaba al equipo. Limitaba la capacidad de escalar a nuevas regiones.

La petición inicial fue simple: centralizar los datos de proveedores en una plataforma interna donde los equipos pudieran ver, actualizar y gestionar información. Pero conforme descubrimos las ineficiencias reales del flujo, lo que empezó como una herramienta de visibilidad se convirtió en una capacidad operativa central. Y eventualmente, en la base de un Supplier App y una API.

---

## 02 · Mi rol

**Lideré la iniciativa de UX de punta a punta. Mentoré a un diseñador Junior, alineé al CEO, y mantuve ownership de las decisiones de sistema.**

Lideré la iniciativa de UX para la plataforma de Suppliers, colaborando de cerca con el Product Owner, el CEO, Ingeniería y stakeholders operativos. Trabajé junto a un diseñador UI Junior, distribuyendo responsabilidades de forma estratégica mientras mantenía la dirección general, el proceso de discovery y las decisiones a nivel sistema.

Mi trabajo se dividió en tres frentes:

Alineación con stakeholders. Trabajé directo con el Product Owner y el CEO para definir alcance y oportunidad de largo plazo. Estructuré y facilité focus groups para descubrir flujos operativos y dolores reales, traduciendo los hallazgos en un user flow completo.

Dirección de diseño. Guié al diseñador Junior a lo largo del wireframing y el diseño de alta fidelidad, mentoreándolo en el proceso y asegurando alineación con los objetivos de negocio y los estándares del sistema.

Sistema e implementación. Desarrollé el prototipo interactivo para validación y extendí el Design System con nuevos componentes para la gestión de proveedores, documentando cada cambio y trabajando con Ingeniería para una implementación escalable.

> Aunque las responsabilidades estaban distribuidas, retuve el ownership de las decisiones estratégicas, la comunicación con stakeholders y la validación final de UX.

---

## 03 · Descubrimiento

**Elegí focus groups en vez de entrevistas 1:1. La complejidad operativa lo pedía.**

Dada la complejidad de la gestión de proveedores, decidí conducir focus groups estructurados (3 a 5 stakeholders por sesión) en lugar de solo entrevistas individuales. La razón: el formato grupal genera diálogo, expone dependencias ocultas, y saca a la luz los workarounds no documentados que una entrevista uno a uno se perdería.

Juntos mapeamos el flujo completo de proveedores, identificando puntos de contacto de datos, tareas manuales, procesos repetitivos, cuellos de botella en la preparación de cotizaciones, y áreas propensas a error.

<!-- IMG: growrk-suppliers-userflow.png — Sección del user flow de proveedores creado durante los focus groups (FigJam, 2024) -->

![growrk-suppliers-userflow.png](/images/projects/growrk-suppliers-platform/growrk-suppliers-userflow.png)

Esta fase de discovery colaborativa creó alineación entre stakeholders y aseguró que la solución reflejara necesidades operativas reales, no suposiciones.

---

## 04 · Ideación y diseño

**De wireframes a una decisión que cambió el alcance del proyecto.**

Con el flujo de trabajo definido, empecé a explorar soluciones estructurales. Los wireframes de baja fidelidad se crearon de forma colaborativa: el diseñador Junior traducía el flujo en conceptos tempranos de layout, mientras yo guiaba estructura, priorización y decisiones de escalabilidad.

Antes de pasar a alta fidelidad, hicimos una sesión de trabajo con Ingeniería para validar viabilidad técnica e identificar oportunidades de automatización. Ahí surgió la decisión más importante del proyecto.

### La herramienta de facturas automáticas

El alcance inicial se enfocaba en visualizar y actualizar datos. Pero al mapear el flujo, vi un dolor que nadie había puesto sobre la mesa: el equipo redactaba cada cotización a mano, en correos de texto plano. Entre 20 y 30 minutos por cotización.

Propuse una herramienta de generación automática de facturas. No estaba en el brief. La planteé porque los datos para construirla ya existían en el sistema que estábamos creando: solo había que conectarlos.

Esto requirió colaboración cercana con Ingeniería para definir dependencias de datos, lógica de automatización, estructura de permisos y consideraciones de escalabilidad. El resultado bajó la preparación de cotizaciones de 20-30 minutos a 5-10.

<!-- IMG: growrk-suppliers-wireframes-lowfi.png — Wireframes de baja fidelidad de las secciones clave del flujo de proveedores (Figma, 2024) -->

![growrk-suppliers-wireframes-lowfi.png](/images/projects/growrk-suppliers-platform/growrk-suppliers-wireframes-lowfi.png)

> La mejor feature del proyecto no estaba en la petición original. Salió de entender el flujo, no de leer el brief.

---

## 05 · Alta fidelidad y sistema

**El Junior ejecutó los mockups. Yo aseguré que todo se sostuviera sobre el sistema.**

El diseñador Junior desarrolló los mockups de alta fidelidad bajo mi mentoría, mientras yo aseguraba la alineación con el Design System en evolución, el uso consistente de componentes, la jerarquía de información clara, y las mejores prácticas de accesibilidad y usabilidad.

Desarrollé el prototipo interactivo usado en las sesiones de validación y las presentaciones. En paralelo, extendí el Design System con nuevos componentes para la gestión de proveedores y documenté cada cambio para que Ingeniería los implementara de forma consistente.

<!-- IMG: growrk-suppliers-hifi-mockups.png — Mockups de alta fidelidad de las secciones clave del flujo de proveedores (Figma, 2024) -->

![growrk-suppliers-hifi-mockups.png](/images/projects/growrk-suppliers-platform/growrk-suppliers-hifi-mockups.png)

<!-- IMG: growrk-suppliers-badge-documentation.png — Documentación del componente Badge en el Design System de GroWrk (Figma / Notion, 2024) -->

![growrk-suppliers-badge-documentation.png](/images/projects/growrk-suppliers-platform/growrk-suppliers-badge-documentation.png)

> Mentorear no es delegar. Es dar dirección suficiente para que alguien crezca, sin soltar el estándar del sistema.

---

## 06 · Validación y adopción

**Feedback positivo. Resistencia inicial. Y un cambio total en cuatro semanas.**

Para minimizar sesgo, conduje sesiones de walkthrough individuales con cada stakeholder en lugar de demos grupales. El feedback fue muy positivo, sobre todo en claridad de visibilidad de datos, ahorro de tiempo, y reducción de esfuerzo manual.

Pero la adopción enfrentó resistencia al inicio. El equipo llevaba años trabajando en hojas de cálculo y el hábito pesaba. En 3 a 4 semanas, la transición fue total. No por imposición, sino porque experimentaron la diferencia: la preparación de cotizaciones bajó de 20-30 minutos a 5-10, los errores manuales disminuyeron, y la transparencia operativa mejoró.

Eso se tradujo en aproximadamente 2 a 3 horas ahorradas al día a nivel equipo.

> La resistencia al cambio no se vence con argumentos. Se vence dejando que la gente sienta el ahorro en su propio trabajo.

---

## 07 · La siguiente apuesta — Supplier App

**El éxito interno reveló una oportunidad más grande. La perseguimos. No funcionó. Y eso también es un resultado.**

La plataforma interna servía a los equipos operativos. Pero al ver las ganancias de eficiencia y la gestión estructurada de datos, el liderazgo identificó una oportunidad: extender esa transparencia hacia afuera, directo a los proveedores.

Trabajé end-to-end en el Supplier App, una plataforma para que los proveedores gestionaran y actualizaran sus propios catálogos. El objetivo era descentralizar las actualizaciones de datos y reducir la dependencia operativa interna. Lo preparamos durante 8 meses entre diseño e ingeniería, y le dimos un año en manos de los proveedores.

<!-- IMG: growrk-supplier-app-screens.png — Pantallas del Supplier App externo (Figma, 2025) -->

![growrk-supplier-app-screens.png](/images/projects/growrk-suppliers-platform/growrk-supplier-app-screens.png)

No funcionó. Tras varias mejoras que ellos mismos pidieron, la adopción nunca despegó. Decidimos apagarlo.

La razón de fondo fueron dos cosas. Primero, no había incentivo claro: mantener su inventario en nuestra plataforma era trabajo extra sin un beneficio directo para ellos. Segundo, la mayoría ya tenía su propio sistema y no veía razón para migrar. El problema no era el diseño. Era la estructura de incentivos del ecosistema.

Desde la perspectiva de producto, fue una oportunidad enorme: construir una solución desde cero, definir flujos para un tipo de usuario nuevo, y validar supuestos sobre ownership, responsabilidad e integración de sistemas. El producto se apagó. El aprendizaje no.

---

## 08 · Reflexión final

**El buen diseño de producto va más allá de la interfaz.**

Esta iniciativa me reforzó algo: el gran diseño de producto no se trata solo de ejecutar pantallas. Requiere entender las realidades operativas, alinear incentivos, anticipar la resistencia al cambio, y construir sistemas que puedan evolucionar con el tiempo.

Lo que empezó como una mejora de eficiencia interna se convirtió en una capacidad estratégica de producto. Y la parte que no funcionó me enseñó tanto como la que sí. Diseñar para un ecosistema B2B no es diseñar pantallas bonitas: es entender por qué alguien haría, o no haría, el trabajo que tu producto le pide.

---

## 09 · Impacto

**Lo que cambió, en números.**

> Nota: Proyecto desarrollado entre 2023 y 2024. El Supplier App externo se mantuvo en operación aproximadamente un año antes de apagarse por baja adopción.

| Métrica | Descripción |
|---|---|
| 60–75% | Reducción en tiempo de preparación de cotizaciones |
| 2–3 hrs | Ahorradas al día a nivel equipo |
| 100% | Gestión de datos de proveedores centralizada |
| 1 mes | Adopción completa de la plataforma interna |
| Nueva | Herramienta de facturación automática (iniciativa propia) |
| 0 | Spreadsheets manuales tras la transición |

