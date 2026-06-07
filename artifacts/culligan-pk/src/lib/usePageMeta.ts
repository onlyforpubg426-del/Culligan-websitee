import { useEffect } from "react";

const BASE_TITLE = "Culligan Pakistan";
const OG_IMAGE = "https://culligan-website.vercel.app/opengraph.jpg";
const SITE_URL = "https://culligan-website.vercel.app";

export function usePageMeta({
  title,
  description,
  path = "/",
}: {
  title: string;
  description: string;
  path?: string;
}) {
  useEffect(() => {
    const fullTitle = `${title} | ${BASE_TITLE}`;

    document.title = fullTitle;

    function setMeta(selector: string, content: string) {
      let el = document.querySelector<HTMLMetaElement>(selector);
      if (!el) {
        el = document.createElement("meta");
        const attr = selector.startsWith('meta[property')
          ? "property"
          : "name";
        const val = selector.match(/["']([^"']+)["']/)?.[1] ?? "";
        el.setAttribute(attr, val);
        document.head.appendChild(el);
      }
      el.setAttribute("content", content);
    }

    setMeta('meta[name="description"]', description);
    setMeta('meta[property="og:title"]', fullTitle);
    setMeta('meta[property="og:description"]', description);
    setMeta('meta[property="og:url"]', `${SITE_URL}${path}`);
    setMeta('meta[property="og:image"]', OG_IMAGE);
    setMeta('meta[name="twitter:title"]', fullTitle);
    setMeta('meta[name="twitter:description"]', description);
    setMeta('meta[name="twitter:image"]', OG_IMAGE);

    return () => {
      document.title = `${BASE_TITLE} — Pakistan's #1 Pure Water Brand`;
    };
  }, [title, description, path]);
}
