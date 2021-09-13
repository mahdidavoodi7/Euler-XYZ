import AppThemeProvider from "./themeProvider";
import RouterConfig from "./routerConfig";
import { Provider } from "react-redux";
import { createStore } from "redux";
import rootReducer from "./reducer";

function App() {
  const store = createStore(rootReducer)
  return (
    <Provider store={store}>
      <AppThemeProvider>
        <RouterConfig />
      </AppThemeProvider>
    </Provider>
  );
}

export default App;
