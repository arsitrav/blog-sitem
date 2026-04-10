import Image from "next/image";

interface Props {
  src: string;
  alt: string;
  caption?: string;
}

export default function BlogImage({ src, alt, caption }: Props) {
  return (
    <figure className="not-prose my-8">
      <div className="relative w-full overflow-hidden rounded-xl">
        <Image
          src={src}
          alt={alt}
          width={1200}
          height={630}
          className="w-full object-cover"
          sizes="(max-width: 768px) 100vw, 730px"
        />
      </div>
      {caption && (
        <figcaption className="mt-2 text-center text-xs text-[var(--muted-foreground)]">
          {caption}
        </figcaption>
      )}
    </figure>
  );
}
