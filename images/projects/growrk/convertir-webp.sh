#!/bin/bash
for file in *.png; do
  filename="${file%.*}"
  cwebp -q 90 "$file" -o "${filename}.webp"
done
