import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";
// @ts-expect-error konsta typing
import { Block, Button, Icon } from "konsta/react";
import { useRef } from "react";
import { useTranslation } from "react-i18next";

import useStore from "../store";
import ArtworkCanvas from "./ArtworkCanvas";
import ArtworkThumbnail from "./ArtworkThumbnail";

function Artwork() {
  const { t } = useTranslation();
  const { artworkList } = useStore();
  const artWorkListRef = useRef<HTMLDivElement>(null);

  const handleList = (scrollOffset: number) => {
    if (artWorkListRef.current) {
      artWorkListRef.current.scrollLeft += scrollOffset;
    }
  };

  return (
    <Block
      margin={"my-4"}
      className="flex flex-col flex-wrap gap-2 lg:gap-8 justify-center content-center text-center mx-auto"
    >
      <h1 className="text-lg leading-6 px-8 md:px-24 md:text-xl lg:px-48">
        {t("artworkTitle")}
      </h1>
      <Block
        margin={"my-4"}
        className="flex flex-row mx-0 gap-1 justify-center"
      >
        <div className="self-center">
          <Button rounded inline onClick={() => handleList(-100)}>
            <Icon
              material={<ChevronLeftIcon className="w-4 h-4 lg:w-6 lg:h-6" />}
            />
          </Button>
        </div>
        <div className="overflow-auto whitespace-nowrap" ref={artWorkListRef}>
          {artworkList.map((artworkImage, index) => (
            <ArtworkThumbnail key={artworkImage.id + index} {...artworkImage} />
          ))}
        </div>
        <div className="self-center">
          <Button rounded inline onClick={() => handleList(100)}>
            <Icon
              material={<ChevronRightIcon className="w-4 h-4 lg:w-6 lg:h-6" />}
            />
          </Button>
        </div>
      </Block>

      <ArtworkCanvas />
    </Block>
  );
}

export default Artwork;
