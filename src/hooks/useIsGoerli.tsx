import { useState, useEffect } from "react";

export const useIsGoerli = () => {
  const [isGoerli, setIsGoerli] = useState<boolean>(
    window.ethereum.networkVersion === "5"
  );

  const handleNetworkChange = (chainId: string) => {
    if (chainId === "0x5") {
      setIsGoerli(true);
      return;
    }
    setIsGoerli(false);
  };

  useEffect(() => {
    const ethereum = window.ethereum;
    ethereum.on("chainChanged", handleNetworkChange);
    return () =>
      window.ethereum.removeListener("chainChanged", handleNetworkChange);
  }, []);

  return isGoerli;
};
