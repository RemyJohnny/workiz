import { useContext } from "react";
import { SdkContext } from "../contexts/pipedriveSdk";

export default function useSDK() {
  const context = useContext(SdkContext);
  if (!context) {
    throw new Error("useSDK hook must be used inside the SdkContextProvider");
  }
  return context;
}
