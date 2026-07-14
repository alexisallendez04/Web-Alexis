tailwind.config = {
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#BE7574",
          dark: "#A45C5B",
          light: "rgba(190,117,116,0.14)",
        },
        rose: { light: "#E3B3B2" },
        beige: "#EFE0DC",
        warm: "#FEFDF9",
        cream: "#F4EBE7",
        ink: "#2F3136",
        muted: "#5F5F64",
        border: "#E3D6D0",
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
        soft: "0 8px 28px rgba(47,49,54,0.08)",
        card: "0 1px 3px rgba(47,49,54,0.05)",
        accent: "0 8px 24px rgba(190,117,116,0.28)",
      },
    },
  },
};
