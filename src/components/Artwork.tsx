// @ts-expect-error konsta typing
import { Block, Button, Icon } from "konsta/react";
import Konva from "konva";
import { MutableRefObject, ReactElement, useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";
import { MdDownloadForOffline, MdShare } from "react-icons/md";
import { Image, Layer, Stage } from "react-konva";
import { Link } from "react-router-dom";
import useImage from "use-image";

import useStore, { CanvasImageProps } from "../store";

const FrameImage = () => {
  const [image] = useImage("/canvas.webp");
  return <Image image={image} />;
};

const CanvasImage = ({ canvasImage }: { canvasImage: CanvasImageProps }) => {
  const [image] = useImage(canvasImage.image);
  const transformCanvasImage = useStore((state) => state.transformCanvasImage);

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

  return (
    <Image
      image={image}
      key={canvasImage.id}
      id={canvasImage.id}
      x={canvasImage.x}
      y={canvasImage.y}
      draggable
      scaleX={canvasImage.isDragging ? 1.2 : 1}
      scaleY={canvasImage.isDragging ? 1.2 : 1}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
    />
  );
};

const Canvas = () => {
  const { canvasList } = useStore();
  const stageRef = useRef() as MutableRefObject<Konva.Stage>;
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

  return (
    <div>
      <Stage width={sceneWidth} height={sceneHeight} ref={stageRef}>
        <Layer>
          <FrameImage />
          {canvasList.map((canvasImage) => (
            <CanvasImage key={canvasImage.id} canvasImage={canvasImage} />
          ))}
        </Layer>
      </Stage>
    </div>
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
      <Button className="p-2 rounded-full" rounded inline outline>
        <Icon material={<MdShare className="w-6 h-6" />} />
      </Button>
      <Button className="p-2 rounded-full" rounded inline outline>
        <Icon material={<MdDownloadForOffline className="w-6 h-6" />} />
      </Button>
    </Block>
  );
}

export default Artwork;
