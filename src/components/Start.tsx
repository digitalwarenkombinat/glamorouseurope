// @ts-expect-error konsta typing
import { Block, Button, Navbar, Page, Popup } from "konsta/react";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Link, useNavigate } from "react-router-dom";

import useStore from "../store";
import CollageIcon from "/collage.webp";
import LogoIcon from "/logo_animated.svg";

const Logo = () => {
  return (
    <img
      src={LogoIcon}
      alt="Logo GLAMorous Europe"
      className="w-48 md:w-64 lg:w-96 m-auto"
    />
  );
};

const Collage = () => {
  return (
    <img
      src={CollageIcon}
      alt="Collage GLAMorous Europe"
      className="w-64 md:w-80 lg:w-1/2 xl:w-1/3 m-auto"
      decoding="async"
    />
  );
};

function Start() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { imageLikeList, resetState } = useStore();
  const [discardModalOpen, setDiscardModalOpen] = useState(false);

  const handleStartButtonClick = () => {
    const isDataAvailable = imageLikeList.length > 0;

    if (isDataAvailable) {
      setDiscardModalOpen(true);
    } else {
      navigate("/selection");
    }
  };

  const handleDiscard = () => {
    setDiscardModalOpen(false);
  };

  const handleConfirm = () => {
    setDiscardModalOpen(false);
    resetState();
  };

  return (
    <Block
      margin={"mb-16 lg:mb-4"}
      className="flex flex-col gap-4 lg:gap-8 text-center mx-auto"
    >
      <Logo />
      <h1 className="text-lg px-8 md:text-xl">{t("startTitle")}</h1>
      <Collage />
      <p className="text-lg px-8 md:px-24 md:text-xl">{t("startSubtitle")}</p>
      <p className="text-lg px-8 md:px-24 md:text-xl">{t("startText")}</p>

      <Button
        large
        className="text-lg w-1/2 mx-auto h-16 md:text-xl"
        rounded
        inline
        onClick={handleStartButtonClick}
      >
        {t("startButtonText")}
      </Button>

      {discardModalOpen && (
        <Popup
          opened={discardModalOpen}
          onBackdropClick={() => setDiscardModalOpen(false)}
        >
          <Page>
            <Navbar title={t("discardModalTitle")} />
            <Block className="space-y-4">
              <p>{t("discardModalMessage")}</p>
              <Link className="p-4" to={"/selection"} onClick={handleConfirm}>
                <Button className="p-4 rounded-full text-lg">
                  {t("discardModalConfirm")}
                </Button>
              </Link>
              <Link className="p-4" to={"/selection"} onClick={handleDiscard}>
                <Button className="rounded-full text-lg">
                  {t("discardModalNotConfirm")}
                </Button>
              </Link>
            </Block>
          </Page>
        </Popup>
      )}
    </Block>
  );
}

export default Start;
