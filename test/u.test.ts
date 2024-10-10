import { describe, it, expect } from "vitest";

import { u } from "../src/core/index";

describe("u", () => {
  it("should be defined", () => {
    expect(u).toBeDefined();
    expect(u.parse).toBeDefined();
    expect(u.safeParse).toBeDefined();
  });
});

describe("u.parse", () => {
  it("should throw error when incorrect input unit is passed", () => {
    // @ts-expect-error
    expect(() => u.parse("1magic")).toThrow("unknown unit type 1magic");
  });

  it("should throw error when incorrect output unit is passed", () => {
    // @ts-expect-error
    expect(() => u.parse("1kb", "magic")).toThrow("unknown output unit magic");
  });
});

describe("u.safeParse", () => {
  it("should return null when incorrect input unit is passed", () => {
    // @ts-expect-error
    expect(u.safeParse("1magic")).toBeNull();
  });

  it("should return null when incorrect output unit is passed", () => {
    // @ts-expect-error
    expect(u.safeParse("1kb", "magic")).toBeNull();
  });
});

describe("u.parse.time", () => {
  it("should parse time to milliseconds if output unit is not passed", () => {
    const r1 = u.parse("1d");
    const r2 = u.parse("2.5h");
    const r3 = u.parse("1min");
    const r4 = u.parse("10.1s");
    const r5 = u.parse("1ms");

    expect(r1.valueAsNumber).toBe(24 * 60 * 60 * 1000);
    expect(r2.valueAsNumber).toBe(60 * 60 * 1000 * 2.5);
    expect(r3.valueAsNumber).toBe(60 * 1000);
    expect(r4.valueAsNumber).toBe(10.1 * 1000);
    expect(r5.valueAsNumber).toBe(1);
  });

  it("should parse time to correct unit when output unit is passed", () => {
    const r1 = u.parse("1.5d", "h");
    const r2 = u.parse("2.4h", "d");
    const r3 = u.parse("15.5min", "h");

    expect(r1.valueAsNumber).toBe(36);
    expect(r2.valueAsNumber).toBe(0.1);
    expect(r3.valueAsNumber).toBe(15.5 / 60);
  });
});

describe("u.parse.distance", () => {
  it("should parse distance to mm if output unit is not passed", () => {
    expect(u.parse("1.5km").valueAsNumber).toBe(1.5 * 1000 * 100 * 10);
    expect(u.parse("15.3m").valueAsNumber).toBe(15.3 * 100 * 10);
    expect(u.parse("1dm").valueAsNumber).toBe(1 * 10 * 10);
  });
});

describe("u.parse.memory", () => {
  it("should parse memory to bytes if output unit is not passed", () => {
    expect(u.parse("1pb").valueAsNumber).toBe(1024 * 1024 * 1024 * 1024 * 1024);

    expect(u.parse("2.5gb").valueAsNumber).toBe(1024 * 1024 * 1024 * 2.5);
    expect(u.parse("1mb").valueAsNumber).toBe(1024 * 1024);
    expect(u.parse("15.5kb").valueAsNumber).toBe(1000 * 15.5);
    expect(u.parse("1b").valueAsNumber).toBe(1);
  });
});