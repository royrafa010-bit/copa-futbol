# Publica en GitHub Pages los cambios que hiciste desde el panel de la página.
#
# CÓMO SE USA
#   1) En la página:  ⚙️ Administrar  ->  Datos  ->  "Descargar datos.js"  (si cambiaste datos)
#   2) Doble clic en "Publicar cambios.cmd" (o ejecuta este archivo con PowerShell)
#
# El script busca el datos.js más reciente en Descargas, lo copia al proyecto,
# guarda el cambio en Git y lo sube a GitHub. En un minuto se ve en internet.

$ErrorActionPreference = 'Stop'

$proyecto = 'C:\Users\DELL\OneDrive\Documentos\copa-futbol'
$sitio    = 'https://royrafa010-bit.github.io/copa-futbol/'
$git      = 'C:\Program Files\Git\cmd\git.exe'
$descargas = Join-Path $env:USERPROFILE 'Downloads'

if (-not (Test-Path $git)) { $git = 'git' }

Write-Host ""
Write-Host "====================================================="
Write-Host " Publicar la copa en GitHub"
Write-Host "====================================================="
Write-Host ""

Write-Host "== 1. Buscando un datos.js nuevo en Descargas =="
$destino = Join-Path $proyecto 'datos.js'
$elegido = $null
if (Test-Path $descargas) {
    $elegido = Get-ChildItem -LiteralPath $descargas -Filter 'datos*.js' -File -ErrorAction SilentlyContinue |
               Sort-Object LastWriteTime -Descending | Select-Object -First 1
}
if ($elegido -and (Test-Path $destino) -and ((Get-Item $destino).LastWriteTime -lt $elegido.LastWriteTime)) {
    Copy-Item -LiteralPath $elegido.FullName -Destination $destino -Force
    Write-Host ("   copiado: " + $elegido.Name + "  ->  datos.js")
} else {
    Write-Host "   no hay un datos.js más reciente en Descargas"
}

Write-Host "== 2. Guardando los cambios en Git =="
& $git -C $proyecto add -A
$cambios = & $git -C $proyecto status --porcelain
if ($cambios) {
    $mensaje = "Actualiza los resultados - " + (Get-Date -Format 'yyyy-MM-dd HH:mm')
    & $git -C $proyecto commit -m $mensaje | Out-Host
    Write-Host "   guardado: $mensaje"
} else {
    Write-Host "   no había cambios nuevos que guardar"
}

Write-Host "== 3. Subiendo a GitHub =="
$ErrorActionPreference = 'Continue'
$rama = & $git -C $proyecto rev-parse --abbrev-ref '@{upstream}' 2>$null
$tieneUpstream = ($LASTEXITCODE -eq 0 -and $rama)
if ($tieneUpstream) {
    $pendientes = @(& $git -C $proyecto log --oneline '@{upstream}..HEAD' 2>$null)
} else {
    $pendientes = @("primera subida")
}
$ErrorActionPreference = 'Stop'

if (-not $cambios -and -not $tieneUpstream -and $pendientes.Count -eq 1 -and $pendientes[0] -eq "primera subida") {
    # nada nuevo y nunca se ha subido: igual hay que subir el historial
    $pendientes = @("primera subida")
}

if ($pendientes.Count -eq 0 -and -not $cambios) {
    Write-Host "   GitHub ya tiene la última versión: no hay nada que subir"
} elseif ($tieneUpstream) {
    $pendientes | ForEach-Object { "   pendiente: " + $_ }
    & $git -C $proyecto push
} else {
    Write-Host "   primera subida: creando la rama main en GitHub"
    & $git -C $proyecto push -u origin main
}

Write-Host ""
Write-Host "Listo. En un minuto los cambios se verán en:"
Write-Host "   $sitio"
Write-Host ""
Write-Host "Si es la primera vez y GitHub pide iniciar sesión, se abrirá el navegador:"
Write-Host "entra con tu cuenta royrafa010-bit y autoriza el acceso."
Write-Host ""
if (-not $tieneUpstream -or $LASTEXITCODE -ne 0) {
    Write-Host "RECUERDA: el repositorio https://github.com/royrafa010-bit/copa-futbol tiene que existir."
    Write-Host "Créalo (público, sin README) en: https://github.com/new?name=copa-futbol"
}
