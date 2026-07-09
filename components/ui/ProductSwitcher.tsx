"use client";

import { useState } from "react";
import styles from "@/app/(sections)/sections.module.css";
import { PRODUCTS } from "@/content/products";

/**
 * SEC.08 carriage switch: one datasheet at a time, horizontal
 * "clack" between products. All four articles are in the SSR HTML
 * (inactive ones carry `hidden`) — crawlers read everything.
 */
export function ProductSwitcher() {
  const [activeId, setActiveId] = useState(PRODUCTS[0].id);

  return (
    <div>
      <div
        className={styles.productTabs}
        role="tablist"
        aria-label="Product lines"
      >
        {PRODUCTS.map((product) => (
          <button
            key={product.id}
            role="tab"
            id={`tab-${product.id}`}
            aria-selected={product.id === activeId}
            aria-controls={`panel-${product.id}`}
            className={`mono ${styles.productTab}`}
            data-active={product.id === activeId ? "true" : undefined}
            onClick={() => setActiveId(product.id)}
          >
            {product.code}
          </button>
        ))}
      </div>

      {PRODUCTS.map((product) => (
        <article
          key={product.id}
          id={`panel-${product.id}`}
          role="tabpanel"
          aria-labelledby={`tab-${product.id}`}
          hidden={product.id !== activeId}
          className={styles.product}
          data-carriage={product.id === activeId ? "true" : undefined}
        >
          <header className={styles.productHeader}>
            <p className={`mono ${styles.productCode}`}>{product.code}</p>
            <h3 className={styles.productName}>{product.name}</h3>
            <p className="label">{product.domain}</p>
          </header>

          <p className={styles.productSummary}>{product.summary}</p>

          <table className={`mono ${styles.specTable}`}>
            <caption className="label">Specification</caption>
            <tbody>
              {product.specs.map((spec) => (
                <tr
                  key={spec.key}
                  data-highlight={spec.highlight ? "true" : undefined}
                >
                  <th scope="row">{spec.key}</th>
                  <td>{spec.value}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </article>
      ))}
    </div>
  );
}
