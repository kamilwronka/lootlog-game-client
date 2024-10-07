import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { GlobalContextProvider } from "./contexts/global-context";
import { Auth0ProviderWithConfig } from "./providers/auth0-provider";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

ReactDOM.createRoot(
  (() => {
    const app = document.createElement("div");
    app.id = "root";
    app.className =
      "ll-absolute ll-top-0 ll-left-0 ll-z-20 ll-h-screen ll-w-screen ll-pointer-events-none";
    document.body.append(app);
    return app;
  })()
).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <Auth0ProviderWithConfig>
        <GlobalContextProvider>
          <App />
        </GlobalContextProvider>
      </Auth0ProviderWithConfig>
    </QueryClientProvider>
  </React.StrictMode>
);
