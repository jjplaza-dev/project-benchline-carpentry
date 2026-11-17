import type { Asset, Project } from "@/domain";
import { getAssetById } from "@/lib/selectors";

/** The first asset listed on a project, used as its cover image. */
export function getProjectCover(project: Project): Asset | undefined {
  const [coverId] = project.assetIds;
  return coverId ? getAssetById(coverId) : undefined;
}
