import { useTranslation } from "react-i18next";

export function Title({ text }: { text: string }) {
  const { t } = useTranslation();
  return (
    <h1 className="text-lg leading-6 px-8 md:px-24 md:text-xl lg:px-48">
      {t(text)}
    </h1>
  );
}
