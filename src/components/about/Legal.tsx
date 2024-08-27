// @ts-expect-error konsta typing
import { Block, Link } from "konsta/react";
import { Trans, useTranslation } from "react-i18next";

import { Heading } from "./Heading";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function Paragraph({ text }: { text: any }) {
  return <p className="text-lg md:px-16 md:text-xl">{text}</p>;
}

function Legal() {
  const { t } = useTranslation();

  return (
    <Block
      strong
      inset
      className="flex flex-col flex-wrap gap-4 justify-center content-center text-center mx-auto"
    >
      <Heading level={1} text={t("legal.title")} />

      <Heading level={2} text={t("legal.informationtitle")} />
      <Paragraph text={t("legal.informationtitleparagraph1")} />
      <Paragraph text={t("legal.informationtitleparagraph2")} />
      <Paragraph text={t("legal.informationtitleparagraph3")} />

      <Heading level={2} text={t("legal.representation")} />
      <Paragraph text={t("legal.representationparagraph1")} />

      <Heading level={2} text={t("legal.contact")} />
      <Paragraph
        text={
          <Trans i18nKey="legal.contactparagraph1">
            <p>{t("legal.contactparagraph1")}</p>
            <Link href="mailto:info@digitalwarenkombinat.de">
              info@digitalwarenkombinat.de
            </Link>
          </Trans>
        }
      ></Paragraph>
      <Paragraph text={t("legal.contactparagraph2")} />

      <Paragraph text={t("legal.legalparagraph1")} />
      <Paragraph text={t("legal.legalparagraph2")} />
      <Paragraph text={t("legal.legalparagraph3")} />
      <Paragraph text={t("legal.legalparagraph4")} />
      <Paragraph text={t("legal.legalparagraph5")} />
    </Block>
  );
}

export default Legal;
