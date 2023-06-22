param (
  [Parameter(Mandatory)]
  [string]$NewDir,

  [Parameter(Mandatory)]
  [string]$TarDir
)

function New-Dir {
  param (
    $Dir
  )
    
  If (!(Test-Path -PathType container $Dir)) {
    New-Item -ItemType Directory -Path $Dir
  }
}

New-Dir $NewDir
New-Dir $TarDir

$DistroName = "Ubuntu-22.04"

wsl --export "$DistroName" "$TarDir\$DistroName.tar"
wsl --unregister "$DistroName"
wsl --import "$DistroName" "$NewDir\$DistroName" "$TarDir\$DistroName.tar"
