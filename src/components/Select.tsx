// @ts-expect-error konsta typing
import { Block } from "konsta/react";
import { useState } from "react";

import { ImageDetails } from "../select/ImageDetails";
import { SwipeContainer } from "../select/SwipeContainer";
import { Title } from "../select/Title";
import useStore from "../store";

function Selection() {
  const { imageList } = useStore();

  const [currentIndex, setCurrentIndex] = useState<number>(0);

  const currentImage = imageList[currentIndex];
  return (
    <Block className="flex flex-col flex-wrap gap-2 lg:gap-8 text-center mx-auto">
      <Title />

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
