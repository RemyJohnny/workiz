import { ReactNode, createContext, useEffect, useState } from "react";
import AppExtensionsSDK from "@pipedrive/app-extensions-sdk";

export const SdkContext = createContext<unknown>(null);

export interface SdkContextProviderProps {
  children: ReactNode;
}

export default function SdkContextProvider({
  children,
}: SdkContextProviderProps) {
  const [sdk, setSdk] = useState<unknown>(null);

  useEffect(() => {
    const initializeSDK = async () => {
      try {
        const sdk = await new AppExtensionsSDK().initialize();
        setSdk(sdk);
      } catch (error) {
        console.log(error);
      }
    };
    initializeSDK();
  }, []);

  return <SdkContext.Provider value={sdk}>{children}</SdkContext.Provider>;
}
