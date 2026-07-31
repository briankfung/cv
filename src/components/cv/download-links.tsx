import { Download } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { variants } from "@/data/variants";
import { cn } from "@/lib/utils";

/**
 * One link per variant, in the order declared in src/data/variants. Rendered as
 * anchors rather than buttons so they work without JavaScript and can carry
 * the download attribute.
 */
export function DownloadLinks({ className }: { className?: string }) {
  return (
    <div className={cn("flex flex-wrap gap-2 print:hidden", className)}>
      {variants.map((variant, index) => (
        <a
          key={variant.id}
          href={`/pdf/${variant.filename}.pdf`}
          download
          title={variant.description}
          className={cn(
            buttonVariants({
              variant: index === 0 ? "default" : "outline",
              size: "sm",
            }),
          )}
        >
          <Download aria-hidden className="size-3.5" />
          {variant.label}
          <span className="sr-only"> (PDF, {variant.description})</span>
        </a>
      ))}
    </div>
  );
}
