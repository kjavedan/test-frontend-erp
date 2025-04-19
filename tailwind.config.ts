import flowbite from "flowbite-react/tailwind";
import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    flowbite.content(),
  ],
  theme: {
    extend: {
      colors: {
        ghred: {
          50: "#FFF2F2",
          100: "#FFE8E8",
          200: "#FF7777",
          300: "#FF4242",
          400: "#E82B2B",
          500: "#EB151C",
          600: "#C01313",
          700: "#B60606",
          800: "#8F0303",
          900: "#6F1212",
          950: "#570C0C",
        },
        primary: {
          50: "var(--color-primary-50)",
          100: "var(--color-primary-100)",
          200: "var(--color-primary-200)",
          300: "var(--color-primary-300)",
          400: "var(--color-primary-400)",
          500: "var(--color-primary-500)",
          600: "var(--color-primary-600)",
          700: "var(--color-primary-700)",
          800: "var(--color-primary-800)",
          900: "var(--color-primary-900)",
        },
      },
    },
  },
  plugins: [flowbite.plugin()],
};
export default config;
