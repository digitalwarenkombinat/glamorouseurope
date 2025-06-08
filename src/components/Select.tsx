import {
  HandThumbDownIcon,
  HandThumbUpIcon,
} from "@heroicons/react/24/outline";
// @ts-expect-error konsta typing
import { Block, Card } from "konsta/react";
import { useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import TinderCard from "react-tinder-card";

import useStore from "../store";
import { SwipeButton } from "./SwipeButton";

export interface ImageElement {
  artworkLabel?: { value: string };
  collectionLabel?: { value: string };
  copyrightLabel?: { value: string };
  countryLabel?: { value: string };
  creatorLabel?: { value: string };
  depictsLabel?: { value: string };
  genreLabel?: { value: string };
  iiifManifest: { value: string };
  item: { value: string };
  itemLabel?: { value: string };
  locationLabel?: { value: string };
  materialLabel?: { value: string };
  year?: { value: string };
}

type Direction = "left" | "right" | "up" | "down";

interface SwipeAPI {
  restoreCard(): Promise<void>;
  swipe(dir?: Direction): Promise<void>;
}

function Selection() {
  const { t } = useTranslation();
  const { imageList, removeFromImageList, likeImage } =
    useStore();

  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const currentIndexRef = useRef<number>(currentIndex);
  const childRef = useRef<SwipeAPI | null>(null);

  const swiped = (direction: Direction) => {
    if (direction === "right" && currentIndex < imageList.length) {
      likeImage(imageList[currentIndex]);
    }
    removeFromImageList(imageList[currentIndex].id);
    setCurrentIndex((prevIndex) => prevIndex + 1);
  };

  const outOfFrame = (index: number) => {
    if (currentIndexRef.current >= index) {
      childRef.current?.restoreCard();
    }
  };

  const swipe = async (dir: Direction) => {
    if (currentIndex >= 0 && currentIndex < imageList.length) {
      await childRef.current?.swipe(dir);
    }
  };

  const currentImage = imageList[currentIndex];

  const transformCreator = (creator: string) => {
    if (creator && !creator.includes("http")) {
      return creator;
    }
    return t("selectionUnknown");
  };

  return (
    <Block
      margin={"my-4"}
      className="flex flex-col flex-wrap gap-2 lg:gap-8 justify-center content-center text-center mx-auto"
    >
      <h1 className="text-lg leading-6 px-8 md:px-24 md:text-xl lg:px-48">
        {t("selectionTitle")}
      </h1>

      <div className="mx-auto h-2/3">
        <Card className="flex shadow-md shadow-[#BC13FE]/90">
          {currentImage && (
            <>
              <TinderCard
                ref={childRef}
                className="mb-4"
                key={currentImage.id}
                onSwipe={(dir) => swiped(dir)}
                onCardLeftScreen={() => outOfFrame(currentIndex)}
                swipeRequirementType="position"
                swipeThreshold={100}
                preventSwipe={["up", "down"]}
              >
                <img alt={currentImage.name} src={currentImage.image} />
              </TinderCard>
              <div className="flex justify-between">
                <SwipeButton
                  onClick={() => swipe("left")}
                  materialIcon={<HandThumbDownIcon className="w-6 h-6" />}
                />
                <SwipeButton
                  onClick={() => swipe("right")}
                  materialIcon={<HandThumbUpIcon className="w-6 h-6" />}
                />
              </div>
            </>
          )}
        </Card>
      </div>

      <div className="mb-8 p-4 bg-white rounded h-1/3 opacity-90 max-w-lg w-3/4 text-center mx-auto shadow-md shadow-[#BC13FE]/90">
        <h2 className="text-lg font-bold mb-4 text-black md:text-xl">
          {currentImage?.name}
        </h2>
        <p className="text-gray-600">
          {t("selectionYear")} {currentImage?.year || t("selectionUnknown")}
        </p>
        <p className="text-gray-600">
          {t("selectionCreator")} {transformCreator(currentImage?.creator)}
        </p>
        <p className="text-gray-600">
          {t("selectionLocation")}{" "}
          {currentImage?.location || t("selectionUnknown")}
        </p>
      </div>
    </Block>
  );
}

export default Selection;
