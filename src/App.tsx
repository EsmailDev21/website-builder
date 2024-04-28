import useRoutes from "./utils/useRoutes";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ChakraProvider } from "@chakra-ui/react";
import { Provider } from "react-redux";
import { store } from "./redux/store";

function App() {
  const routes = useRoutes();

  return (
    <Provider store={store}>
      <ChakraProvider>
        <BrowserRouter>
          <Routes>
            {routes.map((i, index) => (
              <Route key={index} element={i.element} path={i.url} />
            ))}
          </Routes>
        </BrowserRouter>
      </ChakraProvider>
    </Provider>
  );
}

export default App;
