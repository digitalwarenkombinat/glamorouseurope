import {
  HandThumbDownIcon,
  HandThumbUpIcon,
} from "@heroicons/react/24/outline";
// @ts-expect-error konsta typing
import { Card } from "konsta/react";
import { useRef } from "react";
import TinderCard from "react-tinder-card";

import useStore, { ImageProps } from "../store";
import { SwipeButton } from "./SwipeButton";

export type Direction = "left" | "right" | "up" | "down";

export interface SwipeAPI {
  restoreCard(): Promise<void>;
  swipe(dir?: Direction): Promise<void>;
}

interface CardContainerProps {
  currentImage: ImageProps;
  currentIndex: number;
  onSetCurrentIndex: () => void;
}

export function SwipeContainer({
  currentImage,
  currentIndex,
  onSetCurrentIndex,
}: CardContainerProps) {
  const { imageList, removeFromImageList, likeImage } = useStore();

  const currentIndexRef = useRef<number>(currentIndex);
  const childRef = useRef<SwipeAPI | null>(null);

  const swiped = (direction: Direction) => {
    if (direction === "right" && currentIndex < imageList.length) {
      likeImage(imageList[currentIndex]);
    }
    removeFromImageList(imageList[currentIndex].id);
    onSetCurrentIndex();
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

  if (!currentImage) return null;

  return (
    <div className="mx-auto h-2/3">
      <Card className="flex shadow-md shadow-[#BC13FE]/90">
        <>
          <TinderCard
            ref={childRef}
            className="mb-4"
            key={currentImage.id}
            onSwipe={swiped}
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
      </Card>
    </div>
  );
}
