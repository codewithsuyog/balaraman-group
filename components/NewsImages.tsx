// Photos for a news item, shown whole at their own shape: no cropping and no empty bars around them.
// Each opens full size in a new tab. imgClassName caps the height (e.g. max-h-44).
export type NewsImage = { src: string; alt: string };

export function NewsImages({ images, className = '', imgClassName }: {
  images?: NewsImage[];
  className?: string;
  imgClassName: string;
}) {
  if (!images?.length) return null;
  return (
    <div className={`flex items-start gap-2 ${className}`}>
      {images.map((img) => (
        <a
          key={img.src}
          href={img.src}
          target="_blank"
          rel="noopener noreferrer"
          className="group block min-w-0"
          aria-label={`${img.alt} (opens full size in a new tab)`}
        >
          <img
            src={img.src}
            alt={img.alt}
            loading="lazy"
            decoding="async"
            className={`block w-auto max-w-full h-auto ${imgClassName} rounded-lg border border-line group-hover:border-[var(--accent)] transition-colors`}
          />
        </a>
      ))}
    </div>
  );
}
