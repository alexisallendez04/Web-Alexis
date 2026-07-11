tailwind.config = {
  theme: {
    extend: {
      colors: {
        primary: { DEFAULT: "#0F3460", dark: "#0A2548", light: "rgba(15,52,96,0.08)" },
        secondary: { DEFAULT: "#C9A24B", light: "#D4B366" },
        accent: { DEFAULT: "#C9A24B", hover: "#B8923F", muted: "rgba(201,162,75,0.15)" },
        cta: { DEFAULT: "#1F8A70", hover: "#1A7560" },
        cream: "#FAFAFA",
        ink: "#2f2f2f",
        muted: "#6b7280",
        border: "#e5e7eb",
      },
      fontFamily: {
        display: ['"Fraunces"', "Georgia", "serif"],
        body: ["Inter", "system-ui", "sans-serif"],
      },
      boxShadow: {
        soft: "0 8px 28px rgba(15,52,96,0.08)",
        card: "0 1px 3px rgba(47,47,47,0.06)",
      },
    },
  },
};
