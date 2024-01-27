// @ts-expect-error konsta typing
import { Block, Button, Navbar, Page, Popup } from "konsta/react";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

import useStore from "../store";
import CollageIcon from "/collage.webp";
import LogoIcon from "/logo_animated.svg";

const Logo = () => {
  return (
    <img src={LogoIcon} alt="Logo GLAMorous Europe" className="w-96 m-auto" />
  );
};

const Collage = () => {
  return (
    <img
      src={CollageIcon}
      alt="Collage GLAMorous Europe"
      className="w-96 m-auto"
      decoding="async"
    />
  );
};

function Start() {
  const { t } = useTranslation();
  const { imageLikeList } = useStore();
  const [discardModalOpen, setDiscardModalOpen] = useState(false);

  const handleStartButtonClick = () => {
    const isDataAvailable = imageLikeList.length > 0;

    if (isDataAvailable) {
      setDiscardModalOpen(true);
    } else {
      window.location.href = "/selection";
    }
  };

  const handleDiscard = () => {
    setDiscardModalOpen(false);
  };

  return (
    <Block
      size="w-screen h-4/5"
      className="flex flex-col flex-wrap my-0 gap-4 container mx-auto justify-center content-center text-center"
    >
      <Logo />
      <h1 className="text-2xl">{t("startTitle")}</h1>
      <h2 className="text-xl">{t("startSubtitle")}</h2>
      <Collage />
      <p className="text-xl">{t("startText")}</p>

      <Button
        className="p-4 text-xl text-black"
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
            <Navbar
              title={t("discardModalTitle")}
              right={
                <Link to={"/selection"} onClick={handleDiscard}>
                  {t("discardModalCancel")}
                </Link>
              }
            />
            <Block className="space-y-4">
              <p>{t("discardModalMessage")}</p>
              <Button
                className="p-4 rounded-full text-xl bg-red-500 text-white"
                onClick={handleDiscard}
              >
                {t("discardModalConfirm")}
              </Button>
            </Block>
          </Page>
        </Popup>
      )}
    </Block>
  );
}

export default Start;
