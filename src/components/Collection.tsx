// @ts-expect-error konsta typing
import { Block, Button } from "konsta/react";
import { Suspense, lazy, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import ReactLassoSelect, { getCanvas } from "react-lasso-select";

import useStore, { ImageProps } from "../store";
import useRemoveImageBackground from "../utils/useRemoveImageBackground";
import utils from "../utils/utils";
import ThumbnailSlider from "./ThumbnailSlider";

const Viewer = lazy(() => import("@samvera/clover-iiif/viewer"));

const options = {
  canvasBackgroundColor: "010A01",
  gestureSettingsTouch: {
    dragToPan: false,
    dblClickToZoom: false,
    dblClickDragToZoom: false,
    flickEnabled: false,
    pinchRotate: true,
  },
  informationPanel: {
    open: false,
  },
  openSeadragon: {
    loadTilesWithAjax: true,
    showNavigationControl: false,
    showHomeControl: false,
    showFullPageControl: false,
    showRotationControl: false,
    showFlipControl: false,
  },
  showTitle: false,
  showIIIFBadge: false,
  showZoomControl: false,
};

const customTheme = {
  colors: {
    primary: "#BC13FE",
    accent: "#BC13FE",
    secondary: "#EDECEA",
  },
};

function Collection() {
  const { t } = useTranslation();

  const { imageLikeList } = useStore();
  const addToArtwork = useStore((state) => state.addToArtwork);

  const [selectedImage, setSelectedImage] = useState<ImageProps | null>(
    imageLikeList[0] || null,
  );

  const [activeCanvasId, setActiveCanvasId] = useState("");

  const [canvasImg, setCanvasImg] = useState("");

  useEffect(() => {
    if (activeCanvasId) {
      setTimeout(() => {
        setCanvasImg(document.querySelectorAll("canvas")[0].toDataURL());
      }, 1000);
    }
  }, [activeCanvasId]);

  const handleImageClick = (image: ImageProps) => {
    setSelectedImage(image);
  };

  const [points, setPoints] = useState<{ x: number; y: number }[]>([]);
  const [clippedImg, setClippedImg] = useState<string>();

  const { autoRemoveBackground } = useRemoveImageBackground();

  const removeBackground = (clippedImg: string) => {
    const imageElement = new Image();
    imageElement.src = clippedImg;
    autoRemoveBackground(imageElement).then((base64: string) => {
      console.log(base64);
      setClippedImg(base64);
    });
  };

  const addFrameToArtwork = async (id: string, imageURL: string) => {
    try {
      const croppedImagePath = await utils.getCroppedImagePath(imageURL);
      console.log("Cropped image path: ", croppedImagePath);
      if (croppedImagePath) {
        addToArtwork(id, croppedImagePath);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleCanvasIdCallback = (activeCanvasId: string) => {
    if (activeCanvasId) setActiveCanvasId(activeCanvasId);
  };

  return (
    <Block
      margin={"my-4"}
      className="flex flex-col flex-wrap gap-4 container justify-center content-center text-center mx-auto"
    >
      <div className="p-2">
        <h1 className="text-xl">{t("collectionTitle")}</h1>
      </div>

      <ThumbnailSlider
        imageList={imageLikeList}
        handleImageClick={handleImageClick}
      />

      {selectedImage && (
        <Block className="space-y-4">
          <ReactLassoSelect
            value={points}
            src={canvasImg}
            onChange={(path) => {
              setPoints(path);
            }}
            onComplete={(path) => {
              if (!path.length) return;
              getCanvas(canvasImg, path, (err, canvas) => {
                if (!err) {
                  setClippedImg(canvas.toDataURL());
                  // addToArtwork("1", canvas.toDataURL());
                }
              });
            }}
          />
          <div>
            <img src={clippedImg} alt="" />
          </div>

          {clippedImg && (
            <Button onClick={() => removeBackground(clippedImg)}>
              Remove Background
            </Button>
          )}

          <Suspense fallback={<h2>🌀 {t("collectionLoading")}</h2>}>
            <Viewer
              iiifContent={selectedImage.url}
              options={options}
              customTheme={customTheme}
              canvasIdCallback={handleCanvasIdCallback}
            />
          </Suspense>

          <Button
            className="p-4 text-xl text-black w-2/3 mx-auto h-16"
            rounded
            inline
            onClick={() =>
              addFrameToArtwork(selectedImage?.id, selectedImage?.identifier)
            }
          >
            {t("collectionAddText")}
          </Button>
        </Block>
      )}
    </Block>
  );
}

export default Collection;
