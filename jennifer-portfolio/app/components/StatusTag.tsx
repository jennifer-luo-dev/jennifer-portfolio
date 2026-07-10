import type { ProjectStatus } from "@/data/content";

export function StatusTag({ status }: { status: ProjectStatus }) {
  const isInProgress = status === "in progress";
  return (
    <span
      className={`inline-flex items-center rounded-full border px-2.5 py-0.5 font-mono text-[10px] uppercase tracking-wider ${
        isInProgress
          ? "border-label text-label"
          : "border-muted text-muted"
      }`}
    >
      {status}
    </span>
  );
}
