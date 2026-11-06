// Photos for a news item. Each opens full size in a new tab (posters are too detailed for a thumbnail).
export type NewsImage = { src: string; alt: string; contain?: boolean };

export function NewsImages({ images, className = '', imgClassName }: {
  images?: NewsImage[];
  className?: string;
  imgClassName: string;
}) {
  if (!images?.length) return null;
  return (
    <div className={`flex gap-2 ${className}`}>
      {images.map((img) => (
        <a
          key={img.src}
          href={img.src}
          target="_blank"
          rel="noopener noreferrer"
          className="block flex-1 min-w-0 rounded-lg overflow-hidden border border-line bg-white hover:border-[var(--accent)] transition-colors"
          aria-label={`${img.alt} (opens full size in a new tab)`}
        >
          <img
            src={img.src}
            alt={img.alt}
            loading="lazy"
            decoding="async"
            className={`w-full ${imgClassName} ${img.contain ? 'object-contain' : 'object-cover object-top'}`}
          />
        </a>
      ))}
    </div>
  );
}
