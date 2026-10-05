# Copa Nacional de Fútbol — Página de resultados

Página web para seguir una copa de fútbol: **fase de grupos con tabla de posiciones automática**,
**eliminatorias (cuartos, semifinales, tercer lugar y final)**, **tabla de goleadores** y dos apartados
de disciplina: **🟨 tarjetas amarillas** y **🟥 tarjetas rojas**.

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

## Cómo ver la página

**Opción 1 (recomendada, en VS Code):** clic derecho sobre `index.html` → **Open with Live Server**.

**Opción 2:** abrir `index.html` con doble clic (funciona en cualquier navegador; pulsar F5 tras cada cambio).

## El panel de administración (⚙️ Administrar)

### Primera vez

1. Pulsa **⚙️ Administrar**.
2. Como todavía no hay contraseña, la página te pide **crear una** (mínimo 4 caracteres, se escribe dos veces).
3. Se guarda cifrada con **SHA-256** en ese navegador. La sesión dura hasta que cierres la pestaña o pulses
   **Cerrar sesión**.

Si prefieres una contraseña fija desde el primer momento, escríbela en `datos.js`:

```js
const CONFIG_ADMIN = {
  claveInicial: "mi-clave",   // opcional
  bloquearVisitantes: true
};
```

### Qué puedes configurar

| Pestaña | Qué se edita |
|---|---|
| **Torneo** | Nombre, temporada, descripción, fecha de actualización, puntos por victoria/empate y cuántos clasifican por grupo. Botón para poner la fecha de hoy |
| **Equipos** | Añadir, borrar o cambiar el id, el nombre y el grupo. Si cambias un id, los partidos se actualizan solos |
| **Partidos** | Fase, jornada, fecha, equipos y marcadores (deja los goles vacíos si no se ha jugado). Añadir o borrar partidos |
| **Goleadores** | Jugador, equipo y goles |
| **🟨 Amarillas** | Jugador, equipo y cantidad. Orden manual con ↑ ↓ |
| **🟥 Rojas** | Igual que las amarillas, en su propio apartado |
| **Seguridad** | Cambiar o quitar la contraseña |
| **Datos** | Guardar, descargar `datos.js`, exportar/importar copia JSON y restablecer los datos del archivo |

Cada cambio se **guarda automáticamente** (aparece "Guardado a las 10:32:05" arriba) y la página se
redibuja al instante.

### Dónde se guardan los cambios

Se guardan en el **navegador** (almacenamiento local). Eso significa que:

- Si abres la página en otro navegador u otra computadora, verás los datos de `datos.js`, no los tuyos.
- Para que los datos queden también en el código, usa **Datos → Descargar datos.js** y reemplaza el
  archivo del proyecto. Así los conservas siempre.
- **Datos → Restablecer** borra lo guardado en el navegador y vuelve a lo que dice `datos.js`.

## Sobre la seguridad de la contraseña

**Importante, para que no te lleves una sorpresa:** esto es una página estática (HTML y JavaScript).
La contraseña impide que un visitante curioso toque tus datos desde la página, pero **no es seguridad
real**: cualquiera que tenga los archivos en su computadora puede leer el código y ver cómo funciona.
Si algún día la publicas en internet y necesitas protección de verdad, hace falta un servidor con
usuarios y permisos.

- La contraseña **no se guarda en texto plano**: se guarda su hash SHA-256 con una sal aleatoria.
- Tras 5 intentos fallidos, el acceso se bloquea 30 segundos.
- Si olvidas la contraseña: abre la consola del navegador (F12) y ejecuta
  `localStorage.removeItem("copa-futbol-seguridad-v1")`, luego recarga. También puedes usar
  **Datos → Restablecer a los datos del archivo**.

## Publicar en internet (GitHub Pages) — enlace https

Dirección final: **https://royrafa010-bit.github.io/copa-futbol/**

### Primera vez

1. Entra en <https://github.com/new>, pon de nombre **copa-futbol**, marca **Public**, **no** añadas README
   y pulsa *Create repository*.
2. En la carpeta del proyecto abre una terminal y ejecuta:
   ```bash
   git push -u origin main
   ```
   La primera vez se abrirá una ventana del navegador para iniciar sesión con tu cuenta
   **royrafa010-bit**; autoriza el acceso.
3. En GitHub: **Settings → Pages → Source: Deploy from a branch → Branch: main, /(root) → Save**.
4. Espera un minuto y abre <https://royrafa010-bit.github.io/copa-futbol/>.

Dentro de la carpeta tienes dos accesos directos:
- **Copa - internet.url** → abre la página publicada.
- **Copa - copia local.url** → abre la copia de tu PC (funciona sin internet).

### Cómo actualizar los resultados publicados

Los visitantes ven el archivo `datos.js` del repositorio, **no** los cambios guardados en tu navegador.
Por eso, cada vez que actualices resultados:

1. En la página: **⚙️ Administrar → Datos → Descargar datos.js**.
2. Doble clic en **`Publicar cambios.cmd`** (copia el `datos.js` nuevo, hace el commit y sube a GitHub).
3. En un minuto los cambios se ven en el enlace.

### Qué es público y qué no

- **Público:** el código y los datos de `datos.js` (equipos, resultados, goleadores y tarjetas).
  No pongas aquí información privada.
- **Privado:** la contraseña del panel. Se guarda cifrada **en tu navegador**, nunca en el repositorio.
  No escribas una contraseña real en `claveInicial` de `datos.js`, porque ese archivo se publica.
- Cualquier visitante puede abrir el código y modificar *su propia copia* en su navegador, pero eso solo
  lo afecta a él: lo que ven todos es lo que está en `datos.js`.

## Detalles de la implementación

- JavaScript puro, sin librerías ni instalación.
- Orden de carga: `datos.js` → `app.js` → `admin.js`.
- Criterios de desempate de la tabla: puntos → diferencia de goles → goles a favor → nombre.
- La marca **clasifica** solo aparece cuando ya hay resultados en ese grupo.
- Los apartados de tarjetas respetan el orden que tú les das (↑ ↓), sin cálculos automáticos.
- Estilos de impresión: el botón **Imprimir** genera una hoja limpia, sin menús ni panel.

## Ideas para seguir mejorando

- Escudos o banderas de cada equipo.
- Cuadro visual de eliminatorias (bracket) con líneas entre rondas.
- Sanciones automáticas: avisar cuando un jugador acumule cierto número de amarillas.
- Historial de campeones por temporada y estadísticas por equipo.
