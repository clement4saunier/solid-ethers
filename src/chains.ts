export declare type Explorer = {
  getAddressLink: (address: string) => string;
  getTransactionLink: (txnHash: string) => string;
};

export declare type Chain = {
  chainId: number;
  chainName: string;
  explorer: Explorer;
  rpc: string;
};

const commonExplorerUrl = (url: string): Explorer => ({
  getAddressLink: (address: string) => `${url}/address/${address}`,
  getTransactionLink: (txnHash: string) => `${url}/tx/${txnHash}`,
});

// Layer 1

export const Mainnet: Chain = {
  chainId: 1,
  chainName: "Mainnet",
  explorer: commonExplorerUrl("https://etherscan.io"),
  rpc: "https://mainnet.infura.io/v3/",
};

export const Polygon: Chain = {
  chainId: 137,
  chainName: "Polygon",
  explorer: commonExplorerUrl("https://polygonscan.com"),
  rpc: "https://polygon-rpc.com",
};

// Layer 2

export const Arbitrum: Chain = {
  chainId: 42161,
  chainName: "Arbitrum",
  explorer: commonExplorerUrl("https://arbiscan.io"),
  rpc: "https://arb1.arbitrum.io/rpc",
};

export const Optimism: Chain = {
  chainId: 10,
  chainName: "Optimism",
  explorer: commonExplorerUrl("https://optimistic.etherscan.io"),
  rpc: "https://mainnet.optimism.io/",
};

// Testnets

export const Sepolia: Chain = {
  chainId: 11155111,
  chainName: "Ropsten",
  explorer: commonExplorerUrl("https://ropsten.etherscan.io"),
  rpc: "https://rpc.ankr.com/eth_sepolia"
};

export const Goerli: Chain = {
  chainId: 5,
  chainName: "Goerli",
  explorer: commonExplorerUrl("https://goerli.etherscan.io"),
  rpc: "https://rpc.ankr.com/eth_goerli"
};

export const Mumbai: Chain = {
  chainId: 80001,
  chainName: "Mumbai",
  explorer: commonExplorerUrl("https://mumbai.polygonscan.com"),
  rpc: "https://rpc.ankr.com/polygon_mumbai",
};