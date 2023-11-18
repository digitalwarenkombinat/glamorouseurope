import "./Collection.css";

import Viewer from "@samvera/clover-iiif/viewer";
// @ts-ignore
import { Card } from "konsta/react";
import utils from "./utils";

export interface Element {
  work: { value: string };
  workLabel: { value: string };
  year: { value: string };
  countryLabel: { value: string };
  locationLabel: { value: string };
  iiif: { value: string };
}

export interface Image {
  id: string;
  name: string;
  year: string;
  country: string;
  location: string;
  url: string;
  image: string;
}

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

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function Collection(images: any) {
  /*   const liftSubjectFromBackground = async (imageURL: string) => {
    try {
      const croppedImagePath = await utils.getCroppedImagePath(imageURL);
      console.log("Cropped image path: ", croppedImagePath);
      if (croppedImagePath) {
        removeBackground(croppedImagePath);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const removeBackground = async (imagePath: string) => {
    try {
      const imageURL = await utils.bgRemoval(imagePath);
      // setImageURL(imageURL);
      console.log("Resulting image URL: ", imageURL);
    } catch (error) {
      console.error("Error:", error);
    }
  }; */

  return (
    <Card className="h-full rounded-none">
      <Viewer iiifContent={images[0]} options={options} />
    </Card>
  );
}

export default Collection;
