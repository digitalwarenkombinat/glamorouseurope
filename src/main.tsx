import i18next from "i18next";
import React from "react";
import { HTML5Backend } from "react-dnd-html5-backend";
import {
  DndProvider,
  MouseTransition,
  TouchTransition,
} from "react-dnd-multi-backend";
import { TouchBackend } from "react-dnd-touch-backend";
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

const HTML5toTouch = {
  backends: [
    {
      id: "html5",
      backend: HTML5Backend,
      transition: MouseTransition,
    },
    {
      id: "touch",
      backend: TouchBackend,
      options: {
        delay: 50,
        ignoreContextMenu: true,
        scrollAngleRanges: [
          { start: 300 },
          { end: 60 },
          { start: 120, end: 240 },
        ],
      },
      preview: true,
      transition: TouchTransition,
    },
  ],
};

createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <I18nextProvider i18n={i18next}>
      <DndProvider options={HTML5toTouch}>
        <App />
      </DndProvider>
    </I18nextProvider>
  </React.StrictMode>,
);
