import { ReactNode, createContext, useEffect, useState } from "react";
import AppExtensionsSDK from "@pipedrive/app-extensions-sdk";

export const SdkContext = createContext<AppExtensionsSDK | null>(null);

export interface SdkContextProviderProps {
  children: ReactNode;
}

export default function SdkContextProvider({
  children,
}: SdkContextProviderProps) {
  const [sdk, setSdk] = useState<AppExtensionsSDK | null>(null);

  useEffect(() => {
    const initializeSDK = async () => {
      try {
        const sdk = await new AppExtensionsSDK().initialize();
        console.log("sdk connected");
        setSdk(sdk);
      } catch (error) {
        console.log(error);
      }
    };
    initializeSDK();
  }, []);

  return <SdkContext.Provider value={sdk}>{children}</SdkContext.Provider>;
}
