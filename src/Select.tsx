import { useState, useRef, useEffect, useCallback } from "react";
import axios from "axios";
import TinderCard from "react-tinder-card";
// @ts-ignore
import { Card, Button, Icon } from "konsta/react";
import { MdOutlineThumbDown, MdOutlineThumbUp } from "react-icons/md";

import api from "./api";
import utils from "./utils";
import { Element, Image } from "./types";

type Direction = "left" | "right" | "up" | "down";

export interface API {
  restoreCard(): Promise<void>;
  swipe(dir?: Direction): Promise<void>;
}

interface SelectionProps {
  handleImageLikeList: (image: Image) => void;
}

function Selection({ handleImageLikeList }: SelectionProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [data, setData] = useState<Image[]>([]);

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
      handleImageLikeList(currentImage);
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
