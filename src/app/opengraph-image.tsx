import { ImageResponse } from "next/og";
import { cvData } from "@/data/cv";

export const alt = `${cvData.profile.name} — curriculum vitae`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  const { profile } = cvData;

  return new ImageResponse(
    (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          width: "100%",
          height: "100%",
          padding: "72px 80px",
          background: "#0E1726",
          color: "#F5F7FA",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              display: "flex",
              fontSize: 22,
              letterSpacing: 6,
              textTransform: "uppercase",
              color: "#8FA6C4",
            }}
          >
            Curriculum Vitae
          </div>
          <div
            style={{
              display: "flex",
              marginTop: 24,
              fontSize: 84,
              fontWeight: 700,
              letterSpacing: -2,
            }}
          >
            {profile.name}
          </div>
          <div
            style={{
              display: "flex",
              marginTop: 10,
              fontSize: 30,
              color: "#8FA6C4",
            }}
          >
            {profile.credentials}
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              display: "flex",
              width: 120,
              height: 5,
              background: "#4C7BB5",
              marginBottom: 28,
            }}
          />
          <div style={{ display: "flex", fontSize: 34, lineHeight: 1.3 }}>
            {profile.headline}
          </div>
          <div
            style={{
              display: "flex",
              marginTop: 20,
              fontSize: 24,
              color: "#8FA6C4",
            }}
          >
            cv.briankfung.com
          </div>
        </div>
      </div>
    ),
    { ...size },
  );
}
