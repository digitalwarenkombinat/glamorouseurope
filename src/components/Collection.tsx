// @ts-expect-error konsta typing
import { Block, Button } from "konsta/react";
import { Suspense, lazy, useState } from "react";
import { useTranslation } from "react-i18next";

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
  },
  showTitle: false,
  showZoomControl: false,
};

function Collection() {
  const { t } = useTranslation();

  const { imageLikeList } = useStore();
  const addToCanvas = useStore((state) => state.addToCanvas);

  const [selectedImage, setSelectedImage] = useState<ImageProps | null>(
    imageLikeList[0] || null,
  );

  const handleImageClick = (image: ImageProps) => {
    setSelectedImage(image);
  };

  const addFrameToCanvas = async (id: string, imageURL: string) => {
    try {
      const croppedImagePath = await utils.getCroppedImagePath(imageURL);
      console.log("Cropped image path: ", croppedImagePath);
      if (croppedImagePath) {
        addToCanvas(id, croppedImagePath);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="flex flex-col justify-evenly text-center">
      <div className="p-2 m-4">
        <h1 className="text-2xl">{t("collectionTitle")}</h1>
      </div>

      <Block
        className="flex flex-col justify-evenly items-start"
        style={{
          gap: "20px",
          boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
        }}
      >
        <div className="flex flex-wrap mx-auto">
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
        </div>

        {selectedImage && (
          <>
            <div className="max-w-2xl mx-auto w-screen">
              <Suspense fallback={<h2>🌀 {t("collectionLoading")}</h2>}>
                <Viewer iiifContent={selectedImage?.url} options={options} />
              </Suspense>
            </div>

            <div className="mx-auto">
              <Button
                className="p-4 text-xl text-black"
                rounded
                inline
                onClick={() =>
                  addFrameToCanvas(selectedImage?.id, selectedImage?.identifier)
                }
              >
                {t("collectionAddText")}
              </Button>
            </div>
          </>
        )}
      </Block>
    </div>
  );
}

export default Collection;
