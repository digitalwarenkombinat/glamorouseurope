import konstaConfig from "konsta/config";

export default konstaConfig({
  konsta: {
    colors: {
      primary: "#BC13FE",
      "brand-secondary": "#69C0B0",
      "brand-tertiary": "#EDECEA",
      "brand-background": "#2B2829",
      "brand-text": "#FFF",
    },
    fontFamily: {
      ios: "Dante",
      material: "Dante",
    },
  },
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  darkMode: "class",
});
