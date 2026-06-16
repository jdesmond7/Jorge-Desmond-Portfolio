import { Container } from "@/components/ui/Container";

interface FooterProps {
  footerText: string;
}

export function Footer({ footerText }: FooterProps) {
  return (
    <footer className="border-t border-mist bg-fog">
      <Container className="flex flex-wrap justify-between gap-3 py-7">
        <span className="text-[13px] tracking-[-0.005em] text-zinc">
          © {new Date().getFullYear()} Jorge Desmond
        </span>
        <span className="mono text-[11px] tracking-[-0.006em] text-ash">
          {footerText}
        </span>
      </Container>
    </footer>
  );
}
