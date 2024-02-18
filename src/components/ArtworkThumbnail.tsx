import { DragPreviewImage, useDrag } from "react-dnd";

function ArtworkThumbnail({ id, image }: { id: string; image: string }) {
  const [{ opacity }, drag, preview] = useDrag(() => ({
    type: "artwork",
    item: { id },
    collect: (monitor) => ({
      opacity: monitor.isDragging() ? 0.4 : 1,
    }),
  }));
  return (
    <>
      <DragPreviewImage connect={preview} src={image} />
      <img
        src={image}
        alt={id}
        role="presentation"
        style={{
          cursor: "move",
          marginRight: "10px",
          maxHeight: "100px",
          opacity: opacity,
          scrollSnapAlign: "start",
          width: "auto",
        }}
        ref={drag}
      />
    </>
  );
}

export default ArtworkThumbnail;
