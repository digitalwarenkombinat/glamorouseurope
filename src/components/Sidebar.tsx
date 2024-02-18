// @ts-expect-error konsta typing
import { Block, Link, Navbar, Page, Panel } from "konsta/react";
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
          title={t("start")}
          right={
            <Link navbar onClick={() => setPanelOpened(false)}>
              {t("start")}
            </Link>
          }
        />
        <Block className="space-y-4">
          <p>{t("start")}</p>
          <p>{t("start")}</p>
        </Block>
      </Page>
    </Panel>
  );
}
