import type { VariantConfig, VariantId } from "@/lib/cv/types";
import { master } from "./master";

/** Order here is the order variants are offered for download. */
export const variants: VariantConfig[] = [master];

export const variantsById = Object.fromEntries(
  variants.map((variant) => [variant.id, variant]),
) as Record<VariantId, VariantConfig>;

export { master };
