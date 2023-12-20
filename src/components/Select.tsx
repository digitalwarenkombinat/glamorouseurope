import axios from "axios";
// @ts-ignore
import { Button, Card, Icon } from "konsta/react";
import { useCallback, useEffect, useRef, useState } from "react";
import { MdOutlineThumbDown, MdOutlineThumbUp } from "react-icons/md";
import TinderCard from "react-tinder-card";

import api from "../api";
import useStore, { Image } from "../store";
import utils from "../utils";

export interface Element {
  artworkLabel: { value: string };
  collectionLabel: { value: string };
  copyrightLabel: { value: string };
  countryLabel: { value: string };
  creatorLabel: { value: string };
  depictsLabel: { value: string };
  genreLabel: { value: string };
  iiifManifest: { value: string };
  item: { value: string };
  itemLabel: { value: string };
  locationLabel: { value: string };
  materialLabel: { value: string };
  year: { value: string };
}

type Direction = "left" | "right" | "up" | "down";

export interface API {
  restoreCard(): Promise<void>;
  swipe(dir?: Direction): Promise<void>;
}

function Selection() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [data, setData] = useState<Image[]>([]);

  const likeImage = useStore((state) => state.likeImage);

  const currentIndexRef = useRef(currentIndex);

  const childRef = useRef<API | null>(null);

  const validateData = useCallback(async (elements: Element[]) => {
    if (!elements) return;

    const getValidIIIFIdentifier = async (iiifManifest: string) => {
      try {
        const imageURL = await utils.fetchIIIFIdentifier(iiifManifest);
        console.log("Image URL: ", imageURL);

        return imageURL;
      } catch (error) {
        console.error("Error:", error);
        return null;
      }
    };

    const imagePromises = elements.map(async (element) => {
      const identifier = await getValidIIIFIdentifier(
        element.iiifManifest.value,
      );
      if (identifier !== null) {
        return {
          id: element.item.value,
          name: element.itemLabel.value,
          year: element.year?.value,
          country: element.countryLabel?.value,
          location: element?.locationLabel?.value,
          creator: element.creatorLabel?.value,
          url: element.iiifManifest?.value,
          identifier: identifier,
          image: `${identifier}/full/full/0/default.jpg`,
          thumbnail: `${identifier}/full/100,100/0/default.jpg`,
        };
      }
      return null;
    });

    const imageResults = await Promise.all(imagePromises);
    const images = imageResults.filter((image) => image !== null) as Image[];

    console.log("Data elements: ", elements);
    console.log("Data images: ", images);
    setData(images);
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data: response } = await axios.get(api.sparqlQuery());
        validateData(response.results.bindings);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, [validateData]);

  const updateCurrentIndex = (val: number) => {
    setCurrentIndex(val);
    currentIndexRef.current = val;
  };

  const canSwipe = currentIndex >= 0;

  const swiped = (direction: Direction, index: number) => {
    if (direction === "right") {
      console.log(currentImage);
      likeImage(currentImage);
    }
    updateCurrentIndex(index + 1);
  };

  const outOfFrame = (name: string, idx: number) => {
    console.log(`${name} (${idx}) left the screen!`, currentIndexRef.current);
    currentIndexRef.current >= idx && childRef.current?.restoreCard();
  };

  const swipe = async (dir: Direction) => {
    if (canSwipe && currentIndex < data.length) {
      await childRef.current?.swipe(dir);
    }
  };

  const currentImage = data[currentIndex];

  return (
    <div className="flex flex-col justify-evenly">
      <div className="max-w-2xl mx-auto h-2/3">
        <Card className="flex">
          {currentImage && (
            <>
              <TinderCard
                ref={childRef}
                className="mb-4"
                key={currentImage.id}
                onSwipe={(dir) => swiped(dir, currentIndex)}
                onCardLeftScreen={() =>
                  outOfFrame(currentImage.name, currentIndex)
                }
                preventSwipe={["up", "down"]}
              >
                <img alt={currentImage.name} src={currentImage.image}></img>
              </TinderCard>
              <div className="flex justify-between">
                <Button
                  className="px-4 py-2 rounded-full mr-2"
                  onClick={() => swipe("left")}
                  rounded
                  inline
                  outline
                >
                  <Icon material={<MdOutlineThumbDown className="w-6 h-6" />} />
                </Button>
                <Button
                  className="px-4 py-2 rounded-full"
                  onClick={() => swipe("right")}
                  rounded
                  inline
                  outline
                >
                  <Icon material={<MdOutlineThumbUp className="w-6 h-6" />} />
                </Button>
              </div>
            </>
          )}
        </Card>
      </div>

      <div className="p-2 bg-white rounded m-4 h-1/3">
        <h2 className="text-2xl font-bold mb-2 text-black">
          {currentImage?.name}
        </h2>
        <p className="text-gray-600">Year: {currentImage?.year}</p>
        <p className="text-gray-600">Creator: {currentImage?.creator}</p>
        <p className="text-gray-600">Location: {currentImage?.location}</p>
      </div>
    </div>
  );
}

export default Selection;
