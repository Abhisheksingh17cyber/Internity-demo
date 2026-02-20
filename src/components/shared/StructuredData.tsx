export function StructuredData() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "VideoProductionCompany",
    name: "Internity",
    url: "https://internity.ae",
    logo: "https://internity.ae/images/og-image.jpg",
    description:
      "Award-winning video production company based in the UAE. Corporate films, commercials, documentaries, and creative content.",
    address: {
      "@type": "PostalAddress",
      streetAddress: "Dubai Media City, Building 7",
      addressLocality: "Dubai",
      addressCountry: "AE",
    },
    contactPoint: {
      "@type": "ContactPoint",
      telephone: "+971-4-XXX-XXXX",
      contactType: "customer service",
      email: "hello@internity.ae",
    },
    sameAs: [
      "https://www.instagram.com/internity",
      "https://www.youtube.com/@internity",
      "https://www.linkedin.com/company/internity",
    ],
    areaServed: "AE",
    priceRange: "$$$$",
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}
