// @ts-expect-error konsta typing
import { Block, Button, Navbar, Page, Popup } from "konsta/react";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

import useStore from "../store";
import CollageIcon from "/collage.webp";
import LogoIcon from "/logo_animated.svg";

const Logo = () => (
  <img
    src={LogoIcon}
    alt="Logo GLAMorous Europe"
    className="w-48 md:w-64 lg:w-96 mx-auto"
  />
);

const Collage = () => (
  <img
    src={CollageIcon}
    alt="Collage GLAMorous Europe"
    className="w-64 md:w-80 lg:w-1/2 xl:w-1/3 mx-auto"
    decoding="async"
  />
);

interface DiscardConfirmationPopupProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

const DiscardConfirmationPopup: React.FC<DiscardConfirmationPopupProps> = ({
  isOpen,
  onClose,
  onConfirm,
}) => {
  const { t } = useTranslation();

  return (
    <Popup opened={isOpen} onBackdropClick={onClose}>
      <Page>
        <Navbar title={t("discardModalTitle")} />
        <Block className="space-y-4 p-4 text-center">
          <p className="text-lg">{t("discardModalMessage")}</p>
          <div className="flex justify-center gap-4">
            <Button large rounded onClick={onConfirm} className="w-32">
              {t("discardModalConfirm")}
            </Button>
            <Button large rounded onClick={onClose} className="w-32">
              {t("discardModalNotConfirm")}
            </Button>
          </div>
        </Block>
      </Page>
    </Popup>
  );
};

const Start: React.FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { imageLikeList, resetState } = useStore();
  const [isDiscardModalOpen, setIsDiscardModalOpen] = useState(false);

  const handleStart = () => {
    if (imageLikeList.length > 0) {
      setIsDiscardModalOpen(true);
    } else {
      navigate("/selection");
    }
  };

  const handleConfirmDiscard = () => {
    resetState();
    setIsDiscardModalOpen(false);
    navigate("/selection");
  };

  const handleCloseDiscardModal = () => {
    setIsDiscardModalOpen(false);
    navigate("/selection");
  };

  return (
    <>
      <Block className="flex flex-col items-center gap-6 lg:gap-8 text-center mx-auto my-8 px-4">
        <Logo />
        <h1 className="text-xl md:text-2xl font-semibold">{t("startTitle")}</h1>
        <Collage />
        <p className="text-lg md:text-xl max-w-2xl">{t("startSubtitle")}</p>
        <p className="text-lg md:text-xl max-w-2xl">{t("startText")}</p>
        <Button
          large
          rounded
          onClick={handleStart}
          className="w-1/2 h-12 text-lg md:text-xl"
        >
          {t("startButtonText")}
        </Button>
      </Block>

      <DiscardConfirmationPopup
        isOpen={isDiscardModalOpen}
        onClose={handleCloseDiscardModal}
        onConfirm={handleConfirmDiscard}
      />
    </>
  );
};

export default Start;
