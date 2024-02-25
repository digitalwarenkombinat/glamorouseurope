import { useDraggable } from "@dnd-kit/core";

function ArtworkThumbnail({ id, image }: { id: string; image: string }) {
  const { active, attributes, listeners, setNodeRef } = useDraggable({
    id,
    data: { id, image, type: "artwork" },
  });

  return (
    <img
      src={image}
      alt={id}
      className="max-h-[100px] md:max-h-[150px]"
      style={{
        display: "inline-block",
        cursor: "move",
        paddingRight: "10px",
        touchAction: "none",
        width: "auto",
        opacity: active?.id === id ? 0.4 : 1,
      }}
      {...listeners}
      {...attributes}
      ref={setNodeRef}
    />
  );
}

export default ArtworkThumbnail;
