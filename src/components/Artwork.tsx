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
      className="flex flex-col flex-wrap gap-4 container justify-center content-center text-center mx-auto"
    >
      <div className="p-2">
        <h1 className="text-xl">{t("artworkTitle")}</h1>
      </div>

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
