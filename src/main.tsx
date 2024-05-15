import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { GlobalContextProvider } from "./contexts/global-context";
import { Auth0ProviderWithConfig } from "./providers/auth0-provider";

ReactDOM.createRoot(
  (() => {
    const app = document.createElement("div");
    document.body.append(app);
    return app;
  })()
).render(
  <React.StrictMode>
    <Auth0ProviderWithConfig>
      <GlobalContextProvider>
        <App />
      </GlobalContextProvider>
    </Auth0ProviderWithConfig>
  </React.StrictMode>
);
