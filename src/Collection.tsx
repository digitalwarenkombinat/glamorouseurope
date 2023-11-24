import "./Collection.css";

// import Viewer from "@samvera/clover-iiif/viewer";
import { Masonry } from "react-plock";
// @ts-ignore
import { Card } from "konsta/react";

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

/* const options = {
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
}; */

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function Collection() {
  const items = [
    "https://iip.smk.dk/iiif/jp2/gx41mn78t_dep44.tif.jp2/full/,800/0/default.jpg",
    "https://iiif.library.vanderbilt.edu/iiif/2/gallery%2F1979%2F1979.0902P.tif/full/,800/0/default.jpg",
    "https://iiif.library.vanderbilt.edu/iiif/2/gallery%2F1979%2F1979.0863P.tif/full/,800/0/default.jpg",
    "https://iiif.library.vanderbilt.edu/iiif/2/gallery%2F1979%2F1979.0873P.tif/full/,800/0/default.jpg",
    "https://iiif.library.vanderbilt.edu/iiif/2/gallery%2F1979%2F1979.0872P.tif/full/,800/0/default.jpg",
    "https://iiif.library.vanderbilt.edu/iiif/2/gallery%2F1979%2F1979.0867P.tif/full/,800/0/default.jpg",
    "https://iiif.library.vanderbilt.edu/iiif/2/gallery%2F1979%2F1979.0866P.tif/full/,800/0/default.jpg",
    "https://iiif.kmska.be/c/iiif/2/public@34744.tif/full/,800/0/default.jpg",
  ];
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
    <Card className="h-auto rounded-none">
      {/* <Viewer iiifContent={images[0]} options={options} /> */}
      <Masonry
        items={items}
        config={{
          columns: [1, 2, 3],
          gap: [24, 12, 6],
          media: [640, 768, 1024],
        }}
        render={(item, idx) => <img key={idx} src={item} alt={item} />}
      />
    </Card>
  );
}

export default Collection;
