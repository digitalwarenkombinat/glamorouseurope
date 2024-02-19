// @ts-expect-error konsta typing
import { Block, Button } from "konsta/react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

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
      <div className="p-2 m-4">
        <h1 className="text-2xl">{t("artworkTitle")}</h1>
      </div>

      <Block
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

      {artworkList.length === 0 ? (
        <Button
          className="p-4 text-xl text-black w-2/3 mx-auto h-20"
          rounded
          inline
        >
          <Link to={"/selection"}>{t("artworkEmpty")}</Link>
        </Button>
      ) : (
        <ArtworkCanvas />
      )}
    </Block>
  );
}

export default Artwork;
