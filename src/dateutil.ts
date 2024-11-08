import dayjs from "dayjs";
import pluginRelativeTime from "dayjs/plugin/relativeTime";
import pluginLocalizedFormat from "dayjs/plugin/localizedFormat.js";
import pluginUtc from "dayjs/plugin/utc";
import pluginTimezone from "dayjs/plugin/timezone";

dayjs.extend(pluginLocalizedFormat);
dayjs.extend(pluginRelativeTime);
dayjs.extend(pluginUtc);
dayjs.extend(pluginTimezone);

const localeLoader = {
    tr: async () => await import("dayjs/locale/tr.js"),
    en: async () => await import("dayjs/locale/en.js"),
    ru: async () => await import("dayjs/locale/ru.js"),
};

export { dayjs };

export async function configure({ locale, defaultLocale }: DayjsConfig) {
    const lang = locale.slice(0, 2);
    const defaultLang = defaultLocale.slice(0, 2);

    if (localeLoader[lang as keyof typeof localeLoader]) {
        await localeLoader[lang as keyof typeof localeLoader]();
    } else {
        await localeLoader[defaultLang as keyof typeof localeLoader]();
    }

    return dayjs;
}

export function format(input: string, format: string) {
    return dayjs(input).format(format);
}

export function getCurrentDateLocal() {
    return dayjs().local().format("YYYY-MM-DDTHH:mm:ssZ");
}

export function getCurrentDateUtc() {
    return dayjs().tz("utc").format("YYYY-MM-DDTHH:mm:ssZ");
}

export function relative(input: string, now?: string) {
    return dayjs(now || undefined).to(dayjs(input));
}

interface DayjsConfig {
    locale: string;
    defaultLocale: string;
}
