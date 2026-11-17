import { serviceAreas } from "@/data/service-areas";
import type { AreaId, ServiceArea, ZipCode } from "@/domain";
import { normalizeZip } from "./normalize";

export function getServiceAreas(): readonly ServiceArea[] {
  return serviceAreas;
}

export function getAreaById(id: AreaId): ServiceArea | undefined {
  return serviceAreas.find((area) => area.id === id);
}

/**
 * All areas listing this ZIP. Some ZIPs are shared (for example 98230 covers Blaine and
 * Birch Bay), so this returns a list. Invalid ZIP input returns an empty list.
 */
export function getAreasByZip(zip: ZipCode): readonly ServiceArea[] {
  const normalized = normalizeZip(zip);
  if (normalized === null) return [];
  return serviceAreas.filter((area) => area.zipCodes.includes(normalized));
}

/** True when the ZIP appears in any area's list. Lists are unconfirmed (assumption A8). */
export function isServiceAreaZip(zip: ZipCode): boolean {
  return getAreasByZip(zip).length > 0;
}
