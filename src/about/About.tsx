// @ts-expect-error konsta typing
import { Block, Link } from "konsta/react";
import { Trans, useTranslation } from "react-i18next";

import { Heading } from "./Heading";

const Section: React.FC<{
  level: 1 | 2;
  title: string;
  paragraphs: string[];
}> = ({ level, title, paragraphs }) => (
  <Block
    strong
    inset
    className="flex flex-col flex-wrap gap-4 md:gap-8 justify-center content-center text-center mx-auto"
  >
    <Heading level={level} text={title} />

    {paragraphs.map((paragraph, index) => (
      <p key={index} className="text-lg md:px-16 md:text-xl">
        {paragraph}
      </p>
    ))}
  </Block>
);

const LinkGroup: React.FC<{
  title: string;
  links: { href: string; text: string }[];
}> = ({ title, links }) => (
  <Block
    strong
    inset
    className="flex flex-col flex-wrap gap-4 justify-center content-center text-center mx-auto"
  >
    <h2 className="text-2xl">{title}</h2>
    {links.map((link, index) => (
      <Link key={index} href={link.href} target="_blank">
        {link.text}
      </Link>
    ))}
  </Block>
);

function About() {
  const { t } = useTranslation();

  return (
    <>
      <Section
        level={1}
        title={t("about.title")}
        paragraphs={[
          t("about.titleparagraph1"),
          t("about.titleparagraph2"),
          t("about.titleparagraph3"),
          t("about.titleparagraph4"),
          t("about.titleparagraph5"),
        ]}
      />

      <Section
        level={2}
        title={t("about.license")}
        paragraphs={[
          t("about.licenseparagraph1"),
          t("about.licenseparagraph2"),
        ]}
      />

      <Block
        strong
        inset
        className="flex flex-col flex-wrap gap-4 justify-center content-center text-center mx-auto"
      >
        <h2 className="text-3xl">{t("about.vision")}</h2>
        <p className="text-lg md:px-16 md:text-xl">
          {t("about.visionparagraph1")}
        </p>
        <p className="text-lg md:px-16 md:text-xl">
          {t("about.visionparagraph2")}
        </p>
        <p className="text-lg md:px-16 md:text-xl">
          <Trans i18nKey="about.visionparagraph3">
            <p>{t("about.visionparagraph3")}</p>
            <Link href={"mailto:info@digitalwarenkombinat.de"}>
              info@digitalwarenkombinat.de
            </Link>
          </Trans>
        </p>
        <p className="text-lg md:px-16 md:text-xl">
          <Trans i18nKey="about.visionparagraph4">
            <p>{t("about.visionparagraph4")}</p>
            <Link
              href={"https://www.instagram.com/digitalwarenkombinat/"}
              target="_blank"
            >
              Instagram
            </Link>
            <Link
              href={"https://www.linkedin.com/company/digitalwarenkombinat"}
              target="_blank"
            >
              LinkedIn
            </Link>
            <Link href={"https://twitter.com/digiwako"} target="_blank">
              X
            </Link>
          </Trans>
        </p>
      </Block>

      <Section
        level={2}
        title={t("about.usage")}
        paragraphs={[t("about.usageparagraph1"), t("about.usageparagraph2")]}
      />

      <LinkGroup
        title={t("about.usagecollage")}
        links={[
          {
            href: "https://www.wikidata.org/wiki/Q79712290",
            text: t("about.usagecollage1"),
          },
          {
            href: "https://www.wikidata.org/wiki/Q56763836",
            text: t("about.usagecollage2"),
          },
          {
            href: "https://www.wikidata.org/wiki/Q4289290",
            text: t("about.usagecollage3"),
          },
          {
            href: "https://www.wikidata.org/wiki/Q20496956",
            text: t("about.usagecollage4"),
          },
          {
            href: "https://www.europeana.eu/item/401/item_4FRF3Y3P73JWEB3C3EQ3MVSGQNJEABL4",
            text: t("about.usagecollage5"),
          },
          {
            href: "https://www.europeana.eu/item/2048429/item_QUMU4MBTZZCJBHK6YXBACA3PKV43JFX5",
            text: t("about.usagecollage6"),
          },
          {
            href: "https://www.europeana.eu/item/90402/RP_F_F15156",
            text: t("about.usagecollage7"),
          },
          {
            href: "https://www.europeana.eu/item/91625/nomu_photo_NMA0031751",
            text: t("about.usagecollage8"),
          },
          {
            href: "https://polona.pl/item-view/5c91b4ce-75e9-41f1-a8cd-5eb409abd482?page=0",
            text: t("about.usagecollage9"),
          },
          {
            href: "https://polona.pl/item-view/1ae2a6d2-946a-444b-a01b-cb579f2847c6?page=0",
            text: t("about.usagecollage10"),
          },
          {
            href: "https://polona.pl/item-view/d26338c2-3997-49ab-988d-e5b754925a50?page=0",
            text: t("about.usagecollage11"),
          },
          {
            href: "https://polona.pl/item-view/3b8154bd-ff84-4b2a-8752-8ca14a8e50a2?page=0",
            text: t("about.usagecollage12"),
          },
        ]}
      />

      <LinkGroup
        title={t("about.usagesticker")}
        links={[
          {
            href: "https://www.wikidata.org/wiki/Q20537703",
            text: t("about.usagesticker1"),
          },
          {
            href: "https://www.wikidata.org/wiki/Q3698180",
            text: t("about.usagesticker2"),
          },
          {
            href: "https://www.wikidata.org/wiki/Q103297971",
            text: t("about.usagesticker3"),
          },
          {
            href: "https://www.wikidata.org/wiki/Q18359104",
            text: t("about.usagesticker4"),
          },
          {
            href: "https://www.wikidata.org/wiki/Q15008032",
            text: t("about.usagesticker5"),
          },
          {
            href: "https://www.wikidata.org/wiki/Q56763848",
            text: t("about.usagesticker6"),
          },
          {
            href: "https://www.wikidata.org/wiki/Q103304534",
            text: t("about.usagesticker7"),
          },
          {
            href: "https://www.wikidata.org/wiki/Q21781576",
            text: t("about.usagesticker8"),
          },
          {
            href: "https://www.wikidata.org/wiki/Q4193020",
            text: t("about.usagesticker9"),
          },
          {
            href: "https://www.wikidata.org/wiki/Q102974237",
            text: t("about.usagesticker10"),
          },
        ]}
      />

      <LinkGroup
        title={t("about.usageframes")}
        links={[
          {
            href: "https://www.wikidata.org/wiki/Q79712290",
            text: t("about.usageframes1"),
          },
          {
            href: "https://www.wikidata.org/wiki/Q51185223",
            text: t("about.usageframes2"),
          },
          {
            href: "https://www.wikidata.org/wiki/Q51184973",
            text: t("about.usageframes3"),
          },
          {
            href: "https://www.kisscc0.com/clipart/picture-frames-line-angle-arvindeco-frame-2-sbi2yk/",
            text: t("about.usageframes4"),
          },
          {
            href: "https://www.kisscc0.com/clipart/computer-icons-picture-frames-line-art-calligraphy-dml9j1/",
            text: t("about.usageframes5"),
          },
          {
            href: "https://www.kisscc0.com/clipart/picture-frames-computer-icons-square-drawing-docum-em07vq/",
            text: t("about.usageframes6"),
          },
        ]}
      />

      <LinkGroup
        title={t("about.usagefonts")}
        links={[
          {
            href: "https://www.1001fonts.com/average-sans-font.html",
            text: t("about.usagefonts1"),
          },
          {
            href: "https://www.1001fonts.com/beautyschooldropout-font.html",
            text: t("about.usagefonts2"),
          },
          {
            href: "https://www.1001fonts.com/neucha-font.html",
            text: t("about.usagefonts3"),
          },
        ]}
      />
    </>
  );
}

export default About;
