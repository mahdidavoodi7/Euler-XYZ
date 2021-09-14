import {
  createTheme,
  ThemeProvider as MuiThemeProvider
} from "@material-ui/core/styles";
import { ThemeProvider } from "styled-components";
import NoSsr from "@material-ui/core/NoSsr";

const theme = createTheme({
  typography: {
    fontFamily: ["Open Sans", "sans-serif"].join(",")
  },
  palette: {
    background: "#F6F5F5",
    error: {
      main: "#b00020"
    },
    primary: {
      light: "#5BAEC6",
      main: "#D3E0EA",
      dark: "#03556C",
      contrastText: "#082b35"
    },
    secondary: {
      light: "#F3F7FA",
      main: "#A4BBCD",
      dark: "#7292AA",
      contrastText: "#082b35"
    },
  }
});
const AppThemeProvider = ({ children }) => {
  return (
    <NoSsr>
      <MuiThemeProvider theme={theme}>
        <ThemeProvider theme={theme}>{children}</ThemeProvider>
      </MuiThemeProvider>
    </NoSsr>
  );
};

export default AppThemeProvider;
