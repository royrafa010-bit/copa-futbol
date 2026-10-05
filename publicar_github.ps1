# ============================================================================
#  Publicar la copa en GitHub Pages  (sin pedir contraseña)
# ----------------------------------------------------------------------------
#  Qué hace, en orden:
#    1. Si has descargado un datos.js nuevo desde el panel, lo copia al proyecto.
#    2. Guarda los cambios en Git (si hay).
#    3. Sube la rama main a GitHub usando el token que Windows ya tiene guardado.
#       El token nunca se muestra ni se queda escrito en el proyecto.
#    4. Comprueba que la página responde en internet.
#
#  Uso normal:  doble clic en "Publicar en GitHub.cmd"
#  Uso avanzado: powershell -ExecutionPolicy Bypass -File publicar_github.ps1 -Mensaje "Jornada 3"
# ============================================================================

param(
    [string]$Mensaje = ""
)

$ErrorActionPreference = 'Continue'

# ------------------------------ configuración ------------------------------
$proyecto = 'C:\Users\DELL\OneDrive\Documentos\copa-futbol'
$usuario  = 'royrafa010-bit'
$repo     = 'copa-futbol'
$sitio    = "https://$usuario.github.io/$repo/"
$git      = 'C:\Program Files\Git\cmd\git.exe'
$descargas = Join-Path $env:USERPROFILE 'Downloads'
$objetivoCredencial = "GitHub - https://api.github.com/$usuario"
$intentos = 12
$espera = 6

if (-not (Test-Path $git)) { $git = 'git' }

$token = ''

function Ocultar([string]$texto) {
    if ($token -and $texto) { return ($texto -replace [regex]::Escape($token), '***') }
    return $texto
}

function Titulo([string]$t) {
    Write-Host ""
    Write-Host "== $t =="
}

Write-Host ""
Write-Host "====================================================="
Write-Host " Publicar la copa en GitHub Pages"
Write-Host "====================================================="

# ------------------------------ 1. datos.js nuevo ------------------------------
Titulo "1. Buscando un datos.js nuevo en Descargas"
$destinoDatos = Join-Path $proyecto 'datos.js'
$elegido = $null
if (Test-Path $descargas) {
    $elegido = Get-ChildItem -LiteralPath $descargas -Filter 'datos*.js' -File -ErrorAction SilentlyContinue |
               Sort-Object LastWriteTime -Descending | Select-Object -First 1
}
if ($elegido -and (Test-Path $destinoDatos) -and ((Get-Item $destinoDatos).LastWriteTime -lt $elegido.LastWriteTime)) {
    Copy-Item -LiteralPath $elegido.FullName -Destination $destinoDatos -Force
    Write-Host ("   copiado: " + $elegido.Name + "  ->  datos.js")
} else {
    Write-Host "   no hay un datos.js más reciente en Descargas (se publica lo que ya está)"
}

# ------------------------------ 2. guardar en Git ------------------------------
Titulo "2. Guardando los cambios en Git"
& $git -C $proyecto add -A
$cambios = & $git -C $proyecto status --porcelain
if ($cambios) {
    if (-not $Mensaje) { $Mensaje = "Actualiza los resultados - " + (Get-Date -Format 'yyyy-MM-dd HH:mm') }
    & $git -C $proyecto commit -m $Mensaje | Out-Host
    Write-Host "   guardado: $Mensaje"
} else {
    Write-Host "   no había cambios nuevos que guardar"
}

# ------------------------------ 3. leer el token de Windows ------------------------------
Titulo "3. Obteniendo la credencial de GitHub"
Add-Type -TypeDefinition @"
using System;
using System.Runtime.InteropServices;
using System.Text;
public class CredLectorCopa {
  [DllImport("advapi32.dll", SetLastError=true, CharSet=CharSet.Unicode)]
  public static extern bool CredRead(string target, int type, int flags, out IntPtr credential);
  [DllImport("advapi32.dll", SetLastError=true)]
  public static extern void CredFree(IntPtr buffer);
  [StructLayout(LayoutKind.Sequential, CharSet=CharSet.Unicode)]
  public struct CREDENTIAL {
    public int Flags; public int Type; public string TargetName; public string Comment;
    public long LastWritten; public int CredentialBlobSize; public IntPtr CredentialBlob;
    public int Persist; public int AttributeCount; public IntPtr Attributes;
    public string TargetAlias; public string UserName;
  }
  public static string Leer(string target) {
    IntPtr p;
    if (!CredRead(target, 1, 0, out p)) { return null; }
    CREDENTIAL c = (CREDENTIAL)Marshal.PtrToStructure(p, typeof(CREDENTIAL));
    byte[] b = new byte[c.CredentialBlobSize];
    Marshal.Copy(c.CredentialBlob, b, 0, c.CredentialBlobSize);
    CredFree(p);
    bool utf16 = b.Length >= 2 && b[1] == 0 && b.Length % 2 == 0;
    return (utf16 ? Encoding.Unicode.GetString(b) : Encoding.UTF8.GetString(b)).TrimEnd('\0', '\r', '\n');
  }
}
"@

$token = [CredLectorCopa]::Leer($objetivoCredencial)
if ($token) {
    Write-Host ("   token encontrado en Windows (" + $token.Length + " caracteres, no se muestra)")
} else {
    Write-Host "   no hay token guardado: se usará el inicio de sesión normal de Git"
}

# ------------------------------ 4. subir ------------------------------
Titulo "4. Subiendo a GitHub"
$urlLimpia = "https://github.com/$usuario/$repo.git"
$urlConToken = "https://$usuario`:$token@github.com/$usuario/$repo.git"
if ($token) { & $git -C $proyecto remote set-url origin $urlConToken | Out-Null }

$subido = $false
for ($i = 1; $i -le $intentos; $i++) {
    $salida = & $git -C $proyecto push -u origin main 2>&1
    $texto = ($salida | Out-String)
    if ($LASTEXITCODE -eq 0) {
        $salida | ForEach-Object { Write-Host (Ocultar ("   " + $_)) }
        $subido = $true
        break
    }
    if ($texto -match 'rejected|non-fast-forward|fetch first') {
        Write-Host "   el remoto tiene contenido distinto: se fuerza la subida del proyecto"
        $salida = & $git -C $proyecto push -u origin main --force-with-lease 2>&1
        if ($LASTEXITCODE -ne 0) { $salida = & $git -C $proyecto push -u origin main --force 2>&1 }
        $salida | ForEach-Object { Write-Host (Ocultar ("   " + $_)) }
        if ($LASTEXITCODE -eq 0) { $subido = $true; break }
    }
    if ($texto -match 'resolve host|Could not resolve|timed out|Connection|network|Could not read') {
        Write-Host "   (red: intento $i/$intentos falló; reintento en $espera s)"
        Start-Sleep -Seconds $espera
        continue
    }
    # error que no se arregla reintentando
    $salida | ForEach-Object { Write-Host (Ocultar ("   " + $_)) }
    break
}

# dejar siempre la URL limpia, sin el token
if ($token) { & $git -C $proyecto remote set-url origin $urlLimpia | Out-Null }

if ($subido) {
    Write-Host "   subida completada"
} else {
    Write-Host "   NO se pudo subir (revisa el mensaje anterior)"
}

# ------------------------------ 5. comprobar la página ------------------------------
Titulo "5. Comprobando la página publicada"
$enLinea = $false
for ($i = 1; $i -le 8; $i++) {
    try {
        $r = Invoke-WebRequest -Uri $sitio -UseBasicParsing -TimeoutSec 25
        Write-Host "   OK: la página responde (HTTP $($r.StatusCode), $($r.RawContentLength) bytes)"
        $enLinea = $true
        break
    } catch {
        $c = $null
        if ($_.Exception.Response) { $c = $_.Exception.Response.StatusCode.value__ }
        Write-Host "   intento $i/8: respuesta $c (GitHub puede estar actualizando el sitio)"
        Start-Sleep -Seconds 10
    }
}

Write-Host ""
Write-Host "-----------------------------------------------------"
if ($subido) { Write-Host " LISTO: los cambios deberían verse en un minuto" }
else { Write-Host " ATENCION: no se pudo completar la subida" }
Write-Host "   repositorio: https://github.com/$usuario/$repo"
Write-Host "   página:      $sitio"
Write-Host "-----------------------------------------------------"
Write-Host ""
