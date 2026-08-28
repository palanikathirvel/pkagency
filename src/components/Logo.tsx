import { Link } from "react-router-dom";
import { agencyConfig } from "../config/agencyConfig";

export default function Logo({ compact = false }: { compact?: boolean }) {
  return (
    <Link
      to="/"
      className="group flex items-center gap-2.5"
      aria-label={`${agencyConfig.name} — home`}
    >
      <span className="relative block h-9 w-9 overflow-hidden rounded-xl ring-1 ring-mist/15 transition-transform duration-500 group-hover:rotate-6 group-hover:scale-105">
        <img
          src={agencyConfig.logoSrc}
          alt="P.K Creative Agency logo"
          className="h-full w-full object-cover"
          loading="eager"
        />
      </span>
      {!compact && (
        <span className="leading-none">
          <span className="font-display block text-[17px] font-extrabold tracking-tight text-mist">
            P.K&nbsp;Creative
          </span>
          <span className="mt-1 block font-mono text-[9px] font-medium tracking-[0.34em] text-fog uppercase">
            Agency
          </span>
        </span>
      )}
    </Link>
  );
}
