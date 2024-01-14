import { useContext, useState } from "react";
import ConnectButton from "../components/ConnectButtons/ConnectButton";
import { connectWallet } from "../util/wallet";
import { useMetaMaskAddress } from "../hooks/useMMnetworkChange";
import { ProviderSingletonContext } from "../context/ProviderSingletonContext";
import { useIsGoerli } from "../hooks/useIsGoerli";
import useContractData, { countersState } from "../hooks/useContractData";
import { sendTx } from "../util/contract";
import { CONTRACT_ADDRESS } from "../constants/ContractAddress";
import { ABI } from "../constants/ContractABI";
import "./GoerliCounter.css";

const GoerliCounter = () => {
  const provider = useContext(ProviderSingletonContext);
  const { address, setAddress } = useMetaMaskAddress();
  const [personalBrowser, SetPersonalBrowser] = useState<number>(0);
  const { contractData, setContractData } = useContractData();
  const isGoerli = useIsGoerli();

  if (!isGoerli)
    return <div className="switch-err">Please switch to Goerli</div>;

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
    <div className="goerli-counter-container">
      <div className="connect-btn-wrapper">
        <ConnectButton
          cb={handleConnectWallet}
          isConnected={address.length > 0}
        />
      </div>
      <div className="info-container">
        <div className="info-item">
          globalCounter: {contractData.globalCounter}
        </div>
        <div className="info-item">
          topUser:
          {contractData.topUser.toLowerCase() === address.toLowerCase() &&
          address.length > 0
            ? "You are the top user!"
            : contractData.topUser}
        </div>
        <div className="info-item">perSession: {personalBrowser}</div>
        <div className="info-item">
          personal: {contractData.personalCounter}
        </div>
      </div>
      <div className="increase-btn-wrapper">
        <button onClick={handleIncreaseClick}>Increase</button>
      </div>
    </div>
  );
};

export default GoerliCounter;
