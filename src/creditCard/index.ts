import { cardBrands, type CardBrand } from "./brands";
import luhn from "fast-luhn";

export { type CardBrand } from "./brands";

export function isCardNum(v: unknown) {
    if (typeof v !== "string") return false;
    return luhn(v);
}

export function formatCardExp(v: string) {
    if (v === "") return "";

    const clean = v.replace(/[^0-9]/g, "");

    if (clean.length === 0) return "";
    else if (clean.length === 1 || clean.length === 2) return clean;
    else if (clean.length === 3)
        return clean.slice(0, 2) + " / " + clean.slice(2);
    else if (clean.length === 4)
        return clean.slice(0, 2) + " / " + clean.slice(2, 4);
    else return clean.slice(0, 2) + " / " + clean.slice(2, 4);
}

export function maskCardExp(v: string) {
    return formatCardExp(v)
        .split("")
        .map((char, _ind) => {
            return char;
        })
        .join("");
}

export function cleanCardNum(v: string) {
    return v.replace(/[^0-9]/g, "");
}

export function formatCardNum(v: string, brand?: CardBrand | undefined) {
    if (v === "") return "";

    const gaps = brand ? brand.gaps.concat([]) : [4, 8, 12];
    const clean = v.replace(/[^0-9]/g, "");
    const digits = clean.split("");

    let padIndex = 0;
    while (gaps.length > 0) {
        if (digits.length <= gaps[0]! + padIndex) break;
        digits.splice(gaps[0]! + padIndex, 0, " ");
        padIndex += 1;
        gaps.shift();
    }

    return digits.join("");
}

export function maskCardNum(v: string, brand?: CardBrand | undefined) {
    return formatCardNum(v, brand || undefined)
        .split("")
        .map((char, ind) => {
            return char === " " ? char : ind < 4 ? char : "*";
        })
        .join("");
}

export function findCardBrand(num: string = "") {
    if (num.length === 0) return undefined;

    const clean = num.replace(/[^0-9]/g, "");
    if (clean.length === 0) return undefined;

    return cardBrands.find((card) => {
        const startsWithExpanded = expandStartsWith(card.startsWith);
        return startsWithExpanded.some((digits) => num.startsWith(digits));
    });

    function expandStartsWith(list: string[]) {
        return list.reduce(
            (memo: string[], digits) =>
                memo.concat(
                    !digits.includes("-") ? [digits] : digits.split("-"),
                ),
            [],
        );
    }
}

export function getCardBrand(brand: string) {
    return cardBrands.find(({ name }) => name === brand);
}
