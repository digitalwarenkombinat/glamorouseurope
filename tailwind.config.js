import konstaConfig from "konsta/config";

export default konstaConfig({
  konsta: {
    colors: {
      primary: "#BC13FE",
      "brand-secondary": "#69C0B0",
      "brand-tertiary": "#EDECEA",
      "brand-background": "#2B2829",
      "brand-text": "#FFF",
      "md-dark-on-primary": "#000",
      "md-dark-primary": "#b990c1",
    },
    fontFamily: {
      ios: "AverageSans-Regular",
      material: "AverageSans-Regular",
    },
  },
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  darkMode: "class",
});
