import {
  ArrowDownTrayIcon,
  ArrowUturnDownIcon,
  ArrowUturnUpIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  ShareIcon,
  TrashIcon,
} from "@heroicons/react/24/outline";
import { saveAs } from "file-saver";
// @ts-expect-error konsta typing
import { Block, Button, Icon } from "konsta/react";
import Konva from "konva";
import { KonvaEventObject } from "konva/lib/Node";
import { MutableRefObject, useEffect, useRef, useState } from "react";
import { DragPreviewImage, useDrag, useDrop } from "react-dnd";
import { useTranslation } from "react-i18next";
import { Image, Layer, Stage, Transformer } from "react-konva";
import { Link } from "react-router-dom";
import useImage from "use-image";

import useStore, { ArtworkImageProps, CanvasImageProps } from "../store";

const FrameImage = ({ front }: { front: boolean }) => {
  const { frame } = useStore();
  const [image] = useImage(front ? frame.front : frame.image, "anonymous");
  return <Image image={image} draggable={false} />;
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

const Canvas = () => {
  const {
    addToCanvas,
    artworkList,
    canvasList,
    frame,
    moveCanvasImage,
    removeFromCanvas,
    setFrame,
    transformCanvasImage,
  } = useStore();
  const stageRef = useRef<Konva.Stage>(null);
  const [selectedId, setSelectedId] = useState("");
  const [brightnessValue, setBrightnessValue] = useState(1);
  const [opacityValue, setOpacityValue] = useState(1);
  const sceneWidth = 1080;
  const sceneHeight = 1080;

  useEffect(() => {
    const fitStageIntoParentContainer = () => {
      const containerWidth = window.innerWidth * 0.8 || 0;
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

  const handleMove = (moveForward: boolean) => {
    if (selectedId) {
      moveCanvasImage(selectedId, moveForward);
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

  const handleRemove = () => {
    removeFromCanvas(selectedId);
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
    const uri = stageRef.current?.toDataURL();
    if (uri) {
      saveAs(uri, "GLAMorousEurope.png");
    }
  };

  const [{ canDrop, isOver }, drop] = useDrop(() => ({
    accept: "artwork",
    drop: (item: ArtworkImageProps, monitor) => {
      const offset = monitor.getClientOffset();
      if (item && offset) {
        const canvasImage = artworkList.find((image) => image.id === item.id);

        if (canvasImage) {
          const stage = stageRef.current;

          if (stage) {
            const dropX =
              offset.x - stage.container().getBoundingClientRect().left;
            const dropY =
              offset.y - stage.container().getBoundingClientRect().top;
            addToCanvas(canvasImage.image, dropX, dropY);
          }
        }
      }
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
    }),
  }));
  const isActive = canDrop && isOver;
  let borderColor = "transparent";
  if (isActive) {
    borderColor = "#ebb2ff";
  } else if (canDrop) {
    borderColor = "#2B2829";
  }

  return (
    <>
      <div className="toolbar">
        <Button
          className="p-4 text-xl text-black"
          rounded
          inline
          onClick={() => handleMove(true)}
        >
          <Icon material={<ArrowUturnUpIcon className="w-6 h-6" />} />
        </Button>
        <Button
          className="p-4 text-xl text-black"
          rounded
          inline
          onClick={() => handleMove(false)}
        >
          <Icon material={<ArrowUturnDownIcon className="w-6 h-6" />} />
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
        <Button
          className="p-4 text-xl text-black"
          rounded
          inline
          onClick={handleRemove}
        >
          <Icon material={<TrashIcon className="w-6 h-6" />} />
        </Button>
      </div>
      <div className="mx-auto flex items-center gap-2" ref={drop}>
        <Button
          className="p-4 text-xl text-black"
          rounded
          inline
          onClick={() => setFrame(Math.max(1, frame.id - 1))}
        >
          <Icon material={<ChevronLeftIcon className="w-6 h-6" />} />
        </Button>
        <Stage
          style={{
            border: "4px solid",
            borderColor: borderColor,
          }}
          width={sceneWidth}
          height={sceneHeight}
          ref={stageRef}
          onMouseDown={checkDeselect}
          onTouchStart={checkDeselect}
        >
          <Layer>
            <FrameImage front={false} />
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
          <Layer listening={false}>
            <FrameImage front={true} />
          </Layer>
        </Stage>
        <Button
          className="p-4 text-xl text-black"
          rounded
          inline
          onClick={() => setFrame(Math.min(5, frame.id + 1))}
        >
          <Icon material={<ChevronRightIcon className="w-6 h-6" />} />
        </Button>
      </div>

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

function ArtworkImage({ id, image }: { id: string; image: string }) {
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
          display: "block",
          maxHeight: "150px",
          width: "auto",
          height: "auto",
          cursor: "move",
          borderRadius: "5px",
          margin: "4px",
          opacity: opacity,
        }}
        ref={drag}
      />
    </>
  );
}

function Artwork() {
  const { t } = useTranslation();
  const { artworkList } = useStore();

  return (
    <Block className="flex flex-col flex-wrap gap-4 container justify-center content-center text-center mx-auto">
      <div className="p-2 m-4">
        <h1 className="text-2xl">{t("artworkTitle")}</h1>
      </div>
      {/* Use slider logic from spook tours inventory */}
      <Block className="flex flex-wrap mx-auto">
        {artworkList.map((artworkImage, index) => (
          <ArtworkImage key={artworkImage.id + index} {...artworkImage} />
        ))}
      </Block>

      {artworkList.length === 0 ? (
        <Button
          className="p-4 text-xl text-black w-2/3 mx-auto h-20"
          rounded
          inline
        >
          <Link to={"/selection"}>{t("artworkEmpty")}</Link>
        </Button>
      ) : (
        <Canvas />
      )}
    </Block>
  );
}

export default Artwork;
