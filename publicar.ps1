# Publica en GitHub Pages los cambios que hiciste desde el panel de la página.
#
# CÓMO SE USA
#   1) En la página:  ⚙️ Administrar  ->  Datos  ->  "Descargar datos.js"
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

Write-Host "== 1. Buscando un datos.js nuevo en Descargas =="
$destino = Join-Path $proyecto 'datos.js'
$elegido = $null
if (Test-Path $descargas) {
    $elegido = Get-ChildItem -LiteralPath $descargas -Filter 'datos*.js' -File -ErrorAction SilentlyContinue |
               Sort-Object LastWriteTime -Descending | Select-Object -First 1
}
if ($elegido -and ((Get-Item $destino).LastWriteTime -lt $elegido.LastWriteTime)) {
    Copy-Item -LiteralPath $elegido.FullName -Destination $destino -Force
    Write-Host ("   copiado: " + $elegido.Name + "  ->  datos.js")
} else {
    Write-Host "   no hay un datos.js más reciente; se publica lo que ya está en la carpeta"
}

Write-Host "== 2. Guardando en Git =="
& $git -C $proyecto add -A
$cambios = & $git -C $proyecto status --porcelain
if (-not $cambios) {
    Write-Host "   no hay cambios que publicar"
    Write-Host ""
    Write-Host "La página está en: $sitio"
    exit 0
}
$mensaje = "Actualiza los resultados - " + (Get-Date -Format 'yyyy-MM-dd HH:mm')
& $git -C $proyecto commit -m $mensaje

Write-Host "== 3. Subiendo a GitHub =="
$ErrorActionPreference = 'Continue'
$seguimiento = & $git -C $proyecto rev-parse --abbrev-ref '@{upstream}' 2>$null
$codigo = $LASTEXITCODE
$ErrorActionPreference = 'Stop'
if ($codigo -eq 0 -and $seguimiento) {
    & $git -C $proyecto push
} else {
    Write-Host "   primera subida: configurando la rama main"
    & $git -C $proyecto push -u origin main
}

Write-Host ""
Write-Host "Listo. En un minuto los cambios se verán en:"
Write-Host "   $sitio"
Write-Host ""
Write-Host "Si es la primera vez y GitHub pide iniciar sesión, se abrirá una ventana"
Write-Host "del navegador: entra con tu cuenta royrafa010-bit y autoriza el acceso."
