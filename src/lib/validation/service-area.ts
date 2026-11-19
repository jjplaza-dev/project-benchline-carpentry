import type { AreaCheckResult, AreaId, ServiceArea } from "@/domain";
import { normalizeZip } from "@/lib/selectors/normalize";

/**
 * Id of the "other Whatcom County communities" bucket in `src/data/service-areas.ts`.
 * A ZIP or choice that lands only here needs the owner's confirmation.
 */
const OTHER_AREA_ID: AreaId = "area-other-whatcom";

interface AreaCheckInput {
  /** Free-text ZIP. Takes priority when it is not empty. */
  zip?: string;
  /** A chosen town (`ServiceArea.id`), or empty for none. */
  townId?: AreaId | "";
}

/**
 * Checks a ZIP code or a chosen town against the supplied areas. Pure: no data import, no
 * network, no storage. ZIP lists are unconfirmed (assumption A8), so callers should present the
 * result as guidance and not as a promise.
 *
 * - A ZIP listed under a named town → `in-area` (shared ZIPs return every matching town).
 * - A ZIP listed only under "other Whatcom County communities" → `needs-confirmation`.
 * - A valid ZIP listed nowhere → `out-of-area`.
 * - Empty or malformed input → `invalid-zip`.
 */
export function checkServiceArea(
  input: AreaCheckInput,
  areas: readonly ServiceArea[],
): AreaCheckResult {
  const rawZip = (input.zip ?? "").trim();

  if (rawZip !== "") {
    const zip = normalizeZip(rawZip);
    if (zip === null) return { kind: "invalid-zip" };

    const matches = areas.filter((area) => area.zipCodes.includes(zip));
    if (matches.length === 0) return { kind: "out-of-area", zip };

    const named = matches.filter((area) => area.id !== OTHER_AREA_ID);
    return named.length > 0
      ? { kind: "in-area", areas: named }
      : { kind: "needs-confirmation", areas: matches };
  }

  if (input.townId) {
    const area = areas.find((candidate) => candidate.id === input.townId);
    if (!area) return { kind: "invalid-zip" };
    return area.id === OTHER_AREA_ID
      ? { kind: "needs-confirmation", areas: [area] }
      : { kind: "in-area", areas: [area] };
  }

  return { kind: "invalid-zip" };
}
