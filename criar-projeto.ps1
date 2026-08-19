param (
    [string]$NomeProjeto = "MeuSite"
)

$projeto = ".\$NomeProjeto"

New-Item -ItemType Directory -Path "$projeto\css" -Force | Out-Null
New-Item -ItemType Directory -Path "$projeto\js" -Force | Out-Null

New-Item -ItemType File -Path "$projeto\index.html" -Force | Out-Null
New-Item -ItemType File -Path "$projeto\css\style.css" -Force | Out-Null
New-Item -ItemType File -Path "$projeto\js\script.js" -Force | Out-Null

Write-Host "Projeto criado em: $projeto"