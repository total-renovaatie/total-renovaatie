import Image from "next/image";
import type { RenderImageContext, RenderImageProps } from "react-photo-album";

export default function NextJsImage(
  { alt = "", title, sizes, onClick }: RenderImageProps, // Added onClick here
  { photo, width, height }: RenderImageContext,
) {
  return (
    <div
      style={{
        width: "100%",
        position: "relative",
        aspectRatio: `${width} / ${height}`,
      }}
      // Attach the onClick here so the whole card is clickable
      onClick={onClick}
      className="cursor-pointer overflow-hidden rounded-[1.5rem] bg-gray-100 md:rounded-[2.5rem]"
    >
      <Image
        fill
        src={photo.src}
        alt={alt}
        title={title}
        sizes={sizes}
        className="object-cover transition-transform duration-500 hover:scale-105"
      />
    </div>
  );
}
