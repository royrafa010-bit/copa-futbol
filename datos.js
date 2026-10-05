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
   Ya están los 12 equipos con 20 jugadores cada uno (dorsales y posiciones
   de una plantilla normal). Solo tienes que escribir los nombres.
   - Puedes dejar un nombre vacío: ese jugador no se muestra en la página.
   - Para agregar más, copia una línea; para quitar, borra la línea.
   --------------------------------------------------------------------------- */
const JUGADORES = [
  // ---------------------------- Pinar del Río ----------------------------
  { nombre: "", dorsal: 1, posicion: "Portero", equipo: "pri" },
  { nombre: "", dorsal: 12, posicion: "Portero", equipo: "pri" },
  { nombre: "", dorsal: 23, posicion: "Portero", equipo: "pri" },
  { nombre: "", dorsal: 2, posicion: "Defensa", equipo: "pri" },
  { nombre: "", dorsal: 3, posicion: "Defensa", equipo: "pri" },
  { nombre: "", dorsal: 4, posicion: "Defensa", equipo: "pri" },
  { nombre: "", dorsal: 5, posicion: "Defensa", equipo: "pri" },
  { nombre: "", dorsal: 6, posicion: "Defensa", equipo: "pri" },
  { nombre: "", dorsal: 15, posicion: "Defensa", equipo: "pri" },
  { nombre: "", dorsal: 8, posicion: "Mediocampista", equipo: "pri" },
  { nombre: "", dorsal: 10, posicion: "Mediocampista", equipo: "pri" },
  { nombre: "", dorsal: 14, posicion: "Mediocampista", equipo: "pri" },
  { nombre: "", dorsal: 16, posicion: "Mediocampista", equipo: "pri" },
  { nombre: "", dorsal: 17, posicion: "Mediocampista", equipo: "pri" },
  { nombre: "", dorsal: 20, posicion: "Mediocampista", equipo: "pri" },
  { nombre: "", dorsal: 7, posicion: "Delantero", equipo: "pri" },
  { nombre: "", dorsal: 9, posicion: "Delantero", equipo: "pri" },
  { nombre: "", dorsal: 11, posicion: "Delantero", equipo: "pri" },
  { nombre: "", dorsal: 18, posicion: "Delantero", equipo: "pri" },
  { nombre: "", dorsal: 19, posicion: "Delantero", equipo: "pri" },

  // ---------------------------- La Habana ----------------------------
  { nombre: "", dorsal: 1, posicion: "Portero", equipo: "hab" },
  { nombre: "", dorsal: 12, posicion: "Portero", equipo: "hab" },
  { nombre: "", dorsal: 23, posicion: "Portero", equipo: "hab" },
  { nombre: "", dorsal: 2, posicion: "Defensa", equipo: "hab" },
  { nombre: "", dorsal: 3, posicion: "Defensa", equipo: "hab" },
  { nombre: "", dorsal: 4, posicion: "Defensa", equipo: "hab" },
  { nombre: "", dorsal: 5, posicion: "Defensa", equipo: "hab" },
  { nombre: "", dorsal: 6, posicion: "Defensa", equipo: "hab" },
  { nombre: "", dorsal: 15, posicion: "Defensa", equipo: "hab" },
  { nombre: "", dorsal: 8, posicion: "Mediocampista", equipo: "hab" },
  { nombre: "", dorsal: 10, posicion: "Mediocampista", equipo: "hab" },
  { nombre: "", dorsal: 14, posicion: "Mediocampista", equipo: "hab" },
  { nombre: "", dorsal: 16, posicion: "Mediocampista", equipo: "hab" },
  { nombre: "", dorsal: 17, posicion: "Mediocampista", equipo: "hab" },
  { nombre: "", dorsal: 20, posicion: "Mediocampista", equipo: "hab" },
  { nombre: "", dorsal: 7, posicion: "Delantero", equipo: "hab" },
  { nombre: "", dorsal: 9, posicion: "Delantero", equipo: "hab" },
  { nombre: "", dorsal: 11, posicion: "Delantero", equipo: "hab" },
  { nombre: "", dorsal: 18, posicion: "Delantero", equipo: "hab" },
  { nombre: "", dorsal: 19, posicion: "Delantero", equipo: "hab" },

  // ---------------------------- Matanzas ----------------------------
  { nombre: "", dorsal: 1, posicion: "Portero", equipo: "mat" },
  { nombre: "", dorsal: 12, posicion: "Portero", equipo: "mat" },
  { nombre: "", dorsal: 23, posicion: "Portero", equipo: "mat" },
  { nombre: "", dorsal: 2, posicion: "Defensa", equipo: "mat" },
  { nombre: "", dorsal: 3, posicion: "Defensa", equipo: "mat" },
  { nombre: "", dorsal: 4, posicion: "Defensa", equipo: "mat" },
  { nombre: "", dorsal: 5, posicion: "Defensa", equipo: "mat" },
  { nombre: "", dorsal: 6, posicion: "Defensa", equipo: "mat" },
  { nombre: "", dorsal: 15, posicion: "Defensa", equipo: "mat" },
  { nombre: "", dorsal: 8, posicion: "Mediocampista", equipo: "mat" },
  { nombre: "", dorsal: 10, posicion: "Mediocampista", equipo: "mat" },
  { nombre: "", dorsal: 14, posicion: "Mediocampista", equipo: "mat" },
  { nombre: "", dorsal: 16, posicion: "Mediocampista", equipo: "mat" },
  { nombre: "", dorsal: 17, posicion: "Mediocampista", equipo: "mat" },
  { nombre: "", dorsal: 20, posicion: "Mediocampista", equipo: "mat" },
  { nombre: "", dorsal: 7, posicion: "Delantero", equipo: "mat" },
  { nombre: "", dorsal: 9, posicion: "Delantero", equipo: "mat" },
  { nombre: "", dorsal: 11, posicion: "Delantero", equipo: "mat" },
  { nombre: "", dorsal: 18, posicion: "Delantero", equipo: "mat" },
  { nombre: "", dorsal: 19, posicion: "Delantero", equipo: "mat" },

  // ---------------------------- Villa Clara ----------------------------
  { nombre: "", dorsal: 1, posicion: "Portero", equipo: "vcl" },
  { nombre: "", dorsal: 12, posicion: "Portero", equipo: "vcl" },
  { nombre: "", dorsal: 23, posicion: "Portero", equipo: "vcl" },
  { nombre: "", dorsal: 2, posicion: "Defensa", equipo: "vcl" },
  { nombre: "", dorsal: 3, posicion: "Defensa", equipo: "vcl" },
  { nombre: "", dorsal: 4, posicion: "Defensa", equipo: "vcl" },
  { nombre: "", dorsal: 5, posicion: "Defensa", equipo: "vcl" },
  { nombre: "", dorsal: 6, posicion: "Defensa", equipo: "vcl" },
  { nombre: "", dorsal: 15, posicion: "Defensa", equipo: "vcl" },
  { nombre: "", dorsal: 8, posicion: "Mediocampista", equipo: "vcl" },
  { nombre: "", dorsal: 10, posicion: "Mediocampista", equipo: "vcl" },
  { nombre: "", dorsal: 14, posicion: "Mediocampista", equipo: "vcl" },
  { nombre: "", dorsal: 16, posicion: "Mediocampista", equipo: "vcl" },
  { nombre: "", dorsal: 17, posicion: "Mediocampista", equipo: "vcl" },
  { nombre: "", dorsal: 20, posicion: "Mediocampista", equipo: "vcl" },
  { nombre: "", dorsal: 7, posicion: "Delantero", equipo: "vcl" },
  { nombre: "", dorsal: 9, posicion: "Delantero", equipo: "vcl" },
  { nombre: "", dorsal: 11, posicion: "Delantero", equipo: "vcl" },
  { nombre: "", dorsal: 18, posicion: "Delantero", equipo: "vcl" },
  { nombre: "", dorsal: 19, posicion: "Delantero", equipo: "vcl" },

  // ---------------------------- Cienfuegos ----------------------------
  { nombre: "", dorsal: 1, posicion: "Portero", equipo: "cfg" },
  { nombre: "", dorsal: 12, posicion: "Portero", equipo: "cfg" },
  { nombre: "", dorsal: 23, posicion: "Portero", equipo: "cfg" },
  { nombre: "", dorsal: 2, posicion: "Defensa", equipo: "cfg" },
  { nombre: "", dorsal: 3, posicion: "Defensa", equipo: "cfg" },
  { nombre: "", dorsal: 4, posicion: "Defensa", equipo: "cfg" },
  { nombre: "", dorsal: 5, posicion: "Defensa", equipo: "cfg" },
  { nombre: "", dorsal: 6, posicion: "Defensa", equipo: "cfg" },
  { nombre: "", dorsal: 15, posicion: "Defensa", equipo: "cfg" },
  { nombre: "", dorsal: 8, posicion: "Mediocampista", equipo: "cfg" },
  { nombre: "", dorsal: 10, posicion: "Mediocampista", equipo: "cfg" },
  { nombre: "", dorsal: 14, posicion: "Mediocampista", equipo: "cfg" },
  { nombre: "", dorsal: 16, posicion: "Mediocampista", equipo: "cfg" },
  { nombre: "", dorsal: 17, posicion: "Mediocampista", equipo: "cfg" },
  { nombre: "", dorsal: 20, posicion: "Mediocampista", equipo: "cfg" },
  { nombre: "", dorsal: 7, posicion: "Delantero", equipo: "cfg" },
  { nombre: "", dorsal: 9, posicion: "Delantero", equipo: "cfg" },
  { nombre: "", dorsal: 11, posicion: "Delantero", equipo: "cfg" },
  { nombre: "", dorsal: 18, posicion: "Delantero", equipo: "cfg" },
  { nombre: "", dorsal: 19, posicion: "Delantero", equipo: "cfg" },

  // ---------------------------- Sancti Spíritus ----------------------------
  { nombre: "", dorsal: 1, posicion: "Portero", equipo: "ssp" },
  { nombre: "", dorsal: 12, posicion: "Portero", equipo: "ssp" },
  { nombre: "", dorsal: 23, posicion: "Portero", equipo: "ssp" },
  { nombre: "", dorsal: 2, posicion: "Defensa", equipo: "ssp" },
  { nombre: "", dorsal: 3, posicion: "Defensa", equipo: "ssp" },
  { nombre: "", dorsal: 4, posicion: "Defensa", equipo: "ssp" },
  { nombre: "", dorsal: 5, posicion: "Defensa", equipo: "ssp" },
  { nombre: "", dorsal: 6, posicion: "Defensa", equipo: "ssp" },
  { nombre: "", dorsal: 15, posicion: "Defensa", equipo: "ssp" },
  { nombre: "", dorsal: 8, posicion: "Mediocampista", equipo: "ssp" },
  { nombre: "", dorsal: 10, posicion: "Mediocampista", equipo: "ssp" },
  { nombre: "", dorsal: 14, posicion: "Mediocampista", equipo: "ssp" },
  { nombre: "", dorsal: 16, posicion: "Mediocampista", equipo: "ssp" },
  { nombre: "", dorsal: 17, posicion: "Mediocampista", equipo: "ssp" },
  { nombre: "", dorsal: 20, posicion: "Mediocampista", equipo: "ssp" },
  { nombre: "", dorsal: 7, posicion: "Delantero", equipo: "ssp" },
  { nombre: "", dorsal: 9, posicion: "Delantero", equipo: "ssp" },
  { nombre: "", dorsal: 11, posicion: "Delantero", equipo: "ssp" },
  { nombre: "", dorsal: 18, posicion: "Delantero", equipo: "ssp" },
  { nombre: "", dorsal: 19, posicion: "Delantero", equipo: "ssp" },

  // ---------------------------- Camagüey ----------------------------
  { nombre: "", dorsal: 1, posicion: "Portero", equipo: "cam" },
  { nombre: "", dorsal: 12, posicion: "Portero", equipo: "cam" },
  { nombre: "", dorsal: 23, posicion: "Portero", equipo: "cam" },
  { nombre: "", dorsal: 2, posicion: "Defensa", equipo: "cam" },
  { nombre: "", dorsal: 3, posicion: "Defensa", equipo: "cam" },
  { nombre: "", dorsal: 4, posicion: "Defensa", equipo: "cam" },
  { nombre: "", dorsal: 5, posicion: "Defensa", equipo: "cam" },
  { nombre: "", dorsal: 6, posicion: "Defensa", equipo: "cam" },
  { nombre: "", dorsal: 15, posicion: "Defensa", equipo: "cam" },
  { nombre: "", dorsal: 8, posicion: "Mediocampista", equipo: "cam" },
  { nombre: "", dorsal: 10, posicion: "Mediocampista", equipo: "cam" },
  { nombre: "", dorsal: 14, posicion: "Mediocampista", equipo: "cam" },
  { nombre: "", dorsal: 16, posicion: "Mediocampista", equipo: "cam" },
  { nombre: "", dorsal: 17, posicion: "Mediocampista", equipo: "cam" },
  { nombre: "", dorsal: 20, posicion: "Mediocampista", equipo: "cam" },
  { nombre: "", dorsal: 7, posicion: "Delantero", equipo: "cam" },
  { nombre: "", dorsal: 9, posicion: "Delantero", equipo: "cam" },
  { nombre: "", dorsal: 11, posicion: "Delantero", equipo: "cam" },
  { nombre: "", dorsal: 18, posicion: "Delantero", equipo: "cam" },
  { nombre: "", dorsal: 19, posicion: "Delantero", equipo: "cam" },

  // ---------------------------- Las Tunas ----------------------------
  { nombre: "", dorsal: 1, posicion: "Portero", equipo: "ltu" },
  { nombre: "", dorsal: 12, posicion: "Portero", equipo: "ltu" },
  { nombre: "", dorsal: 23, posicion: "Portero", equipo: "ltu" },
  { nombre: "", dorsal: 2, posicion: "Defensa", equipo: "ltu" },
  { nombre: "", dorsal: 3, posicion: "Defensa", equipo: "ltu" },
  { nombre: "", dorsal: 4, posicion: "Defensa", equipo: "ltu" },
  { nombre: "", dorsal: 5, posicion: "Defensa", equipo: "ltu" },
  { nombre: "", dorsal: 6, posicion: "Defensa", equipo: "ltu" },
  { nombre: "", dorsal: 15, posicion: "Defensa", equipo: "ltu" },
  { nombre: "", dorsal: 8, posicion: "Mediocampista", equipo: "ltu" },
  { nombre: "", dorsal: 10, posicion: "Mediocampista", equipo: "ltu" },
  { nombre: "", dorsal: 14, posicion: "Mediocampista", equipo: "ltu" },
  { nombre: "", dorsal: 16, posicion: "Mediocampista", equipo: "ltu" },
  { nombre: "", dorsal: 17, posicion: "Mediocampista", equipo: "ltu" },
  { nombre: "", dorsal: 20, posicion: "Mediocampista", equipo: "ltu" },
  { nombre: "", dorsal: 7, posicion: "Delantero", equipo: "ltu" },
  { nombre: "", dorsal: 9, posicion: "Delantero", equipo: "ltu" },
  { nombre: "", dorsal: 11, posicion: "Delantero", equipo: "ltu" },
  { nombre: "", dorsal: 18, posicion: "Delantero", equipo: "ltu" },
  { nombre: "", dorsal: 19, posicion: "Delantero", equipo: "ltu" },

  // ---------------------------- Holguín ----------------------------
  { nombre: "", dorsal: 1, posicion: "Portero", equipo: "hol" },
  { nombre: "", dorsal: 12, posicion: "Portero", equipo: "hol" },
  { nombre: "", dorsal: 23, posicion: "Portero", equipo: "hol" },
  { nombre: "", dorsal: 2, posicion: "Defensa", equipo: "hol" },
  { nombre: "", dorsal: 3, posicion: "Defensa", equipo: "hol" },
  { nombre: "", dorsal: 4, posicion: "Defensa", equipo: "hol" },
  { nombre: "", dorsal: 5, posicion: "Defensa", equipo: "hol" },
  { nombre: "", dorsal: 6, posicion: "Defensa", equipo: "hol" },
  { nombre: "", dorsal: 15, posicion: "Defensa", equipo: "hol" },
  { nombre: "", dorsal: 8, posicion: "Mediocampista", equipo: "hol" },
  { nombre: "", dorsal: 10, posicion: "Mediocampista", equipo: "hol" },
  { nombre: "", dorsal: 14, posicion: "Mediocampista", equipo: "hol" },
  { nombre: "", dorsal: 16, posicion: "Mediocampista", equipo: "hol" },
  { nombre: "", dorsal: 17, posicion: "Mediocampista", equipo: "hol" },
  { nombre: "", dorsal: 20, posicion: "Mediocampista", equipo: "hol" },
  { nombre: "", dorsal: 7, posicion: "Delantero", equipo: "hol" },
  { nombre: "", dorsal: 9, posicion: "Delantero", equipo: "hol" },
  { nombre: "", dorsal: 11, posicion: "Delantero", equipo: "hol" },
  { nombre: "", dorsal: 18, posicion: "Delantero", equipo: "hol" },
  { nombre: "", dorsal: 19, posicion: "Delantero", equipo: "hol" },

  // ---------------------------- Granma ----------------------------
  { nombre: "", dorsal: 1, posicion: "Portero", equipo: "gra" },
  { nombre: "", dorsal: 12, posicion: "Portero", equipo: "gra" },
  { nombre: "", dorsal: 23, posicion: "Portero", equipo: "gra" },
  { nombre: "", dorsal: 2, posicion: "Defensa", equipo: "gra" },
  { nombre: "", dorsal: 3, posicion: "Defensa", equipo: "gra" },
  { nombre: "", dorsal: 4, posicion: "Defensa", equipo: "gra" },
  { nombre: "", dorsal: 5, posicion: "Defensa", equipo: "gra" },
  { nombre: "", dorsal: 6, posicion: "Defensa", equipo: "gra" },
  { nombre: "", dorsal: 15, posicion: "Defensa", equipo: "gra" },
  { nombre: "", dorsal: 8, posicion: "Mediocampista", equipo: "gra" },
  { nombre: "", dorsal: 10, posicion: "Mediocampista", equipo: "gra" },
  { nombre: "", dorsal: 14, posicion: "Mediocampista", equipo: "gra" },
  { nombre: "", dorsal: 16, posicion: "Mediocampista", equipo: "gra" },
  { nombre: "", dorsal: 17, posicion: "Mediocampista", equipo: "gra" },
  { nombre: "", dorsal: 20, posicion: "Mediocampista", equipo: "gra" },
  { nombre: "", dorsal: 7, posicion: "Delantero", equipo: "gra" },
  { nombre: "", dorsal: 9, posicion: "Delantero", equipo: "gra" },
  { nombre: "", dorsal: 11, posicion: "Delantero", equipo: "gra" },
  { nombre: "", dorsal: 18, posicion: "Delantero", equipo: "gra" },
  { nombre: "", dorsal: 19, posicion: "Delantero", equipo: "gra" },

  // ---------------------------- Santiago de Cuba ----------------------------
  { nombre: "", dorsal: 1, posicion: "Portero", equipo: "scc" },
  { nombre: "", dorsal: 12, posicion: "Portero", equipo: "scc" },
  { nombre: "", dorsal: 23, posicion: "Portero", equipo: "scc" },
  { nombre: "", dorsal: 2, posicion: "Defensa", equipo: "scc" },
  { nombre: "", dorsal: 3, posicion: "Defensa", equipo: "scc" },
  { nombre: "", dorsal: 4, posicion: "Defensa", equipo: "scc" },
  { nombre: "", dorsal: 5, posicion: "Defensa", equipo: "scc" },
  { nombre: "", dorsal: 6, posicion: "Defensa", equipo: "scc" },
  { nombre: "", dorsal: 15, posicion: "Defensa", equipo: "scc" },
  { nombre: "", dorsal: 8, posicion: "Mediocampista", equipo: "scc" },
  { nombre: "", dorsal: 10, posicion: "Mediocampista", equipo: "scc" },
  { nombre: "", dorsal: 14, posicion: "Mediocampista", equipo: "scc" },
  { nombre: "", dorsal: 16, posicion: "Mediocampista", equipo: "scc" },
  { nombre: "", dorsal: 17, posicion: "Mediocampista", equipo: "scc" },
  { nombre: "", dorsal: 20, posicion: "Mediocampista", equipo: "scc" },
  { nombre: "", dorsal: 7, posicion: "Delantero", equipo: "scc" },
  { nombre: "", dorsal: 9, posicion: "Delantero", equipo: "scc" },
  { nombre: "", dorsal: 11, posicion: "Delantero", equipo: "scc" },
  { nombre: "", dorsal: 18, posicion: "Delantero", equipo: "scc" },
  { nombre: "", dorsal: 19, posicion: "Delantero", equipo: "scc" },

  // ---------------------------- Guantánamo ----------------------------
  { nombre: "", dorsal: 1, posicion: "Portero", equipo: "gtm" },
  { nombre: "", dorsal: 12, posicion: "Portero", equipo: "gtm" },
  { nombre: "", dorsal: 23, posicion: "Portero", equipo: "gtm" },
  { nombre: "", dorsal: 2, posicion: "Defensa", equipo: "gtm" },
  { nombre: "", dorsal: 3, posicion: "Defensa", equipo: "gtm" },
  { nombre: "", dorsal: 4, posicion: "Defensa", equipo: "gtm" },
  { nombre: "", dorsal: 5, posicion: "Defensa", equipo: "gtm" },
  { nombre: "", dorsal: 6, posicion: "Defensa", equipo: "gtm" },
  { nombre: "", dorsal: 15, posicion: "Defensa", equipo: "gtm" },
  { nombre: "", dorsal: 8, posicion: "Mediocampista", equipo: "gtm" },
  { nombre: "", dorsal: 10, posicion: "Mediocampista", equipo: "gtm" },
  { nombre: "", dorsal: 14, posicion: "Mediocampista", equipo: "gtm" },
  { nombre: "", dorsal: 16, posicion: "Mediocampista", equipo: "gtm" },
  { nombre: "", dorsal: 17, posicion: "Mediocampista", equipo: "gtm" },
  { nombre: "", dorsal: 20, posicion: "Mediocampista", equipo: "gtm" },
  { nombre: "", dorsal: 7, posicion: "Delantero", equipo: "gtm" },
  { nombre: "", dorsal: 9, posicion: "Delantero", equipo: "gtm" },
  { nombre: "", dorsal: 11, posicion: "Delantero", equipo: "gtm" },
  { nombre: "", dorsal: 18, posicion: "Delantero", equipo: "gtm" },
  { nombre: "", dorsal: 19, posicion: "Delantero", equipo: "gtm" },
];
