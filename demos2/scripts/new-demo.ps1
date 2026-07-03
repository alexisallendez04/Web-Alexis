# Crear demo de prospección
# Uso: .\scripts\new-demo.ps1 -Nombre "Estudio Pérez" [-Rubro abogado]

param(
    [Parameter(Mandatory = $true)]
    [string]$Nombre,

    [string]$Rubro = "abogado"
)

$ErrorActionPreference = "Stop"

$root = Split-Path $PSScriptRoot -Parent
$template = Join-Path $root "_template"
$registryPath = Join-Path $root "registry.json"

function Get-Slug([string]$text) {
    $normalized = $text.ToLower().Trim()
    $normalized = $normalized -replace '[áàäâ]', 'a'
    $normalized = $normalized -replace '[éèëê]', 'e'
    $normalized = $normalized -replace '[íìïî]', 'i'
    $normalized = $normalized -replace '[óòöô]', 'o'
    $normalized = $normalized -replace '[úùüû]', 'u'
    $normalized = $normalized -replace 'ñ', 'n'
    $normalized = $normalized -replace '[^a-z0-9]+', '-'
    $normalized = $normalized.Trim('-')
    return $normalized
}

$slug = Get-Slug $Nombre
if (-not $slug) {
    Write-Error "No se pudo generar un slug válido para '$Nombre'."
}

$dest = Join-Path $root $slug
if (Test-Path $dest) {
    Write-Error "Ya existe una demo en: $dest"
}

if (-not (Test-Path $template)) {
    Write-Error "No se encontró la plantilla en: $template"
}

Copy-Item -Path $template -Destination $dest -Recurse

$fecha = Get-Date -Format "yyyy-MM-dd"
$replacements = @{
    "{{NOMBRE}}" = $Nombre
    "{{SLUG}}"   = $slug
    "{{FECHA}}"  = $fecha
}

$textFiles = @(
    "brief.md",
    "README.md",
    "status.json",
    "js\config.js",
    "robots.txt",
    "sitemap.xml"
)

foreach ($rel in $textFiles) {
    $file = Join-Path $dest $rel
    if (-not (Test-Path $file)) { continue }
    $content = Get-Content $file -Raw -Encoding UTF8
    foreach ($key in $replacements.Keys) {
        $content = $content -replace [regex]::Escape($key), $replacements[$key]
    }
    Set-Content -Path $file -Value $content -Encoding UTF8 -NoNewline
}

# config.js: nombre y mensaje de WhatsApp
$configPath = Join-Path $dest "js\config.js"
if (Test-Path $configPath) {
    $config = Get-Content $configPath -Raw -Encoding UTF8
    $config = $config -replace 'name: "Nombre del Estudio"', "name: `"$Nombre`""
    $config = $config -replace 'url: "https://ejemplo-demo.tudominio.com"', "url: `"https://$slug.tudominio.com`""
    Set-Content -Path $configPath -Value $config -Encoding UTF8 -NoNewline
}

# status.json: rubro
$statusPath = Join-Path $dest "status.json"
if (Test-Path $statusPath) {
    $status = Get-Content $statusPath -Raw -Encoding UTF8 | ConvertFrom-Json
    $status.rubro = $Rubro
    $status | ConvertTo-Json -Depth 5 | Set-Content $statusPath -Encoding UTF8
}

# registry.json
$registry = @{ version = 1; demos = @() }
if (Test-Path $registryPath) {
    $registry = Get-Content $registryPath -Raw -Encoding UTF8 | ConvertFrom-Json
}

$exists = $registry.demos | Where-Object { $_.slug -eq $slug }
if (-not $exists) {
    $registry.demos += [ordered]@{
        slug    = $slug
        nombre  = $Nombre
        rubro   = $Rubro
        estado  = "borrador"
        creado  = $fecha
        carpeta = $slug
    }
    $registry | ConvertTo-Json -Depth 5 | Set-Content $registryPath -Encoding UTF8
}

Write-Host ""
Write-Host "Demo creada: $dest" -ForegroundColor Green
Write-Host ""
Write-Host "Siguiente:"
Write-Host "  1. Completar brief.md"
Write-Host "  2. Editar js/config.js y css/variables.css"
Write-Host "  3. Personalizar index.html"
Write-Host "  4. Abrir index.html en el navegador"
Write-Host ""
