---
title: "Grupo Salinas: TPremia, un programa de lealtad para cuatro marcas"
slug: grupo-salinas
locale: es
order: 6
type: child
problem: "Cuatro marcas, cuatro clientes distintos, un solo programa de lealtad"
description: "Lideré el diseño de TPremia, el programa de lealtad de Grupo Salinas para cuatro marcas: Banco Azteca, Elektra, Presta Prenda e ITALIKA. Un sitio de registro y una app de catálogo de recompensas, diseñados para usuarios de baja alfabetización digital. La semilla de mi obsesión por los sistemas que escalan."
year: "2020-2021"
client: "Grupo Salinas · TPremia"
duration: "11 meses (abr 2020 - feb 2021)"
roles: "Lead Product Designer"
team: "Trabajo individual, luego transferido a los equipos de diseño de cada marca"
tools: "Figma"
tags: ["Product Design", "Design Systems", "Multi-brand", "Loyalty", "Fintech", "Retail", "UX/UI", "Scalability"]
learning: "Este proyecto me enseñó el valor de la escalabilidad antes de tener las herramientas para nombrarla. Diseñé cuatro Design Systems en archivos separados, pero construidos sobre las mismas bases: se veía claro que pertenecían al mismo proyecto aunque fueran de marcas distintas. Años después, cuando Figma liberó los tokens, los adopté de inmediato, porque ya había vivido en carne propia el valor de que los archivos compartan cimientos. La escalabilidad no empezó con una feature, empezó con una forma de pensar."
metrics:
  - value: "4"
    label: "Marcas: Banco Azteca, Elektra, Presta Prenda e ITALIKA"
  - value: "4"
    label: "Design Systems con bases compartidas, uno por marca"
  - value: "2 años"
    label: "En operación antes de unificarse en un solo sistema de lealtad"
  - value: "Nacional"
    label: "Lanzamiento a nivel país, con Elektra y Banco Azteca como los de mayor éxito"
  - value: "1 → nación"
    label: "De un diseñador al despliegue con los equipos de cada marca"
coverImage: /images/projects/grupo-salinas/banner-grupo-salinas-projects.png
cardImage: /images/projects/grupo-salinas/grupo-salinas-card-project.png
showInHome: true
---

## 01 · El contexto

**TPremia es el programa de recompensas de Grupo Salinas: reconoce al cliente y le da beneficios por sus compras, créditos, envíos de dinero y todas las transacciones que realiza. El reto: cuatro marcas que no se parecen en nada bajo un mismo sistema.**

Grupo Salinas es uno de los conglomerados más grandes de México. Me sumé para liderar el diseño de TPremia, su programa de lealtad, para cuatro de sus marcas clave: Banco Azteca, Elektra, Presta Prenda e ITALIKA.

El objetivo de negocio era claro: un programa transversal donde el cliente acumula puntos T por sus transacciones y los canjea por recompensas (desde boletos de cine hasta descuentos y productos). El reto de diseño no lo era tanto. Un banco y una tienda departamental no se comportan igual, ni tienen los mismos clientes, ni las mismas acciones que generan valor. Había que unificarlos sin borrar lo que hace única a cada marca.

Y todo para una audiencia difícil: usuarios de baja alfabetización digital, personas mayores, con bajo nivel socioeconómico y educativo. Cero margen para interfaces confusas.

---

## 02 · Mi rol

**Lead Product Designer. Del diseño en solitario a la transferencia con los equipos de cada marca.**

Trabajé como Lead Product Designer, en solitario durante la fase de diseño. Una vez definido el sistema, compartí todo el trabajo con los equipos de diseño de cada marca para que ellos lo permearan con sus propios equipos.

Mi rol no era solo diseñar pantallas. Le comunicaba al Product Owner los descubrimientos del proyecto y mis hipótesis sobre los puntos de fricción que el usuario podría enfrentar. Diseñar para este público significaba anticipar dónde se iban a trabar, antes de que pasara.

---

## 03 · Qué construimos

**Un sitio para entrar al programa, y una app para vivir las recompensas.**

TPremia tenía dos grandes zonas. La primera, el sitio de acceso: registro (con datos obligatorios, aceptación de términos y verificación por SMS), inicio de sesión, y sus flujos de recuperación de UID y contraseña vía token. La segunda, la app interna: un catálogo de recompensas y un visor donde el usuario ve sus puntos T acumulados, su nivel, y los beneficios que va desbloqueando.

![arquitectura-grupo-salinas.png#compact](/images/projects/grupo-salinas/arquitectura-grupo-salinas.png)

El home mostraba lo esencial de un vistazo: cuántos puntos tienes, cuánto te falta para tu siguiente recompensa, y tu progreso de nivel. Todo apoyado en una barra de progreso y momentos "wow" (como un bono de puntos por antigüedad) para reforzar la sensación de avance.

---

## 04 · Diseñar para el usuario más difícil

**Cuando tu usuario nunca ha usado una app, cada interacción cuenta.**

El público objetivo era el más exigente posible para un producto digital: personas con poca o nula experiencia digital. Eso obligó a pensar cada interacción y microinteracción con un solo criterio: claridad absoluta.

Dejé toda la información en plataforma lo más explícita posible, apoyada en iconografía clara que señalara las acciones concretas que el usuario debía realizar. Nada implícito, nada que dar por supuesto. Si el usuario tenía que hacer algo, el diseño se lo decía con palabras e íconos, no con convenciones que quizá no conocía.

![user-persona-grupo-salinas.png](/images/projects/grupo-salinas/user-persona-grupo-salinas.png)

---

## 05 · La decisión clave - rediseñar el modelo, no solo la pantalla

**Banco Azteca fue la marca más difícil. Y ahí la decisión importante no fue de UI, fue de negocio.**

Banco Azteca fue la primera marca que trabajé, y la más compleja. El modelo original planteaba que los usuarios registraran su cuenta en la plataforma y la ligaran con su número de tarjeta, para que cada operación bancaria (un depósito, un retiro, revisar saldo) generara puntos automáticamente.

Vi un problema de raíz. Para este usuario, registrar su cuenta bancaria en una plataforma en línea era una barrera enorme de confianza. El modelo asumía un nivel de comodidad digital que este público no tenía. Se lo planteé al Product Owner.

La solución para la fase 1 rediseñó el flujo completo. En lugar de ligar la cuenta bancaria, el usuario se registraba y obtenía un número de cuenta propio de la app. Al hacer una operación en ventanilla, mostraba su webapp (donde venía su número) o una imagen descargable, y el cajero registraba la operación, generando los puntos. La confianza se preservaba: nadie tenía que meter datos bancarios sensibles en línea.

Para las demás marcas (venta de productos o servicios), el flujo era más directo: cada transacción generaba puntos, mostrando el mismo número o imagen de usuario. Pero Banco Azteca marcó la pauta de cómo resolver la fricción de confianza sin sacrificar el objetivo de negocio.

El mejor diseño de Banco Azteca no fue una pantalla. Fue cambiar cómo el usuario ganaba puntos, para que se sintiera seguro haciéndolo.

---

## 06 · Cuatro sistemas, una misma raíz

**Cuatro Design Systems separados, construidos sobre las mismas bases.**

Cada marca lanzó su propia versión del producto: distinta pero reconocible como parte del mismo proyecto. Para sostenerlo, construí cuatro Design Systems, uno por marca.

¿Por qué cuatro y no uno? Cada marca tenía sus diferencias reales: colores, espaciados, tipografías. Y en 2020 los tokens de Figma todavía no existían (llegaron en 2023), así que la única forma de dar identidad propia a cada marca era un archivo separado.

Pero separados no significó desconectados. Diseñé los cuatro sistemas compartiendo las mismas bases estructurales. Aunque los archivos no estaban ligados técnicamente, se veía con claridad que pertenecían al mismo proyecto. Esa decisión, tomada por instinto de escalabilidad antes de tener la herramienta para automatizarla, optimizó todo el proceso.

![grupo-salinas-design-system.png](/images/projects/grupo-salinas/grupo-salinas-design-system.png)

Tras dos años de operación, los programas se unificaron en un solo sistema de lealtad para todas las marcas, simplificando la experiencia del cliente y fortaleciendo la lealtad transversal en Grupo Salinas. Esa unificación validó la apuesta inicial: los sistemas ya compartían raíz, así que juntarlos fue evolución, no reconstrucción.
