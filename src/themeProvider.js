import { createTheme, ThemeProvider } from "@material-ui/core/styles";

const theme = createTheme({
  typography: {
    fontFamily: ["Dm Sans", "sans-serif"].join(","),
  },
  palette: {
    error: {
      main: "#b00020",
    },
    primary: {
      light: "#009d69",
      main: "#009d69",
      dark: "#009d69",
      contrastText: "#fff",
    },
    secondary: {
      light: "#fcaa8c",
      main: "#fcaa8c",
      dark: "#fcaa8c",
      contrastText: "#000",
    },
  },
});
const AppThemeProvider = ({ children }) => {
  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
};

export default AppThemeProvider;
