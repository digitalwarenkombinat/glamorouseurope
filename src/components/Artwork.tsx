// @ts-expect-error konsta typing
import { Block, Button, Icon } from "konsta/react";
import Konva from "konva";
import { MutableRefObject, useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { MdDownloadForOffline, MdShare } from "react-icons/md";
import { Image, Layer, Stage, Transformer } from "react-konva";
import { Link } from "react-router-dom";
import useImage from "use-image";

import useStore, { CanvasImageProps } from "../store";

function downloadURI(uri: string, name: string) {
  const link = document.createElement("a");
  link.download = name;
  link.href = uri;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

const FrameImage = () => {
  const [image] = useImage("/canvas.webp");
  return <Image image={image} />;
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

  const handleDragStart = () => {
    transformCanvasImage({ ...canvasImage, isDragging: true });
  };
  const handleDragEnd = (e: any) => {
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

    node.scaleX(1);
    node.scaleY(1);
    transformCanvasImage({
      ...canvasImage,
      x: node.x(),
      y: node.y(),
      width: Math.max(5, node.width() * scaleX),
      height: Math.max(node.height() * scaleY),
    });
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
          boundBoxFunc={(oldBox, newBox) => {
            if (Math.abs(newBox.width) < 5 || Math.abs(newBox.height) < 5) {
              return oldBox;
            }
            return newBox;
          }}
        />
      )}
    </>
  );
};

const Canvas = () => {
  const { canvasList } = useStore();
  const stageRef = useRef() as MutableRefObject<Konva.Stage>;
  const [selectedId, selectShape] = useState("");
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

  const checkDeselect = (e: any) => {
    const clickedOnEmpty = e.target === e.target.getStage();
    if (clickedOnEmpty) {
      selectShape("");
    }
  };

  const handleDownload = () => {
    const uri = stageRef.current.toDataURL();
    downloadURI(uri, "GLAMorousEurope.png");
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
            <FrameImage />
            {canvasList.map((canvasImage) => (
              <CanvasImage
                key={canvasImage.id}
                canvasImage={canvasImage}
                isSelected={canvasImage.id === selectedId}
                onSelect={() => {
                  selectShape(canvasImage.id);
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
        onClick={() => handleDownload()}
      >
        <Icon material={<MdShare className="w-6 h-6" />} />
      </Button>
      <Button
        className="p-2 rounded-full"
        rounded
        inline
        outline
        onClick={() => handleDownload()}
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
