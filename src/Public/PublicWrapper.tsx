import { PropsWithChildren } from 'hono/jsx';

interface PublicWrapperProps {
  description: string;
  title: string;
  lang: string;
  canonicalUrl?: string;
  noIndex?: string;
  ogTitle?: string;
  ogDescription?: string;
  ogImage?: string;
  twitterCardType?: 'summary' | 'summary_large_image';
  schemaJsonLd?: string;
  robotsFollow?: boolean;
}

export const PublicWrapper = ({
  children,
  description,
  title,
  lang,
  canonicalUrl,
  noIndex,
  ogTitle,
  ogDescription,
  ogImage,
  twitterCardType,
  schemaJsonLd,
}: PropsWithChildren<PublicWrapperProps>) => {
  return (
    <>
      <head>
        <meta charset="utf-8" />
        <title>{title}</title>
        <meta
          name="description"
          content={description}
        />
        {/* SEO */}
        {canonicalUrl ? (
          <link
            rel="canonical"
            href={canonicalUrl}
          />
        ) : null}
        {noIndex ? (
          <meta
            name="robots"
            content="noindex, nofollow"
          />
        ) : null}

        {/* Open Graph */}
        {ogTitle ? (
          <meta
            property="og:title"
            content={ogTitle}
          />
        ) : null}
        {ogDescription ? (
          <meta
            property="og:description"
            content={ogDescription}
          />
        ) : null}
        {ogImage ? (
          <meta
            property="og:image"
            content={ogImage}
          />
        ) : null}
        {canonicalUrl ? (
          <meta
            property="og:url"
            content={canonicalUrl}
          />
        ) : null}

        {/* Twitter Card */}
        {twitterCardType ? (
          <meta
            name="twitter:card"
            content={twitterCardType}
          />
        ) : null}
        {ogTitle ? (
          <meta
            name="twitter:title"
            content={ogTitle}
          />
        ) : null}
        {ogDescription ? (
          <meta
            name="twitter:description"
            content={ogDescription}
          />
        ) : null}
        {ogImage ? (
          <meta
            name="twitter:image"
            content={ogImage}
          />
        ) : null}
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1"
        />

        {/* JSON-LD Structured Data */}
        {schemaJsonLd ? (
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: schemaJsonLd }}
          />
        ) : null}
      </head>
      <body>{children}</body>
    </>
  );
};
