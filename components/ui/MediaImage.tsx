import Image, { type ImageProps } from "next/image";

function isExternalUrl(src: ImageProps["src"]) {
  return (
    typeof src === "string" &&
    (src.startsWith("http://") || src.startsWith("https://"))
  );
}

type MediaImageProps = ImageProps & {
  alt: string;
};

/** Local/remote image wrapper aligned to the DS (Next Image optimization). */
export function MediaImage({ src, alt, ...props }: MediaImageProps) {
  return (
    <Image
      src={src}
      alt={alt}
      unoptimized={isExternalUrl(src)}
      {...props}
    />
  );
}
