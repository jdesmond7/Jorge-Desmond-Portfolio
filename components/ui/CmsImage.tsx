import Image, { type ImageProps } from "next/image";

function isExternalUrl(src: ImageProps["src"]) {
  return (
    typeof src === "string" &&
    (src.startsWith("http://") || src.startsWith("https://"))
  );
}

export function CmsImage({ src, ...props }: ImageProps) {
  return (
    <Image
      src={src}
      unoptimized={isExternalUrl(src)}
      {...props}
    />
  );
}
