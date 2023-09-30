import "./Collect.css";
import { useState, useMemo, useRef, useEffect, createRef } from "react";
import axios from "axios";
import TinderCard from "react-tinder-card";
import Viewer from "@samvera/clover-iiif/viewer";
import { Card, Button } from "konsta/react";
import api from "./api";
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

type Direction = "left" | "right" | "up" | "down";

export interface API {
  restoreCard(): Promise<void>;
  swipe(dir?: Direction): Promise<void>;
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

function Collect() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [data, setData] = useState([] as Image[]);
  const [imageURL, setImageURL] = useState("");

  const getValidIIIFImageURL = async (manifestURL: string) => {
    try {
      const imageURL = await utils.getIIIFImageURL(manifestURL);
      console.log("Image URL: ", imageURL);
      return imageURL;
    } catch (error) {
      console.error("Error:", error);
      return null;
    }
  };

  const validateData = async (elements: Element[]) => {
    if (!elements) return;

    const imagePromises: Promise<Image | null>[] = elements.map(
      async (element: Element) => {
        const imageURL = await getValidIIIFImageURL(element.iiif.value);
        if (imageURL !== null) {
          return {
            id: element.work.value,
            name: element.workLabel.value,
            year: element.year.value,
            country: element.countryLabel.value,
            location: element.locationLabel.value,
            url: element.iiif.value,
            image: imageURL,
          };
        }
        return null;
      },
    );

    const imageResults = await Promise.all(imagePromises);
    const images = imageResults.filter((image) => image !== null) as Image[];

    console.log("Data elements: ", elements);
    console.log("Data images: ", images);
    setData(images);
  };

  const getData = async () => {
    try {
      const { data: response } = await axios.get(api.sparqlQuery());
      validateData(response.results.bindings);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  const currentIndexRef = useRef(currentIndex);

  const childRefs: React.RefObject<API>[] = useMemo(
    () =>
      Array(data.length)
        .fill(0)
        .map(() => createRef()),
    [data],
  );

  const updateCurrentIndex = (val: number) => {
    setCurrentIndex(val);
    currentIndexRef.current = val;
  };

  const canGoBack = currentIndex < data.length + 1;

  const canSwipe = currentIndex >= 0;

  const swiped = (index: number) => {
    updateCurrentIndex(index + 1);
  };

  const outOfFrame = (name: string, idx: number) => {
    console.log(`${name} (${idx}) left the screen!`, currentIndexRef.current);
    currentIndexRef.current >= idx && childRefs[idx].current?.restoreCard();
  };

  const swipe = async (dir: Direction) => {
    if (canSwipe && currentIndex < data.length) {
      await childRefs[currentIndex].current?.swipe(dir);
    }
  };

  const goBack = async () => {
    if (!canGoBack) return;
    const newIndex = currentIndex - 1;
    updateCurrentIndex(newIndex);
    await childRefs[newIndex].current?.restoreCard();
  };

  const handleCanvasIdCallback = (activeCanvasId: string) => {
    if (activeCanvasId) {
      console.log("Active canvas ID: ", activeCanvasId);
    }
  };

  const liftSubjectFromBackground = async (imageURL: string) => {
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
      setImageURL(imageURL);
      console.log("Resulting image URL: ", imageURL);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <Card className="h-full rounded-none" margin={0}>
      {data.map(
        ({ id, name, year, country, location, url }, index) =>
          currentIndex === index && (
            <>
              <TinderCard
                ref={childRefs[index]}
                className="swipe relative h-full"
                key={id}
                onSwipe={() => swiped(index)}
                onCardLeftScreen={() => outOfFrame(name, index)}
                preventSwipe={["up", "down"]}
              >
                <Viewer
                  iiifContent={url}
                  options={options}
                  canvasIdCallback={handleCanvasIdCallback}
                />
              </TinderCard>
              <p className="px-4 py-2 space-x-2">
                {name} ({year}) - {location} {country}
              </p>
            </>
          ),
      )}
      <div className="px-4 py-2 space-x-2">
        <Button
          onClick={() => liftSubjectFromBackground(data[currentIndex].image)}
          rounded
          inline
        >
          Lift subject
        </Button>
        <Button onClick={() => swipe("left")} rounded inline outline>
          Left
        </Button>
        <Button onClick={() => goBack()} rounded inline outline>
          Undo
        </Button>
        <Button onClick={() => swipe("right")} rounded inline outline>
          Right
        </Button>
        {imageURL && <img src={imageURL} alt="Background Removed" />}
      </div>
    </Card>
  );
}

export default Collect;
