import { Section } from "@/components/section/Section";
import { ProductSwitcher } from "@/components/ui/ProductSwitcher";

/**
 * SEC.08 — PRODUCTS · "DATASHEETS".
 * The carriage-switch tabs live in a client component; all four
 * datasheets are present in the SSR HTML for crawlers.
 */
export function ProductsSection() {
  return (
    <Section
      index={8}
      id="products"
      codename="DATASHEETS"
      title="Four platforms, one audit format"
    >
      <ProductSwitcher />
    </Section>
  );
}
