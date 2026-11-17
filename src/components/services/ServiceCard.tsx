import Link from "next/link";
import { TiltCard } from "@/components/motion/TiltCard";
import { AssetImage } from "@/components/primitives/AssetImage";
import { CtaLink } from "@/components/primitives/CtaLink";
import type { Service } from "@/domain";
import { serviceAction } from "@/lib/links";
import { getAssetById } from "@/lib/selectors";

/** Lightly elevated card: image, name, one-line summary, one action. Subtle tilt on fine pointers. */
export function ServiceCard({ service }: { service: Service }) {
  const asset = getAssetById(service.assetId);
  const action = serviceAction(service);

  return (
    <TiltCard className="flex h-full flex-col overflow-hidden rounded-xl border border-oak/70 bg-card shadow-card hover:shadow-card-lift">
      {asset ? (
        <div className="relative aspect-[4/3] border-b border-oak/70 bg-oak-soft">
          <AssetImage
            asset={asset}
            sizes="(min-width: 1024px) 380px, (min-width: 768px) 46vw, 100vw"
          />
        </div>
      ) : null}
      <div className="flex flex-1 flex-col gap-3 p-6">
        <h3>
          <Link
            href={`/services/${service.slug}`}
            className="underline-offset-4 hover:underline"
          >
            {service.name}
          </Link>
        </h3>
        <p className="text-ink-soft">{service.summary}</p>
        <div className="mt-auto pt-3">
          <CtaLink href={action.href} variant="secondary" arrow>
            {action.label}
          </CtaLink>
        </div>
      </div>
    </TiltCard>
  );
}

export function ServiceGrid({
  services,
  columns = 3,
}: {
  services: readonly Service[];
  columns?: 2 | 3;
}) {
  return (
    <ul
      className={
        columns === 2
          ? "grid gap-6 md:grid-cols-2"
          : "grid gap-6 md:grid-cols-2 lg:grid-cols-3"
      }
    >
      {services.map((service) => (
        <li key={service.id}>
          <ServiceCard service={service} />
        </li>
      ))}
    </ul>
  );
}
