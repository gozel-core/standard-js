import { expect, test, vi } from "vitest";
import {
    getCurrentDateLocal,
    getCurrentDateUtc,
    relative,
    dayjs,
} from "./dateutil";

test("relative", () => {
    const v1 = relative("2024-09-08", "2024-09-07");
    expect(/(in a day)/.test(v1)).toBe(true);
});

test("get timestamp local and utc", () => {
    const currentDate = new Date(Date.UTC(2000, 1, 10, 12, 0, 0));
    vi.setSystemTime(currentDate);

    const v1 = getCurrentDateLocal();
    const v2 = getCurrentDateUtc();
    expect(v1).toBe(
        dayjs(v2)
            .tz(Intl.DateTimeFormat().resolvedOptions().timeZone)
            .format("YYYY-MM-DDTHH:mm:ssZ"),
    );
    expect(v2).toBe("2000-02-10T12:00:00+00:00");
});
