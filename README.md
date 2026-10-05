# Copa Nacional de Fútbol — Página de resultados

Página web para seguir una copa de fútbol: **tabla de posiciones automática** de los dos grupos,
**fase de grupos con todos los enfrentamientos**, **eliminatorias (cuartos, semifinales, tercer lugar y
final)**, **plantilla de jugadores** y **tabla de goleadores**.

Todo se configura **desde la propia página**, con el botón **⚙️ Administrar**, protegido con una
contraseña que solo tú conoces.

## Estructura del torneo

| Fase | Partidos |
|---|---|
| Grupo A (6 equipos, todos contra todos: 5 jornadas × 3 partidos) | 15 |
| Grupo B (6 equipos, todos contra todos: 5 jornadas × 3 partidos) | 15 |
| Cuartos de final (clasifican los 4 primeros de cada grupo: 1A-4B, 2A-3B, 1B-4A, 2B-3A) | 4 |
| Semifinales | 2 |
| Tercer lugar | 1 |
| Final | 1 |
| **Total** | **38** |

## Archivos

| Archivo | Para qué sirve | ¿Se edita? |
|---|---|---|
| `index.html` | Estructura de la página, las pestañas y el panel | No |
| `datos.js` | Datos iniciales y configuración de acceso | Opcional |
| `app.js` | Dibuja la página y guarda los datos | No |
| `admin.js` | Panel de configuración y contraseña | No |
| `estilos.css` | Colores, tipografía y diseño | Solo si quieres cambiar el aspecto |
| `Publicar en GitHub.cmd` | **Sube los cambios a GitHub en un doble clic, sin contraseña** | No |
| `Publicar cambios.cmd` | Igual, pero con el inicio de sesión normal de Git (respaldo) | No |

## Cómo ver la página

**Opción 1 (recomendada, en VS Code):** clic derecho sobre `index.html` → **Open with Live Server**.

**Opción 2:** abrir `index.html` con doble clic (funciona en cualquier navegador; pulsar F5 tras cada cambio).

Dentro de la carpeta hay dos accesos directos: **Copa - copia local.url** (tu PC) y
**Copa - internet.url** (la versión publicada).

## El panel de administración (⚙️ Administrar)

### Primera vez

1. Pulsa **⚙️ Administrar**.
2. Como todavía no hay contraseña, la página te pide **crear una** (mínimo 4 caracteres, se escribe dos veces).
3. Se guarda cifrada con **SHA-256** en ese navegador. La sesión dura hasta que cierres la pestaña o pulses
   **Cerrar sesión**.

Si prefieres una contraseña fija desde el principio, escríbela en `datos.js`:

```js
const CONFIG_ADMIN = {
  claveInicial: "mi-clave",   // opcional
  bloquearVisitantes: true
};
```

### Qué puedes configurar

| Pestaña | Qué se edita |
|---|---|
| **Torneo** | Nombre, temporada, descripción, fecha de actualización, puntos por victoria/empate y cuántos clasifican por grupo |
| **Equipos** | Añadir, borrar o cambiar el id, el nombre y el grupo. Si cambias un id, los partidos se actualizan solos |
| **Partidos** | Fase, jornada, fecha, **los dos equipos en desplegables** y los marcadores (vacío = no jugado). Abajo te dice qué equipos no tienen ningún partido |
| **Plantilla** | Los 12 equipos ya vienen con **20 fichas cada uno** (dorsal y posición puestos): solo escribes los nombres. Botones para añadir ficha a un equipo, borrar con ✕, ordenar y vaciar nombres |
| **Goleadores** | Jugador, equipo y goles |
| **Seguridad** | Cambiar o quitar la contraseña |
| **Datos** | Guardar, descargar `datos.js`, exportar/importar copia JSON y restablecer los datos del archivo |

Cada cambio se **guarda automáticamente** (aparece "Guardado a las 10:32:05" arriba) y la página se
redibuja al instante formando la tabla de posiciones sola.

### Detalles útiles del editor de partidos

- Cada lado del enfrentamiento es un **desplegable con los 12 equipos**; en las eliminatorias también
  aparecen los comodines (`1A`, `2B`, `Ganador QF1`, `Perdedor SF1`...).
- **No se puede repetir el mismo equipo** en los dos lados: si lo intentas, el campo se limpia y te avisa.
- El botón **+ Añadir partido** crea uno nuevo con los dos equipos ya elegidos y sin marcador.

### Plantilla de referencia (20 jugadores por equipo)

| Posición | Dorsales |
|---|---|
| Porteros (3) | 1, 12, 23 |
| Defensas (6) | 2, 3, 4, 5, 6, 15 |
| Mediocampistas (6) | 8, 10, 14, 16, 17, 20 |
| Delanteros (5) | 7, 9, 11, 18, 19 |

Las fichas **sin nombre no se muestran** en la página. En la pestaña **Plantilla** puedes elegir el equipo
en un selector (o ver "Todos los equipos") y cada tarjeta indica cuántos nombres llevas puestos.

### Dónde se guardan los cambios

Se guardan en el **navegador** (almacenamiento local). Eso significa que:

- Si abres la página en otro navegador u otra computadora, verás los datos de `datos.js`, no los tuyos.
- Para que los datos queden también en el código, usa **Datos → Descargar datos.js** y reemplaza el
  archivo del proyecto (o publica con `Publicar cambios.cmd`).
- **Datos → Restablecer** borra lo guardado en el navegador y vuelve a lo que dice `datos.js`.

## Los datos en `datos.js` (si prefieres editar el archivo a mano)

```js
// Enfrentamientos: null = no jugado
{ fase: "Grupo A", jornada: "Jornada 1", fecha: "12 de enero",
  local: "pri", visitante: "ssp", golesLocal: 2, golesVisitante: 1 },

// Plantilla: nombre, dorsal, posición y equipo
{ nombre: "Yordanis Sánchez", dorsal: 10, posicion: "Delantero", equipo: "hab" },

// Goleadores
{ jugador: "Yordanis Sánchez", equipo: "hab", goles: 3 },
```

Después de editar el archivo, guarda y recarga la página. Si antes habías usado el panel, pulsa
**Datos → Restablecer a los datos del archivo** para que la página tome lo que dice el archivo.

## Sobre la seguridad de la contraseña

**Importante:** esto es una página estática (HTML y JavaScript). La contraseña impide que un visitante
curioso toque tus datos desde la página, pero **no es seguridad real**: cualquiera que tenga los archivos
en su computadora puede leer el código. Si algún día la publicas y necesitas protección de verdad, hace
falta un servidor con usuarios y permisos.

- La contraseña **no se guarda en texto plano**: se guarda su hash SHA-256 con una sal aleatoria.
- Tras 5 intentos fallidos, el acceso se bloquea 30 segundos.
- Si olvidas la contraseña: F12 → consola → `localStorage.removeItem("copa-futbol-seguridad-v1")`, o usa
  **Datos → Restablecer a los datos del archivo**.

## Publicar en internet (GitHub Pages) — enlace https

**La página ya está publicada:** <https://royrafa010-bit.github.io/copa-futbol/>
Repositorio: <https://github.com/royrafa010-bit/copa-futbol>

### Cómo actualizar los resultados (un solo doble clic)

Los visitantes ven el archivo `datos.js` del repositorio, **no** los cambios guardados en tu navegador:

1. En la página: **⚙️ Administrar → Datos → Descargar datos.js**.
2. Doble clic en **`Publicar en GitHub.cmd`** (el script copia el `datos.js` nuevo, guarda el cambio en Git,
   lo sube y comprueba que la página responde). **No pide contraseña**: usa el token que Windows ya tiene guardado.

También puedes ejecutarlo con un mensaje propio:

```powershell
powershell -ExecutionPolicy Bypass -File publicar_github.ps1 -Mensaje "Jornada 3"
```

**Alternativa** si algún día falta el token: doble clic en `Publicar cambios.cmd` (ese usa el inicio de sesión
normal de Git y puede pedirte autorizar en el navegador).

### Qué es público y qué no

- **Público:** el código y los datos de `datos.js` (equipos, enfrentamientos, plantilla y goleadores).
- **Privado:** la contraseña del panel, que se guarda cifrada **en tu navegador**, nunca en el repositorio.
  No escribas una contraseña real en `claveInicial` de `datos.js`, porque ese archivo se publica.
- Cualquier visitante puede modificar *su propia copia* en su navegador, pero eso solo lo afecta a él: lo
  que ven todos es lo que está en `datos.js`.

## Detalles de la implementación

- JavaScript puro, sin librerías ni instalación.
- Orden de carga: `datos.js` → `app.js` → `admin.js` (con `?v=` para evitar mezclas de versiones en la caché).
- Criterios de desempate de la tabla: puntos → diferencia de goles → goles a favor → nombre.
- La marca **clasifica** solo aparece cuando ya hay resultados en ese grupo.
- Cada vista y cada sección del panel están aisladas: si algo falla, el resto sigue funcionando y se avisa.
- Estilos de impresión: el botón **Imprimir** genera una hoja limpia, sin menús ni panel.

## Ideas para seguir mejorando

- Escudos o banderas de cada equipo y foto del jugador.
- Cuadro visual de eliminatorias (bracket) con líneas entre rondas.
- Estadísticas por jugador enlazadas con la plantilla (goles, partidos jugados).
- Historial de campeones por temporada.
