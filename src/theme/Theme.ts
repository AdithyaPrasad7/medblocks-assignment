import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    background: {
      default: "#2D1B49",
    },
  },
  typography: {
    fontFamily: ["GT Walsheim", "Arial", "sans-serif"].join(","),
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          backgroundColor: "#0C7181",
          color: "#fff",
          "&:hover": {
            backgroundColor: "#084f5a",
          },
        },
      },
    },
  },
});

export default theme;
