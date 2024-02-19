import {
  ArrowDownTrayIcon,
  ArrowUturnDownIcon,
  ArrowUturnUpIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  ShareIcon,
  SunIcon,
  TrashIcon,
} from "@heroicons/react/24/outline";
import { saveAs } from "file-saver";
// @ts-expect-error konsta typing
import { Block, Button, Icon, List, ListItem, Range } from "konsta/react";
import Konva from "konva";
import React, { useEffect, useRef, useState } from "react";
import { useDrop } from "react-dnd";
import { Layer, Stage } from "react-konva";

import useStore, { ArtworkImageProps, CanvasImageProps } from "../store";
import ArtworkFrame from "./ArtworkFrame";
import ArtworkImage from "./ArtworkImage";

const ArtworkCanvas: React.FC = () => {
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
  const [selectedImage, setSelectedImage] = useState<CanvasImageProps | null>(
    null,
  );
  const [brightness, setBrightness] = useState(0);
  const [contrast, setContrast] = useState(0);
  const [opacity, setOpacity] = useState(1);
  const [brightnessExpanded, setBrightnessExpanded] = useState(false);
  const [contrastExpanded, setContrastExpanded] = useState(false);
  const [opacityExpanded, setOpacityExpanded] = useState(false);

  const sceneWidth = 1080;
  const sceneHeight = 1080;

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
      setSelectedImage(null);
    }
  };

  const handleSelect = (canvasImage: CanvasImageProps) => {
    setSelectedImage(canvasImage);
    setBrightness(canvasImage.brightness);
    setContrast(canvasImage.contrast);
    setOpacity(canvasImage.opacity);
  };

  const handleMove = (moveForward: boolean) => {
    if (selectedImage) {
      moveCanvasImage(selectedImage.id, moveForward);
    }
  };

  const adjustTransform = (value: number, property: keyof CanvasImageProps) => {
    if (!selectedImage) return;

    const updatedImage = { ...selectedImage, [property]: value };
    transformCanvasImage(updatedImage);
    switch (property) {
      case "brightness":
        setBrightness(value);
        break;
      case "contrast":
        setContrast(value);
        break;
      case "opacity":
        setOpacity(value);
        break;
      default:
        break;
    }
  };

  const handleRemove = () => {
    if (selectedImage) {
      removeFromCanvas(selectedImage.id);
      setSelectedImage(null);
    }
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        const canvas = stageRef.current;
        if (!canvas) {
          console.error("Canvas element not found");
          return;
        }

        const blob = await fetch(canvas.toDataURL()).then((res) => res.blob());
        if (!blob) {
          console.error("Failed to create blob from canvas");
          return;
        }

        await navigator.share({
          files: [new File([blob], "canvas.png", { type: "image/png" })],
          title: "GLAMorous Europe",
          text: "Check out my GLAMorous Europe artwork!",
        });

        console.log("Share successful");
      } catch (error) {
        console.error("Error sharing:", error);
      }
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

  const handleToggleBrightness = () => {
    setBrightnessExpanded(!brightnessExpanded);
    setOpacityExpanded(false);
    setContrastExpanded(false);
  };

  const handleToggleContrast = () => {
    setContrastExpanded(!contrastExpanded);
    setOpacityExpanded(false);
    setBrightnessExpanded(false);
  };

  const handleToggleOpacity = () => {
    setOpacityExpanded(!opacityExpanded);
    setContrastExpanded(false);
    setBrightnessExpanded(false);
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
  }

  return (
    <>
      <Block className="flex flex-wrap gap-1 container justify-center content-center text-center mx-auto">
        <Button className="p-2 text-black" rounded inline onClick={handleShare}>
          <Icon material={<ShareIcon className="w-6 h-6" />} />
        </Button>
        <Button
          className="p-2 text-black"
          rounded
          inline
          onClick={handleDownload}
        >
          <Icon material={<ArrowDownTrayIcon className="w-6 h-6" />} />
        </Button>
        <Button
          className="p-4 text-xl text-black"
          rounded
          inline
          onClick={() => setFrame(Math.max(1, frame.id - 1))}
        >
          <Icon material={<ChevronLeftIcon className="w-6 h-6" />} />
        </Button>
        <Button
          className="p-4 text-xl text-black"
          rounded
          inline
          onClick={() => setFrame(Math.min(5, frame.id + 1))}
        >
          <Icon material={<ChevronRightIcon className="w-6 h-6" />} />
        </Button>
        {selectedImage && (
          <>
            <Button
              className="p-2 text-black"
              rounded
              inline
              onClick={() => handleMove(true)}
            >
              <Icon material={<ArrowUturnUpIcon className="w-6 h-6" />} />
            </Button>
            <Button
              className="p-2 text-black"
              rounded
              inline
              onClick={() => handleMove(false)}
            >
              <Icon material={<ArrowUturnDownIcon className="w-6 h-6" />} />
            </Button>
            <Button
              className="p-2 text-black"
              rounded
              inline
              onClick={handleRemove}
            >
              <Icon material={<TrashIcon className="w-6 h-6" />} />
            </Button>
            <Button
              className="p-2 text-black"
              rounded
              inline
              onClick={handleToggleOpacity}
            >
              <Icon material={<SunIcon className="w-6 h-6" />} />
            </Button>
            {opacityExpanded && (
              <List strong insetMaterial outlineIos className="w-1/3 my-0">
                <ListItem
                  innerClassName="flex space-x-4 w-6"
                  innerChildren={
                    <Range
                      value={opacity}
                      min={0}
                      max={1}
                      step={0.01}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                        adjustTransform(parseFloat(e.target.value), "opacity")
                      }
                    />
                  }
                />
              </List>
            )}
            <Button
              className="p-2 text-black"
              rounded
              inline
              onClick={handleToggleBrightness}
            >
              <Icon material={<SunIcon className="w-6 h-6" />} />
            </Button>
            {brightnessExpanded && (
              <List strong insetMaterial outlineIos className="w-1/3 my-0">
                <ListItem
                  innerClassName="flex space-x-4 w-6"
                  innerChildren={
                    <Range
                      value={brightness}
                      min={-1}
                      max={1}
                      step={0.01}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                        adjustTransform(
                          parseFloat(e.target.value),
                          "brightness",
                        )
                      }
                    />
                  }
                />
              </List>
            )}
            <Button
              className="p-2 text-black"
              rounded
              inline
              onClick={handleToggleContrast}
            >
              <Icon material={<SunIcon className="w-6 h-6" />} />
            </Button>
            {contrastExpanded && (
              <List strong insetMaterial outlineIos className="w-1/3 my-0">
                <ListItem
                  innerClassName="flex space-x-4 w-6"
                  innerChildren={
                    <Range
                      value={contrast}
                      min={-100}
                      max={100}
                      step={1}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                        adjustTransform(parseFloat(e.target.value), "contrast")
                      }
                    />
                  }
                />
              </List>
            )}
          </>
        )}
      </Block>
      <div className="mx-auto flex items-center" ref={drop}>
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
          <Layer listening={false}>
            <ArtworkFrame front={false} />
          </Layer>
          <Layer>
            {canvasList.map((canvasImage) => (
              <ArtworkImage
                key={canvasImage.id}
                canvasImage={canvasImage}
                isSelected={selectedImage?.id === canvasImage.id}
                onSelect={() => handleSelect(canvasImage)}
              />
            ))}
          </Layer>
          <Layer listening={false}>
            <ArtworkFrame front={true} />
          </Layer>
        </Stage>
      </div>
    </>
  );
};

export default ArtworkCanvas;
