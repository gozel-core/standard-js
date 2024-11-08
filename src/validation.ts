import { BROWSER } from "esm-env";

export { isCardNum } from "./creditCard";

export function isEmail(text: unknown) {
    if (typeof text !== "string" || text.length > 320) return false;

    // the regex here is from:
    // https://html.spec.whatwg.org/multipage/input.html#valid-e-mail-address
    const re =
        /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;

    if (BROWSER) {
        const input = document.createElement("input");

        input.type = "email";
        input.required = true;
        input.value = text;

        return typeof input.checkValidity === "function"
            ? input.checkValidity()
            : re.test(text);
    }

    return re.test(text);
}

export function isNanoId(v: unknown): boolean {
    return typeof v === "string" && /[A-Za-z0-9_-]{24}/.test(v);
}

export function isTimestamp(v: unknown) {
    return (
        (typeof v === "number" &&
            v.toString().length === 10 &&
            !/[^0-9]+/.test(v.toString())) ||
        (typeof v === "string" && v.length === 10 && !/[^0-9]+/.test(v))
    );
}

export function isMoney(v: unknown) {
    if (typeof v === "number") return isFinite(v);
    if (typeof v !== "string") return false;
    if (/[^0-9.]/.test(v)) return false;

    const dotInd = v.indexOf(".");
    if (dotInd === 0 || dotInd === v.length - 1) return false;
    if (dotInd !== -1 && dotInd !== v.lastIndexOf(".")) return false;

    return true;
}
