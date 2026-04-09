import type { MDXComponents } from "mdx/types";
import TLDRBox from "./TLDRBox";

export function getMDXComponents(): MDXComponents {
  return {
    TLDRBox,
    a: ({ href, children, ...props }) => {
      const isExternal = href?.startsWith("http");
      return (
        <a
          href={href}
          {...props}
          {...(isExternal
            ? { target: "_blank", rel: "noopener noreferrer" }
            : {})}
        >
          {children}
        </a>
      );
    },
  };
}
