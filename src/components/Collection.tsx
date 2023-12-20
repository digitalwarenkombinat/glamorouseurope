// import Viewer from "@samvera/clover-iiif/viewer";
// @ts-ignore
import { Block, Button, Card, Link, Navbar, Page, Popup } from "konsta/react";
import { Suspense, lazy, useState } from "react";
import { Masonry } from "react-plock";

import useStore, { Image } from "../store";
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
  const { imageLikeList } = useStore();
  const addToCanvas = useStore((state) => state.addToCanvas);

  const [selectedImage, setSelectedImage] = useState<Image | null>(null);
  const [popupOpened, setPopupOpened] = useState(false);

  const handleImageClick = (image: Image) => {
    setSelectedImage(image);
    setPopupOpened(true);
  };

  const liftSubjectFromBackground = async (imageURL: string) => {
    try {
      const croppedImagePath = await utils.getCroppedImagePath(imageURL);
      console.log("Cropped image path: ", croppedImagePath);
      if (croppedImagePath) {
        // removeBackground(croppedImagePath);
        addToCanvas(croppedImagePath);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  /* const removeBackground = async (imagePath: string) => {
    try {
      const imageURL = await utils.bgRemoval(imagePath);
      handleCanvasList(imageURL);
      console.log("Resulting image URL: ", imageURL);
    } catch (error) {
      console.error("Error:", error);
    }
  }; */

  return (
    <>
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
          size="w-screen h-screen"
        >
          <Page>
            <Navbar
              title="Popup"
              right={
                <Link navbar onClick={() => setPopupOpened(false)}>
                  Close
                </Link>
              }
            />
            <Block className="space-y-4">
              <Suspense fallback={<h2>🌀 Loading...</h2>}>
                <Viewer iiifContent={selectedImage.url} options={options} />
              </Suspense>
              <Button
                className="px-4 py-2 rounded-full mr-2"
                onClick={() =>
                  liftSubjectFromBackground(selectedImage.identifier)
                }
                rounded
                inline
                outline
              >
                Add to canvas
              </Button>
            </Block>
          </Page>
        </Popup>
      )}
    </>
  );
}

export default Collection;
