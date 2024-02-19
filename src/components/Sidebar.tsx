import { XMarkIcon } from "@heroicons/react/24/outline";
// @ts-expect-error konsta typing
import { Block, Button, Link, Navbar, Page, Panel } from "konsta/react";
import { SetStateAction } from "react";
import { useTranslation } from "react-i18next";

import LogoBMBFIconDE from "/logos/bmbf_logo_de.jpg";
import LogoBMBFIconEN from "/logos/bmbf_logo_en.jpg";
import LogoDigitalwarenkombinatIcon from "/logos/digitalwarenkombinat.png";
import LogoPrototypeFundIcon from "/logos/prototype_fund_logo.png";

const LogoPrototypeFund = () => {
  return (
    <Link href={"https://prototypefund.de/"} target="_blank">
      <img
        src={LogoPrototypeFundIcon}
        alt="Logo Protype Fund"
        className="w-64 m-auto"
      />
    </Link>
  );
};

const LogoBMBF = () => {
  const { i18n } = useTranslation();
  return (
    <Link href={"https://www.bmbf.de/"} target="_blank">
      <img
        src={i18n.resolvedLanguage === "en" ? LogoBMBFIconEN : LogoBMBFIconDE}
        alt="Logo Bundesministerium für Bildung und Forschung"
        className="w-64 m-auto"
      />
    </Link>
  );
};

const LogoDigitalwarenkombinat = () => {
  return (
    <Link href={"https://digitalwarenkombinat.de/"} target="_blank">
      <img
        src={LogoDigitalwarenkombinatIcon}
        alt="Logo Digitalwarenkombinat"
        className="w-64 m-auto"
      />
    </Link>
  );
};

export default function Sidebar(
  panelOpened: boolean,
  setPanelOpened: (value: SetStateAction<boolean>) => void,
) {
  const { t, i18n } = useTranslation();
  return (
    <Panel
      side="right"
      opened={panelOpened}
      onBackdropClick={() => setPanelOpened(false)}
    >
      <Page>
        <Navbar
          right={
            <XMarkIcon
              onClick={() => setPanelOpened(false)}
              className="mr-4 w-10 h-10"
            />
          }
        />
        <Block className="space-y-4">
          <p className="text-xl">{t("sidebarChooseLanguage")}</p>
          <Button
            onClick={() => i18n.changeLanguage("de")}
            className="p-4 text-xl text-black w-10 mr-2 h-10"
            rounded
            inline
          >
            DE
          </Button>
          <Button
            onClick={() => i18n.changeLanguage("en")}
            className="p-4 text-xl text-black w-10 h-10"
            rounded
            inline
          >
            EN
          </Button>
          <p>{t("sidebarAbout")}</p>
          <p>{t("sidebarLegal")}</p>
          <LogoPrototypeFund />
          <LogoBMBF />
          <LogoDigitalwarenkombinat />
        </Block>
      </Page>
    </Panel>
  );
}
