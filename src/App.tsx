import { MetaMaskAddressProvider } from "./context/MetamaskContext";
import GoerliCounter from "./modules/GoerliCounter";
import { ProviderSingletonProvider } from "./context/ProviderSingletonContext";
import "./App.css";

const App = () => {
  if (!window.ethereum) return <div>Please use MM browser</div>;
  return (
    <ProviderSingletonProvider>
      <MetaMaskAddressProvider>
        <GoerliCounter />
      </MetaMaskAddressProvider>
    </ProviderSingletonProvider>
  );
};

export default App;
