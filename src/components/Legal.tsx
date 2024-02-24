// @ts-expect-error konsta typing
import { Block, Link } from "konsta/react";
import { Trans, useTranslation } from "react-i18next";

function Legal() {
  const { t } = useTranslation();

  return (
    <>
      <Block
        strong
        inset
        className="flex flex-col flex-wrap gap-4 justify-center content-center text-center mx-auto"
      >
        <h1 className="text-5xl mb-8">{t("legal.title")}</h1>
        <h2 className="text-3xl">{t("legal.informationtitle")}</h2>
        <p className="text-lg md:px-16 md:text-xl">
          {t("legal.informationtitleparagraph1")}
        </p>
        <p className="text-lg md:px-16 md:text-xl">
          {t("legal.informationtitleparagraph2")}
        </p>
        <p className="text-lg md:px-16 md:text-xl">
          {t("legal.informationtitleparagraph3")}
        </p>

        <h2 className="text-3xl">{t("legal.representation")}</h2>
        <p className="text-lg md:px-16 md:text-xl">
          {t("legal.representationparagraph1")}
        </p>

        <h2 className="text-3xl">{t("legal.contact")}</h2>
        <p className="text-lg md:px-16 md:text-xl">
          <Trans i18nKey="legal.contactparagraph1">
            <p>{t("legal.contactparagraph1")}</p>
            <Link href={"mailto:info@digitalwarenkombinat.de"}>
              info@digitalwarenkombinat.de
            </Link>
          </Trans>
        </p>
        <p className="text-lg md:px-16 md:text-xl">
          {t("legal.contactparagraph2")}
        </p>

        <p className="text-lg md:px-16 md:text-xl">
          {t("legal.legalparagraph1")}
        </p>
        <p className="text-lg md:px-16 md:text-xl">
          {t("legal.legalparagraph2")}
        </p>
        <p className="text-lg md:px-16 md:text-xl">
          {t("legal.legalparagraph3")}
        </p>
        <p className="text-lg md:px-16 md:text-xl">
          {t("legal.legalparagraph4")}
        </p>
        <p className="text-lg md:px-16 md:text-xl">
          {t("legal.legalparagraph5")}
        </p>
      </Block>
    </>
  );
}

export default Legal;
