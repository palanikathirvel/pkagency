export default function Logo({ compact = false }: { compact?: boolean }) {
  return (
    <span className="flex items-center gap-2.5" aria-label="P.K Creative Agency">
      <svg width="38" height="38" viewBox="0 0 48 48" fill="none" aria-hidden="true" className="shrink-0">
        <defs>
          <linearGradient id="pk-logo-grad" x1="4" y1="4" x2="44" y2="44" gradientUnits="userSpaceOnUse">
            <stop stopColor="#8b7cff" />
            <stop offset="0.55" stopColor="#4ea2ff" />
            <stop offset="1" stopColor="#ff6ec7" />
          </linearGradient>
        </defs>
        <rect x="2.5" y="2.5" width="43" height="43" rx="13" stroke="url(#pk-logo-grad)" strokeWidth="2.4" />
        <text
          x="24"
          y="30.5"
          textAnchor="middle"
          fontFamily="Syne, sans-serif"
          fontWeight="800"
          fontSize="16.5"
          fill="url(#pk-logo-grad)"
        >
          PK
        </text>
        <circle cx="38.5" cy="9.5" r="3" fill="#ff6ec7" />
      </svg>
      {!compact && (
        <span className="font-display text-[1.15rem] font-bold leading-none tracking-tight text-mist">
          P.K <span className="font-semibold text-fog">Creative</span>
        </span>
      )}
    </span>
  );
}
