import React from "react";
import { createRoot } from "react-dom/client";

import App from "./App";

const rootElem = document.getElementById("root");

if (rootElem) {
  const root = createRoot(rootElem);
  root.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
} else {
  console.error("Root element not found");
}
