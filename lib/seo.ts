import { PRODUCTS } from "@/content/products";

export const SITE_URL = "https://nexus-robotics.example.com";
export const SITE_NAME = "NEXUS Robotics";

/**
 * JSON-LD structured data. A fictional company presented as a real,
 * structured entity — Organization + the four product lines.
 * (Portfolio demonstration; the domain is a placeholder.)
 */
export function buildStructuredData(): Record<string, unknown> {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": `${SITE_URL}/#organization`,
        name: SITE_NAME,
        url: SITE_URL,
        foundingDate: "2019",
        description:
          "NEXUS Robotics builds autonomous humanoid systems for manufacturing, medicine, deep-sea research and orbital operations. Transparent autonomy — every decision documented, testable, reproducible.",
        slogan: "No simulations. Only deployments.",
        knowsAbout: [
          "humanoid robotics",
          "autonomous systems",
          "surgical robotics",
          "deep-sea robotics",
          "orbital robotics",
        ],
      },
      ...PRODUCTS.map((product) => ({
        "@type": "Product",
        "@id": `${SITE_URL}/#${product.id}`,
        name: product.name,
        sku: product.code,
        description: product.summary,
        category: product.domain,
        brand: { "@id": `${SITE_URL}/#organization` },
        additionalProperty: product.specs.map((spec) => ({
          "@type": "PropertyValue",
          name: spec.key,
          value: spec.value,
        })),
      })),
    ],
  };
}
