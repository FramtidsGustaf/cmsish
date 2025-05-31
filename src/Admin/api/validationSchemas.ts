import { boolean, enums, object, optional, string } from "superstruct";

// The SEO schema is the same for page and for post
export const SEO = object({
  title: string(),
  description: string(),
  lang: string(),
  canonicalUrl: optional(string()),
  noIndex: optional(boolean()),
  ogTitle: optional(string()),
  ogDesctription: optional(string()),
  ogImage: optional(string()),
  twitterCardType: optional(enums(['summary', 'summary_large_image'])),
  schemaJsonLd: optional(string()),
  robotsFollow: optional(boolean()),
});