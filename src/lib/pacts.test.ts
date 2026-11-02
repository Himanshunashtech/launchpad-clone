import { describe, it, expect } from "vitest";
import { pactStatus, daysUntil } from "./pacts";

const L = { id: "L1", user_id: "U2" };

describe("pactStatus", () => {
  it("is a pact only when both sides back each other", () => {
    expect(pactStatus(L, "U1", new Set(["L1"]), new Set(["U2"]))).toBe("pact");
  });
  it("is one-sided when only I backed", () => {
    expect(pactStatus(L, "U1", new Set(["L1"]), new Set())).toBe("backed");
  });
  it("shows they back you when only they backed", () => {
    expect(pactStatus(L, "U1", new Set(), new Set(["U2"]))).toBe("backs_you");
  });
  it("own launch is never a pact", () => {
    expect(pactStatus({ id: "L1", user_id: "U1" }, "U1", new Set(["L1"]), new Set(["U1"]))).toBe("own");
  });
});

describe("daysUntil", () => {
  it("counts days to launch", () => {
    expect(daysUntil("2026-07-29", new Date("2026-07-22T15:00:00Z"))).toBe(7);
  });
});
