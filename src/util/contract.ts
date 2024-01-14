/* eslint-disable @typescript-eslint/no-explicit-any */
import { BigNumber, ethers } from "ethers";

export const getContract = (
  contractAddress: string,
  abi: any[],
  provider: any
) => {
  if (!abi || !contractAddress || !provider) {
    // err for now
    console.log("missing data");
    return;
  }
  const contract = new ethers.Contract(contractAddress, abi, provider);
  return contract;
};

export const fromBigNumber = (hex: object) => {
  if (!hex) return 0;
  return BigNumber.from(hex).toNumber();
};

export const sendTx = async (
  provider: any,
  address: string,
  contractAddress: string,
  abi: any[]
) => {
  const signer = provider.getSigner(address);
  const contract = getContract(contractAddress, abi, signer);
  if (!contract || !address) return;
  try {
    const transaction = await contract.increaseCounter();
    const transactionReceipt = await transaction.wait();
    if (transactionReceipt.status !== 1) {
      // err for now
      console.log("error message");
      return;
    }
    return transactionReceipt;
  } catch (err) {
    // err for now
    console.log(err);
  }
};
