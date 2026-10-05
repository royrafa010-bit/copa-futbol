/* ============================================================================
   app.js — dibuja la página y guarda/lee los datos configurados desde el panel
   No necesitas tocar este archivo.
   ============================================================================ */

/* ------------------------------ utilidades ------------------------------ */
const equipoPorId = Object.fromEntries(EQUIPOS.map((e) => [e.id, e]));
const nombreEquipo = (id) => (equipoPorId[id] ? equipoPorId[id].nombre : id);
const estaJugado = (p) => Number.isInteger(p.golesLocal) && Number.isInteger(p.golesVisitante);
const ORDEN_ELIMINATORIAS = ["Cuartos de final", "Semifinal", "Tercer lugar", "Final"];

function crear(tag, clase, texto) {
  const el = document.createElement(tag);
  if (clase) el.className = clase;
  if (texto !== undefined) el.textContent = texto;
  return el;
}

function mensajeVacio(texto) {
  return crear("p", "vacio", texto);
}

function tituloRonda(ronda) {
  if (ronda === "Semifinal") return "Semifinales";
  return ronda;
}

/* ============================================================================
   ALMACÉN: guarda el estado en el navegador y lo recupera al abrir la página
   ============================================================================ */
const CLAVE_ALMACEN = "copa-futbol-datos-v1";

function estadoActual() {
  return {
    torneo: TORNEO,
    equipos: EQUIPOS,
    partidos: PARTIDOS,
    goleadores: GOLEADORES,
    jugadores: JUGADORES,
  };
}

function reemplazarContenido(lista, valores) {
  lista.length = 0;
  if (Array.isArray(valores)) valores.forEach((v) => lista.push(v));
}

function aplicarEstado(nuevo) {
  if (!nuevo || typeof nuevo !== "object") return false;
  if (nuevo.torneo) Object.assign(TORNEO, nuevo.torneo);
  reemplazarContenido(EQUIPOS, nuevo.equipos);
  reemplazarContenido(PARTIDOS, nuevo.partidos);
  reemplazarContenido(GOLEADORES, nuevo.goleadores);
  reemplazarContenido(JUGADORES, nuevo.jugadores);
  return true;
}

function guardarEstado() {
  try {
    localStorage.setItem(CLAVE_ALMACEN, JSON.stringify(estadoActual()));
    return true;
  } catch (e) {
    return false;
  }
}

function cargarEstadoGuardado() {
  try {
    const crudo = localStorage.getItem(CLAVE_ALMACEN);
    if (!crudo) return false;
    return aplicarEstado(JSON.parse(crudo));
  } catch (e) {
    return false;
  }
}

function borrarEstadoGuardado() {
  try {
    localStorage.removeItem(CLAVE_ALMACEN);
  } catch (e) {
    /* nada que hacer */
  }
}

/* ============================================================================
   DIBUJO DE LA PÁGINA
   ============================================================================ */

/* ------------------------------ tabla de posiciones ------------------------------ */
function listaGrupos() {
  return [...new Set(EQUIPOS.map((e) => e.grupo))].sort();
}

function calcularTabla(equiposDelGrupo) {
  const filas = new Map();
  equiposDelGrupo.forEach((e) =>
    filas.set(e.id, { id: e.id, nombre: e.nombre, pj: 0, pg: 0, pe: 0, pp: 0, gf: 0, gc: 0, dg: 0, pts: 0 })
  );

  PARTIDOS.filter((p) => estaJugado(p) && String(p.fase).startsWith("Grupo")).forEach((p) => {
    const local = filas.get(p.local);
    const visita = filas.get(p.visitante);
    if (!local || !visita) return;

    local.pj++; visita.pj++;
    local.gf += p.golesLocal; local.gc += p.golesVisitante;
    visita.gf += p.golesVisitante; visita.gc += p.golesLocal;

    if (p.golesLocal > p.golesVisitante) {
      local.pg++; visita.pp++; local.pts += TORNEO.puntosVictoria;
    } else if (p.golesLocal < p.golesVisitante) {
      visita.pg++; local.pp++; visita.pts += TORNEO.puntosVictoria;
    } else {
      local.pe++; visita.pe++;
      local.pts += TORNEO.puntosEmpate; visita.pts += TORNEO.puntosEmpate;
    }
  });

  const tabla = [...filas.values()];
  tabla.forEach((f) => (f.dg = f.gf - f.gc));
  tabla.sort((a, b) => b.pts - a.pts || b.dg - a.dg || b.gf - a.gf || a.nombre.localeCompare(b.nombre));
  return tabla;
}

/* Construye la tabla de posiciones de un grupo. Se usa tanto en la pestaña
   "Tabla de posiciones" como dentro de "Fase de grupos". */
function crearTablaPosiciones(equiposDelGrupo) {
  const tabla = calcularTabla(equiposDelGrupo);
  const hayResultados = tabla.some((f) => f.pj > 0);

  const tablaEl = crear("table", "posiciones");
  tablaEl.innerHTML =
    "<thead><tr>" +
    ["#", "Equipo", "PJ", "PG", "PE", "PP", "GF", "GC", "DG", "PTS"].map((c) => `<th>${c}</th>`).join("") +
    "</tr></thead><tbody></tbody>";

  const cuerpo = tablaEl.querySelector("tbody");
  tabla.forEach((f, i) => {
    const clasifica = hayResultados && i < TORNEO.clasificanPorGrupo;
    const tr = crear("tr");
    if (clasifica) tr.classList.add("clasifica");
    tr.innerHTML =
      `<td class="num">${i + 1}</td>` +
      `<td class="equipo">${f.nombre}${clasifica ? '<span class="marca">clasifica</span>' : ""}</td>` +
      `<td class="num">${f.pj}</td><td class="num">${f.pg}</td><td class="num">${f.pe}</td><td class="num">${f.pp}</td>` +
      `<td class="num">${f.gf}</td><td class="num">${f.gc}</td>` +
      `<td class="num">${f.dg > 0 ? "+" + f.dg : f.dg}</td>` +
      `<td class="num pts">${f.pts}</td>`;
    cuerpo.appendChild(tr);
  });

  return { elemento: tablaEl, hayResultados: hayResultados, filas: tabla.length };
}

/* ------------------------------ marcador ------------------------------ */
function marcador(partido) {
  if (!estaJugado(partido)) return "—";
  return `${partido.golesLocal} - ${partido.golesVisitante}`;
}

/* --------------------- pestaña "Tabla de posiciones" ---------------------
   Los dos grupos, uno al lado del otro, con sus 6 equipos cada uno.
   ------------------------------------------------------------------------ */
function pintarPosiciones() {
  const contenedor = document.getElementById("lista-posiciones");
  if (!contenedor) return;

  listaGrupos().forEach((grupo) => {
    const equipos = EQUIPOS.filter((e) => e.grupo === grupo);
    const { elemento, hayResultados, filas } = crearTablaPosiciones(equipos);

    const tarjeta = crear("section", "tarjeta");
    const titulo = crear("h2", null, `Grupo ${grupo}`);
    titulo.appendChild(crear("span", "contador", `${filas} equipos`));
    tarjeta.appendChild(titulo);
    tarjeta.appendChild(elemento);
    tarjeta.appendChild(
      crear(
        "p",
        "nota-admin",
        hayResultados
          ? `Los ${TORNEO.clasificanPorGrupo} primeros de cada grupo clasifican a los cuartos de final.`
          : "Aún no hay resultados: la tabla se llenará sola cuando escribas los marcadores."
      )
    );

    contenedor.appendChild(tarjeta);
  });
}

/* ------------------------------ fase de grupos ------------------------------ */
function pintarGrupos() {
  const contenedor = document.getElementById("lista-grupos");
  if (!contenedor) return;

  listaGrupos().forEach((grupo) => {
    const equipos = EQUIPOS.filter((e) => e.grupo === grupo);
    const { elemento, hayResultados } = crearTablaPosiciones(equipos);

    const tarjeta = crear("section", "tarjeta");
    tarjeta.appendChild(crear("h2", null, `Grupo ${grupo}`));
    tarjeta.appendChild(elemento);

    if (!hayResultados) {
      tarjeta.appendChild(mensajeVacio("Todavía no hay resultados en este grupo."));
    }

    const jornadas = [...new Set(PARTIDOS.filter((p) => p.fase === `Grupo ${grupo}`).map((p) => p.jornada))];
    jornadas.forEach((jornada) => {
      const delGrupo = PARTIDOS.filter((p) => p.fase === `Grupo ${grupo}` && p.jornada === jornada);
      const bloque = crear("div", "jornada");
      bloque.appendChild(crear("h3", null, jornada));
      delGrupo.forEach((p) => bloque.appendChild(filaPartido(p)));
      tarjeta.appendChild(bloque);
    });

    contenedor.appendChild(tarjeta);
  });
}

/* ------------------------------ una fila de partido ------------------------------ */
function filaPartido(partido) {
  const fila = crear("div", "partido");
  const jugado = estaJugado(partido);

  const local = crear("span", "lado local" + (jugado && partido.golesLocal > partido.golesVisitante ? " gana" : ""), nombreEquipo(partido.local));
  const resultado = crear("span", "resultado" + (jugado ? "" : " pendiente"), marcador(partido));
  const visita = crear("span", "lado visita" + (jugado && partido.golesVisitante > partido.golesLocal ? " gana" : ""), nombreEquipo(partido.visitante));

  fila.appendChild(local);
  fila.appendChild(resultado);
  fila.appendChild(visita);
  if (partido.fecha) fila.appendChild(crear("span", "fecha", partido.fecha));
  return fila;
}

/* ------------------------------ eliminatorias ------------------------------ */
function pintarEliminatorias() {
  const contenedor = document.getElementById("lista-eliminatorias");
  if (!contenedor) return;
  const rondas = [...new Set(PARTIDOS.filter((p) => !String(p.fase).startsWith("Grupo")).map((p) => p.fase))];
  rondas.sort((a, b) => (ORDEN_ELIMINATORIAS.indexOf(a) + 1 || 99) - (ORDEN_ELIMINATORIAS.indexOf(b) + 1 || 99));

  rondas.forEach((ronda) => {
    const tarjeta = crear("section", "tarjeta");
    tarjeta.appendChild(crear("h2", null, tituloRonda(ronda)));
    PARTIDOS.filter((p) => p.fase === ronda).forEach((p, i) => {
      const fila = filaPartido(p);
      if (ronda === "Cuartos de final") {
        fila.classList.add("con-numero");
        fila.prepend(crear("span", "numero-partido", `QF${i + 1}`));
      }
      tarjeta.appendChild(fila);
    });
    contenedor.appendChild(tarjeta);
  });
}

/* ------------------------------ goleadores ------------------------------ */
function pintarGoleadores() {
  const contenedor = document.getElementById("lista-goleadores");
  if (!contenedor) return;
  const tarjeta = crear("section", "tarjeta");
  tarjeta.appendChild(crear("h2", null, "Tabla de goleadores"));

  if (GOLEADORES.length === 0) {
    tarjeta.appendChild(mensajeVacio("Todavía no hay goles registrados."));
  } else {
    const tabla = crear("table", "posiciones");
    tabla.innerHTML = "<thead><tr><th>#</th><th class='equipo'>Jugador</th><th>Equipo</th><th>Goles</th></tr></thead><tbody></tbody>";
    const cuerpo = tabla.querySelector("tbody");

    [...GOLEADORES]
      .sort((a, b) => (b.goles || 0) - (a.goles || 0) || String(a.jugador).localeCompare(String(b.jugador)))
      .forEach((g, i) => {
        const tr = crear("tr");
        tr.innerHTML =
          `<td class="num">${i + 1}</td><td class="equipo">${g.jugador}</td>` +
          `<td>${nombreEquipo(g.equipo)}</td><td class="num pts">${g.goles}</td>`;
        cuerpo.appendChild(tr);
      });

    tarjeta.appendChild(tabla);
  }

  contenedor.appendChild(tarjeta);
}

/* ------------------------------ plantilla de jugadores ------------------------------ */
function clasePosicion(posicion) {
  const p = String(posicion || "").toLowerCase();
  if (p.startsWith("port") || p.startsWith("arqu")) return "pos-portero";
  if (p.startsWith("def")) return "pos-defensa";
  if (p.startsWith("med") || p.startsWith("vol") || p.startsWith("cent")) return "pos-medio";
  if (p.startsWith("del") || p.startsWith("ext") || p.startsWith("ata")) return "pos-delantero";
  return "pos-otra";
}

/* Jugadores de un equipo, ordenados por dorsal. Si soloConNombre, deja fuera
   las fichas a las que todavía no les has puesto nombre. */
function jugadoresDe(equipoId, soloConNombre) {
  return JUGADORES.filter((j) => j.equipo === equipoId)
    .filter((j) => (soloConNombre ? String(j.nombre || "").trim() !== "" : true))
    .sort(
      (a, b) => (Number(a.dorsal) || 0) - (Number(b.dorsal) || 0) || String(a.nombre).localeCompare(String(b.nombre))
    );
}

/* Tarjeta con la plantilla de un equipo */
function tarjetaPlantilla(equipo, jugadores, totalEquipo) {
  const tarjeta = crear("section", "tarjeta");
  const titulo = crear("h2", null, equipo.nombre);
  titulo.appendChild(
    crear("span", "contador", jugadores.length + " de " + totalEquipo + (totalEquipo === 1 ? " puesto" : " puestos"))
  );
  tarjeta.appendChild(titulo);

  const tabla = crear("table", "posiciones");
  tabla.innerHTML =
    "<thead><tr><th>Dorsal</th><th class='equipo'>Jugador</th><th>Posición</th></tr></thead><tbody></tbody>";
  const cuerpo = tabla.querySelector("tbody");

  jugadores.forEach((j) => {
    const dorsal = j.dorsal === "" || j.dorsal === null || j.dorsal === undefined ? "—" : j.dorsal;
    const tr = crear("tr");
    tr.innerHTML =
      `<td class="num dorsal">${dorsal}</td>` +
      `<td class="equipo">${j.nombre}</td>` +
      `<td><span class="posicion ${clasePosicion(j.posicion)}">${j.posicion || "—"}</span></td>`;
    cuerpo.appendChild(tr);
  });

  tarjeta.appendChild(tabla);
  return tarjeta;
}

/* Selector de equipo de la pestaña Plantilla */
function equipoSeleccionado() {
  const sel = document.getElementById("selector-equipo");
  return sel && sel.value ? sel.value : "todos";
}

function rellenarSelectorEquipos() {
  const sel = document.getElementById("selector-equipo");
  if (!sel) return;
  const anterior = sel.value || "todos";
  sel.innerHTML = "";
  [["todos", "Todos los equipos"]].concat(EQUIPOS.map((e) => [e.id, e.nombre])).forEach(([valor, texto]) => {
    const opcion = document.createElement("option");
    opcion.value = valor;
    opcion.textContent = texto;
    sel.appendChild(opcion);
  });
  sel.value = EQUIPOS.some((e) => e.id === anterior) || anterior === "todos" ? anterior : "todos";
  if (!sel.dataset.listo) {
    sel.dataset.listo = "1";
    sel.addEventListener("change", () => pintarPlantilla());
  }
}

function pintarPlantilla() {
  const contenedor = document.getElementById("lista-plantilla");
  if (!contenedor) return;

  const conNombre = JUGADORES.filter((j) => String(j.nombre || "").trim() !== "");

  if (JUGADORES.length === 0) {
    const tarjeta = crear("section", "tarjeta");
    tarjeta.appendChild(crear("h2", null, "Plantilla de jugadores"));
    tarjeta.appendChild(
      mensajeVacio("Todavía no hay jugadores. Añádelos desde ⚙️ Administrar → Plantilla.")
    );
    contenedor.appendChild(tarjeta);
    return;
  }

  if (conNombre.length === 0) {
    const tarjeta = crear("section", "tarjeta");
    tarjeta.appendChild(crear("h2", null, "Plantilla de jugadores"));
    tarjeta.appendChild(
      mensajeVacio("La plantilla está lista pero sin nombres: entra en ⚙️ Administrar → Plantilla y escríbelos.")
    );
    contenedor.appendChild(tarjeta);
    return;
  }

  const seleccion = equipoSeleccionado();
  const equipos = seleccion === "todos" ? EQUIPOS : EQUIPOS.filter((e) => e.id === seleccion);

  equipos.forEach((equipo) => {
    const total = JUGADORES.filter((j) => j.equipo === equipo.id).length;
    const jugadores = jugadoresDe(equipo.id, true);
    if (jugadores.length === 0) return;
    contenedor.appendChild(tarjetaPlantilla(equipo, jugadores, total));
  });

  const resumen = document.getElementById("resumen-plantilla");
  if (resumen) {
    const equiposConNombre = EQUIPOS.filter((e) => jugadoresDe(e.id, true).length > 0).length;
    resumen.textContent =
      conNombre.length + (conNombre.length === 1 ? " jugador con nombre" : " jugadores con nombre") +
      " en " + equiposConNombre + (equiposConNombre === 1 ? " equipo" : " equipos") +
      " · " + JUGADORES.length + " fichas en total (los que no tengan nombre no se muestran).";
  }
}

/* ------------------------------ cabecera ------------------------------ */
function pintarEncabezado() {
  const titulo = document.getElementById("titulo-torneo");
  const subtitulo = document.getElementById("subtitulo-torneo");
  const actualizado = document.getElementById("actualizado");
  if (titulo) titulo.textContent = TORNEO.nombre;
  if (subtitulo) subtitulo.textContent = `${TORNEO.temporada} · ${TORNEO.descripcion}`;
  if (actualizado) {
    actualizado.textContent = TORNEO.actualizado
      ? `Actualizado: ${TORNEO.actualizado}`
      : "Sin resultados registrados todavía";
  }
  document.title = `${TORNEO.nombre} ${TORNEO.temporada} — Resultados`;

  const jugados = PARTIDOS.filter(estaJugado).length;
  const conNombre = JUGADORES.filter((j) => String(j.nombre || "").trim() !== "").length;
  const resumen = document.getElementById("resumen");
  if (!resumen) return;
  [
    ["Equipos", EQUIPOS.length],
    ["Jugadores", conNombre],
    ["Partidos", PARTIDOS.length],
    ["Jugados", jugados],
    ["Por jugar", PARTIDOS.length - jugados],
  ].forEach(([etiqueta, valor]) => {
    const caja = crear("div", "dato");
    caja.appendChild(crear("span", "valor", String(valor)));
    caja.appendChild(crear("span", "etiqueta", etiqueta));
    resumen.appendChild(caja);
  });
}

/* ------------------------------ pestañas ------------------------------ */
function activarPestanas() {
  const botones = document.querySelectorAll(".pestana");
  botones.forEach((boton) => {
    boton.addEventListener("click", () => {
      botones.forEach((b) => b.classList.toggle("activa", b === boton));
      document.querySelectorAll(".panel").forEach((panel) => {
        panel.hidden = panel.id !== `panel-${boton.dataset.panel}`;
      });
    });
  });
}

/* ------------------------------ dibujar todo ------------------------------ */
function renderizarTodo() {
  ["resumen", "lista-posiciones", "lista-grupos", "lista-eliminatorias", "lista-plantilla", "lista-goleadores"].forEach((id) => {
    const el = document.getElementById(id);
    if (el) el.innerHTML = "";
  });
  const vistas = [
    ["cabecera", pintarEncabezado],
    ["posiciones", pintarPosiciones],
    ["grupos", pintarGrupos],
    ["eliminatorias", pintarEliminatorias],
    ["selector de equipos", rellenarSelectorEquipos],
    ["plantilla", pintarPlantilla],
    ["goleadores", pintarGoleadores],
  ];
  vistas.forEach(([nombre, pintar]) => {
    try {
      pintar();
    } catch (e) {
      if (typeof console !== "undefined") console.error("Error dibujando " + nombre + ":", e);
    }
  });
}

/* ------------------------------ inicio ------------------------------ */
cargarEstadoGuardado();
try {
  renderizarTodo();
} catch (e) {
  if (typeof console !== "undefined") console.error("Error al dibujar la página:", e);
}
activarPestanas();
