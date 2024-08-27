import ArtworkThumbnail from "../creation/ArtworkThumbnail";

function ArtworkList({
  artworkListRef,
  artworkList,
}: {
  artworkListRef: React.RefObject<HTMLDivElement>;
  artworkList: Array<{ id: string; image: string }>;
}) {
  return (
    <div className="overflow-auto whitespace-nowrap" ref={artworkListRef}>
      {artworkList.map((artworkImage, index) => (
        <ArtworkThumbnail
          key={`${artworkImage.id}-${index}`}
          {...artworkImage}
        />
      ))}
    </div>
  );
}

export default ArtworkList;
