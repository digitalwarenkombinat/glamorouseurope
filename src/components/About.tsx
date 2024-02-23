// @ts-expect-error konsta typing
import { Block, Link } from "konsta/react";
import { Trans, useTranslation } from "react-i18next";

function About() {
  const { t } = useTranslation();

  return (
    <>
      <Block
        strong
        inset
        className="flex flex-col flex-wrap gap-4 justify-center content-center text-center mx-auto"
      >
        <h1 className="text-5xl">{t("about.title")}</h1>
        <p className="text-xl">{t("about.titleparagraph1")}</p>
        <p className="text-xl">{t("about.titleparagraph2")}</p>
        <p className="text-xl">{t("about.titleparagraph3")}</p>
        <p className="text-xl">{t("about.titleparagraph4")}</p>
        <p className="text-xl">{t("about.titleparagraph5")}</p>
      </Block>
      <Block
        strong
        inset
        className="flex flex-col flex-wrap gap-4 justify-center content-center text-center mx-auto"
      >
        <h2 className="text-3xl">{t("about.license")}</h2>
        <p className="text-xl">{t("about.licenseparagraph1")}</p>
        <p className="text-xl">{t("about.licenseparagraph2")}</p>
      </Block>
      <Block
        strong
        inset
        className="flex flex-col flex-wrap gap-4 justify-center content-center text-center mx-auto"
      >
        <h2 className="text-3xl">{t("about.vision")}</h2>
        <p className="text-xl">{t("about.visionparagraph1")}</p>
        <p className="text-xl">{t("about.visionparagraph2")}</p>
        <p className="text-xl">
          <Trans i18nKey="about.visionparagraph3">
            <p>{t("about.visionparagraph3")}</p>
            <Link href={"mailto:info@digitalwarenkombinat.de"}>
              info@digitalwarenkombinat.de
            </Link>
          </Trans>
        </p>
        <p className="text-xl">
          <Trans i18nKey="about.visionparagraph4">
            <p>{t("about.visionparagraph4")}</p>
            <Link
              href={"https://www.instagram.com/digitalwarenkombinat/"}
              target="_blank"
            >
              Instagram
            </Link>
            <Link
              href={"https://www.instagram.com/digitalwarenkombinat/"}
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
      <Block
        strong
        inset
        className="flex flex-col flex-wrap gap-4 justify-center content-center text-center mx-auto"
      >
        <h2 className="text-3xl">{t("about.usage")}</h2>
        <p className="text-xl">{t("about.usageparagraph1")}</p>
        <p className="text-xl">{t("about.usageparagraph2")}</p>
        <h2 className="text-2xl">{t("about.usagecollage")}</h2>
        <Link href={"https://www.wikidata.org/wiki/Q79712290"} target="_blank">{t("about.usagecollage1")}</Link>
        <Link href={"https://www.wikidata.org/wiki/Q56763836"} target="_blank">{t("about.usagecollage2")}</Link>
        <Link href={"https://www.wikidata.org/wiki/Q4289290"} target="_blank">{t("about.usagecollage3")}</Link>
        <Link href={"https://www.wikidata.org/wiki/Q20496956"} target="_blank">{t("about.usagecollage4")}</Link>
        <Link href={"https://www.europeana.eu/item/401/item_4FRF3Y3P73JWEB3C3EQ3MVSGQNJEABL4"} target="_blank">{t("about.usagecollage5")}</Link>
        <Link href={"https://www.europeana.eu/item/2048429/item_QUMU4MBTZZCJBHK6YXBACA3PKV43JFX5"} target="_blank">{t("about.usagecollage6")}</Link>
        <Link href={"https://www.europeana.eu/item/90402/RP_F_F15156"} target="_blank">{t("about.usagecollage7")}</Link>
        <Link href={"https://www.europeana.eu/item/91625/nomu_photo_NMA0031751"} target="_blank">{t("about.usagecollage8")}</Link>
        <Link href={"https://polona.pl/item-view/5c91b4ce-75e9-41f1-a8cd-5eb409abd482?page=0"} target="_blank">{t("about.usagecollage9")}</Link>
        <Link href={"https://polona.pl/item-view/1ae2a6d2-946a-444b-a01b-cb579f2847c6?page=0"} target="_blank">{t("about.usagecollage10")}</Link>
        <Link href={"https://polona.pl/item-view/d26338c2-3997-49ab-988d-e5b754925a50?page=0"} target="_blank">{t("about.usagecollage11")}</Link>
        <Link href={"https://polona.pl/item-view/3b8154bd-ff84-4b2a-8752-8ca14a8e50a2?page=0"} target="_blank">{t("about.usagecollage12")}</Link>
        <h2 className="text-2xl">{t("about.usagesticker")}</h2>
        <Link href={"https://www.wikidata.org/wiki/Q20537703"} target="_blank">{t("about.usagesticker1")}</Link>
        <Link href={"https://www.wikidata.org/wiki/Q3698180"} target="_blank">{t("about.usagesticker2")}</Link>
        <Link href={"https://www.wikidata.org/wiki/Q103297971"} target="_blank">{t("about.usagesticker3")}</Link>
        <Link href={"https://www.wikidata.org/wiki/Q18359104"} target="_blank">{t("about.usagesticker4")}</Link>
        <Link href={"https://www.wikidata.org/wiki/Q15008032"} target="_blank">{t("about.usagesticker5")}</Link>
        <Link href={"https://www.wikidata.org/wiki/Q56763848"} target="_blank">{t("about.usagesticker6")}</Link>
        <Link href={"https://www.wikidata.org/wiki/Q103304534"} target="_blank">{t("about.usagesticker7")}</Link>
        <Link href={"https://www.wikidata.org/wiki/Q21781576"} target="_blank">{t("about.usagesticker8")}</Link>
        <Link href={"https://www.wikidata.org/wiki/Q4193020"} target="_blank">{t("about.usagesticker9")}</Link>
        <Link href={"https://www.wikidata.org/wiki/Q102974237"} target="_blank">{t("about.usagesticker10")}</Link>
        <h2 className="text-2xl">{t("about.usageframes")}</h2>
        <Link href={"https://www.wikidata.org/wiki/Q79712290"} target="_blank">{t("about.usageframes1")}</Link>
        <Link href={"https://www.wikidata.org/wiki/Q51185223"} target="_blank">{t("about.usageframes2")}</Link>
        <Link href={"https://www.wikidata.org/wiki/Q51184973"} target="_blank">{t("about.usageframes3")}</Link>
        <Link href={"https://www.kisscc0.com/clipart/picture-frames-line-angle-arvindeco-frame-2-sbi2yk/"} target="_blank">{t("about.usageframes4")}</Link>
        <Link href={"https://www.kisscc0.com/clipart/computer-icons-picture-frames-line-art-calligraphy-dml9j1/"} target="_blank">{t("about.usageframes5")}</Link>
        <Link href={"https://www.kisscc0.com/clipart/picture-frames-computer-icons-square-drawing-docum-em07vq/"} target="_blank">{t("about.usageframes6")}</Link>
        <h2 className="text-2xl">{t("about.usagefonts")}</h2>
        <Link href={"https://www.1001fonts.com/average-sans-font.html"} target="_blank">{t("about.usagefonts1")}</Link>
        <Link href={"https://www.1001fonts.com/beautyschooldropout-font.html"} target="_blank">{t("about.usagefonts2")}</Link>
        <Link href={"https://www.1001fonts.com/neucha-font.html"} target="_blank">{t("about.usagefonts3")}</Link>
      </Block>
    </>
  );
}

export default About;
