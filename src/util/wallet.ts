// type "any", ether.js provider should fit
/* eslint-disable @typescript-eslint/no-explicit-any */

export const connectWallet = async (
  provider: any,
  setter: (item: string) => void
) => {
  if (!provider) {
    // err for now
    console.log("connectWallet provider required");
    return;
  }

  const addresses = await provider.send("eth_requestAccounts", []);
  setter(addresses[0]);
  if (addresses.length < 1) {
    // err for now
    console.log("error message");
    return;
  }

  return await provider.getSigner();
};
