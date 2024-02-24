import i18next from "i18next";
import React from "react";
import { createRoot } from "react-dom/client";
import { I18nextProvider } from "react-i18next";

import App from "./components/App.tsx";
import "./index.css";
import de from "./locales/de.json";
import en from "./locales/en.json";

i18next.init({
  interpolation: { escapeValue: false },
  lng: "auto",
  fallbackLng: "de",
  resources: {
    de: { ...de },
    en: { ...en },
  },
});

createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <I18nextProvider i18n={i18next}>
      <App />
    </I18nextProvider>
  </React.StrictMode>,
);
