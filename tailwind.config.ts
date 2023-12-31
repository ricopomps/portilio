import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
  },
  plugins: [require("daisyui")],
  daisyui: {
    themes: [
      {
        light: {
          primary: "#f4aa3a",
          secondary: "#f4f4a1",
          accent: "#1be885",
          neutral: "#272136",
          "base-100": "#ffffff",
          info: "#778ad4",
          success: "#23b893",
          warning: "#f79926",
          error: "#ea535a",
          body: {
            "background-color": "#e3e6e6",
          },
        },
      },
      {
        dark: {
          primary: "#e3a421",
          secondary: "#1f1f35",
          accent: "#66d07d",
          neutral: "#ffffff",
          "base-100": "#1e1e1e",
          info: "#5267b1",
          success: "#0f8f4f",
          warning: "#f57c00",
          error: "#9e3d46",
          body: {
            "background-color": "#1a1a1a",
          },
        },
      },
      //   "dark",
    ],
  },
};
export default config;
