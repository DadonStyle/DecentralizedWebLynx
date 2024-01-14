import { useEffect } from "react";

interface useMMNetworkChangeProps {
  // keep the function dynamic as possible
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  cb: (...args: any[]) => void;
}

const useMMNetworkChange = ({ cb }: useMMNetworkChangeProps) => {
  useEffect(() => {
    const ethereum = window.ethereum;
    ethereum.on("accountsChanged", cb);
    return () =>
      window.ethereum.removeListener("accountsChanged", cb);
  }, [cb]);
};

export default useMMNetworkChange;
