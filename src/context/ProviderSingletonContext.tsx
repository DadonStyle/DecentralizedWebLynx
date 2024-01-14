import { ethers } from "ethers";
import { createContext, ReactNode } from "react";

// provider type best practice is unclear
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const ProviderSingletonContext = createContext<any>(null);

interface ProviderSingletonProviderProps {
  children: ReactNode;
}

export const ProviderSingletonProvider = ({
  children,
}: ProviderSingletonProviderProps) => {
  // singleton
  let provider = new ethers.providers.Web3Provider(window.ethereum!);
  if (!provider) provider = new ethers.providers.Web3Provider(window.ethereum!);

  return (
    <ProviderSingletonContext.Provider value={provider}>
      {children}
    </ProviderSingletonContext.Provider>
  );
};
