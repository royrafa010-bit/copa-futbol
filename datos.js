/* ============================================================================
   DATOS INICIALES DE LA COPA
   ----------------------------------------------------------------------------
   Estos son los datos con los que arranca la página la PRIMERA vez.
   Después, todo se puede configurar desde el botón "⚙️ Administrar" de la
   propia página (con tu contraseña), y los cambios se guardan en el navegador.

   ¿Prefieres editar el archivo a mano? También funciona: cambia lo que quieras
   aquí y pulsa "Restablecer a estos datos" en el panel de administración.

   ESTRUCTURA DEL TORNEO
   - 2 grupos (A y B) de 6 equipos: todos contra todos (5 jornadas de 3 partidos
     por grupo = 30 partidos).
   - Clasifican los 4 primeros de cada grupo = 8 equipos.
   - Cuartos de final (4) → Semifinales (2) → Tercer lugar (1) → Final (1).
   Total: 38 partidos.
   ============================================================================ */

const TORNEO = {
  nombre: "Copa Nacional de Fútbol",
  temporada: "2026",
  descripcion: "2 grupos de 6, cuartos de final, semifinales y final",
  actualizado: "",
  puntosVictoria: 3,
  puntosEmpate: 1,
  clasificanPorGrupo: 4
};

/* ---------------------------------------------------------------------------
   CONFIGURACIÓN DE ACCESO AL PANEL
   claveInicial: si escribes aquí una contraseña, podrás entrar con ella desde
   cualquier navegador. Si lo dejas vacío (""), la primera vez que abras el
   panel la página te pedirá CREAR tu contraseña y la guardará en ese navegador.
   --------------------------------------------------------------------------- */
const CONFIG_ADMIN = {
  claveInicial: "",
  bloquearVisitantes: true   // true = sin contraseña no se puede configurar nada
};

/* ---------------------------------------------------------------------------
   EQUIPOS: id corto, nombre y grupo ("A" o "B")
   --------------------------------------------------------------------------- */
const EQUIPOS = [
  { id: "pri", nombre: "Pinar del Río",    grupo: "A" },
  { id: "hab", nombre: "La Habana",        grupo: "A" },
  { id: "mat", nombre: "Matanzas",         grupo: "A" },
  { id: "vcl", nombre: "Villa Clara",      grupo: "A" },
  { id: "cfg", nombre: "Cienfuegos",       grupo: "A" },
  { id: "ssp", nombre: "Sancti Spíritus",  grupo: "A" },

  { id: "cam", nombre: "Camagüey",         grupo: "B" },
  { id: "ltu", nombre: "Las Tunas",        grupo: "B" },
  { id: "hol", nombre: "Holguín",          grupo: "B" },
  { id: "gra", nombre: "Granma",           grupo: "B" },
  { id: "scc", nombre: "Santiago de Cuba", grupo: "B" },
  { id: "gtm", nombre: "Guantánamo",       grupo: "B" }
];

/* ---------------------------------------------------------------------------
   PARTIDOS
   - fase: "Grupo A" / "Grupo B" o la ronda ("Cuartos de final", "Semifinal",
     "Tercer lugar", "Final").
   - local / visitante: id del equipo (o textos como "1A", "Ganador QF1").
   - golesLocal / golesVisitante: número, o null si no se jugó.
   - fecha: texto libre; si queda vacío no se muestra.
   --------------------------------------------------------------------------- */
const PARTIDOS = [
  // ============================ GRUPO A ============================
  { fase: "Grupo A", jornada: "Jornada 1", fecha: "", local: "pri", visitante: "ssp", golesLocal: null, golesVisitante: null },
  { fase: "Grupo A", jornada: "Jornada 1", fecha: "", local: "hab", visitante: "cfg", golesLocal: null, golesVisitante: null },
  { fase: "Grupo A", jornada: "Jornada 1", fecha: "", local: "mat", visitante: "vcl", golesLocal: null, golesVisitante: null },

  { fase: "Grupo A", jornada: "Jornada 2", fecha: "", local: "pri", visitante: "cfg", golesLocal: null, golesVisitante: null },
  { fase: "Grupo A", jornada: "Jornada 2", fecha: "", local: "ssp", visitante: "vcl", golesLocal: null, golesVisitante: null },
  { fase: "Grupo A", jornada: "Jornada 2", fecha: "", local: "hab", visitante: "mat", golesLocal: null, golesVisitante: null },

  { fase: "Grupo A", jornada: "Jornada 3", fecha: "", local: "pri", visitante: "vcl", golesLocal: null, golesVisitante: null },
  { fase: "Grupo A", jornada: "Jornada 3", fecha: "", local: "cfg", visitante: "mat", golesLocal: null, golesVisitante: null },
  { fase: "Grupo A", jornada: "Jornada 3", fecha: "", local: "ssp", visitante: "hab", golesLocal: null, golesVisitante: null },

  { fase: "Grupo A", jornada: "Jornada 4", fecha: "", local: "pri", visitante: "mat", golesLocal: null, golesVisitante: null },
  { fase: "Grupo A", jornada: "Jornada 4", fecha: "", local: "vcl", visitante: "hab", golesLocal: null, golesVisitante: null },
  { fase: "Grupo A", jornada: "Jornada 4", fecha: "", local: "cfg", visitante: "ssp", golesLocal: null, golesVisitante: null },

  { fase: "Grupo A", jornada: "Jornada 5", fecha: "", local: "pri", visitante: "hab", golesLocal: null, golesVisitante: null },
  { fase: "Grupo A", jornada: "Jornada 5", fecha: "", local: "mat", visitante: "ssp", golesLocal: null, golesVisitante: null },
  { fase: "Grupo A", jornada: "Jornada 5", fecha: "", local: "vcl", visitante: "cfg", golesLocal: null, golesVisitante: null },

  // ============================ GRUPO B ============================
  { fase: "Grupo B", jornada: "Jornada 1", fecha: "", local: "cam", visitante: "gtm", golesLocal: null, golesVisitante: null },
  { fase: "Grupo B", jornada: "Jornada 1", fecha: "", local: "ltu", visitante: "scc", golesLocal: null, golesVisitante: null },
  { fase: "Grupo B", jornada: "Jornada 1", fecha: "", local: "hol", visitante: "gra", golesLocal: null, golesVisitante: null },

  { fase: "Grupo B", jornada: "Jornada 2", fecha: "", local: "cam", visitante: "scc", golesLocal: null, golesVisitante: null },
  { fase: "Grupo B", jornada: "Jornada 2", fecha: "", local: "gtm", visitante: "gra", golesLocal: null, golesVisitante: null },
  { fase: "Grupo B", jornada: "Jornada 2", fecha: "", local: "ltu", visitante: "hol", golesLocal: null, golesVisitante: null },

  { fase: "Grupo B", jornada: "Jornada 3", fecha: "", local: "cam", visitante: "gra", golesLocal: null, golesVisitante: null },
  { fase: "Grupo B", jornada: "Jornada 3", fecha: "", local: "scc", visitante: "hol", golesLocal: null, golesVisitante: null },
  { fase: "Grupo B", jornada: "Jornada 3", fecha: "", local: "gtm", visitante: "ltu", golesLocal: null, golesVisitante: null },

  { fase: "Grupo B", jornada: "Jornada 4", fecha: "", local: "cam", visitante: "hol", golesLocal: null, golesVisitante: null },
  { fase: "Grupo B", jornada: "Jornada 4", fecha: "", local: "gra", visitante: "ltu", golesLocal: null, golesVisitante: null },
  { fase: "Grupo B", jornada: "Jornada 4", fecha: "", local: "scc", visitante: "gtm", golesLocal: null, golesVisitante: null },

  { fase: "Grupo B", jornada: "Jornada 5", fecha: "", local: "cam", visitante: "ltu", golesLocal: null, golesVisitante: null },
  { fase: "Grupo B", jornada: "Jornada 5", fecha: "", local: "hol", visitante: "gtm", golesLocal: null, golesVisitante: null },
  { fase: "Grupo B", jornada: "Jornada 5", fecha: "", local: "gra", visitante: "scc", golesLocal: null, golesVisitante: null },

  // ========================= CUARTOS DE FINAL =========================
  { fase: "Cuartos de final", jornada: "Cuartos de final", fecha: "", local: "1A", visitante: "4B", golesLocal: null, golesVisitante: null },
  { fase: "Cuartos de final", jornada: "Cuartos de final", fecha: "", local: "2A", visitante: "3B", golesLocal: null, golesVisitante: null },
  { fase: "Cuartos de final", jornada: "Cuartos de final", fecha: "", local: "1B", visitante: "4A", golesLocal: null, golesVisitante: null },
  { fase: "Cuartos de final", jornada: "Cuartos de final", fecha: "", local: "2B", visitante: "3A", golesLocal: null, golesVisitante: null },

  // =========================== SEMIFINALES ===========================
  { fase: "Semifinal", jornada: "Semifinales", fecha: "", local: "Ganador QF1", visitante: "Ganador QF2", golesLocal: null, golesVisitante: null },
  { fase: "Semifinal", jornada: "Semifinales", fecha: "", local: "Ganador QF3", visitante: "Ganador QF4", golesLocal: null, golesVisitante: null },

  // ========================== TERCER LUGAR ==========================
  { fase: "Tercer lugar", jornada: "Tercer lugar", fecha: "", local: "Perdedor SF1", visitante: "Perdedor SF2", golesLocal: null, golesVisitante: null },

  // =============================== FINAL ===============================
  { fase: "Final", jornada: "Final", fecha: "", local: "Ganador SF1", visitante: "Ganador SF2", golesLocal: null, golesVisitante: null }
];

/* ---------------------------------------------------------------------------
   GOLEADORES: { jugador, equipo, goles }   (se ordenan por goles)
   --------------------------------------------------------------------------- */
const GOLEADORES = [];

/* ---------------------------------------------------------------------------
   JUGADORES (plantilla): { nombre, dorsal, posicion, equipo }
   - dorsal: número de la camiseta.
   - posicion: Portero, Defensa, Mediocampista o Delantero (puedes escribir
     otra, se muestra igual).
   En la página aparecen agrupados por equipo y ordenados por dorsal.
   Ejemplo:
   { nombre: "Yordanis Sánchez", dorsal: 10, posicion: "Delantero", equipo: "hab" },
   --------------------------------------------------------------------------- */
const JUGADORES = [];

/* ---------------------------------------------------------------------------
   AMARILLAS: { jugador, equipo, cantidad }  (se muestran en este orden)
   --------------------------------------------------------------------------- */
const AMARILLAS = [];

/* ---------------------------------------------------------------------------
   ROJAS: { jugador, equipo, cantidad }      (se muestran en este orden)
   --------------------------------------------------------------------------- */
const ROJAS = [];
