import { useEffect } from "react";
import { seo } from "../config/agencyConfig";

/** Sets document title + meta description per page (SEO) */
export function usePageMeta(title?: string, description?: string) {
  useEffect(() => {
    document.title = title ?? seo.defaultTitle;
    if (description) {
      const el = document.querySelector('meta[name="description"]');
      if (el) el.setAttribute("content", description);
    }
  }, [title, description]);
}
