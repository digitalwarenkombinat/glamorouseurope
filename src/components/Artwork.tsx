// @ts-expect-error konsta typing
import { Block } from "konsta/react";
import { useTranslation } from "react-i18next";

import useStore from "../store";
import ArtworkCanvas from "./ArtworkCanvas";
import ArtworkThumbnail from "./ArtworkThumbnail";

function Artwork() {
  const { t } = useTranslation();
  const { artworkList } = useStore();

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
        className="flex mx-auto overflow-x-auto"
        style={{
          maxHeight: "100px",
          scrollSnapType: "x mandatory",
          scrollBehavior: "smooth",
          WebkitOverflowScrolling: "touch",
        }}
      >
        {artworkList.map((artworkImage, index) => (
          <ArtworkThumbnail key={artworkImage.id + index} {...artworkImage} />
        ))}
      </Block>

      <ArtworkCanvas />
    </Block>
  );
}

export default Artwork;
