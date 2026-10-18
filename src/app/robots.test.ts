import { describe, expect, it } from "vitest";
import { buildRobots } from "./robots";

describe("robots", () => {
  it("allows every crawler when nothing is blocked", () => {
    expect(buildRobots([]).rules).toEqual([{ userAgent: "*", allow: "/" }]);
  });

  it("disallows only the listed crawlers", () => {
    expect(buildRobots(["Bytespider", "Diffbot"]).rules).toEqual([
      { userAgent: "*", allow: "/" },
      { userAgent: ["Bytespider", "Diffbot"], disallow: "/" },
    ]);
  });
});
