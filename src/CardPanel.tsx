import "./CardPanel.css";
import React, { useState, useMemo, useRef, useEffect } from "react";
import axios from "axios";
import TinderCard from "react-tinder-card";
import Viewer from "@samvera/clover-iiif/viewer";
import api from "./api";
import utils from "./utils";
import cropping from "./cropping";

export interface Images {
  work: { value: string };
  workLabel: { value: string };
  year: { value: string };
  countryLabel: { value: string };
  locationLabel: { value: string };
  iiif: { value: string };
}

// const images: Images[] = [];

type Direction = "left" | "right" | "up" | "down";

export interface API {
  swipe(dir?: Direction): Promise<void>;
  restoreCard(): Promise<void>;
}

const options = {
  // Primary title (Manifest label) for top level canvas.  Defaults to true
  showTitle: false,
  showZoomControl: false,

  // Set canvas zooming onScoll (this defaults to false)
  openSeadragon: {
    loadTilesWithAjax: true,
    showNavigationControl: false,
  },
  informationPanel: {
    open: false,
  },
};

function Card() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [data, setData] = useState([] as Images[]);
  const [imageUrl, setImageUrl] = useState("");

  const getData = async () => {
    try {
      const { data: response } = await axios.get(api.sparqlQuery());
      setData(response.results.bindings);
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
        .map(() => React.createRef()),
    [data],
  );

  const updateCurrentIndex = (val: number) => {
    setCurrentIndex(val);
    currentIndexRef.current = val;
  };

  const canGoBack = currentIndex < data.length - 1;

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

  // increase current index and show card
  const goBack = async () => {
    if (!canGoBack) return;
    const newIndex = currentIndex - 1;
    updateCurrentIndex(newIndex);
    await childRefs[newIndex].current?.restoreCard();
  };

  const handleCanvasIdCallback = (activeCanvasId: string) => {
    if (activeCanvasId) console.log(activeCanvasId);
  };

  const getCroppedImage = async (url: string) => {
    try {
      const path = await cropping.getCroppedImagePath(url);
      console.log(path);
      if (path) {
        removeBackground(path);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const removeBackground = async (path: string) => {
    try {
      const url = await utils.bgRemoval(path);
      setImageUrl(url);
      console.log("Resulting URL:", url);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="cardWrapper">
      <div className="cardContainer">
        {data.map(
          (
            {
              work: { value: id },
              workLabel: { value: name },
              year: { value: year },
              countryLabel: { value: country },
              locationLabel: { value: location },
              iiif: { value: url },
            }: Images,
            index,
          ) =>
            currentIndex === index && (
              <TinderCard
                ref={childRefs[index]}
                className="swipe"
                key={id}
                onSwipe={() => swiped(index)}
                onCardLeftScreen={() => outOfFrame(name, index)}
              >
                <Viewer
                  iiifContent={url}
                  options={options}
                  canvasIdCallback={handleCanvasIdCallback}
                />
                <h3 className="cardName">
                  {name} ({year}) - {location} {country}
                </h3>
              </TinderCard>
            ),
        )}
      </div>
      <div className="buttons">
        <button onClick={() => swipe("left")}>Left</button>
        <button onClick={() => goBack()}>Undo</button>
        <button onClick={() => swipe("right")}>Right</button>
        <button onClick={() => getCroppedImage(data[currentIndex].iiif.value)}>
          Get Cropped Image
        </button>
        <button
          onClick={() =>
            removeBackground(
              "https://iiif.kmska.be/c/iiif/2/public@1115.tif/full/full/0/default.jpg",
            )
          }
        >
          Remove Background
        </button>
        {imageUrl && <img src={imageUrl} alt="Background Removed" />}
      </div>
    </div>
  );
}

export default Card;
