// @ts-expect-error konsta typing
import { Block } from "konsta/react";

import { ImageProps } from "../store";

function ThumbnailSlider({
  imageList,
  handleImageClick,
}: {
  imageList: ImageProps[];
  handleImageClick: (image: ImageProps) => void;
}) {
  return (
    <Block
      className="flex overflow-x-auto"
      style={{
        maxHeight: "200px",
        scrollSnapType: "x mandatory",
        scrollBehavior: "smooth",
        WebkitOverflowScrolling: "touch",
      }}
    >
      {imageList.map((item) => (
        <img
          key={item.id}
          src={item.thumbnail}
          alt={item.name}
          onClick={() => handleImageClick(item)}
          style={{
            cursor: "pointer",
            marginRight: "10px",
            scrollSnapAlign: "start",
          }}
          role="presentation"
        />
      ))}
    </Block>
  );
}

export default ThumbnailSlider;
