import { saveAs } from "file-saver";
// @ts-expect-error konsta typing
import { Block, Button, Icon } from "konsta/react";
import Konva from "konva";
import { KonvaEventObject } from "konva/lib/Node";
import { MutableRefObject, useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { MdDownloadForOffline, MdShare } from "react-icons/md";
import { Image, Layer, Stage, Transformer } from "react-konva";
import { Link } from "react-router-dom";
import useImage from "use-image";

import useStore, { CanvasImageProps } from "../store";

const FrameImage = ({
  handleEvent,
}: {
  handleEvent: (
    e: Konva.KonvaEventObject<TouchEvent> | Konva.KonvaEventObject<MouseEvent>,
  ) => void;
}) => {
  const [image] = useImage("/canvas.webp");
  return (
    <Image image={image} onMouseDown={handleEvent} onTouchStart={handleEvent} />
  );
};

const CanvasImage = ({
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

    // Reset Transformer sizes to avoid scaling issues
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

const Canvas = () => {
  const { canvasList } = useStore();
  const stageRef = useRef() as MutableRefObject<Konva.Stage>;
  const [selectedId, setSelectedId] = useState("");
  const sceneWidth = 1080;
  const sceneHeight = 1296;

  useEffect(() => {
    const fitStageIntoParentContainer = () => {
      const containerWidth = window.innerWidth || 0;
      const scale = containerWidth / sceneWidth;

      if (stageRef.current) {
        stageRef.current.width(sceneWidth * scale);
        stageRef.current.height(sceneHeight * scale);
        stageRef.current.scale({ x: scale, y: scale });
      }
    };

    fitStageIntoParentContainer();

    window.addEventListener("resize", fitStageIntoParentContainer);

    return () => {
      window.removeEventListener("resize", fitStageIntoParentContainer);
    };
  }, []);

  const checkDeselect = () => {
    setSelectedId("");
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator
        .share({
          title: "GLAMorous Europe",
          text: "Check out my GLAMorous Europe artwork!",
          url: window.location.href,
        })
        .then(() => console.log("Share successful"))
        .catch((error) => console.error("Error sharing:", error));
    } else {
      console.log("Web Share API not supported");
    }
  };

  const handleDownload = () => {
    const uri = stageRef.current.toDataURL();
    saveAs(uri, "GLAMorousEurope.png");
  };

  return (
    <>
      <div>
        <Stage
          width={sceneWidth}
          height={sceneHeight}
          ref={stageRef}
          onMouseDown={checkDeselect}
          onTouchStart={checkDeselect}
        >
          <Layer>
            <FrameImage handleEvent={checkDeselect} />
            {canvasList.map((canvasImage) => (
              <CanvasImage
                key={canvasImage.id}
                canvasImage={canvasImage}
                isSelected={canvasImage.id === selectedId}
                onSelect={() => {
                  setSelectedId(canvasImage.id);
                }}
              />
            ))}
          </Layer>
        </Stage>
      </div>
      <Button
        className="p-2 rounded-full"
        rounded
        inline
        outline
        onClick={handleShare}
      >
        <Icon material={<MdShare className="w-6 h-6" />} />
      </Button>
      <Button
        className="p-2 rounded-full"
        rounded
        inline
        outline
        onClick={handleDownload}
      >
        <Icon material={<MdDownloadForOffline className="w-6 h-6" />} />
      </Button>
    </>
  );
};

function Artwork() {
  const { t } = useTranslation();
  const { canvasList } = useStore();

  return (
    <Block className="flex flex-col flex-wrap gap-4 container mx-auto justify-center content-center text-center">
      <div className="p-2 m-4">
        <h1 className="text-2xl">{t("artworkTitle")}</h1>
      </div>
      {canvasList.length === 0 ? (
        <Button className="p-2 rounded-full text-xl" rounded inline outline>
          <Link to={"/selection"}>{t("artworkEmpty")}</Link>
        </Button>
      ) : (
        <Canvas />
      )}
    </Block>
  );
}

export default Artwork;
