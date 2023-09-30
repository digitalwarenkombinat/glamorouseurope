import konstaConfig from "konsta/config";

export default konstaConfig({
  konsta: {
    colors: {
      primary: "#BC13FE",
      "brand-secondary": "#69C0B0",
      "brand-tertiary": "#EDECEA",
      "brand-background": "#010A01",
      "brand-text": "#FFF",
    },
  },
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
});
