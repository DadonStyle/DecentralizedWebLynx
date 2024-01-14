/* eslint-disable @typescript-eslint/no-explicit-any */
import { useContext, useEffect, useState } from "react";
import { fromBigNumber, getContract } from "../util/contract";
import { CONTRACT_ADDRESS } from "../constants/ContractAddress";
import { ABI } from "../constants/ContractABI";
import { useMetaMaskAddress } from "./useMMaddress";
import { ProviderSingletonContext } from "../context/ProviderSingletonContext";

export interface countersState {
  personalCounter: number;
  globalCounter: number;
  topUser: string;
}

const initialState = {
  personalCounter: 0,
  globalCounter: 0,
  topUser: "",
};

const useContractData = () => {
  const [contractData, setContractData] = useState<countersState>(initialState);
  const provider = useContext(ProviderSingletonContext);
  const { address } = useMetaMaskAddress();

  const fetchAllData = async (contract: any) => {
    const res = await Promise.allSettled([
      contract.personalCounter(address),
      contract.globalCounter(),
      contract.topUser(),
    ]).then((results) => {
      const newStateObj: countersState = {
        personalCounter:
          results[0].status === "fulfilled"
            ? fromBigNumber(results[0].value)
            : contractData.personalCounter,
        globalCounter:
          results[1].status === "fulfilled"
            ? fromBigNumber(results[1].value)
            : contractData.globalCounter,
        topUser:
          results[2].status === "fulfilled"
            ? results[2].value
            : contractData.topUser,
      };
      setContractData(newStateObj);
    });
    return res;
  };

  useEffect(() => {
    const resolveData = async () => await fetchAllData(contract);
    const contract = getContract(CONTRACT_ADDRESS, ABI, provider);
    if (!contract || !address) return;
    resolveData();
  }, [address, provider]);

  return { contractData, setContractData };
};

export default useContractData;
