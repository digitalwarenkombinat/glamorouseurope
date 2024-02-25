import { useDndMonitor, useDroppable } from "@dnd-kit/core";
import {
  ArrowDownTrayIcon,
  ArrowUturnDownIcon,
  ArrowUturnUpIcon,
  ShareIcon,
  SunIcon,
  TrashIcon,
} from "@heroicons/react/24/outline";
import {
  BlendingModeIcon,
  ComponentBooleanIcon,
  PaddingIcon,
} from "@radix-ui/react-icons";
import { saveAs } from "file-saver";
// @ts-expect-error konsta typing
import { Block, Button, Icon, List, ListItem, Range } from "konsta/react";
import Konva from "konva";
import React, { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { Layer, Stage } from "react-konva";

import useStore, { CanvasImageProps } from "../store";
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

  const { t } = useTranslation();
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
      const containerWidth = window.innerWidth * 0.95 || 0;
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

  useDndMonitor({
    onDragEnd(event) {
      const { active, over } = event;
      if (
        over &&
        over.data.current?.accepts.includes(active.data.current?.type)
      ) {
        const activeId = event.active.id;
        if (activeId) {
          const canvasImage = artworkList.find(
            (image) => image.id === activeId,
          );

          if (canvasImage) {
            const stage = stageRef.current;

            if (stage) {
              stage.setPointersPositions(event.activatorEvent);
              const position = stage.getPointerPosition();
              if (position) {
                addToCanvas(canvasImage.image, position.x, position.y);
              }
            }
          }
        }
      }
    },
  });

  const { isOver, setNodeRef } = useDroppable({
    id: "droppable",
    data: {
      accepts: ["artwork"],
    },
  });

  const isActive = isOver;
  let borderColor = "transparent";
  if (isActive) {
    borderColor = "#ebb2ff";
  }

  return (
    <>
      <Block
        margin={"my-0"}
        className="flex flex-wrap gap-1 container justify-center content-center text-center mx-auto"
      >
        <Button rounded inline onClick={handleShare}>
          <Icon material={<ShareIcon className="w-6 h-6 lg:w-8 lg:h-8" />} />
        </Button>
        <Button rounded inline onClick={handleDownload}>
          <Icon
            material={<ArrowDownTrayIcon className="w-6 h-6 lg:w-8 lg:h-8" />}
          />
        </Button>
        <Button
          rounded
          inline
          onClick={() => setFrame(frame.id >= 5 ? 1 : frame.id + 1)}
        >
          <Icon material={<PaddingIcon className="w-6 h-6 lg:w-8 lg:h-8" />} />
        </Button>
        {selectedImage && (
          <>
            <Button rounded inline onClick={() => handleMove(true)}>
              <Icon
                material={
                  <ArrowUturnUpIcon className="w-6 h-6 lg:w-8 lg:h-8" />
                }
              />
            </Button>
            <Button rounded inline onClick={() => handleMove(false)}>
              <Icon
                material={
                  <ArrowUturnDownIcon className="w-6 h-6 lg:w-8 lg:h-8" />
                }
              />
            </Button>
            <Button rounded inline onClick={handleRemove}>
              <Icon
                material={<TrashIcon className="w-6 h-6 lg:w-8 lg:h-8" />}
              />
            </Button>
            <Button
              style={{
                backgroundColor: opacityExpanded && "#BC13FE",
              }}
              rounded
              inline
              onClick={handleToggleOpacity}
            >
              <Icon
                material={
                  <BlendingModeIcon className="w-6 h-6 lg:w-8 lg:h-8" />
                }
              />
            </Button>
            <Button
              style={{
                backgroundColor: brightnessExpanded && "#BC13FE",
              }}
              rounded
              inline
              onClick={handleToggleBrightness}
            >
              <Icon material={<SunIcon className="w-6 h-6 lg:w-8 lg:h-8" />} />
            </Button>
            <Button
              style={{
                backgroundColor: contrastExpanded && "#BC13FE",
              }}
              rounded
              inline
              onClick={handleToggleContrast}
            >
              <Icon
                material={
                  <ComponentBooleanIcon className="w-6 h-6 lg:w-8 lg:h-8" />
                }
              />
            </Button>
            {opacityExpanded && (
              <List
                strong
                insetMaterial
                outlineIos
                margin={"my-4"}
                className="w-2/3"
              >
                <ListItem
                  innerClassName="flex space-x-4 w-6"
                  innerChildren={
                    <>
                      <p>{t("artworkCanvasOpacity")}</p>
                      <Range
                        value={opacity}
                        min={0}
                        max={1}
                        step={0.01}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                          adjustTransform(parseFloat(e.target.value), "opacity")
                        }
                      />
                    </>
                  }
                />
              </List>
            )}
            {brightnessExpanded && (
              <List
                strong
                insetMaterial
                outlineIos
                margin={"my-4"}
                className="w-2/3"
              >
                <ListItem
                  innerClassName="flex space-x-4 w-6"
                  innerChildren={
                    <>
                      <p>{t("artworkCanvasBrightness")}</p>
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
                    </>
                  }
                />
              </List>
            )}
            {contrastExpanded && (
              <List
                strong
                insetMaterial
                outlineIos
                margin={"my-4"}
                className="w-2/3"
              >
                <ListItem
                  innerClassName="flex space-x-4 w-6"
                  innerChildren={
                    <>
                      <p>{t("artworkCanvasContrast")}</p>
                      <Range
                        value={contrast}
                        min={-100}
                        max={100}
                        step={1}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                          adjustTransform(
                            parseFloat(e.target.value),
                            "contrast",
                          )
                        }
                      />
                    </>
                  }
                />
              </List>
            )}
          </>
        )}
      </Block>
      <div className="mx-auto flex items-center" ref={setNodeRef}>
        <Stage
          style={{
            border: "4px solid",
            borderColor: borderColor,
          }}
          pixelRatio={1}
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
