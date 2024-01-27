// @ts-expect-error konsta typing
import { Block, Button } from "konsta/react";
import { Suspense, lazy, useState } from "react";
import { useTranslation } from "react-i18next";
import ReactLassoSelect, { getCanvas } from "react-lasso-select";

import useStore, { ImageProps } from "../store";
import utils from "../utils";

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

  const handleImageClick = (image: ImageProps) => {
    setSelectedImage(image);
  };

  const [points, setPoints] = useState<{ x: number; y: number }[]>([]);
  const [clippedImg, setClippedImg] = useState<string>();

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

  return (
    <Block className="flex flex-col flex-wrap gap-4 container justify-center content-center text-center mx-auto">
      <div className="p-2 m-4">
        <h1 className="text-2xl">{t("collectionTitle")}</h1>
      </div>

      <Block className="flex flex-wrap mx-auto">
        {imageLikeList.map((item) => (
          <img
            key={item.id}
            src={item.thumbnail}
            alt={item.name}
            onClick={() => handleImageClick(item)}
            style={{ cursor: "pointer", margin: "4px" }}
            role="presentation"
          />
        ))}
      </Block>

      {selectedImage && (
        <Block className="space-y-4">
          <ReactLassoSelect
            value={points}
            src={selectedImage.image}
            onChange={(path) => {
              setPoints(path);
            }}
            onComplete={(path) => {
              if (!path.length) return;
              getCanvas(selectedImage.image, path, (err, canvas) => {
                if (!err) {
                  setClippedImg(canvas.toDataURL());
                }
              });
            }}
          />
          <div>Points: {points.map(({ x, y }) => `${x},${y}`).join(" ")}</div>
          <div>
            <img src={clippedImg} alt="" />
          </div>

          <Suspense fallback={<h2>🌀 {t("collectionLoading")}</h2>}>
            <Viewer
              iiifContent={selectedImage.url}
              options={options}
              customTheme={customTheme}
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
