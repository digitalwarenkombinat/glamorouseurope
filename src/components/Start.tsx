// @ts-expect-error konsta typing
import { Block, Button } from "konsta/react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

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
  const { t } = useTranslation();
  return (
    <Block className="flex flex-col flex-wrap my-0 gap-4 container mx-auto justify-center content-center text-center">
      <Logo />
      <h1 className="text-2xl">{t("startTitle")}</h1>
      <h2 className="text-xl">{t("startSubtitle")}</h2>
      <Collage />
      <p className="text-xl">{t("startText")}</p>
      <Button className="p-2 rounded-full text-xl" rounded inline outline>
        <Link to={"/selection"}>{t("startButtonText")}</Link>
      </Button>
    </Block>
  );
}

export default Start;
