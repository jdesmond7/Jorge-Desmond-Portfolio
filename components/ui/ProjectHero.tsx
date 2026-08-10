import { MediaImage } from "./MediaImage";

interface ProjectHeroProps {
  src: string;
  alt: string;
}

export function ProjectHero({ src, alt }: ProjectHeroProps) {
  return (
    <div className="relative h-[min(52vw,480px)] min-h-[280px] w-full overflow-hidden">
      <MediaImage
        src={src}
        alt={alt}
        fill
        preload
        className="object-cover"
        sizes="100vw"
      />
    </div>
  );
}
