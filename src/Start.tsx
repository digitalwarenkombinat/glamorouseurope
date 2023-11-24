// @ts-ignore
import { Block } from "konsta/react";
import LogoIcon from "/logo_animated.svg";
import CollageIcon from "/collage.webp";

const Logo = () => {
  return <img src={LogoIcon} alt="Logo GLAMorous Europe" />;
};

const Collage = () => {
  return <img src={CollageIcon} alt="Collage GLAMorous Europe" />;
};

function Start() {
  return (
    <Block className="flex flex-col my-0 gap-4 container mx-auto justify-center content-evenly">
      <Logo />
      <Collage />
    </Block>
  );
}

export default Start;
