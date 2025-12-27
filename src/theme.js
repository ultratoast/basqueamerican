import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    mode: "light", // force light palette
    background: {
      default: "#ffffff",
      paper: "#ffffff",
    },
    text: {
      primary: "#000000",
      secondary: "#222222",
    },
  },
  typography: {
    // Large, readable defaults (mobile-first)
    fontFamily:
      'system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial, "Apple Color Emoji", "Segoe UI Emoji"',
    fontSize: 18, // bumps base size up for cooking-distance reading
    h1: { fontSize: "2.0rem", fontWeight: 700, lineHeight: 1.15 },
    h2: { fontSize: "1.75rem", fontWeight: 700, lineHeight: 1.2 },
    h3: { fontSize: "1.5rem", fontWeight: 700, lineHeight: 1.2 },
    h4: { fontSize: "1.25rem", fontWeight: 700, lineHeight: 1.25 },
    h5: { fontSize: "1.1rem", fontWeight: 700, lineHeight: 1.25 },
    h6: { marginRight: "0.5rem" },
    body1: { fontSize: "1.05rem", lineHeight: 1.6 },
    body2: { fontSize: "1.0rem", lineHeight: 1.6 },
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        // Force a readable, full-page layout and override dark-mode preferences
        html: {
          minHeight: "100%",
          backgroundColor: "#ffffff",
          color: "#000000",
          WebkitTextSizeAdjust: "100%",
        },
        body: {
          minHeight: "100%",
          margin: 0,
          backgroundColor: "#ffffff",
          color: "#000000",
          textAlign: "left",
        },
        "#root": {
          minHeight: "100%",
          backgroundColor: "#ffffff",
          color: "#000000",
          display: "flex",
          flexDirection: "column",
          alignItems: "stretch",
          justifyContent: "center", // top
          width: "100%",
        },

        // Defeat system dark mode + ensure form controls stay legible
        ":root": {
          colorScheme: "light",
        },

        // Make taps easier while cooking
        // lmfao
        // a: { color: "#000000" },
        a: { border: "none !important" }
      },
    },

    // App bar should not feel heavy; keep it readable
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: "#ffffff",
          color: "#000000",
          borderBottom: "1px solid #e5e5e5",
        },
      },
      defaultProps: {
        elevation: 0,
      },
    },

    // Bigger, comfy touch targets
    MuiButton: {
      styleOverrides: {
        root: {
          // chagpt doesnt get accessibility
          // textTransform: "none",
          borderRadius: 14,
          paddingTop: 10,
          paddingBottom: 10,
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          borderRadius: 999,
          fontSize: "0.95rem",
          height: 32,
        },
      },
    },

    // More padding = easier scanning on mobile
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 18,
        },
      },
    },
    MuiCardContent: {
      styleOverrides: {
        root: {
          padding: 18,
        },
      },
    },

    // Larger text fields for quick search
    MuiTextField: {
      defaultProps: {
        fullWidth: true,
      },
    },
    MuiInputBase: {
      styleOverrides: {
        root: {
          fontSize: "1.05rem",
        },
      },
    },

    // Lists: comfortable line height
    MuiListItemText: {
      styleOverrides: {
        primary: {
          fontSize: "1.05rem",
          lineHeight: 1.5,
        },
        secondary: {
          fontSize: "0.95rem",
          color: "#222222",
        },
      },
    },

    // Container: keep it full-page but not cramped
    MuiContainer: {
      styleOverrides: {
        root: {
          paddingLeft: 16,
          paddingRight: 16,
        },
      },
      defaultProps: {
        maxWidth: "md",
      },
    },
  },
});

export default theme;
