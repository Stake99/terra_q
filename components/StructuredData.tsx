export default function StructuredData() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "TerraCore Mining",
    "description": "Leading mining company providing comprehensive extraction and resource management services",
    "url": "https://terracoremining.com",
    "logo": "https://terracoremining.com/logo.png",
    "foundingDate": "1989",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "1234 Mining Way",
      "addressLocality": "Resource City",
      "addressRegion": "RC",
      "postalCode": "12345",
      "addressCountry": "US"
    },
    "contactPoint": {
      "@type": "ContactPoint",
      "telephone": "+1-555-123-4567",
      "contactType": "customer service",
      "email": "info@terracoremining.com",
      "areaServed": "US",
      "availableLanguage": "English"
    },
    "sameAs": [
      "https://www.linkedin.com/company/terracore-mining",
      "https://twitter.com/terracoremining"
    ],
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.8",
      "reviewCount": "127"
    }
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  );
}
