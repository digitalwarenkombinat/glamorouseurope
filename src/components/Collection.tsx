// @ts-expect-error konsta typing
import { Block, Button, Card, Link, Navbar, Page, Popup } from "konsta/react";
import { Suspense, lazy, useState } from "react";
import { useTranslation } from "react-i18next";
import { Masonry } from "react-plock";

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

  const [selectedImage, setSelectedImage] = useState<ImageProps | null>(null);
  const [popupOpened, setPopupOpened] = useState(false);

  const handleImageClick = (image: ImageProps) => {
    setSelectedImage(image);
    setPopupOpened(true);
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

      <Card className="h-auto rounded-none">
        <Masonry
          items={imageLikeList}
          config={{
            columns: [1, 2, 3],
            gap: [24, 12, 6],
            media: [640, 768, 1024],
          }}
          render={(item, index) => (
            <img
              key={index}
              src={item.image}
              alt={item.name}
              onClick={() => handleImageClick(item)}
              style={{ cursor: "pointer" }}
              role="presentation"
            />
          )}
        />
      </Card>
      {selectedImage && (
        <Popup
          opened={popupOpened}
          onBackdropClick={() => setPopupOpened(false)}
          size="w-screen h-4/5"
        >
          <Page>
            <Navbar
              title={selectedImage.name}
              right={
                <Link navbar onClick={() => setPopupOpened(false)}>
                  {t("collectionClose")}
                </Link>
              }
            />
            <Block className="space-y-4">
              <Button
                className="px-4 py-2 rounded-full mr-2 text-xl"
                onClick={() =>
                  addFrameToCanvas(selectedImage.id, selectedImage.identifier)
                }
                rounded
                inline
                outline
              >
                {t("collectionAddText")}
              </Button>
              <Suspense fallback={<h2>🌀 {t("collectionLoading")}</h2>}>
                <Viewer iiifContent={selectedImage.url} options={options} />
              </Suspense>
            </Block>
          </Page>
        </Popup>
      )}
    </div>
  );
}

export default Collection;
