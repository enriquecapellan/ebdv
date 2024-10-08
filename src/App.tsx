import { Header } from "./components/header";
import { GlobalStyles } from "./components/globalStyles";
import { Sidebar } from "./components/sidebar";
import { AppProvider } from "./hooks/useApp/AppContext";

import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { Outlet } from "react-router-dom";
import { Content } from "./components/content";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
  typography: {
    fontSize: 20,
  },
});

function App() {
  return (
    <AppProvider>
      <ThemeProvider theme={darkTheme}>
        <CssBaseline />

        <Header />
        <Sidebar />
        <GlobalStyles />
        <Content>
          <Outlet />
        </Content>
      </ThemeProvider>
    </AppProvider>
  );
}

export default App;
