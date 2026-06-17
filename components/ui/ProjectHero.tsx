import { CmsImage } from "./CmsImage";

interface ProjectHeroProps {
  src: string;
  alt: string;
}

export function ProjectHero({ src, alt }: ProjectHeroProps) {
  return (
    <div className="relative h-[min(52vw,480px)] min-h-[280px] w-full overflow-hidden">
      <CmsImage
        src={src}
        alt={alt}
        fill
        priority
        className="object-cover"
        sizes="100vw"
      />
    </div>
  );
}
