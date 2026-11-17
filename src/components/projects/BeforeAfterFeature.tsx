import { getAssetById, getBeforeAfterPairs, getProjectById } from "@/lib/selectors";
import { BeforeAfterSlider } from "@/components/projects/BeforeAfterSlider";

/** One slider per before/after pair, each titled with its project. */
export function BeforeAfterFeature() {
  const pairs = getBeforeAfterPairs();

  return (
    <ul className="grid gap-10 lg:grid-cols-3">
      {pairs.map((pair) => {
        const before = getAssetById(pair.beforeAssetId);
        const after = getAssetById(pair.afterAssetId);
        const project = getProjectById(pair.projectId);
        if (!before || !after) return null;

        return (
          <li key={pair.id}>
            <BeforeAfterSlider
              before={before}
              after={after}
              caption={pair.caption}
              isSample={pair.isSample}
              sizes="(min-width: 1024px) 380px, 100vw"
            />
            {project ? (
              <p className="mt-2 text-sm font-semibold">
                {project.title} · {project.locationLabel}
              </p>
            ) : null}
          </li>
        );
      })}
    </ul>
  );
}
