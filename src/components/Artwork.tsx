// @ts-expect-error konsta typing
import { Block } from "konsta/react";
import { useRef } from "react";

import ArtworkCanvas from "../creation/ArtworkCanvas";
import ArtworkList from "../creation/ArtworkList";
import ScrollButton from "../creation/ScrollButton";
import useStore from "../store";
import { Title } from "./Title";

function Artwork() {
  const { artworkList } = useStore();
  const artworkListRef = useRef<HTMLDivElement>(null);

  const handleScroll = (scrollOffset: number) => {
    if (artworkListRef.current) {
      artworkListRef.current.scrollLeft += scrollOffset;
    }
  };

  return (
    <Block className="flex flex-col flex-wrap gap-2 lg:gap-8 justify-center content-center text-center mx-auto">
      <Title text="artworkTitle" />

      <Block margin="my-4" className="flex flex-row mx-0 gap-1 justify-center">
        <ScrollButton direction="left" onClick={() => handleScroll(-100)} />

        <ArtworkList
          artworkListRef={artworkListRef}
          artworkList={artworkList}
        />

        <div className="self-center">
          <ScrollButton direction="right" onClick={() => handleScroll(100)} />
        </div>
      </Block>

      <ArtworkCanvas />
    </Block>
  );
}

export default Artwork;
