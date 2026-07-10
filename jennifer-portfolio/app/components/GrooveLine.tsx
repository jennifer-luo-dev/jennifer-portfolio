export function GrooveLine({ className = "" }: { className?: string }) {
  return (
    <div
      role="separator"
      aria-hidden="true"
      className={`h-px w-full bg-muted ${className}`}
    />
  );
}
