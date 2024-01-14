import {
  Dispatch,
  createContext,
  useState,
  ReactNode,
  useEffect,
  SetStateAction,
} from "react";

interface MetaMaskAddressContext {
  address: string;
  setAddress: Dispatch<SetStateAction<string>>;
}

export const MetaMaskAddressContext = createContext<
  MetaMaskAddressContext | undefined
>(undefined);

interface MetaMaskAddressProviderProps {
  children: ReactNode;
}

export const MetaMaskAddressProvider = ({
  children,
}: MetaMaskAddressProviderProps) => {
  const [address, setAddress] = useState<string>("");
  const handleAccountChange = (accounts: string[]) => {
    accounts.length < 1 ? setAddress("") : setAddress(accounts[0]);
  };

  // listen to account changes from MM
  useEffect(() => {
    const ethereum = window.ethereum;
    ethereum.on("accountsChanged", handleAccountChange);
    return () =>
      window.ethereum.removeListener("accountsChanged", handleAccountChange);
  }, []);

  return (
    <MetaMaskAddressContext.Provider value={{ address, setAddress }}>
      {children}
    </MetaMaskAddressContext.Provider>
  );
};
