import { Eip1193Provider } from "ethers";
import { Chain } from "../chains";

declare global {
  interface Window {
    ethereum?: Eip1193Provider;
  }
}

interface useWallet {
  disconnect: Promise<any>;
  connect: Promise<any>;
}

const NOT_AUTHORIZED = 4100;
const UNSUPPORTED = 4200;
const DISCONNECT = 4900;
const CHAIN_INVALID = 4901;
const CHAIN_UNAVAILABLE = 4902;
const INVALID_JSON = 32700;
const REQUEST_INVALID = 32600;
const METHOD_INVALID = 32601;
const PARAMS_INVALID = 32602;

export default function useWallet() {
  const request = (method: string, params: Array<any> | Record<string, any> = []) =>
    window.ethereum?.request({ method, params });

  const disconnect = async () => request("eth_requestAccounts", [{ eth_accounts: {} }]);
  const connect = async () => request("eth_requestAccounts");
  const switchChain = async (chain: Chain) => {
    try {
      await request("wallet_switchEthereumChain", [{ chainId: chain.chainId }]);
    } catch (err) {
      if (err.code !== CHAIN_UNAVAILABLE) {
        console.error(err);
        return;
      }

      try {
        await request("wallet_addEthereumChain", [
          {
            chainId: chain.chainId,
            chainName: chain.chainName,
            rpcUrls: [chain.rpc],
          },
        ]);
      } catch (addError) {
        throw new Error("Failed to add network");
      }
    }
  };

  return { disconnect, connect, switchChain };
}
