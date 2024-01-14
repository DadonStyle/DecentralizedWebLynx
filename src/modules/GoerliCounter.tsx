import { useContext, useState } from "react";
import ConnectButton from "../components/ConnectButtons/ConnectButton";
import { connectWallet } from "../util/wallet";
import { ProviderSingletonContext } from "../context/ProviderSingletonContext";
import { useMetaMaskAddress } from "../hooks/useMMaddress";
import useContractData, { countersState } from "../hooks/useContractData";
import { sendTx } from "../util/contract";
import { CONTRACT_ADDRESS } from "../constants/ContractAddress";
import { ABI } from "../constants/ContractABI";

const GoerliCounter = () => {
  const provider = useContext(ProviderSingletonContext);
  const { address, setAddress } = useMetaMaskAddress();
  const [personalBrowser, SetPersonalBrowser] = useState<number>(0);
  const { contractData, setContractData } = useContractData();

  const handleConnectWallet = async () =>
    await connectWallet(provider, setAddress);

  const handleIncreaseClick = async () => {
    const receipt = await sendTx(provider, address, CONTRACT_ADDRESS, ABI);
    if (receipt.status === 1) {
      setContractData((prev: countersState) => {
        const newState = { ...prev, personalCounter: prev.personalCounter + 1 };
        return newState;
      });
      SetPersonalBrowser((prev) => prev + 1);
    }
  };

  return (
    <div>
      <div className="header-container">
        <ConnectButton
          cb={handleConnectWallet}
          isConnected={address.length > 0}
        />
        <div className="header-info-item">
          globalCounter: {contractData.globalCounter}
        </div>
        <div className="header-info-item">
          personal: {contractData.personalCounter}
        </div>
        <div className="header-info-item">topUser: {contractData.topUser}</div>
        <div className="header-info-item">perSession: {personalBrowser}</div>
      </div>
      <div className="body-container">
        <button onClick={handleIncreaseClick}>Increase</button>
      </div>
    </div>
  );
};

export default GoerliCounter;
