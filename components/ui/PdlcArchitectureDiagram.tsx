import type { Locale } from "@/lib/i18n/types";

const COPY = {
  es: {
    rootTitle: "PORTADA",
    rootSubtitle: "Elige tu sede",
    venues: [
      { name: "PARQUE FUNDIDORA", city: "Monterrey, N.L." },
      { name: "FORO VALLE ORIENTE", city: "San Pedro G.G." },
    ],
    pages: ["Inicio", "Amenidades", "Preguntas"],
    caption:
      "Cada sede tiene su propio contenido, fechas, precios y amenidades, pero comparten identidad y navegación.",
  },
  en: {
    rootTitle: "LANDING",
    rootSubtitle: "Choose your location",
    venues: [
      { name: "PARQUE FUNDIDORA", city: "Monterrey, N.L." },
      { name: "FORO VALLE ORIENTE", city: "San Pedro G.G." },
    ],
    pages: ["Home", "Amenities", "FAQ"],
    caption:
      "Each location has its own content, dates, pricing, and amenities, but they share identity and navigation.",
  },
} as const;

interface PdlcArchitectureDiagramProps {
  locale?: Locale;
}

function VenueColumn({
  name,
  city,
  pages,
}: {
  name: string;
  city: string;
  pages: readonly string[];
}) {
  return (
    <div className="pdlc-architecture__venue-col">
      <div className="pdlc-architecture__node-venue">
        <h2>{name}</h2>
        <span>{city}</span>
      </div>
      <div className="pdlc-architecture__subfork" aria-hidden>
        <div className="pdlc-architecture__subfork-down-c" />
        <div className="pdlc-architecture__subfork-h" />
        <div className="pdlc-architecture__subfork-s1" />
        <div className="pdlc-architecture__subfork-s2" />
        <div className="pdlc-architecture__subfork-s3" />
      </div>
      <div className="pdlc-architecture__pages">
        {pages.map((page) => (
          <div key={page} className="pdlc-architecture__node-page">
            {page}
          </div>
        ))}
      </div>
    </div>
  );
}

export function PdlcArchitectureDiagram({
  locale = "es",
}: PdlcArchitectureDiagramProps) {
  const copy = COPY[locale];

  return (
    <figure className="pdlc-architecture my-8 w-full">
      <div className="pdlc-architecture__diagram" role="img">
        <div className="pdlc-architecture__row">
          <div className="pdlc-architecture__node-root">
            <h3>{copy.rootTitle}</h3>
            <p>{copy.rootSubtitle}</p>
          </div>
        </div>

        <div className="pdlc-architecture__fork" aria-hidden>
          <div className="pdlc-architecture__fork-down-c" />
          <div className="pdlc-architecture__fork-h" />
          <div className="pdlc-architecture__fork-down-l" />
          <div className="pdlc-architecture__fork-down-r" />
        </div>

        <div className="pdlc-architecture__venues">
          {copy.venues.map((venue) => (
            <VenueColumn
              key={venue.name}
              name={venue.name}
              city={venue.city}
              pages={copy.pages}
            />
          ))}
        </div>
      </div>

      <figcaption className="pdlc-architecture__caption">
        {copy.caption}
      </figcaption>
    </figure>
  );
}
