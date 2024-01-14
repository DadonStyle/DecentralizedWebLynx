import { useContext } from "react";
import { MetaMaskAddressContext } from "../context/MetamaskContext";

export const useMetaMaskAddress = () => {
  const context = useContext(MetaMaskAddressContext);
  if (context === undefined) {
    throw new Error("MetaMaskAddressContext missing provider");
  }
  return context;
};
