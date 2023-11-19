// @ts-ignore
import { Block } from "konsta/react";
import LogoIcon from "/logo_animated.svg";

const Logo = () => {
  return <img src={LogoIcon} alt="Logo GLAMorous Europe" />;
};

function Start() {
  return (
    <Block className="flex flex-col gap-16 container mx-auto justify-center content-evenly">
      <h1 className="neon neonFont">GLAM</h1>
      <Logo />
    </Block>
  );
}

export default Start;
