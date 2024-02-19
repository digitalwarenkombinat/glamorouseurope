import { XMarkIcon } from "@heroicons/react/24/outline";
// @ts-expect-error konsta typing
import { Block, Navbar, Page, Panel } from "konsta/react";
import { SetStateAction } from "react";
import { useTranslation } from "react-i18next";

export default function Sidebar(
  panelOpened: boolean,
  setPanelOpened: (value: SetStateAction<boolean>) => void,
) {
  const { t } = useTranslation();
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
          <p>{t("sidebarAbout")}</p>
          <p>{t("sidebarLegal")}</p>
        </Block>
      </Page>
    </Panel>
  );
}
