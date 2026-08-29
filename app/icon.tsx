import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";
import { brand } from "@/lib/design-tokens";

export const size = { width: 32, height: 32 };
export const contentType = "image/png";

export default async function Icon() {
  const font = await readFile(
    join(process.cwd(), "public/fonts/Montserrat-SemiBold.ttf"),
  );

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#FCBC08",
          color: "#34322D",
          borderRadius: 8,
          fontFamily: "Montserrat",
          fontSize: 14,
          fontWeight: 600,
          letterSpacing: "-0.04em",
          lineHeight: 1,
        }}
      >
        {brand.initials}
      </div>
    ),
    {
      ...size,
      fonts: [
        {
          name: "Montserrat",
          data: font,
          style: "normal",
          weight: 600,
        },
      ],
    },
  );
}
