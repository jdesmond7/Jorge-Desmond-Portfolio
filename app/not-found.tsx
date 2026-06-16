import Link from "next/link";
import { Container } from "@/components/ui/Container";

export default function NotFound() {
  return (
    <div className="flex min-h-[60vh] items-center pt-28 md:pt-32">
      <Container className="py-[var(--section-py)] text-center">
        <h1 className="mb-4 text-[clamp(48px,10vw,72px)] font-normal tracking-[-0.025em] text-carbon">
          404
        </h1>
        <p className="mb-8 text-[17px] tracking-[-0.009em] text-zinc">
          Esta página no existe o fue movida.
        </p>
        <Link
          href="/"
          className="pill-cta inline-flex min-h-11 items-center rounded-[var(--radius-pill)] bg-coral px-8 py-4 text-[15px] font-semibold tracking-[-0.009em] text-white no-underline"
        >
          Volver al inicio →
        </Link>
      </Container>
    </div>
  );
}
