export function StatusLine({ text }: { text: string }) {
  return (
    <div className="flex items-center gap-3">
      <span
        aria-hidden="true"
        className="flex h-3.5 items-end gap-[3px]"
      >
        <span
          className="eq-bar block w-[3px] h-full bg-copper"
          style={{ animationDelay: "0ms" }}
        />
        <span
          className="eq-bar block w-[3px] h-full bg-copper"
          style={{ animationDelay: "180ms" }}
        />
        <span
          className="eq-bar block w-[3px] h-full bg-copper"
          style={{ animationDelay: "90ms" }}
        />
      </span>
      <p className="font-mono text-xs uppercase tracking-wider text-muted">
        <span className="text-copper">Now building</span> — {text}
      </p>
    </div>
  );
}
