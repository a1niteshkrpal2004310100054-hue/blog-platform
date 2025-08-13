import { BrowserRouter } from "react-router-dom";
import { createRoot } from "react-dom/client";
import { store } from "./redux/store.ts";
import { Provider } from "react-redux";
import "./index.css";
import App from "./App.tsx";

createRoot(document.getElementById("root")!).render(
  <>
    <BrowserRouter>
      <Provider store={store}>
        <App />
      </Provider>
    </BrowserRouter>
  </>
);
