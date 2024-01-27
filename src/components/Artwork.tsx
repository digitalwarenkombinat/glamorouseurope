import { ArrowDownTrayIcon, ShareIcon } from "@heroicons/react/24/outline";
import { saveAs } from "file-saver";
// @ts-expect-error konsta typing
import { Block, Button, Icon } from "konsta/react";
import Konva from "konva";
import { KonvaEventObject } from "konva/lib/Node";
import { MutableRefObject, useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { Image, Layer, Stage, Transformer } from "react-konva";
import { Link } from "react-router-dom";
import useImage from "use-image";

import useStore, { CanvasImageProps } from "../store";

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

const Canvas = () => {
  const { canvasList, updateCanvasList, transformCanvasImage } = useStore();
  const stageRef = useRef<Konva.Stage>(null);
  const [selectedId, setSelectedId] = useState("");
  const [brightnessValue, setBrightnessValue] = useState(1);
  const [opacityValue, setOpacityValue] = useState(1);
  const sceneWidth = 1080;
  const sceneHeight = 1296;

  useEffect(() => {
    const fitStageIntoParentContainer = () => {
      const containerWidth = window.innerWidth * 0.9 || 0;
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

  const checkDeselect = (
    e: Konva.KonvaEventObject<TouchEvent> | Konva.KonvaEventObject<MouseEvent>,
  ) => {
    const clickedOnEmpty = e.target === e.target.getStage();
    if (clickedOnEmpty) {
      setSelectedId("");
    }
  };

  const bringToFront = () => {
    const selectedIndex = canvasList.findIndex(
      (image) => image.id === selectedId,
    );

    if (selectedIndex !== -1) {
      updateCanvasList(selectedIndex);
    }
  };

  const adjustBrightness = (value: number) => {
    setBrightnessValue(value);

    const canvasImage = canvasList.find((image) => image.id === selectedId);
    if (canvasImage) {
      transformCanvasImage({
        ...canvasImage,
        brightness: value,
      });
    }
  };

  const adjustOpacity = (value: number) => {
    setOpacityValue(value);

    const canvasImage = canvasList.find((image) => image.id === selectedId);
    if (canvasImage) {
      transformCanvasImage({
        ...canvasImage,
        opacity: value,
      });
    }
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
    const uri = stageRef.current?.toDataURL();
    if (uri) {
      saveAs(uri, "GLAMorousEurope.png");
    }
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
        onClick={bringToFront}
      >
        Bring to Front
      </Button>
      {selectedId && (
        <div>
          <label htmlFor="brightnessSlider">Brightness:</label>
          <input
            id="brightnessSlider"
            type="range"
            min="0"
            max="2"
            step="0.01"
            value={brightnessValue}
            onChange={(e) => adjustBrightness(parseFloat(e.target.value))}
          />

          <label htmlFor="opacitySlider">Opacity:</label>
          <input
            id="opacitySlider"
            type="range"
            min="0"
            max="1"
            step="0.01"
            value={opacityValue}
            onChange={(e) => adjustOpacity(parseFloat(e.target.value))}
          />
        </div>
      )}

      <div className="flex gap-2 mx-auto">
        <Button
          className="p-4 text-xl text-black"
          rounded
          inline
          onClick={handleShare}
        >
          <Icon material={<ShareIcon className="w-6 h-6" />} />
        </Button>
        <Button
          className="p-4 text-xl text-black"
          rounded
          inline
          onClick={handleDownload}
        >
          <Icon material={<ArrowDownTrayIcon className="w-6 h-6" />} />
        </Button>
      </div>
    </>
  );
};

function Artwork() {
  const { t } = useTranslation();
  const { canvasList } = useStore();

  const [selectedId] = useState("");

  /* useEffect(() => {
    const container = stageRef.current?.container();
    if (container) {
      container.addEventListener("dragover", (e) => {
        e.preventDefault();
      });

      container.addEventListener("drop", (e) => {
        e.preventDefault();
        const data = e.dataTransfer.getData("text");
        const droppedImage = canvasList.find((img) => img.id === data);
        if (droppedImage) {
          const scale = stageRef.current?.scaleX() || 1;
          const position = stageRef.current?.getPointerPosition();
          const x = (position?.x || 0) / scale;
          const y = (position?.y || 0) / scale;

          updateCanvasList({ ...droppedImage, x, y });
        }
      });
    }

    return () => {
      if (container) {
        container.removeEventListener("dragover", (e) => e.preventDefault());
        container.removeEventListener("drop", (e) => e.preventDefault());
      }
    };
  }, [canvasList, updateCanvasList]);

  const checkDeselect = (
    e: Konva.KonvaEventObject<TouchEvent> | Konva.KonvaEventObject<MouseEvent>,
  ) => {
    const clickedOnEmpty = e.target === e.target.getStage();
    if (clickedOnEmpty) {
      setSelectedId("");
    }
  }; */

  return (
    <Block className="flex flex-col flex-wrap gap-4 container mx-auto justify-center content-center text-center max-w-2xl">
      <div className="p-2 m-4">
        <h1 className="text-2xl">{t("artworkTitle")}</h1>
      </div>
      <div className="flex flex-wrap gap-4 p-2">
        {canvasList.map((canvasImage) => (
          <img
            key={canvasImage.id}
            src={canvasImage.image}
            alt={canvasImage.id}
            draggable
            onDragStart={(e) => {
              e.dataTransfer.setData("text", canvasImage.id);
            }}
            role="presentation"
            style={{
              width: "100px",
              height: "100px",
              cursor: "move",
              border:
                selectedId === canvasImage.id ? "2px solid #4CAF50" : "none",
              borderRadius: "5px",
              margin: "4px",
            }}
          />
        ))}
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
