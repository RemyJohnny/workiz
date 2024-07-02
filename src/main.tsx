import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import AddDeal from "./routes/deal_form";
import SdkContextProvider from "./contexts/pipedriveSdk";

const route = createBrowserRouter([
  {
    path: "/addDeal",
    element: <AddDeal />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <SdkContextProvider>
    <RouterProvider router={route} />
  </SdkContextProvider>
);
