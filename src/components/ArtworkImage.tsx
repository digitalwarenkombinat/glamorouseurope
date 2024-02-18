import Konva from "konva";
import { KonvaEventObject } from "konva/lib/Node";
import { MutableRefObject, useEffect, useRef } from "react";
import { Image, Transformer } from "react-konva";
import useImage from "use-image";

import useStore, { CanvasImageProps } from "../store";

const ArtworkImage = ({
  canvasImage,
  isSelected,
  onSelect,
}: {
  canvasImage: CanvasImageProps;
  isSelected: boolean;
  onSelect: () => void;
}) => {
  const imageRef = useRef() as MutableRefObject<Konva.Image>;
  const trRef = useRef() as MutableRefObject<Konva.Transformer>;
  const [image] = useImage(canvasImage.image);
  const transformCanvasImage = useStore((state) => state.transformCanvasImage);

  useEffect(() => {
    if (isSelected) {
      trRef.current.nodes([imageRef.current]);
      trRef.current.getLayer()?.batchDraw();
    }
  }, [isSelected]);

  useEffect(() => {
    const imageObj = new window.Image();
    imageObj.crossOrigin = "Anonymous";
    imageObj.src = canvasImage.image;

    imageObj.onload = () => {
      if (imageRef.current) {
        imageRef.current.image(imageObj);
        imageRef.current.getLayer()?.batchDraw();
      }
    };
  }, [canvasImage.image]);

  const handleDragStart = () => {
    transformCanvasImage({ ...canvasImage, isDragging: true });
  };

  const handleDragEnd = (e: KonvaEventObject<DragEvent>) => {
    transformCanvasImage({
      ...canvasImage,
      isDragging: false,
      x: e.target.x(),
      y: e.target.y(),
    });
  };

  const handleTransformEnd = () => {
    const node = imageRef.current;
    const scaleX = node.scaleX();
    const scaleY = node.scaleY();
    const width = Math.max(5, node.width() * scaleX);
    const height = Math.max(node.height() * scaleY);

    transformCanvasImage({
      ...canvasImage,
      x: node.x(),
      y: node.y(),
      width,
      height,
    });

    trRef.current.nodes([imageRef.current]);
    trRef.current.getLayer()?.batchDraw();
  };

  return (
    <>
      <Image
        draggable
        id={canvasImage.id}
        image={image}
        key={canvasImage.id}
        onClick={onSelect}
        onDragEnd={handleDragEnd}
        onDragStart={handleDragStart}
        onTap={onSelect}
        onTransformEnd={handleTransformEnd}
        ref={imageRef}
        x={canvasImage.x}
        y={canvasImage.y}
        scaleX={0.5}
        scaleY={0.5}
        opacity={canvasImage.opacity || 1}
        brightness={canvasImage.brightness || 0}
      />
      {isSelected && (
        <Transformer
          ref={trRef}
          flipEnabled={false}
          enabledAnchors={[
            "top-left",
            "top-right",
            "bottom-left",
            "bottom-right",
          ]}
        />
      )}
    </>
  );
};

export default ArtworkImage;
