// @ts-expect-error konsta typing
import { Block, Button } from "konsta/react";

import CollageIcon from "/collage.webp";
import LogoIcon from "/logo_animated.svg";

const Logo = () => {
  return (
    <img src={LogoIcon} alt="Logo GLAMorous Europe" className="w-160 m-auto" />
  );
};

const Collage = () => {
  return (
    <img
      src={CollageIcon}
      alt="Collage GLAMorous Europe"
      className="w-160 m-auto"
      decoding="async"
    />
  );
};

function Start() {
  return (
    <Block className="flex flex-col flex-wrap my-0 gap-4 container mx-auto justify-center content-center text-center">
      <Logo />
      <h1 className="text-2xl">
        Herzlich willkommen in der schillernden Welt von GLAMorous Europe!
      </h1>
      <h2 className="text-xl">
        Entdecke hier die schönsten Sammlungsobjekte aus Museen, Galerien,
        Bibliotheken und Archiven verschiedener Länder Europas.
      </h2>
      <Collage />
      <p className="text-xl">
        Lass dich von der künstlerischen Vielfalt Europas inspirieren!
      </p>
      <Button className="p-2 rounded-full text-xl" rounded inline outline>
        Los geht's!
      </Button>
    </Block>
  );
}

export default Start;
