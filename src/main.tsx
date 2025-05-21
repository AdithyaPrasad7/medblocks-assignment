import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import { ThemeProvider } from "@mui/material/styles";
import theme from "./theme/Theme.ts";
import { CssBaseline } from "@mui/material";
import { HashRouter } from "react-router";

createRoot(document.getElementById("root")!).render(
  <ThemeProvider theme={theme}>
    <HashRouter>
      <CssBaseline />
      <App />
    </HashRouter>
  </ThemeProvider>
);
