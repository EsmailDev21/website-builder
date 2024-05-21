import useRoutes from "./utils/useRoutes";
import { BrowserRouter, Route, Routes, useNavigate } from "react-router-dom";
import { ChakraProvider } from "@chakra-ui/react";
import { Provider } from "react-redux";
import { persistor, store } from "./redux/store";
import { useEffect } from "react";
import findTourParkings, {
  embedInterpolatedPositions,
} from "./utils/findTourParkings";
import { mockTour } from "./utils/mockTour";
import { PersistGate } from "redux-persist/integration/react";

function App() {
  const routes = useRoutes();
  let data = {
    ROOT: {
      type: { resolvedName: "Container" },
      isCanvas: true,
      props: {
        _id: "",
        background: "#ffffff",
        padding: 5,
        height: 2067,
        width: "700px",
        borderWidth: 1,
        borderColor: "#000000",
        id: "ROOT",
      },
      displayName: "Container",
      custom: {},
      hidden: false,
      nodes: [
        "e53AroaK5x",
        "chaSeFruTQ",
        "VvKP5x86u3",
        "6v1_LbFfqf",
        "zeFLHP1Sob",
      ],
      linkedNodes: {},
    },
    e53AroaK5x: {
      type: { resolvedName: "Button" },
      isCanvas: false,
      props: {
        _id: "",
        background: "#7d7d7d",
        display: "block",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        marginTop: 0,
        marginBottom: 0,
        marginLeft: 0,
        marginRight: 0,
        padding: 0,
        height: 61,
        width: 144,
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        borderWidth: 0,
        borderRadius: 7,
        borderColor: "#000000",
        shadow: 5,
        shadowColor: "#d1d1d1",
        shadowRadius: 0,
        shadowBlur: 7,
        text: "Click me",
        textColor: "#55ec7b",
        textFontWeight: 600,
        textFontSize: 21,
        size: "small",
      },
      displayName: "Button",
      custom: {},
      parent: "ROOT",
      hidden: false,
      nodes: [],
      linkedNodes: {},
    },
    chaSeFruTQ: {
      type: { resolvedName: "Text" },
      isCanvas: false,
      props: {
        _id: "",
        text: "Hi world",
        fontSize: 36,
        color: "#ea8686",
        fontWeight: 600,
      },
      displayName: "Text",
      custom: {},
      parent: "ROOT",
      hidden: false,
      nodes: [],
      linkedNodes: {},
    },
    "6v1_LbFfqf": {
      type: { resolvedName: "Container" },
      isCanvas: true,
      props: {
        _id: "",
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        padding: 20,
      },
      displayName: "Container",
      custom: {},
      parent: "ROOT",
      hidden: false,
      nodes: ["KVFVLpTLbm", "-EauFWH_Gs"],
      linkedNodes: {},
    },
    KVFVLpTLbm: {
      type: { resolvedName: "Button" },
      isCanvas: false,
      props: {
        _id: "",
        background: "#ffffff",
        display: "block",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        marginTop: 0,
        marginBottom: 0,
        marginLeft: 0,
        marginRight: 0,
        padding: 0,
        height: 30,
        width: 100,
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        borderWidth: 2,
        borderRadius: 0,
        borderColor: "#000000",
        shadow: 0,
        shadowColor: "#000000",
        shadowRadius: 0,
        shadowBlur: 0,
        text: "Click me",
        textColor: "#000000",
        textFontWeight: 500,
        textFontSize: 14,
        size: "small",
      },
      displayName: "Button",
      custom: {},
      parent: "6v1_LbFfqf",
      hidden: false,
      nodes: [],
      linkedNodes: {},
    },
    "-EauFWH_Gs": {
      type: { resolvedName: "CImage" },
      isCanvas: false,
      props: {
        _id: "",
        src: "https://unsplash.it/600/400",
        height: 400,
        width: 600,
        borderRadius: 57,
      },
      displayName: "CImage",
      custom: {},
      parent: "6v1_LbFfqf",
      hidden: false,
      nodes: [],
      linkedNodes: {},
    },
    VvKP5x86u3: {
      type: { resolvedName: "CInput" },
      isCanvas: false,
      props: { _id: "", padding: 0 },
      displayName: "CInput",
      custom: {},
      parent: "ROOT",
      hidden: false,
      nodes: [],
      linkedNodes: {},
    },
    zeFLHP1Sob: {
      type: { resolvedName: "CScript" },
      isCanvas: false,
      props: { value: "function myFunction(){ console.log(1+2);}", type: "" },
      displayName: "CScript",
      custom: {},
      parent: "ROOT",
      hidden: false,
      nodes: [],
      linkedNodes: {},
    },
  };
  useEffect(() => {
    localStorage.setItem("previewData", JSON.stringify(data));
  }, []);
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <ChakraProvider>
          <BrowserRouter>
            <Routes>
              {routes.map((i, index) => (
                <Route key={index} element={i.element} path={i.url} />
              ))}
            </Routes>
          </BrowserRouter>
        </ChakraProvider>
      </PersistGate>
    </Provider>
  );
}

export default App;
