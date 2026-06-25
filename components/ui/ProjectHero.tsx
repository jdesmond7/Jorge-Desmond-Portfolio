import { ZoomableImage } from "./ZoomableImage";

interface ProjectHeroProps {
  src: string;
  alt: string;
}

export function ProjectHero({ src, alt }: ProjectHeroProps) {
  return (
    <div className="relative h-[min(52vw,480px)] min-h-[280px] w-full overflow-hidden">
      <ZoomableImage
        src={src}
        alt={alt}
        fill
        priority
        className="object-cover"
        sizes="100vw"
        containerClassName="h-full w-full"
      />
    </div>
  );
}
