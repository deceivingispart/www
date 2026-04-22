export default function Badge({
  children,
  icon,
  href,
}: {
  children: React.ReactNode;
  icon?: React.ReactNode;
  href?: string;
}) {
  const isExternal = href?.startsWith("http");
  const Tag = href ? "a" : "div";

  return (
    <Tag
      {...(href
        ? {
            href,
            target: isExternal ? "_blank" : undefined,
            rel: isExternal ? "noopener noreferrer" : undefined,
          }
        : {})}
      className={`relative inline-flex items-center gap-1.5 h-7 px-3 rounded-lg transition-all duration-200 no-underline${
        href ? " cursor-pointer" : ""
      }`}
      style={{
        background: "rgba(255,255,255,0.035)",
        border: "1px solid rgba(255,255,255,0.07)",
        boxShadow: "0 0 20px -8px rgba(120,50,255,0.2)",
      }}
      onMouseEnter={(e) => {
        const el = e.currentTarget as HTMLElement;
        el.style.background = "rgba(255,255,255,0.055)";
        el.style.borderColor = "rgba(255,255,255,0.12)";
        el.style.boxShadow = "0 0 28px -8px rgba(140,60,255,0.35)";
      }}
      onMouseLeave={(e) => {
        const el = e.currentTarget as HTMLElement;
        el.style.background = "rgba(255,255,255,0.035)";
        el.style.borderColor = "rgba(255,255,255,0.07)";
        el.style.boxShadow = "0 0 20px -8px rgba(120,50,255,0.2)";
      }}
    >
      <div
        className="absolute -top-px left-[15%] right-[15%] h-px"
        style={{
          background:
            "linear-gradient(to right, transparent, rgba(180,120,255,0.3), transparent)",
        }}
      />

      {icon && (
        <span
          className="[&>svg]:size-3 shrink-0"
          style={{ color: "rgba(180,130,255,0.7)" }}
        >
          {icon}
        </span>
      )}

      <span
        className="text-[11px] tracking-wide font-medium"
        style={{ color: "rgba(255,255,255,0.6)" }}
      >
        {children}
      </span>
    </Tag>
  );
}
