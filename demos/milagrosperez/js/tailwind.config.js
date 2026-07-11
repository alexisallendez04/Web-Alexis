tailwind.config = {
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#CA9291",
          dark: "#B97E7D",
          light: "rgba(202,146,145,0.1)",
        },
        rose: { light: "#E7C5C4" },
        beige: "#EFE5E2",
        warm: "#FEFDF9",
        cream: "#F7F2EF",
        ink: "#2F3136",
        muted: "#6E6E73",
        border: "#E7DFDA",
        whatsapp: { DEFAULT: "#25D366", hover: "#1FB855" },
      },
      fontFamily: {
        hero: ['"DM Serif Display"', "Georgia", "serif"],
        display: ['"Cormorant Garamond"', "Georgia", "serif"],
        body: ["Inter", "system-ui", "sans-serif"],
      },
      maxWidth: {
        content: "1140px",
      },
      borderRadius: {
        boutique: "18px",
      },
      boxShadow: {
        soft: "0 8px 28px rgba(47,49,54,0.06)",
        card: "0 1px 3px rgba(47,49,54,0.04)",
        accent: "0 6px 20px rgba(202,146,145,0.18)",
      },
    },
  },
};
