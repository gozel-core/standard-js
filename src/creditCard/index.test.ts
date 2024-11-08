import { expect, test } from "vitest";
import {
    findCardBrand,
    formatCardNum,
    cleanCardNum,
    maskCardNum,
} from "./index";
import { cardBrands } from "./brands";

test("findCardBrand", () => {
    expect(findCardBrand("")).toBe(undefined);
    expect(findCardBrand("4543")).toMatchObject({ name: "visa" });
    expect(findCardBrand("45 43")).toMatchObject({ name: "visa" });
});

test("cleanCardNum", () => {
    expect(cleanCardNum("1234 5678 1234 5678")).toBe("1234567812345678");
    expect(cleanCardNum(" 1234-5678-1234-5678 ")).toBe("1234567812345678");
});

test("formatCardNum", () => {
    expect(formatCardNum("1234567812345678", cardBrands[0])).toBe(
        "1234 5678 1234 5678",
    );
    expect(formatCardNum("123456781234567", cardBrands[0])).toBe(
        "1234 5678 1234 567",
    );
    expect(formatCardNum("12345678123456", cardBrands[0])).toBe(
        "1234 5678 1234 56",
    );
    expect(formatCardNum("1234567812345", cardBrands[0])).toBe(
        "1234 5678 1234 5",
    );
    expect(formatCardNum("123456781234", cardBrands[0])).toBe("1234 5678 1234");
    expect(formatCardNum("12345678123", cardBrands[0])).toBe("1234 5678 123");
    expect(formatCardNum("1234567812", cardBrands[0])).toBe("1234 5678 12");
    expect(formatCardNum("123456781", cardBrands[0])).toBe("1234 5678 1");
    expect(formatCardNum("12345678", cardBrands[0])).toBe("1234 5678");
    expect(formatCardNum("1234567", cardBrands[0])).toBe("1234 567");
    expect(formatCardNum("123456", cardBrands[0])).toBe("1234 56");
    expect(formatCardNum("12345", cardBrands[0])).toBe("1234 5");
    expect(formatCardNum("1234", cardBrands[0])).toBe("1234");
    expect(formatCardNum("123", cardBrands[0])).toBe("123");
    expect(formatCardNum("12", cardBrands[0])).toBe("12");
    expect(formatCardNum("1", cardBrands[0])).toBe("1");
});

test("maskCardNum", () => {
    expect(maskCardNum("1234567812345678", cardBrands[0])).toBe(
        "1234 **** **** ****",
    );
    expect(maskCardNum("123456781234567", cardBrands[0])).toBe(
        "1234 **** **** ***",
    );
    expect(maskCardNum("12345678123456", cardBrands[0])).toBe(
        "1234 **** **** **",
    );
    expect(maskCardNum("1234567812345", cardBrands[0])).toBe(
        "1234 **** **** *",
    );
    expect(maskCardNum("123456781234", cardBrands[0])).toBe("1234 **** ****");
    expect(maskCardNum("12345678123", cardBrands[0])).toBe("1234 **** ***");
    expect(maskCardNum("1234567812", cardBrands[0])).toBe("1234 **** **");
    expect(maskCardNum("123456781", cardBrands[0])).toBe("1234 **** *");
    expect(maskCardNum("12345678", cardBrands[0])).toBe("1234 ****");
    expect(maskCardNum("1234567", cardBrands[0])).toBe("1234 ***");
    expect(maskCardNum("123456", cardBrands[0])).toBe("1234 **");
    expect(maskCardNum("12345", cardBrands[0])).toBe("1234 *");
    expect(maskCardNum("1234", cardBrands[0])).toBe("1234");
    expect(maskCardNum("123", cardBrands[0])).toBe("123");
    expect(maskCardNum("12", cardBrands[0])).toBe("12");
    expect(maskCardNum("1", cardBrands[0])).toBe("1");
    expect(maskCardNum("", cardBrands[0])).toBe("");
});
