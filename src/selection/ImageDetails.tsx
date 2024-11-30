import { useTranslation } from "react-i18next";

import { ImageProps } from "../store";

const transformCreator = (creator: string, unknown: string) => {
  return creator && !creator.includes("http") ? creator : unknown;
};

export function ImageDetails({ currentImage }: { currentImage: ImageProps }) {
  const { t } = useTranslation();

  if (!currentImage) return null;

  return (
    <div className="mb-8 p-4 bg-white rounded h-1/3 opacity-90 max-w-lg w-3/4 text-center mx-auto shadow-md shadow-[#BC13FE]/90">
      <h2 className="text-lg font-bold mb-4 text-black md:text-xl">
        {currentImage?.name}
      </h2>
      <p className="text-gray-600">
        {t("selectionYear")} {currentImage?.year || t("selectionUnknown")}
      </p>
      <p className="text-gray-600">
        {t("selectionCreator")}{" "}
        {transformCreator(currentImage?.creator || "", t("selectionUnknown"))}
      </p>
      <p className="text-gray-600">
        {t("selectionLocation")}{" "}
        {currentImage?.location || t("selectionUnknown")}
      </p>
    </div>
  );
}
