import type { MDXComponents } from "mdx/types";
import TLDRBox from "./TLDRBox";
import NewsletterInline from "@/components/blog/NewsletterInline";
import BlogImage from "@/components/blog/BlogImage";

export function getMDXComponents(): MDXComponents {
  return {
    TLDRBox,
    NewsletterInline,
    BlogImage,
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
