import { expect, test } from "vitest";
import { isMoney, isTimestamp, isEmail } from "./validation";

test("isEmail", () => {
    expect(isEmail("invalid")).toBe(false);
});

test("isTimestamp", () => {
    expect(isTimestamp(1724845064)).toBe(true);
    expect(isTimestamp("1724845064")).toBe(true);
    expect(isTimestamp(1724845064000)).toBe(false);
    expect(isTimestamp("1724845064000")).toBe(false);
});

test("isMoney", () => {
    expect(isMoney("1.23")).toBe(true);
    expect(isMoney(1.23)).toBe(true);
    expect(isMoney("1.23,00")).toBe(false);
    expect(isMoney("1 23.00")).toBe(false);
});
