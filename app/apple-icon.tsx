import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";
import { brand, colors } from "@/lib/design-tokens";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default async function AppleIcon() {
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
          background: colors.black,
          color: colors.white,
          fontFamily: "Montserrat",
          fontSize: 72,
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
