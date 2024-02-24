import { useDraggable } from "@dnd-kit/core";

function ArtworkThumbnail({ id, image }: { id: string; image: string }) {
  const { attributes, listeners, setNodeRef } = useDraggable({
    id,
    data: { id, image, type: "artwork" },
  });

  return (
    <img
      src={image}
      alt={id}
      style={{
        cursor: "move",
        paddingRight: "10px",
        maxHeight: "100px",
        scrollSnapAlign: "start",
        width: "auto",
      }}
      {...listeners}
      {...attributes}
      ref={setNodeRef}
    />
  );
}

export default ArtworkThumbnail;
