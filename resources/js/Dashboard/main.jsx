
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { ThemeProvider } from "@material-tailwind/react";
import { MaterialTailwindControllerProvider } from "./context";
// import "../../../public/css/tailwind.css";

export default function Main({user}) {

  return <React.StrictMode>
    <BrowserRouter >
      <ThemeProvider>
        <MaterialTailwindControllerProvider>
          <App user={user} />
        </MaterialTailwindControllerProvider>
      </ThemeProvider>
    </BrowserRouter>
  </React.StrictMode>
}