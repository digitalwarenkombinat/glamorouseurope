import i18next from "i18next";
import React from "react";
import { DndProvider } from "react-dnd";
import { TouchBackend } from "react-dnd-touch-backend";
import { createRoot } from "react-dom/client";
import { I18nextProvider } from "react-i18next";
import { BrowserRouter } from "react-router-dom";

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

const options = {
  scrollAngleRanges: [{ start: 300 }, { end: 60 }, { start: 120, end: 240 }],
  ignoreContextMenu: true,
};

createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <I18nextProvider i18n={i18next}>
      <DndProvider backend={TouchBackend} options={options}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </DndProvider>
    </I18nextProvider>
  </React.StrictMode>,
);
