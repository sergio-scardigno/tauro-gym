# Spec: Embudo de Contacto Híbrido Mejorado

**Fecha:** 2026-05-03
**Proyecto:** Tauro Team Landing Page
**Estado:** Aprobado

---

## 1. Objetivo

Capturar más leads en el embudo contact → WhatsApp, sin perder la riqueza del formulario actual.

---

## 2. Cambios

### 2.1 Botón flotante inteligente (WhatsAppFloatingButton.tsx)

**Ubicación:** Esquina inferior derecha (fixed), se mantiene.

**Comportamiento actual:** Click abre WhatsApp con mensaje genérico.

**Nuevo comportamiento:** Click abre popover con 5 botones de objetivo:

| Objetivo | Mensaje pre-llenado |
|---|---|
| Bajar de peso | "Hola! Quiero entrenar para bajar de peso. ¿Cuáles son los horarios disponibles?" |
| Aprender técnica | "Hola! Quiero aprender técnica de Kickboxing/Muay Thai. ¿Cuáles son los horarios disponibles?" |
| Defensa personal | "Hola! Me interesa defensa personal. ¿Cuáles son los horarios disponibles?" |
| Competir | "Hola! Quiero competir. ¿Me cuentan cómo funciona el programa de competencia?" |
| Fitness | "Hola! Quiero entrenar fitness. ¿Cuáles son los horarios disponibles?" |

El popover tiene fondo blanco, bordes redondeados, sombra. Cada botón abre WhatsApp en nueva pestaña con el mensaje correspondiente.

### 2.2 Barra sticky media página (StickyWhatsAppBar.tsx)

**Nuevo componente.**

**Condición de aparición:** Se muestra cuando el scroll > 50% de la altura de la página Y el usuario no está en la sección contacto.

**Condición de ocultamiento:** Se oculta cuando el usuario entra en la sección contacto.

**Ubicación:** Fixed en la parte inferior de la pantalla.

**Contenido:**
- Texto: "¿Tenés dudas? Escribinos"
- Botón WhatsApp (estilo verde, pequeño)

**Responsive:** Solo se muestra en desktop (lg+). En mobile el botón flotante cumple esa función.

**Estilo:** Fondo oscuro semi-transparente (gray-900/90), texto blanco, botón verde igual al flotante.

### 2.3 Formulario de contacto (Contact.tsx)

Sin cambios. Se mantiene como está.

---

## 3. Arquitectura de componentes

```
WhatsAppFloatingButton.tsx  →  Se modifica para abrir popover
StickyWhatsAppBar.tsx      →  Nuevo componente
Contact.tsx                →  Sin cambios
```

---

## 4. No incluye

- Analytics ni tracking de eventos
- Cambios en el formulario de contacto
- Modificaciones en el footer o navbar