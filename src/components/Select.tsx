import axios from "axios";
// @ts-expect-error konsta typing
import { Button, Card, Icon } from "konsta/react";
import { useCallback, useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { MdOutlineThumbDown, MdOutlineThumbUp } from "react-icons/md";
import TinderCard from "react-tinder-card";

import api from "../api";
import useStore, { ImageProps } from "../store";
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

const SwipeButton = ({
  onClick,
  materialIcon,
}: {
  onClick: () => void;
  materialIcon: React.ReactNode;
}) => (
  <Button
    className="px-4 py-2 rounded-full"
    onClick={onClick}
    rounded
    inline
    outline
  >
    <Icon material={materialIcon} />
  </Button>
);

function Selection() {
  const { t } = useTranslation();

  const [currentIndex, setCurrentIndex] = useState(0);
  const [data, setData] = useState<ImageProps[]>([]);

  const likeImage = useStore((state) => state.likeImage);

  const currentIndexRef = useRef(currentIndex);

  const childRef = useRef<API | null>(null);

  const validateData = useCallback(async (elements: Element[]) => {
    if (!elements) return;

    const getValidIIIFIdentifier = async (iiifManifest: string) => {
      try {
        const imageURL = await utils.fetchIIIFIdentifier(iiifManifest);
        return imageURL;
      } catch (error) {
        console.error("Error:", error);
        return null;
      }
    };

    const imagePromises = await Promise.all(
      elements.map(async (element) => {
        try {
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
              image: `${identifier}/full/400,/0/default.jpg`,
              thumbnail: `${identifier}/full/100,100/0/default.jpg`,
            };
          }
          return null;
        } catch (error) {
          console.error("Error processing image:", error);
          return null;
        }
      }),
    );

    const fulfilledImages = imagePromises.filter(
      (result): result is ImageProps => result !== null,
    );

    setData(fulfilledImages);
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axios.get(api.sparqlQuery());
        validateData(data.results.bindings);
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
      // console.log(currentImage);
      likeImage(currentImage);
    }
    updateCurrentIndex(index + 1);
  };

  const outOfFrame = (index: number) => {
    currentIndexRef.current >= index && childRef.current?.restoreCard();
  };

  const swipe = async (dir: Direction) => {
    if (canSwipe && currentIndex < data.length) {
      await childRef.current?.swipe(dir);
    }
  };

  const currentImage = data[currentIndex];

  return (
    <div className="flex flex-col justify-evenly text-center">
      <div className="p-2 m-4">
        <h1 className="text-2xl">{t("selectionTitle")}</h1>
      </div>

      <div className="max-w-2xl mx-auto h-2/3">
        <Card className="flex">
          {currentImage && (
            <>
              <TinderCard
                ref={childRef}
                className="mb-4"
                key={currentImage.id}
                onSwipe={(dir) => swiped(dir, currentIndex)}
                onCardLeftScreen={() => outOfFrame(currentIndex)}
                preventSwipe={["up", "down"]}
              >
                <img alt={currentImage.name} src={currentImage.image}></img>
              </TinderCard>
              <div className="flex justify-between">
                <SwipeButton
                  onClick={() => swipe("left")}
                  materialIcon={<MdOutlineThumbDown className="w-6 h-6" />}
                />
                <SwipeButton
                  onClick={() => swipe("right")}
                  materialIcon={<MdOutlineThumbUp className="w-6 h-6" />}
                />
              </div>
            </>
          )}
        </Card>
      </div>

      <div className="p-2 bg-white rounded m-4 h-1/3">
        <h2 className="text-2xl font-bold mb-2 text-black">
          {currentImage?.name}
        </h2>
        <p className="text-gray-600">
          {t("selectionYear")} {currentImage?.year || t("selectionUnknown")}
        </p>
        <p className="text-gray-600">
          {t("selectionCreator")}{" "}
          {currentImage?.creator || t("selectionUnknown")}
        </p>
        <p className="text-gray-600">
          {t("selectionLocation")}{" "}
          {currentImage?.location || t("selectionUnknown")}
        </p>
      </div>
    </div>
  );
}

export default Selection;
