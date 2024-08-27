// @ts-expect-error konsta typing
import { Block } from "konsta/react";
import { useState } from "react";

import { ImageDetails } from "../selection/ImageDetails";
import { SwipeContainer } from "../selection/SwipeContainer";
import useStore from "../store";
import { Title } from "./Title";

function Selection() {
  const { imageList } = useStore();

  const [currentIndex, setCurrentIndex] = useState<number>(0);

  const currentImage = imageList[currentIndex];
  return (
    <Block className="flex flex-col flex-wrap gap-2 lg:gap-8 text-center mx-auto">
      <Title text={"selectionTitle"} />

      <SwipeContainer
        currentImage={currentImage}
        currentIndex={currentIndex}
        onSetCurrentIndex={() => setCurrentIndex((prevIndex) => prevIndex + 1)}
      />

      <ImageDetails currentImage={currentImage} />
    </Block>
  );
}

export default Selection;
