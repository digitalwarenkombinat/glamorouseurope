// @ts-expect-error konsta typing
import { Block } from "konsta/react";

import CollageIcon from "/collage.webp";
import LogoIcon from "/logo_animated.svg";

const Logo = () => {
  return <img src={LogoIcon} alt="Logo GLAMorous Europe" className="w-160" />;
};

const Collage = () => {
  return (
    <img
      src={CollageIcon}
      alt="Collage GLAMorous Europe"
      className="w-160"
      decoding="async"
    />
  );
};

function Start() {
  return (
    <Block className="flex flex-col flex-wrap my-0 gap-4 container mx-auto justify-center content-center">
      <Logo />
      <Collage />
    </Block>
  );
}

export default Start;
