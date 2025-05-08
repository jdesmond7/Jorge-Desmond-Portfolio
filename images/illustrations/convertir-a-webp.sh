#!/bin/bash

# Script para convertir .jpg/.jpeg a .webp con calidad 90

for file in *.jpg *.jpeg; do
  [ -e "$file" ] || continue  # evita errores si no hay archivos
  filename="${file%.*}"
  cwebp -q 90 "$file" -o "${filename}.webp"
done

echo "✅ Conversión completada."
