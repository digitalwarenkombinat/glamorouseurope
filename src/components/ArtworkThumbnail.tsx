import { CSSProperties } from "react";
import { useDrag } from "react-dnd";
import { Preview } from "react-dnd-multi-backend";

function ArtworkThumbnail({ id, image }: { id: string; image: string }) {
  const [{ opacity }, drag] = useDrag(() => ({
    type: "artwork",
    item: { id, image },
    collect: (monitor) => ({
      opacity: monitor.isDragging() ? 0.4 : 1,
    }),
  }));

  const generatePreview = ({
    item,
    style,
  }: {
    item: { id: string; image: string };
    style: CSSProperties;
  }) => {
    return (
      <img
        src={item.image}
        alt={item.id}
        style={{
          ...style,
          cursor: "move",
          maxHeight: "100px",
          width: "auto",
          zIndex: 99,
        }}
      />
    );
  };

  return (
    <>
      <Preview>{generatePreview}</Preview>
      <img
        src={image}
        alt={id}
        role="presentation"
        style={{
          cursor: "move",
          paddingRight: "10px",
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
