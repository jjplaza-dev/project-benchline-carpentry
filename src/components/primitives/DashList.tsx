import { cx } from "@/lib/cx";

interface DashListProps {
  items: readonly string[];
  className?: string;
}

/** Plain list with a short cedar dash instead of a bullet. */
export function DashList({ items, className }: DashListProps) {
  return (
    <ul className={cx("space-y-3", className)}>
      {items.map((item) => (
        <li
          key={item}
          className="relative pl-7 before:absolute before:top-[0.8em] before:left-0 before:h-0.5 before:w-4 before:bg-cedar"
        >
          {item}
        </li>
      ))}
    </ul>
  );
}
